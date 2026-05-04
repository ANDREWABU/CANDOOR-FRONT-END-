// Third-party Imports 👇
import { Link } from "react-router-dom";

// Project Imports 👇
import DataLoading from "../../../Utils/DataLoading/DataLoading";
import axios from '../../../Config/Axios';
import AdviseHomePage from "../confirm-meeting/AdviseHomePage";
import PendingApplicationApproval from "../signupwizard/PendingApplicationApproval";
import Deactivated from "../signupwizard/Deactivated";
import Redirect from "../../../Utils/history";

// css
import "./dashboard.css";

// Custom Hook 👇
import useFetchData from "../../../hooks/useFetchData";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addProfileImage, addUser } from "../../../app/Actions";
import { getSession } from "../../../Helpers/Functions";
import { useQueryClient } from "react-query";

const onboardingChecklist = [
  "complete_profile",
  "orientation_quiz",
  "community",
];




function Dashboard() {
  const queryClient = useQueryClient();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    isStale: isProfileStale,
    isPreviousData: isProfilePreviousData,
  } = useFetchData({
    queryKey: ["UserBasicInfo", "advisee"],
    url: "/api/user-basic-info",
  });






  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useFetchData({
    queryKey: ["Dashboard", "advisee"],
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
    Redirect.push("/login");
  }

  const response = axios.get('/api/user-basic-info');

  response.then((res) => {
    var funnel_status = res.data.basicInfo.funnel_status;

    if (funnel_status !== "Activated") {
      switch (funnel_status) {
        case "Education Info Complete":
          Redirect.push("/advisee/signupwizard/yourBackground");
          break;
        case "Career Info Complete":
          Redirect.push("/advisee/signupwizard/yourBackground");
          break;
        case "Demographic Info Complete":
          Redirect.push("/advisee/signupwizard/yourJourney");
          break;
        case "Career Goals Complete":
          Redirect.push("/advisee/signupwizard/yourBackground");
          break;
        case "Pending Application Review":
          Redirect.push("/advisee/signupwizard/yourProfile");
          break;
        case "Accepted":
          Redirect.push("/advisee/signupwizard/yourProfile");
          break;
        case "Onboarding":
          Redirect.push("/advisee/signupwizard/yourProfile");
          break;
        case "Journey Complete":
          Redirect.push("/advisee/signupwizard/yourProfile");
          break;
        case "Deactivated":
          Redirect.push("/deactivated");
          break;
        default:
          Redirect.push("/advisee/signupwizard/yourBackground");
      }
    }
  })

  // var funnel_status = dashboardData?.data?.adviseeData?.funnel_status;
  // const adviseeDataArr = dashboardData?.data?.Data && JSON.parse(dashboardData?.data?.Data);

  const data = dashboardData?.data;

/// sort out meeting stuff here

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
			newmeetingdata[i]['clickable_link'] = "/advisee/confirm-meeting/request-unconfirmed/"+meeting.MeetingId;
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
					newmeetingdata[i]['action_required'] = 'Confirm proposed times >>';
        }else{
					newmeetingdata[i]['action_required'] = 'Waiting For Advisor Action';
        }
			} else if(meeting.meeting_status == "Alternate Times Proposed") {
				newmeetingdata[i]['display_status']= 'Alternate Times Proposed';
        if(meeting.availability_last_provided_by == 'Advisor'){
					newmeetingdata[i]['action_required'] = 'Confirm proposed times >>';
					newmeetingdata[i]['clickable_link'] = "/advisee/confirm-meeting/request-unconfirmed/"+meeting.MeetingId;
        }else{
					newmeetingdata[i]['action_required'] = 'Waiting For Advisor Action';					
					newmeetingdata[i]['clickable_link'] = "/advisee/confirm-meeting/request-unconfirmed/"+meeting.MeetingId;
        }
  		} else if(meeting.meeting_status == "Confirmed") {
//// --->  			
				if(endtimeunix < nowunix) { // meeting is in the past
					if(endtimeunix > launchdayunix) { // meeting is after launch of postmeeting flow
						if(meeting.advisee_meetingfinalized  != 1 ) { // meeting has not been finalized by advisee
							newmeetingdata[i]['display_status'] = "Send Thank You and Share Feedback";
							newmeetingdata[i]['display_status_past'] = 'status-past';
							newmeetingdata[i]['action_required'] = 'Click here >>';
							newmeetingdata[i]['clickable_link'] = "/advisee/past-meeting/"+meeting.MeetingId;
						} else { // meeting has been finalized by advisee
							newmeetingdata[i]['display_status'] = 'Completed';
							newmeetingdata[i]['action_required'] = '';
							newmeetingdata[i]['clickable_link'] = "/advisee/finalize-meeting/"+meeting.MeetingId;
						}
					} else { // meeting is before launch of postmeeting flow
							newmeetingdata[i]['display_status'] = 'Completed';
							newmeetingdata[i]['action_required'] = '';
							newmeetingdata[i]['clickable_link'] = "";
					}
				} else { // meeting is in the future
					newmeetingdata[i]['display_status'] = 'Confirmed';
					newmeetingdata[i]['action_required'] = '';
					newmeetingdata[i]['clickable_link'] = "/advisee/confirm-meeting/request-confirmed/"+meeting.MeetingId;
				}
  		} else if(meeting.meeting_status == "Advisee Cancelled") {
				newmeetingdata[i]['display_status'] = 'Cancelled by Advisee';
				newmeetingdata[i]['action_required'] = '';
				newmeetingdata[i]['clickable_link'] = "";
  		} else if(meeting.meeting_status == "Advisor Cancelled") {
				newmeetingdata[i]['display_status']= 'Cancelled by Advisor';
				newmeetingdata[i]['action_required'] = '';
				newmeetingdata[i]['clickable_link'] = "";
  		} else if(meeting.meeting_status == "Rescheduling") {
          if(meeting.availability_last_provided_by == 'Advisor') {
					newmeetingdata[i]['action_required'] = 'Confirm proposed times >>';
						newmeetingdata[i]['clickable_link'] = "/advisee/confirm-meeting/request-unconfirmed/"+meeting.MeetingId;
          }else{
						newmeetingdata[i]['action_required'] = 'Waiting For Advisor Action';
						newmeetingdata[i]['clickable_link'] = "/advisee/confirm-meeting/request-unconfirmed/"+meeting.MeetingId;
					}
					newmeetingdata[i]['display_status'] = 'Rescheduling';
  		} else if(meeting.meeting_status == "Completed") {
//// --->  			
				if(endtimeunix < nowunix) { // meeting is in the past
					if(endtimeunix > launchdayunix) { // meeting is after launch of postmeeting flow
						
						if(meeting.advisee_meetingfinalized  != 1 && meeting.advisor_meetingfinalized  != 1 ) { // meeting has not been finalized by anyone
							if(meeting.meetingoutcome =="meetingoccurred") {
								newmeetingdata[i]['clickable_link'] = "/advisee/finalize-meeting/"+meeting.MeetingId;
							} else {
								newmeetingdata[i]['clickable_link'] = "/advisee/past-meeting/"+meeting.MeetingId;
							}

							newmeetingdata[i]['display_status'] = 'Send Thank You and Share Feedback';
							newmeetingdata[i]['display_status_past'] = 'status-past';
							newmeetingdata[i]['action_required'] = 'Click here >>';
						} else if(meeting.advisor_meetingfinalized  == 1 && meeting.advisee_meetingfinalized  != 1  ) { // meeting has not been finalized by advisee
							newmeetingdata[i]['display_status'] = 'Send Thank You and Share Feedback';
							newmeetingdata[i]['display_status_past'] = 'status-past';
							newmeetingdata[i]['action_required'] = 'Click here >>';
							newmeetingdata[i]['clickable_link'] = "/advisee/finalize-meeting/"+meeting.MeetingId;
							
						} else if(meeting.advisor_meetingfinalized  != 1 && meeting.advisee_meetingfinalized  == 1  ) { // meeting has been finalized by advisee
							newmeetingdata[i]['display_status'] = 'Completed';
							newmeetingdata[i]['action_required'] = "";
							newmeetingdata[i]['clickable_link'] = "";
						} else if(meeting.advisor_meetingfinalized  == 1 && meeting.advisee_meetingfinalized  == 1  ) { // meeting has been finalized by both
							newmeetingdata[i]['display_status'] = 'Completed';
							newmeetingdata[i]['action_required'] = "";
							newmeetingdata[i]['clickable_link'] = "/advisor/finalize-meeting/"+meeting.MeetingId;
						}
						if(meeting.meetingoutcome == "adviseenoshow") {
							newmeetingdata[i]['display_status'] = 'Advisee No-Show';
							newmeetingdata[i]['action_required'] = "";
							newmeetingdata[i]['clickable_link'] = "/advisee/finalize-meeting/"+meeting.MeetingId;
							newmeetingdata[i]['display_status_past'] = "";
						}
						if(meeting.meetingoutcome == "advisornoshow") {
							newmeetingdata[i]['display_status'] = 'Advisor No-Show';
							newmeetingdata[i]['action_required'] = "";
							newmeetingdata[i]['clickable_link'] = "/advisee/finalize-meeting/"+meeting.MeetingId;
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
					newmeetingdata[i]['clickable_link'] = "/advisee/finalize-meeting/"+meeting.MeetingId;
  		} else if(meeting.meeting_status == "Advisee No-Show") {
					newmeetingdata[i]['display_status'] = 'Advisee No-Show';
					newmeetingdata[i]['action_required'] = '';
					newmeetingdata[i]['clickable_link'] = "/advisee/finalize-meeting/"+meeting.MeetingId;
  		} else if(meeting.meeting_status == "Expired") {
				newmeetingdata[i]['display_status']= 'Expired';
				newmeetingdata[i]['action_required'] = 'No Action Required';
			}
//				newmeetingdata[i]['meeting_status'] = "biteme";
//				newmeetingdata[i]['display_status'] = "biteme";
//			newmeetingdata[i]['action_required'] = "biteme";

			i++;
  }
  data.meetingData = newmeetingdata;


  // if (adviseeDataArr !== null) {
  //   adviseeDataArrCheck = onboardingChecklist.every((element) =>
  //     adviseeDataArr.includes(element)
  //   );
  // } else {
  //   adviseeDataArrCheck = false;
  // }

  return (
    <>
      <AdviseHomePage
        data={data}
        isDashboardLoading={isDashboardLoading}
        isDashboardError={isDashboardError}
      />
    </>
  );
}

export default Dashboard;
