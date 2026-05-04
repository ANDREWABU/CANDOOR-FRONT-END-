


import React from 'react';
import requestview from '../../../assets/images/requestview.png';
import myprofile2 from '../../../assets/images/myprofile2.png';
import warning from '../../../assets/images/warning.png';
import plus from '../../../assets/images/plus.png';
import { Link, useParams } from 'react-router-dom';
import useFetchData from '../../../hooks/useFetchData';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
import myprofile from '../../../assets/images/myprofile.png';
import FormatTime from '../../../Components/Common/FormatTime';
import CancalMeeting from '../../Advisee/confirm-meeting/modal/CancelMeeting';
import ResechduleWarning from '../../Advisee/confirm-meeting/modal/ResechduleWarning';
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import Resechdule from '../../Advisee/confirm-meeting/modal/Resechdule';
import MainFooter from '../../../Components/Layouts/MainFooter';

const RequestConfirmed = () => {
  let { meetingId } = useParams();

  const { data, isError, isLoading } = useFetchData({
    queryKey: ['AdviseeData', 'Advisee'],
    url: `/api/view-meeting-data?meeting_id=${meetingId}`,
  });
  const response_data = data?.data;
//  console.log('data')
//  console.log({meetingId})
  
  if (isLoading) {
    return <DataLoading />;
  }
  if (isError) {
    return <DataError />;
  }
  return (
    <>
      <Header />
      <section class="request-viewed">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="request-viewed-card">
                <h3>
                  {' '}
                  {response_data?.advisorData?.firstname}{' '}
                  {response_data?.advisorData?.lastname} & {' '}
                  {response_data?.adviseeData?.firstname}{' '}
                  {response_data?.adviseeData?.lastname}
                </h3>
                <h6>{`${response_data?.meeting_data?.meetingtype} - ${response_data?.meeting_data?.meeting_length_minutes} min`}</h6>
                <div class="request-group">
                  <div class="request-img">
                    <div class="row">
                      <div class="col-md-6">
                        <Link
                          to={`/advisor/${response_data?.meeting_data?.AdvisorID}`}
                        >
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
                        </Link>
                      </div>
                      <div class="col-md-6">
                        <Link to={`/advisee/adviseeProfile`}>
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
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="request-group">
                  <label class="confirmed">
                    <strong>Status:</strong>
                    <span> {response_data?.meeting_data?.meeting_status}</span>
                  </label>
                  {response_data?.meeting_data?.advisee_formated_start && (
                    <div style={{ marginTop: '8px' }}>
                      <p style={{ margin: '4px 0' }}>
                        <strong>Your time ({response_data?.advisee_time_zone?.time_zone}):</strong>{' '}
                        {`${response_data?.meeting_data?.advisee_formated_date}, ${response_data?.meeting_data?.advisee_formated_start} – ${response_data?.meeting_data?.advisee_formated_end}`}
                      </p>
                      <p style={{ margin: '4px 0' }}>
                        <strong>Advisor's time ({response_data?.advisor_time_zone?.time_zone}):</strong>{' '}
                        {`${response_data?.meeting_data?.advisor_formated_date}, ${response_data?.meeting_data?.advisor_formated_start} – ${response_data?.meeting_data?.advisor_formated_end}`}
                      </p>
                    </div>
                  )}
                </div>

                <div class="request-group">
                  <label class="location">
                    <strong>Location: </strong> Please check the calendar invite you received at your meeting email address. If you haven’t received a calendar invite, please contact Support.
                    {/* <strong>Location: </strong> <a href="#">Check Your Email!</a> */}
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
                    data-target="#myModalCancel"
                  >
                    Cancel Meeting
                  </button>
                  <button
                    type="button"
                    class="btn btn-info btn-border"
                    data-toggle="modal"
                    data-target="#myModal1"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {response_data?.reschedule_warning === 1 ? (
        <CancalMeeting 
        meetingID={meetingId}
        type='warning' 
        image={warning}
        id={meetingId}
        advisee_timezone={response_data?.advisee_time_zone?.time_zone} 
        meeting_data={response_data?.meeting_data}
        service={response_data?.userServices}
        />
      ) : (
        // <CancalMeeting type="cancel" />
        <CancalMeeting 
        meetingID={meetingId}
        type='non-warning'
        id={meetingId}
        advisee_timezone={response_data?.advisee_time_zone?.time_zone} 
        meeting_data={response_data?.meeting_data}
        service={response_data?.userServices}
        />
      )}
      {response_data?.reschedule_warning === 1 ? (
        <ResechduleWarning
          image={warning}
          id={meetingId}
          advisee_timezone={response_data?.advisee_time_zone?.time_zone} 
          meeting_data={response_data?.meeting_data}
          service={response_data?.userServices}
        />
      ) : (

        <Resechdule
          ModalId="myModal1"
          id={meetingId}
          advisee_timezone={response_data?.advisee_time_zone?.time_zone} 
          meeting_data={response_data?.meeting_data}
          service={response_data?.userServices}
        />

      )}
      <MainFooter />
    </>
  );
};

export default RequestConfirmed;