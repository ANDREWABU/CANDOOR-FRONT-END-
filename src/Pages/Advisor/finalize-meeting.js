
import React from 'react';
import requestview from '../../assets/images/requestview.png';
import myprofile2 from '../../assets/images/myprofile2.png';
import warning from '../../assets/images/warning.png';
import plus from '../../assets/images/plus.png';
import { Link, useParams } from 'react-router-dom';
import ApiRequest from "../../Services/ApiRequest";
import useFetchData from '../../hooks/useFetchData';
import DataLoading from '../../Utils/DataLoading/DataLoading';
import DataError from '../../Utils/DataError';
import { toasterAlert } from "../../Helpers/Functions";

import myprofile from '../../assets/images/myprofile.png';
import Header from '../../Components/Layouts/AdvisorLayout/Header';
import MainFooter from '../../Components/Layouts/MainFooter';

const adviseeFirstname = "";
const adviseeLastname = "";
const advisorFirstname = "";
class FinalizeMeetingAdvisor extends React.Component {

    state = {
        meetingid: "",
        meeting_data: "",
        meetingoutcome: "",
        advisee_continue: "",
        
        data: {
            userData: []
        },
    }
    componentDidMount() {
        this.getMeetingData();
//       document.getElementById("submitme").disabled = true;
     }


    getMeetingData = async () => {
    	<DataLoading />
//      	console.log('getting data... /api/view-completed-meeting-data?meeting_id=' + this.props.match.params.meetingId);
        this.setState({ meetingid: this.props.match.params.meetingId })
        document.getElementById("submitonly").disabled = true;

        let response = await ApiRequest.getRequest('/api/view-completed-meeting-data?meeting_id=' + this.props.match.params.meetingId);//${meetingId}');
							document.getElementById("meetingfinalized").className = 'hide';
							document.getElementById("meetingoccurred").className = 'hide';
							document.getElementById("adviseenoshow").className = 'hide';
							document.getElementById("advisornoshow").className = 'hide';
/*
							document.getElementById("thankyou").className = 'hide';
							document.getElementById("finalize").className = 'hide';
*/
							

        if (response.data) {
            this.setState({ meeting_data: response.data })
            this.setState({ meetingoutcome: response.data.meeting_data.meetingoutcome })
/*
	        	console.log('response:');
	        	console.log(response.data);
	        	console.log('state:');
	        	console.log(this.state);
*/
            if(!response.data.meeting_data?.meetingoutcome){
							window.location.href = '/advisor/past-meeting/'+this.props.match.params.meetingId;
            } else if(response.data.meeting_data?.advisor_meetingfinalized ===1 && response.data.meeting_data?.meetingoutcome === "meetingoccurred"){
							document.getElementById("meetingfinalized").className = 'show';
            } else if(response.data.meeting_data?.meetingoutcome === "meetingoccurred"){
							document.getElementById("meetingoccurred").className = 'show';
            } else if(response.data.meeting_data?.meetingoutcome === "advisornoshow"){
							document.getElementById("advisornoshow").className = 'show';
            } else if(response.data.meeting_data?.meetingoutcome === "adviseenoshow"){
							document.getElementById("adviseenoshow").className = 'show';
            }
			       const adviseeFirstname = this.state.meeting_data?.adviseeData?.firstname;
			       const adviseeLastname = this.state.meeting_data?.adviseeData?.lastname;
			       const advisorFirstname = this.state.meeting_data?.advisorData?.firstname;
//			       console.log(this.state);
        } else {
        	console.log('no response from API');
        }
    }

