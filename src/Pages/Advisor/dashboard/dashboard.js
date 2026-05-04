// Third-party Imports👇
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Project Imports👇
import history from "../../../Utils/history";
import checklist1 from "../../../assets/images/AdviseeDashboard/checklist-1.png";
import checklist2 from "../../../assets/images/AdviseeDashboard/checklist-2.png";
import checklist3 from "../../../assets/images/AdviseeDashboard/checklist-3.png";
import checklist4 from "../../../assets/images/AdviseeDashboard/checklist-4.png";
import RArrow from "../../../assets/images/AdviseeDashboard/rightArrow.png";
import Pphoto1 from "../../../assets/images/AdviseeDashboard/profilephoto1.png";
import Pphoto2 from "../../../assets/images/AdviseeDashboard/profilephoto2.png";
import Pphoto3 from "../../../assets/images/AdviseeDashboard/profilephoto3.png";
import Pphoto4 from "../../../assets/images/AdviseeDashboard/profilephoto4.png";
import Pphoto5 from "../../../assets/images/AdviseeDashboard/profilephoto5.png";
import Pphoto6 from "../../../assets/images/AdviseeDashboard/profilephoto6.png";
import Pphoto7 from "../../../assets/images/AdviseeDashboard/profilephoto7.png";
import AdvisorHomePage from "../confirm-meeting/AdvisorHomePage";
import ApiRequest from "../../../Services/ApiRequest";
import Redirect from "../../../Utils/history";

// css
import "./dashboard.css";

// Custom hooks👇
import useFetchData from "../../../hooks/useFetchData";
import DataLoading from "../../../Utils/DataLoading/DataLoading";
import DataError from "../../../Utils/DataError";
import { addProfileImage, addUser } from "../../../app/Actions";
import { getSession } from "../../../Helpers/Functions";
import { useQueryClient } from "react-query";

const onboardingChecklist = [
  "complete_profile",
  "meeting_preference",
  "orientation_quiz",
  "community",
];

