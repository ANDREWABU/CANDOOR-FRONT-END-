
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
import Reschedule from '../../Advisee/confirm-meeting/modal/Resechdule';
import ConfirmMeeting from '../../Advisee/confirm-meeting/modal/ConfirmMeeting';
import ProposeAlternate from '../../Advisee/confirm-meeting/modal/ProposeAlternate';
import CancalMeeting from '../../Advisee/confirm-meeting/modal/CancelMeeting';
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import MainFooter from '../../../Components/Layouts/MainFooter';

const RequestUnConfirmed = () => {
  let { meetingId } = useParams();

  const { data, isError, isLoading } = useFetchData({
    queryKey: ['AdviseeData', 'Advisee'],
    url: `/api/view-meeting-data?meeting_id=${meetingId}`,
  });


  const response_data = data?.data;

  console.log(response_data)
  if (isLoading) {
    return <DataLoading />;
  }
  if (isError) {
    return <DataError />;
  }
  return (
    <>
      <Header />
      <section className="request-viewed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="request-viewed-card">
                <h3>
                  {' '}
                  {response_data?.advisorData?.firstname}{' '}
                  {response_data?.advisorData?.lastname} & {' '}
                  {response_data?.adviseeData?.firstname}{' '}
                  {response_data?.adviseeData?.lastname}
                </h3>
                <h6>{`${response_data?.meeting_data?.meetingtype} - ${response_data?.meeting_data?.meeting_length_minutes} min`}</h6>
                <div className="request-group">
                  <div className="request-img">
                    <div className="row">
                      <div className="col-md-6">
                        <Link to={`/advisor/${response_data?.advisorData?.AdvisorID}`}>
                          <img
                            style={{
                              'objectFit': 'cover'
                            }}
                            src={
                              !!response_data?.advisorData?.profile_goal
                                ? process.env.REACT_APP_API_URL + `/${response_data?.advisorData?.profile_goal}`
                                : myprofile
                            }
                            className="img-fluid"
                            alt=""
                          />
                          <h5>
                            {' '}
                            {response_data?.advisorData?.firstname}{' '}
                            {response_data?.advisorData?.lastname}
                          </h5>
                        </Link>
                      </div>
                      <div className="col-md-6">
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
                            className="img-fluid"
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

                <div className="request-group">
                  <label>
                    <strong>Status:</strong>{' '}
                    <span className="rcolor">
                      {response_data?.meeting_data?.meeting_status}
                    </span>
                  </label>
                </div>

                <div className="request-group">
                  <label>
                    <strong>Message:</strong>
                  </label>
                  <div style={{ whiteSpace: "pre-line" }}>
                    <p>
                      {response_data?.meeting_message?.message}
                    </p>
                  </div>
                </div>
                <div className="request-group">
                  <label>
                  {response_data?.meeting_data?.availability_last_provided_by === 'Advisor' ?
                      <strong className="">
                        {response_data?.advisorData?.firstname}'s Availability - Your time ({response_data?.advisee_time_zone?.time_zone}):
                      </strong>
                      :
                      <strong className="">
                        {response_data?.adviseeData?.firstname}'s Availability - Your time ({response_data?.advisee_time_zone?.time_zone}):
                      </strong>}
                  </label>
                  <ul>
                    <li>{`${response_data?.advisee_formatted_time_intervals?.[0]?.["interval_1"]?.['date']}   ${response_data?.advisee_formatted_time_intervals?.[0]?.["interval_1"]?.['start_time']} - ${response_data?.advisee_formatted_time_intervals?.[0]?.["interval_1"]?.['end_time']}`}</li>
                    <li>{`${response_data?.advisee_formatted_time_intervals?.[1]?.["interval_2"]?.['date']}   ${response_data?.advisee_formatted_time_intervals?.[1]?.["interval_2"]?.['start_time']} - ${response_data?.advisee_formatted_time_intervals?.[1]?.["interval_2"]?.['end_time']}`}</li>
                    <li>{`${response_data?.advisee_formatted_time_intervals?.[2]?.["interval_3"]?.['date']}   ${response_data?.advisee_formatted_time_intervals?.[2]?.["interval_3"]?.['start_time']} - ${response_data?.advisee_formatted_time_intervals?.[2]?.["interval_3"]?.['end_time']}`}</li>
                  </ul>
                </div>



                {/* <div className="request-meeting-btn">
                  <button type="button" className="btn btn-info btn-border">
                    Propose Alternate Times
                  </button>
                  <button type="button" className="btn btn-info">
                    Confirm a Time
                  </button>
                </div> */}
                <div className="request-meeting-btn">
{/*                  <a
                    href="#"
                    className="btn btn-info rboder-btn"
                    data-toggle="modal"
                    data-target="#myModalCancel"

                  >
                    Cancel Meeting Request
                  </a>                  
*/}
                  <a
                    href="#"
                    className="btn btn-info btn-border"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    Propose Alternate Times
                  </a>
                  <a
                    href="#"
                    className="btn btn-info"
                    data-toggle="modal"
                    data-target="#myModal2"
                    
                  >
                    Confirm a Time
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProposeAlternate
        id={meetingId}
        service={response_data?.userServices}
        advisee_time_zone={response_data?.advisee_time_zone?.time_zone}
      />
      <ConfirmMeeting id={meetingId} service={response_data?.userServices} intervals_time_zone={response_data?.intervals_time_zone} />
        <CancalMeeting 
        meetingID={response_data?.meeting_data?.id} 
        type='non-warning'
        id={meetingId}
        advisee_timezone={response_data?.advisee_time_zone?.time_zone} 
        meeting_data={response_data?.meeting_data}
        service={response_data?.userServices}
        />

      <MainFooter />
    </>
  );
};

export default RequestUnConfirmed;