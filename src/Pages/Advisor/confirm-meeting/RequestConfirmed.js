import warning from '../../../assets/images/warning.png';
import plus from '../../../assets/images/plus.png';
import CancelMeeting from './modal/CancelMeeting';
import Reschedule from '../../Advisor/confirm-meeting/modal/Resechdule';
import Header from '../../../Components/Layouts/AdvisorLayout/Header';
import useFetchData from '../../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import myprofile from '../../../assets/images/myprofile.png';
import Moment from 'react-moment';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
import CancalMeeting from './modal/CancelMeeting';
import ResechduleWarning from './modal/ResechduleWarning';
import MainFooter from '../../../Components/Layouts/MainFooter';

const RequestConfirmed = () => {
  let { meetingId } = useParams();

  const { data, isLoading, isError } = useFetchData({
    queryKey: ['MeetingRequest', meetingId],
    url: `/api/view-meeting-data?meeting_id=${meetingId}`,
  });
  const response_data = data?.data;

//  console.log(response_data)

  const Loading = isLoading && <DataLoading />;
  const Error = isError && <DataError />;

  return (
    <>
      <Header />
      {Loading || Error || (
        <section class="request-viewed">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="request-viewed-card">
                  <h3>
                    {response_data?.adviseeData?.firstname}{' '}
                    {response_data?.adviseeData?.lastname} &{' '}
                    {response_data?.advisorData?.firstname}{' '}
                    {response_data?.advisorData?.lastname}
                  </h3>
                  <h6>{`${response_data?.meeting_data?.meetingtype} - ${response_data?.meeting_data?.meeting_length_minutes} min`}</h6>
                  <div class="request-group">
                    <div class="request-img">
                      <div class="row">
                        <div class="col-md-6">
                          <a href={`/advisee/${response_data?.meeting_data?.AdviseeID}`}>
                            <img
                              style={{
                                'objectFit': 'cover'
                              }}
                              src={
                                !!response_data?.adviseeData?.profile_goal
                                  ? process.env.REACT_APP_API_URL + `/${response_data?.adviseeData?.profile_goal}`
                                  : myprofile
                              }
                              class="img-fluid"
                              alt=""
                            />
                            <h5>
                              {response_data?.adviseeData?.firstname}{' '}
                              {response_data?.adviseeData?.lastname}
                            </h5>
                          </a>
                        </div>
                        <div class="col-md-6">
                          <a href="/advisor/advisorProfileedit">
                            <img
                              style={{
                                'objectFit': 'cover'
                              }}
                              src={
                                !!response_data?.advisorData?.profile_goal
                                  ? process.env.REACT_APP_API_URL + `/${response_data?.advisorData?.profile_goal}`
                                  : myprofile
                              }
                              class="img-fluid"
                              alt=""
                            />
                            <h5>
                              {response_data?.advisorData?.firstname}{' '}
                              {response_data?.advisorData?.lastname}
                            </h5>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="request-group">
                    <label class="confirmed">
                      <strong>Status:</strong>
                      <span> {response_data?.meeting_data?.meeting_status}</span>
                    </label>
                    {response_data?.meeting_data?.advisor_formated_start && (
                      <div style={{ marginTop: '8px' }}>
                        <p style={{ margin: '4px 0' }}>
                          <strong>Your time ({response_data?.advisor_time_zone?.time_zone}):</strong>{' '}
                          {`${response_data?.meeting_data?.advisor_formated_date}, ${response_data?.meeting_data?.advisor_formated_start} – ${response_data?.meeting_data?.advisor_formated_end}`}
                        </p>
                        <p style={{ margin: '4px 0' }}>
                          <strong>Advisee's time ({response_data?.advisee_time_zone?.time_zone}):</strong>{' '}
                          {`${response_data?.meeting_data?.advisee_formated_date}, ${response_data?.meeting_data?.advisee_formated_start} – ${response_data?.meeting_data?.advisee_formated_end}`}
                        </p>
                      </div>
                    )}
                  </div>

                  <div class="request-group">
                    <label class="location">
                      <strong>Location: </strong> Please check the calendar invite you received at your meeting email address. If you haven’t received a calendar invite, please contact Support.

                      {/* <strong>Location: </strong> <a href="#">Check Your Email</a> */}
                    </label>
                  </div>

                  <div class="request-group">
                    <label>
                      <strong>Message:</strong>
                    </label>
                    <div style={{ whiteSpace: "pre-line" }}>
                      <p>
                        {response_data?.meeting_message?.message}
                      </p>
                    </div>
                  </div>

                  <div class="request-meeting-btn">
                    <button
                      type="button"
                      class="btn btn-info rboder-btn"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      Cancel Meeting
                    </button>
                    <button
                      type="button"
                      class="btn btn-info btn-border"
                      data-toggle="modal"
                      data-target="#myModal4"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {response_data?.reschedule_warning === 1 ? (
        <CancalMeeting
          meetingID={response_data?.meeting_data?.id}
          image={warning}
          advisor_timezone={response_data?.advisor_time_zone?.time_zone}
          meeting_data={response_data?.meeting_data}
          id={meetingId}
          service={response_data?.userServices}
        />
      ) : (
        <CancalMeeting
          meetingID={response_data?.meeting_data?.id}
          type="cancel"
          advisor_timezone={response_data?.advisor_time_zone?.time_zone}
          meeting_data={response_data?.meeting_data}
          id={meetingId}
          service={response_data?.userServices}

        />
      )}
      {response_data?.reschedule_warning === 1 ? (
        <ResechduleWarning
          advisor_timezone={response_data?.advisor_time_zone?.time_zone}
          meeting_data={response_data?.meeting_data}
          image={warning}
          id={meetingId}
          service={response_data?.userServices}
        />) : (
        <Reschedule advisor_timezone={response_data?.advisor_time_zone?.time_zone} meeting_data={response_data?.meeting_data} id={meetingId} service={response_data?.userServices} />
      )}
      <MainFooter />
    </>
  );
};

function FormatDateTime({ date, time }) {
  const parsedTime = time && JSON.parse(time);
  const parsedDate = date && JSON.parse(date);

  return (
    <>
      {time && (
        <span>
          <Moment format="hh:mma" parse="HH:mm:ss">
            {time && parsedTime.from}
          </Moment>
          -
          <Moment format="hh:mma" parse="HH:mm:ss">
            {time && parsedTime.to}
          </Moment>
        </span>
      )}
      {date && (
        <span>
          <Moment format="ddd, MMM Do" parse="YYYY-MM-DD">
            {date && parsedDate.date}
          </Moment>
        </span>
      )}
    </>
  );
}

export default RequestConfirmed;