import React from 'react';
import profilebg from '../../../assets/images/profilebg.png';
import map from '../../../assets/images/map.png';
import editicon from '../../../assets/images/editicon.png';
import hand from '../../../assets/images/hand.png';
import clock from '../../../assets/images/clock.png';
import lightbulb from '../../../assets/images/checklist5.png';
import notebook from '../../../assets/images/notebook.png';
import present from '../../../assets/images/present.png';
import celebrate from '../../../assets/images/img_celebrate.png';
import { Link, useHistory } from 'react-router-dom';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
import myprofile from '../../../assets/images/myprofile.png';

const AdvisorHomePage = ({ data, isDashboardLoading, isDashboardError }) => {
  let history = useHistory();
  isDashboardLoading && <DataLoading />;
  isDashboardError && <DataError />;

  const progress = data?.progress && JSON.parse(data?.progress);
	const endtimeunix = 1;
	const date = new Date();
  var rightnow = date.toISOString().slice(0, 19).replace('T', ' ');
	var rightnowunix = new Date(rightnow.replace(' ', 'T')).getTime();

  return (
    <>
      <section className="myprofile-info advisee-homepage">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className="myprofile-left">
                <div className="myprofilebg">
                  <img
                    style={{
                      'objectFit': 'cover'
                    }}
                    src={
                      !!data?.adviseeData?.cover_profile
                        ? process.env.REACT_APP_API_URL + `/${data?.adviseeData?.cover_profile}`
                        : profilebg
                    }
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="myprofile-desc">
                  <div className="profileimg">
                    <img
                      style={{
                        'objectFit': 'cover'
                      }}
                      src={
                        !!data?.adviseeData?.profile_goal
                          ? process.env.REACT_APP_API_URL + `/${data?.adviseeData?.profile_goal}`
                          : myprofile
                      }
                      className="img-fluid myprofileimg"
                      alt=""
                    />
                  </div>
                  <h3>
                    {data?.userData?.firstname} {data?.userData?.lastname}{' '}
                    <span>
                      {!!data?.userData?.pronouns && data?.userData?.pronouns}
                    </span>
                  </h3>
                  <h6>{data?.adviseeData?.headline}</h6>
                  <ul className="profileadd">
                    {/* {
                        this.state.resume ? <li><span ><img src={resume_blue} className="img-fluid" alt="" /></span>
                          <span style={{ 'color': '#3771CA', 'textDecoration': 'underline', 'cursor': 'pointer' }} onClick={this.downloadResume}>Resume</span></li> :
                          <></>
                      } */}
                    <li>
                      <span>
                        <img src={map} className="img-fluid" alt="" />
                      </span>
                      {data?.backgroundData?.city} (
                      {data?.backgroundData?.state}){' '}
                      {data?.backgroundData?.country}
                    </li>
                    <li>
                      <span>
                        <img src={clock} className="img-fluid" alt="" />
                      </span>
                      {data?.backgroundData?.time_zone} (EST)
                    </li>
                  </ul>
                  <div className="myprofile-left-btn homepage-left">
                    <Link to="/advisee/adviseeProfile" className="btn btn-info">
                      <img
                        src={editicon}
                        className="img-fluid headingicon"
                        alt=""
                      />
                      View or Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12">
              <div className="myprofile-right">
                <div className="homepage-sec">
                  <h2>
                    Welcome, {data?.userData?.firstname}!{' '}
                    <img src={hand} className="img-fluid" alt="" />
                  </h2>
                  <p>What would you like to do today?</p>
                  <div className="row">
                    <div className="col-md-4 startbox">
                    	<img src={lightbulb} className="img-fluid" />
	                    <h4>Meet with an <a href="/advisee/advisor-directory" >Advisor</a></h4>
	                    <p>Get free 1:1 career support from an Advisor. You can send {!!data?.adviseeData?.monthly_requests_remaining
	                            ? data?.adviseeData?.monthly_requests_remaining
	                            : '0'} more meeting requests this month.</p>
                    </div>
                    <div className="col-md-4 startbox">
                    	<img src={notebook} className="img-fluid" />
	                    <h4>Review <a href="https://docs.google.com/presentation/d/1arY_ImlYb1drykDoEU9SaZE8zPseSPSqAhtDF6FheN0/edit#slide=id.g221bdca9069_0_71" target="guidebook">Guidebook</a></h4>
	                    <p>View best practices and conversation-starters to make the most of your meetings.</p>
                    </div>
                    <div className="col-md-4 startbox">
                    	<img src={present} className="img-fluid img-small" />
  	                  <h4><a href="https://gpcyeic8882.typeform.com/to/Wwp3VifM" target="refer">Refer</a> a friend</h4>
  	                  <p>Know someone who would benefit from Candoor? Invite them to join via the link above!</p>
                    </div>
                   </div>
                </div>
              </div>

              <div className="myprofile-right homepage-meetings-card">
                <div className="homepage-meetings">
                  <h2>Meetings</h2>

                  <div className="table-d">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Meeting</th>
                            <th>Status</th>
                            <th>Date & Time</th>
                            {/* <!-- <th className="meetings-thlink"></th> --> */}
                          </tr>
                        </thead>
                        <tbody>
                          {
                            data.meetingData.length === 0 ?
                              (
                                <div className="homepage-card">
                                  <h3>No Meetings ...yet!</h3>
                                </div>
                              )
                              : (
                              
                              
                                data.meetingData.map((meetingdata) => (
                                  <>
	                                    <tr
	                                    className="meetingbutton"
	                                    role="button"
																			onClick={() => history.push(meetingdata?.clickable_link)}
	                                    >
                                      <td>

                                        <div className="td-advisorimg">
                                          <img
                                            style={{
                                              'objectFit': 'cover'
                                            }}
                                            src={
                                              !!meetingdata?.profile_goal
                                                ? process.env.REACT_APP_API_URL + `/${meetingdata?.profile_goal}`
                                                : myprofile
                                            }
                                            className="img-fluid"
                                            alt=""
                                          />
                                          <span>
                                            {meetingdata?.advisor_firstname}{' '}
                                            {meetingdata?.advisor_lastname}
                                          </span>
                                          <label>
                                            {
                                              meetingdata?.meetingtype
                                            }
                                          </label>
                                        </div>
                                      </td>

                                    <td className="tdmeeting-date">

                                    		<div className={meetingdata?.display_status_past}>{meetingdata?.display_status}</div>
                                        <div className="meeting-actionrequired">
                                          {meetingdata?.action_required}
                                        </div>
                                      </td>
                                    <td className="tdmeeting-date">
                                        <span className="tdmeeting-date-span">
                                          {meetingdata?.parsed_meeting_date}
                                        </span>
                                        <span className="tdmeeting-date-span">
                                          {`${meetingdata?.parsed_confirmed_meeting_starttime}-${meetingdata?.parsed_confirmed_meeting_endtime}`}
                                        </span>
                                        <span className="tdmeeting-date-span">
                                          {meetingdata?.confirmed_timezone}
                                        </span>
                                      </td>
                                    </tr>
                                  </>
                                ))
                              )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdvisorHomePage;