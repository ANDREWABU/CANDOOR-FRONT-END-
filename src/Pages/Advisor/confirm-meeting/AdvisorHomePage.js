import myprofile from "../../../assets/images/myprofile.png";
import profilebg from "../../../assets/images/profilebg.png";
import map from "../../../assets/images/map.png";
import editicon from "../../../assets/images/editicon.png";
import hand from "../../../assets/images/hand.png";
import clock from "../../../assets/images/clock.png";
import checkiconhome from "../../../assets/images/checkiconhome.png";
import Moment from "react-moment";
import { Link, useHistory } from "react-router-dom";
import DataLoading from "../../../Utils/DataLoading/DataLoading";
import DataError from "../../../Utils/DataError";
import MainFooter from "../../../Components/Layouts/MainFooter";

const AdvisorHomePage = ({ data, isDashboardLoading, isDashboardError }) => {
  const history = useHistory();

  isDashboardLoading && <DataLoading />;
  isDashboardError && <DataError />;

  const progress = data?.progress && JSON.parse(data?.progress);

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
                      !!data?.advisorData?.cover_profile
                        ? process.env.REACT_APP_API_URL + `/${data?.advisorData?.cover_profile}`
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
                        !!data?.advisorData?.profile_goal
                          ? process.env.REACT_APP_API_URL + `/${data?.advisorData?.profile_goal}`
                          : myprofile
                      }
                      className="img-fluid myprofileimg"
                      alt="advisorImg"
                    />
                  </div>
                  <h3>
                    {data?.userData?.firstname} {data?.userData?.lastname}
                    <span>{data?.userData?.pronouns}</span>
                  </h3>
                  <h6>{data?.advisorData?.headline}</h6>
                  <ul className="profileadd">
                    <li>
                      <span>
                        <img src={map} className="img-fluid" alt="" />
                      </span>
                      {data?.backgroundData?.city} (
                      {data?.backgroundData?.state}){" "}
                      {data?.backgroundData?.country}
                    </li>
                    <li>
                      <span>
                        <img src={clock} className="img-fluid" alt="" />
                      </span>
                      {data?.backgroundData?.time_zone}
                    </li>
                  </ul>
                  <div className="myprofile-left-btn homepage-left">
                    <Link to="/advisor/advisorProfileedit" className="btn btn-info">
                      <img
                        src={editicon}
                        className="img-fluid headingicon"
                        alt=""
                      />
                      View or Edit Profile
                    </Link>
                  </div>
                  {/* {progress?.progress_percent >= 100 ?

                    <></> :
                    <>
                      {(!progress?.my_journey ||
                        !progress?.complete_profile ||
                        !progress?.seven_step ||
                        !progress?.just_for_fun ||
                        !progress?.about_me ||
                        !progress?.help) && (
                          <div className="payments-chartsec">
                            <h3>Your profile is incomplete:</h3>
                            <ul>
                              <li>
                                {!progress?.my_journey && (
                                  <>
                                    <img
                                      src={checkiconhome}
                                      className="img-fluid"
                                      alt=""
                                    />
                                    Complete
                                    <strong> My Journey</strong>
                                  </>
                                )}
                              </li>

                              <li>
                                {!progress?.help && (
                                  <>
                                    <img
                                      src={checkiconhome}
                                      className="img-fluid"
                                      alt=""
                                    />
                                    Complete
                                    <strong> How I Can Help Section</strong>
                                  </>
                                )}
                              </li>

                              <li>
                                {!progress?.just_for_fun && (
                                  <>
                                    <img
                                      src={checkiconhome}
                                      className="img-fluid"
                                      alt=""
                                    />
                                    Complete
                                    <strong> Just For Fun Section</strong>
                                  </>
                                )}
                              </li>

                              <li>
                                {!progress?.about_me && (
                                  <>
                                    <img
                                      src={checkiconhome}
                                      className="img-fluid"
                                      alt=""
                                    />
                                    Complete
                                    <strong> About Me Section</strong>
                                  </>
                                )}
                              </li>

                              <li>
                                {!progress?.seven_step && (
                                  <>
                                    <img
                                      src={checkiconhome}
                                      className="img-fluid"
                                      alt=""
                                    />
                                    Complete
                                    <strong> SevenStep</strong>
                                  </>
                                )}
                              </li>
                            </ul>
                          </div>
                        )

                      }</>} */}
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12">
              <div className="myprofile-right">
                <div className="homepage-sec">
                  <h2>
                    Welcome, {data?.userData?.firstname}!{" "}
                    <img src={hand} className="img-fluid" alt="" />
                  </h2>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="homepage-card">
                        {/* {
                          data?.Completed_meeting > 0 ?
                            <>
                              <span>{data?.Completed_meeting}</span>
                              <h3>Completed Meeting(s)</h3>
                            </>
                            :
                            <>
                              <span>{data?.Completed_meeting}</span>
                              <h3>No completed meetings ...yet!</h3>
                            </>
                        } */}
                         <h3>Advisor Guide Book</h3>
                        <p>
                          View advising best practices 
                          {' '}<a target="_blank"
                            href="https://docsend.com/view/qns8ezd9yt35ekpb"> here </a>
                          and join our
                          {' '}<a target="_blank"
                            href="https://join.slack.com/t/candooradvisors/shared_invite/zt-1rn53zfgj-qTdIHFAF0f788aXTAc0sHA"> community </a>
                        </p>

                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="homepage-card">
                        <h3>
                          Capacity Remaining: {!!data?.advisorData?.monthly_capacity_remaining
                            ? data?.advisorData?.monthly_capacity_remaining
                            : "0"}
                        </h3>
                        {/* <h3>Capacity Remaining</h3> */}
                        <p>
                          You can receive{" "}
                          {!!data?.advisorData?.monthly_capacity_remaining
                            ? data?.advisorData?.monthly_capacity_remaining
                            : "0"}{" "}
                          more meeting request(s) this month. Update your capacity{" "}
                          <a href="/advisor/setting">here in the meeting preferences tab. </a><i>Note: capacity is based on month the request is sent.</i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="myprofile-right homepage-meetings-card">
                <div className="homepage-meetings homepage-upcoming">
                  <h2>Meetings {" "} {data?.Completed_meeting > 0 ? "(" + data?.Completed_meeting + " Completed)" : ""}</h2>
                  <div className="table-d">
                    <div className="table-responsive">
                      <table className="table homepage-meetings">
                        <thead>
                          <tr>
                            <th>Meeting</th>
                            <th>Status</th>
                            <th>Date & Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            data.meetingData.length === 0 ?
                              (
                                <div className="homepage-card">
                                  <h3>No meetings ...yet!</h3>
                                </div>
                              )
                              :
                              (
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
                                            {meetingdata?.advisee_firstname}{" "}
                                            {meetingdata?.advisee_lastname}
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

                                        <FormatTime
                                          date={meetingdata?.confirm_time}
                                        />

                                        <span className="tdmeeting-date-span">
                                          {meetingdata?.parsed_meeting_date}
                                        </span>
                                        <span className="tdmeeting-date-span">
                                          {`${meetingdata?.parsed_confirmed_meeting_starttime} - ${meetingdata?.parsed_confirmed_meeting_endtime}`}
                                        </span>
                                        {/* <span className="tdmeeting-date-span">
                                          {meetingdata?.confirmed_timezone.split(' ')[meetingdata?.confirmed_timezone.split(' ').length - 2]}
                                        </span> */}
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

function FormatTime({ date, time, date1, time1 }) {
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
          <Moment format="ddd, MMM YY" parse="YYYY-MM-DD">
            {date && parsedDate.date}
          </Moment>
        </span>
      )}
    </>
  );
}
export { FormatTime };

export default AdvisorHomePage;