function Dashboard() {
  const queryClient = useQueryClient();
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useFetchData({
    queryKey: ["UserBasicInfo", "advisor"],
    url: "/api/advisor-basic-info",
  });
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useFetchData({
    queryKey: ["Dashboard", "advisor"],
    url: "/api/get-dashboard",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addProfileImage(profileData?.data?.profile));
    const userDetails = getSession();
    dispatch(addUser(userDetails.__userDetail));
    queryClient.invalidateQueries();
  }, [dispatch, profileData?.data?.profile, queryClient]);

  if (isProfileLoading || isDashboardLoading) {
    return (
      <>
        <DataLoading />
      </>
    );
  }

  if (isProfileError || isDashboardError) {
//I'm not sure this is a good idea? Shouldn't we bounce to an error page or a Toaster?  	
//    Redirect.push("/login");
  }

  const pathName = history.location.pathname;
  const advisorDataArr =
    dashboardData?.data?.Data && JSON.parse(dashboardData?.data?.Data);
  const data = dashboardData?.data;

  let advisorDataArrCheck = false;
  if (advisorDataArr !== null) {
    advisorDataArrCheck = onboardingChecklist.every((element) =>
      advisorDataArr.includes(element)
    );
  } else {
    advisorDataArrCheck = false;
  }

  var completedOnBoarding = onboardingChecklist.every((element) => {
    return advisorDataArr?.includes(element);
  });

  if (
    data?.advisorData.funnel_status !== "Onboarding" &&
    data?.advisorData.funnel_status !== "Activated"
  ) {
    console.log(data?.advisorData.funnel_status)
    switch (data?.advisorData.funnel_status) {
      case "Account Created":
        Redirect.push("/advisor/signupwizard/journey");
        break;
      case "Email Verified":
        Redirect.push("/advisor/signupwizard/journey");
        break;
      case "Journey Complete":
        Redirect.push("/advisor/signupwizard/background");
        break;
      case "Demographic Info Complete":
        Redirect.push("/advisor/signupwizard/profile");
        break;
      case "Onboarding":
        Redirect.push("/advisor/signupwizard/profile");
        break;
      case "Education Info Complete":
        Redirect.push("/advisor/signupwizard/journey");
        break;
      case "Career Info Complete":
        Redirect.push("/advisor/signupwizard/background");
        break;
      case "Motivations Complete":
        Redirect.push("/advisor/signupwizard/profile");
        break;
      case "Onboarding":
        Redirect.push("/advisor/signupwizard/profile");
        break;
      default:
        Redirect.push("/advisor/signupwizard/journey");
    }
  }

  if (completedOnBoarding && data?.advisorData.funnel_status == "Onboarding") {
    ApiRequest.postRequest("/api/update-funnel-status", {
      funnel_status: "Activated",
    });
  }


	let newmeetingdata = [];
	let i=0;
	var nowunix = Math.floor(new Date().getTime() / 1000)
	var endtimeunix = 0; var enddateonly = "";var endtimeonly = "";
	var launchdayunix = Math.floor(new Date('12/20/2023').getTime() / 1000)
	for(const meeting of data.meetingData) {
		if(meeting.endtime) {
			endtimeunix = Math.floor(new Date(meeting.endtime).getTime() / 1000)
		}
// meeting_status | display_status | action_required | clickable_link
			newmeetingdata[i] = meeting;
			newmeetingdata[i]['clickable_link'] = "/advisor/confirm-meeting/request-unconfirmed/"+meeting.MeetingId;
			newmeetingdata[i]['display_status_past'] = '';
			newmeetingdata[i]['enddateonly'] = meeting.parsed_confirmed_meeting_date;
			newmeetingdata[i]['endtimeonly'] = meeting.parsed_confirmed_meeting_endtime;
			
			if(meeting.meeting_status == "Request Opened") {
				newmeetingdata[i]['display_status'] = 'Scheduling';
				newmeetingdata[i]['action_required'] = '';
			} else if(meeting.meeting_status == "Request Sent"
				|| meeting.meeting_status == "Request Viewed"
				) {
				newmeetingdata[i]['display_status']= 'Scheduling';
        if(meeting.availability_last_provided_by == 'Advisor'){
					newmeetingdata[i]['action_required'] = 'Action Required (Confirm Time) >>';
        }else{
					newmeetingdata[i]['action_required'] = 'Waiting For Advisor Action';
        }
			} else if(meeting.meeting_status == "Alternate Times Proposed") {
				newmeetingdata[i]['display_status']= 'Alternate Times Proposed';
        if(meeting.availability_last_provided_by == 'Advisee'){
					newmeetingdata[i]['action_required'] = 'Confirm proposed times >>';
					newmeetingdata[i]['clickable_link'] = "/advisor/confirm-meeting/request-unconfirmed/"+meeting.MeetingId;
        }else{
					newmeetingdata[i]['display_status'] = 'Waiting For Advisee Action';
					newmeetingdata[i]['action_required'] = "";					
					newmeetingdata[i]['clickable_link'] = "";
    			newmeetingdata[i]['clickable_link'] = "/advisor/confirm-meeting/request-unconfirmed/"+meeting.MeetingId;
        }
  		} else if(meeting.meeting_status == "Confirmed") {
//// --->  			
				if(endtimeunix < nowunix) { // meeting is in the past
					if(endtimeunix > launchdayunix) { // meeting is after launch of postmeeting flow
						if(meeting.advisee_meetingfinalized  != 1 ) { // meeting has not been finalized by advisee
							newmeetingdata[i]['display_status'] = "Finalize and share feedback";
							newmeetingdata[i]['display_status_past'] = 'status-past';
							newmeetingdata[i]['action_required'] = 'Click here >>';
							newmeetingdata[i]['clickable_link'] = "/advisor/past-meeting/"+meeting.MeetingId;
						} else { // meeting has been finalized by advisee
							newmeetingdata[i]['display_status'] = 'Completed';
							newmeetingdata[i]['action_required'] = '';
							newmeetingdata[i]['clickable_link'] = "/advisor/finalize-meeting/"+meeting.MeetingId;
						}
					} else { // meeting is before launch of postmeeting flow
							newmeetingdata[i]['display_status'] = 'Completed';
							newmeetingdata[i]['action_required'] = '';
							newmeetingdata[i]['clickable_link'] = "";
					}
				} else { // meeting is in the future
					newmeetingdata[i]['display_status'] = 'Confirmed';
					newmeetingdata[i]['action_required'] = '';
					newmeetingdata[i]['clickable_link'] = "/advisor/confirm-meeting/request-confirmed/"+meeting.MeetingId;
				}
  		} else if(meeting.meeting_status == "Advisee Cancelled") {
				newmeetingdata[i]['display_status'] = 'Cancelled by Advisee';
				newmeetingdata[i]['action_required'] = '';
				newmeetingdata[i]['clickable_link'] = "";
  		} else if(meeting.meeting_status == "Advisor Cancelled") {
				newmeetingdata[i]['display_status']= 'Cancelled by Advisor';
				newmeetingdata[i]['action_required'] = '';
// TEMPORARY FOR TESTING				
				newmeetingdata[i]['clickable_link'] = "";
  		} else if(meeting.meeting_status == "Rescheduling") {
          if(meeting.availability_last_provided_by == 'Advisee') {
					newmeetingdata[i]['action_required'] = 'Confirm proposed times >>';
						newmeetingdata[i]['clickable_link'] = "/advisor/confirm-meeting/request-unconfirmed/"+meeting.MeetingId;
          }else{
						newmeetingdata[i]['action_required'] = 'Waiting For Advisee Action';
					}
					newmeetingdata[i]['display_status'] = 'Rescheduling';
  		} else if(meeting.meeting_status == "Completed") {
//// --->  			
				if(endtimeunix < nowunix) { // meeting is in the past
					if(endtimeunix > launchdayunix) { // meeting is after launch of postmeeting flow
						
						if(meeting.advisee_meetingfinalized  != 1 && meeting.advisor_meetingfinalized  != 1 ) { // meeting has not been finalized by anyone
							newmeetingdata[i]['display_status'] = 'Finalize and share feedback';
							newmeetingdata[i]['display_status_past'] = 'status-past';
							newmeetingdata[i]['action_required'] = 'Click here >>';
							if(meeting.meetingoutcome =="meetingoccurred") {
								newmeetingdata[i]['clickable_link'] = "/advisor/finalize-meeting/"+meeting.MeetingId;
							} else {
								newmeetingdata[i]['clickable_link'] = "/advisor/past-meeting/"+meeting.MeetingId;
							}
						} else if(meeting.advisor_meetingfinalized  != 1 &&meeting.advisee_meetingfinalized  == 1  ) { // meeting has not been finalized by advisor
							newmeetingdata[i]['clickable_link'] = "/advisor/finalize-meeting/"+meeting.MeetingId;
							newmeetingdata[i]['display_status'] = 'Share Feedback';
							newmeetingdata[i]['display_status_past'] = 'status-past';
							newmeetingdata[i]['action_required'] = 'Click here >>';
							
						} else if(meeting.advisor_meetingfinalized  == 1 &&meeting.advisee_meetingfinalized  == 1  ) { // meeting has been finalized by both
							newmeetingdata[i]['display_status'] = 'Completed';
							newmeetingdata[i]['action_required'] = "";
							newmeetingdata[i]['clickable_link'] = "/advisor/finalize-meeting/"+meeting.MeetingId;
						}
						if(meeting.meetingoutcome == "adviseenoshow") {
							newmeetingdata[i]['display_status'] = 'Advisee No-Show';
							newmeetingdata[i]['action_required'] = "";
							newmeetingdata[i]['clickable_link'] = "/advisor/finalize-meeting/"+meeting.MeetingId;
							newmeetingdata[i]['display_status_past'] = "";
						}
						if(meeting.meetingoutcome == "advisornoshow") {
							newmeetingdata[i]['display_status'] = 'Advisor No-Show';
							newmeetingdata[i]['action_required'] = "";
							newmeetingdata[i]['clickable_link'] = "/advisor/finalize-meeting/"+meeting.MeetingId;
							newmeetingdata[i]['display_status_past'] = "";
						}
					} else { // meeting took place before launch of postmeeting flow
						newmeetingdata[i]['display_status'] = 'Completed';
						newmeetingdata[i]['action_required'] = '';
							newmeetingdata[i]['clickable_link'] = "";
					}
				} else { // meeting is in the future (but why would it be completed?)
					newmeetingdata[i]['display_status'] = 'Completed';
					newmeetingdata[i]['action_required'] = '';
				}
  		} else if(meeting.meeting_status == "Advisor No-Show") {
					newmeetingdata[i]['display_status'] = 'Advisor No-Show';
					newmeetingdata[i]['action_required'] = '';
					newmeetingdata[i]['clickable_link'] = "/advisor/finalize-meeting/"+meeting.MeetingId;
  		} else if(meeting.meeting_status == "Advisee No-Show") {
					newmeetingdata[i]['display_status'] = 'Advisee No-Show';
					newmeetingdata[i]['action_required'] = '';
					newmeetingdata[i]['clickable_link'] = "/advisor/finalize-meeting/"+meeting.MeetingId;
  		} else if(meeting.meeting_status == "Expired") {
				newmeetingdata[i]['display_status']= 'Expired';
				newmeetingdata[i]['action_required'] = 'No Action Required';
			}
			i++;
  }
  data.meetingData = newmeetingdata;


  return (
    <>
      <AdvisorHomePage
        data={data}
        isDashboardLoading={isDashboardLoading}
        isDashboardError={isDashboardError}
      />
    </>
  )

  // return (
  //   <>
  //     {onboardingChecklist.every((element) => {
  //       return advisorDataArr?.includes(element);
  //     }) ? (
  //       <AdvisorHomePage
  //         data={data}
  //         isDashboardLoading={isDashboardLoading}
  //         isDashboardError={isDashboardError}
  //       />
  //     ) : (
  //       <div className="dashoboardAdviseeWrapper">
  //         <div className="container-fluid welcomeWrap">
  //           <div className="container welcomeWrapInner">
  //             <div className="row mar-width-0">
  //               <div className="col-md-12 align-self-center welcomeWrapInnerLeft">
  //                 <div className="topbg-left">
  //                   <h5>
  //                     Welcome, {profileData?.data?.basicInfo?.firstname}! 👋
  //                   </h5>
  //                   <p>You’re almost ready to meet with Advisees.</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="container-fluid p-0">
  //           <div className=" Dashboard-sections">
  //             <div className="row mar-width-0 Dashboard-sections-main">
  //               <div className="col-md-6 Dashboard-section-left pr-5 pl-0">
  //                 <div className="row mar-width-0 Dashboard-section-left-inner-1">
  //                   <div className="col-md-12 p-0">
  //                     <h5>Onboarding Checklist</h5>
  //                     <p>
  //                       Complete the tasks below to start receiving meeting
  //                       requests from Advisees.
  //                     </p>
  //                   </div>
  //                 </div>

  //                 <div
  //                   className={`row mar-width-0 checklistWrapper ${dashboardData?.data?.Data?.includes("complete_profile") &&
  //                     "active"
  //                     }`}
  //                 >
  //                   <div className="col-1 align-self-center text-center">
  //                     <div className="form-check">
  //                       <input
  //                         className="form-check-input"
  //                         type="checkbox"
  //                         value="complete_profile"
  //                         readOnly
  //                         checked={
  //                           dashboardData?.data?.Data?.includes(
  //                             "complete_profile"
  //                           )
  //                             ? true
  //                             : false
  //                         }
  //                         id="flexCheckDefault"
  //                       />
  //                       <label
  //                         className="form-check-label"
  //                         htmlFor="flexCheckDefault"
  //                       ></label>
  //                     </div>
  //                   </div>
  //                   <div className="col-2 align-self-center">
  //                     <img className="checklist1" src={checklist1} alt="" />
  //                   </div>
  //                   <div className="col-9 align-self-center">
  //                     <h6>
  //                       Complete Your Profile <span>(4 min)</span>
  //                     </h6>

  //                     <p>
  //                       Tell us about yourself! The more information you
  //                       provide, the more relevant your Advisees will be.
  //                     </p>
  //                     <Link
  //                       to="/advisor/complete-profile"
  //                       className="btn btn-primary"
  //                     >
  //                       Complete Profile <img src={RArrow} alt="" />
  //                     </Link>
  //                   </div>
  //                 </div>
  //                 <div
  //                   className={`row mar-width-0 checklistWrapper ${dashboardData?.data?.Data?.includes("orientation_quiz") &&
  //                     "active"
  //                     }`}
  //                 >
  //                   <div className="col-1 align-self-center text-center">
  //                     <div className="form-check">
  //                       <input
  //                         className="form-check-input"
  //                         type="checkbox"
  //                         value="orientation_quiz"
  //                         readOnly
  //                         checked={
  //                           dashboardData?.data?.Data?.includes(
  //                             "orientation_quiz"
  //                           )
  //                             ? true
  //                             : false
  //                         }
  //                         id="flexCheckDefault"
  //                       />
  //                       <label
  //                         className="form-check-label"
  //                         htmlFor="flexCheckDefault"
  //                       ></label>
  //                     </div>
  //                   </div>
  //                   <div className="col-2 align-self-center">
  //                     <img className="checklist1" src={checklist2} alt="" />
  //                   </div>
  //                   <div className="col-9 align-self-center">
  //                     <h6>
  //                       Take our Orientation Quiz <span>(8 min)</span>
  //                     </h6>

  //                     <p>
  //                       Learn best practices for supporting Advisees and making
  //                       the most out of Candoor.
  //                     </p>
  //                     <Link
  //                       to="/advisor/orientation-flow-step"
  //                       className="btn btn-primary"
  //                     >
  //                       Take Orientation Quiz <img src={RArrow} alt="" />
  //                     </Link>
  //                   </div>
  //                 </div>
  //                 <div
  //                   className={`row mar-width-0 checklistWrapper ${dashboardData?.data?.Data?.includes(
  //                     "meeting_preference"
  //                   ) && "active"
  //                     }`}
  //                 >
  //                   <div className="col-1 align-self-center text-center">
  //                     <div className="form-check">
  //                       <input
  //                         className="form-check-input"
  //                         type="checkbox"
  //                         value="meeting_preference"
  //                         readOnly
  //                         checked={
  //                           dashboardData?.data?.Data?.includes(
  //                             "meeting_preference"
  //                           )
  //                             ? true
  //                             : false
  //                         }
  //                         id="flexCheckDefault"
  //                       />
  //                       <label
  //                         className="form-check-label"
  //                         htmlFor="flexCheckDefault"
  //                       ></label>
  //                     </div>
  //                   </div>
  //                   <div className="col-2 align-self-center">
  //                     <img className="checklist1" src={checklist4} alt="" />
  //                   </div>
  //                   <div className="col-9 align-self-center">
  //                     <h6>
  //                       Set Your Meeting Preferences <span>(2 min.)</span>
  //                     </h6>

  //                     <p>
  //                       Candoor lets you pay it forward on your own time and
  //                       terms. Set your capacity and tell Advisees how (and
  //                       when) you can help!
  //                     </p>
  //                     <Link
  //                       to="/advisor/meeting-preference"
  //                       className="btn btn-primary"
  //                     >
  //                       Set Meeting Preferences <img src={RArrow} alt="" />
  //                     </Link>
  //                   </div>
  //                 </div>
  //                 <div
  //                   className={`row mar-width-0 checklistWrapper ${dashboardData?.data?.Data?.includes("community") &&
  //                     "active"
  //                     }`}
  //                 >
  //                   <div className="col-1 align-self-center text-center">
  //                     <div className="form-check">
  //                       <input
  //                         className="form-check-input"
  //                         type="checkbox"
  //                         value="community"
  //                         checked={
  //                           dashboardData?.data?.Data?.includes("community")
  //                             ? true
  //                             : false
  //                         }
  //                         readOnly
  //                         id="flexCheckDefault"
  //                       />
  //                       <label
  //                         className="form-check-label"
  //                         htmlFor="flexCheckDefault"
  //                       ></label>
  //                     </div>
  //                   </div>
  //                   <div className="col-2 align-self-center">
  //                     <img className="checklist1" src={checklist3} alt="" />
  //                   </div>
  //                   <div className="col-9 align-self-center">
  //                     <h6>
  //                       Join the Community <span>(1 min.)</span>
  //                     </h6>

  //                     <p>
  //                       Join our Slack workspace to meet other Advisors and be
  //                       the first to hear about new resources and opportunities
  //                       to level up your impact.
  //                     </p>
  //                     <a
  //                       href="https://join.slack.com/t/candooradvisors/shared_invite/zt-1rn53zfgj-qTdIHFAF0f788aXTAc0sHA"
  //                       target="_blank"
  //                     >
  //                       <button
  //                         className="btn btn-primary"
  //                         onClick={join_community_clicked}
  //                       >
  //                         Join the Community <img src={RArrow} alt="" />
  //                       </button>
  //                     </a>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="col-md-6 Dashboard-section-right">
  //                 <div className="col-md-12 Dashboard-section-right-inner-1">
  //                   <h6>Join 50+ Advisors making an impact...</h6>
  //                 </div>
  //                 <div className="content">
  //                   <div className="flexbox">
  //                     <div className="item">
  //                       <img src={Pphoto1} alt="" />
  //                       <h6 className="title">Wadood</h6>
  //                       <p>
  //                         Program Management <br />
  //                         <span>Microsoft</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto3} alt="" />
  //                       <h6 className="title">Shelby</h6>
  //                       <p>
  //                         Management Consulting
  //                         <br />
  //                         <span>L.E.K. Consulting</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto4} alt="" />
  //                       <h6 className="title">Isa</h6>
  //                       <p>
  //                         Program Management
  //                         <br />
  //                         <span>Dropbox</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto2} alt="" />
  //                       <h6 className="title">Uma</h6>
  //                       <p>
  //                         Software Engineering
  //                         <br />
  //                         <span>Microsoft</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto5} alt="" />
  //                       <h6 className="title">Kristina</h6>
  //                       <p>
  //                         Investment Banking
  //                         <br />
  //                         <span>Morgan Stanley</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto6} alt="" />
  //                       <h6 className="title">Angel</h6>
  //                       <p>
  //                         Operations Management
  //                         <br />
  //                         <span>Meta</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto7} alt="" />
  //                       <h6 className="title">Nashae</h6>
  //                       <p>
  //                         Senior Analyst
  //                         <br />
  //                         <span>Goldman Sachs</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto1} alt="" />
  //                       <h6 className="title">Wadood</h6>
  //                       <p>
  //                         Program Management <br />
  //                         <span>Microsoft</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto3} alt="" />
  //                       <h6 className="title">Shelby</h6>
  //                       <p>
  //                         Management Consulting
  //                         <br />
  //                         <span>L.E.K. Consulting</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto4} alt="" />
  //                       <h6 className="title">Isa</h6>
  //                       <p>
  //                         Program Management
  //                         <br />
  //                         <span>Dropbox</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto2} alt="" />
  //                       <h6 className="title">Uma</h6>
  //                       <p>
  //                         Software Engineering
  //                         <br />
  //                         <span>Microsoft</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto5} alt="" />
  //                       <h6 className="title">Kristina</h6>
  //                       <p>
  //                         Investment Banking
  //                         <br />
  //                         <span>Morgan Stanley</span>
  //                       </p>
  //                     </div>
  //                     <div className="item">
  //                       <img src={Pphoto6} alt="" />
  //                       <h6 className="title">Angel</h6>
  //                       <p>
  //                         Operations Management
  //                         <br />
  //                         <span>Meta</span>
  //                       </p>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );
}

export default Dashboard;