    handleAdvisorContinue = (event) => {
        let value = event.target.value;
        let checkedid = event.target.id;
        let buttons = document.getElementsByName("continueoption");
				for(const val of buttons) {
				    val.className = 'btn btn-outline-info btn-block'
			  }
         event.target.className = "btn btn-block-selected";

        this.setState({
            advisor_continue: event.target.value,
        });
        
    }
    handleSubmit = async () => {
				let latestmsg = document.getElementById("feedbackmessage").value;
        this.setState({
            advisor_meetingfinalized: 1,
            feedbackmessage: latestmsg
        });    	
    	<DataLoading />
//        console.log('submit');
//        console.log(this.state);
          toasterAlert("success", "Saving...");
					this.submitstring = '/api/advisor-meeting-outcome?meetingId=' + this.state.meetingid;
					this.state.feedbackmessage = latestmsg;
					this.state.advisor_meetingfinalized = 1;
	        let response = await ApiRequest.postRequest(this.submitstring,this.state);
	        if (response) {
	  //        console.log('response submitandsend');
		        if (response.status == 200) {
		        	this.getMeetingData();
		          toasterAlert("success", "Meeting finalized. Thank you!");
		        	this.render();
							document.getElementById("meetingfinalized").className = 'hide';
							document.getElementById("meetingoccurred").className = 'show';
	          }
	        }
    }

/* USEFUL FUNCTIONS FOR LATER
    onChangeState = (event) => {
        // maybe don't do anything except change the class of the submit button
    }
    setInputFieldStates(item = '') {
        this.setState({
        })

    }
*/
    render() {
	    return (
        <div>
	    
					<Header />
					<section className="request-viewed">
               <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="request-viewed-card">
                                <h3>
                                    {' '}
                                    {this.state.meeting_data?.advisorData?.firstname}{' '}
                                    {this.state.meeting_data?.advisorData?.lastname} & {' '}
                                    {this.state.meeting_data?.adviseeData?.firstname}{' '}
                                    {this.state.meeting_data?.adviseeData?.lastname}
                                </h3>
                                <h6>{`${this.state.meeting_data?.meeting_data?.meetingtype} - ${this.state.meeting_data?.meeting_data?.meeting_length_minutes} min`}</h6>
                                <div className="request-group">
                                        <div className="request-img">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Link to={`/advisor/${this.state.meeting_data?.advisorData?.AdvisorID}`}>
                                                        <img
                                                            style={{
                                                                'objectFit': 'cover'
                                                            }}
                                                            src={
                                                                this.state.meeting_data?.advisorData?.profile_goal
                                                                    ? process.env.REACT_APP_API_URL + `/${this.state.meeting_data?.advisorData?.profile_goal}`
                                                                    : myprofile
                                                            }
                                                            className="img-fluid"
                                                            alt=""
                                                        />
                                                        <h5>
                                                            {' '}
                                                            {this.state.meeting_data?.advisorData?.firstname}{' '}
                                                            {this.state.meeting_data?.advisorData?.lastname}
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
                                                                this.state.meeting_data?.adviseeData?.profile_goal
                                                                    ? process.env.REACT_APP_API_URL + `/${this.state.meeting_data?.adviseeData?.profile_goal}`
                                                                    : myprofile
                                                            }
                                                            className="img-fluid"
                                                            alt=""
                                                        />
                                                        <h5>
                                                            {this.state.meeting_data?.adviseeData?.firstname}{' '}
                                                            {this.state.meeting_data?.adviseeData?.lastname}
                                                        </h5>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                </div>

                                <div className="request-group ">
                                    <label className="confirmed">
                                        <strong>Meeting Date and Time</strong>
                                        <div>
                                            {' '}
                                            {`${this.state.meeting_data?.meeting_data?.formated_date}, ${this.state.meeting_data?.meeting_data?.formated_start} - ${this.state.meeting_data?.meeting_data?.formated_end} ${this.state.meeting_data?.meeting_data?.confirmed_timezone}`}
                                        </div>
                                    </label>
                                </div>
                                <div className="request-group " id="meetingfinalized"><br/>
                                	<h4><i className="fa fa-check"></i> Success</h4>
                                    <div className="helptext">
<p>This meeting has been finalized</p>
																		</div>
	                                  <div className="col-12"><a href="/advisor/dashboard"><button className="btn btn-outline-info btn-block">&#171; Back to Advisor Directory</button></a></div>
                                
                                </div>

                                <div className="request-group " id="advisornoshow"><br/>
                                	<h4><i className="fa fa-calendar-times-o"></i> I was unable to attend this meeting</h4>
                                    <div className="helptext">
<p>We are sorry to hear that you were not able to make your conversation with your Advisee. We completely understand that life can be unpredictable and things can come up. However, we also want to be mindful of our Advisee's time and the Candoor Code of Conduct.</p>
<p>If you haven't already, it would be truly appreciated if you could send a message to {this.state.meeting_data?.adviseeData?.firstname} at {this.state.meeting_data?.adviseeData?.email} to provide some context. If you'd like to still meet with them, please encourage them to schedule a new meeting through Candoor. We'll reach out on our end and grant them back an extra coffee chat.</p>
<p>Thank you for your continued dedication to our mission here at Candoor, and if you have any other questions, suggestions, or feedback on how we can improve your experience, please let us know.</p>
<p>Best,<br/>
The Candoor Team</p>
																		</div>
	                                  <div className="col-12"><a href="/advisor/dashboard"><button className="btn btn-outline-info btn-block">&#171; Back to Advisor Directory</button></a></div>
                                
                                </div>

                                <div className="request-group " id="adviseenoshow"><br/>
                                	<h4><i className="fa fa-calendar-times-o"></i> Advisee did not attend this meeting</h4>
                                    <div className="helptext">
<p><strong>We're sorry!</strong></p>
<p>We are so sorry to hear that your Advisee did not show up for your meeting. We understand how valuable your time is and are committed to building a community of responsive and supportive professionals. We take any action that compromises the trust within the Candoor network very seriously, and have followed up with the Advisee to reiterate our Code of Conduct surrounding no-shows.</p>
<p>We sincerely thank you for your continued dedication to our mission here at Candoor, and if you have any other questions, suggestions, or feedback on how we can improve, please let us know.</p>
																		</div>
                                
	                                  <div className="col-12"><a href="/advisor/dashboard"><button className="btn btn-outline-info btn-block"

	                                  >&#171; Back to Advisor Directory</button></a></div>
                                </div>
                                <div id="meetingoccurred">
	                                <div className="request-group ">
	                                	<h4><i className="fa fa-check"></i> Meeting Occurred Successfully</h4>
		                                <div className="row">
		                                <br/>
		                                  <strong>Excellent! Are you interested in a follow-up meeting with this Advisee?</strong>
		                                  <div className="helptext">If you respond yes, we'll encourage the Advisee to reconnect with you later</div>
		                                  <div className="col-4"><button className="btn btn-outline-info btn-block"
			                                  name="continueoption"
		                                  	value="yes"
//		                                	onClick ={console.log('clicked 239')}
                                        onClick={this.handleAdvisorContinue}
		                                  	>Yes</button></div>
			                                <div className="col-4"><button className="btn btn-outline-info btn-block"
			                                  name="continueoption"
		                                  	value="no"
                                        onClick={this.handleAdvisorContinue}

			                                >No</button></div>
			                                <div className="col-4"><button className="btn btn-outline-info btn-block"
			                                  name="continueoption"
		                                  	value="maybe"
                                        onClick={this.handleAdvisorContinue}
			                                >Maybe</button></div>
		                                </div>
	                                </div>
	                                  <div className="request-group "  id="thankyou">
		                                    <label className="form-label"><strong>Please share feedback with the Advisee around what they did well and what they can improve. (Optional)</strong></label>
		                                    <div className="helptext">All feedback is aggregated, anonymized and shared with individual Advisees only after they have completed 3 conversations</div>
		                                    <textarea 
		                                      id = "feedbackmessage"
		                                    	className="form-control thankyou" 
		                                    	name="feedbackmessage"
		                                    	rows={10}
		                                    	/>
		                                </div>
		                                <div className="request-group ">
			                                <div className="request-submit " id="finalize">
				                                <a><div 
				                                  id="submitonly"
				                                	className="btn btn-outline-info float-right"
				                                	disabled="TRUE"
				                                	value="submit"
			                                    onClick={this.handleSubmit}
		
		
				                                	>Finalize meeting</div></a>
			                                </div> 
		                                </div>
		                             </div>
                            </div>
                        </div>
                    </div>
                </div>
					</section>
	      </div>

	    )
	  }
};

export default FinalizeMeetingAdvisor;