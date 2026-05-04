
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
//import Reschedule from '../../Advisee/confirm-meeting/modal/Resechdule';
//import ConfirmMeeting from '../../Advisee/confirm-meeting/modal/ConfirmMeeting';
//import ProposeAlternate from '../../Advisee/confirm-meeting/modal/ProposeAlternate';
import Header from '../../Components/Layouts/AdviseeLayout/Header';
import MainFooter from '../../Components/Layouts/MainFooter';

const adviseeFirstname = "";
const adviseeLastname = "";
const advisorFirstname = "";
class FinalizeMeetingAdvisee extends React.Component {

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
        document.getElementById("submitsend").disabled = true;
        document.getElementById("submitonly").disabled = true;

        let response = await ApiRequest.getRequest('/api/view-completed-meeting-data?meeting_id=' + this.props.match.params.meetingId);//${meetingId}');
							document.getElementById("meetingfinalized").className = 'hide';
							document.getElementById("meetingoccurred").className = 'hide';
							document.getElementById("adviseenoshow").className = 'hide';
							document.getElementById("advisornoshow").className = 'hide';
							document.getElementById("thankyou").className = 'hide';
							document.getElementById("finalize").className = 'hide';

							

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
							window.location.href = '/advisee/past-meeting/'+this.props.match.params.meetingId;
            } else if(response.data.meeting_data?.advisee_meetingfinalized ===1 && response.data.meeting_data?.meetingoutcome === "meetingoccurred"){
							document.getElementById("meetingfinalized").className = 'show';
            } else if(response.data.meeting_data?.meetingoutcome === "meetingoccurred"){
							document.getElementById("meetingoccurred").className = 'show';
							document.getElementById("thankyou").className = 'show';
							document.getElementById("finalize").className = 'show';
            } else if(response.data.meeting_data?.meetingoutcome === "adviseenoshow"){
							document.getElementById("adviseenoshow").className = 'show';
            } else if(response.data.meeting_data?.meetingoutcome === "advisornoshow"){
							document.getElementById("advisornoshow").className = 'show';
            }
			       const adviseeFirstname = this.state.meeting_data?.adviseeData?.firstname;
			       const adviseeLastname = this.state.meeting_data?.adviseeData?.lastname;
			       const advisorFirstname = this.state.meeting_data?.advisorData?.firstname;
			       var thankyoumessage = "Hi "+advisorFirstname+",\n\nThank you for taking the time to speak with me about <-XXX->. I enjoyed learning about <-XXX->, and my key takeaways from our conversation were <-XXX->. Going forward, I plan to <-XXX-> so that I can <-XXX->.\n\nThank you again for your time. I would love to meet again, and will book another meeting through Candoor!\n\nSincerely,\n&#8212; "+adviseeFirstname+" "+adviseeLastname; 
						this.setState({ thankyoumessage: thankyoumessage})
			       document.getElementById("thankyoumessage").innerHTML= thankyoumessage;
//			       console.log(this.state);
        } else {
        	console.log('no response from API');
        }
    }

    handleAdviseeContinue = (event) => {
        let value = event.target.value;
        let checkedid = event.target.id;
        let buttons = document.getElementsByName("continueoption");
				for(const val of buttons) {
				    val.className = 'btn btn-outline-info btn-block'
				  }
         event.target.className = "btn btn-block-selected";
//        document.getElementById("submitsend").disabled = false;
//        document.getElementById("submitonly").disabled = false;
							document.getElementById("meetingoccurred").className = 'show';
        this.setState({
            advisee_continue: event.target.value,
        });
    }
    handleSubmitandsend = async () => {
				let latestmsg = document.getElementById("thankyoumessage").value;
        this.setState({
            advisee_meetingfinalized: 1,
            thankyoumessage: latestmsg
        });    	
    	<DataLoading />
        console.log('submitandsend');
        console.log(this.state);
// CHECK thankyou for placeholders
				let result = latestmsg.indexOf("<-XXX->");
				if(result > 0) {
	          toasterAlert("error", "Please make sure your message contains no placeholders like <-XXX-> and submit again.");
				} else {
// CHECK thankyou for blanks
					if(latestmsg.length < 20) {
	          toasterAlert("error", "Please make sure your message is at least 20 characters long and submit again. ("+result+")");
					} else {
	          toasterAlert("success", "Saving...");
						this.submitstring = '/api/advisee-meeting-outcome?meetingId=' + this.state.meetingid;
						this.state.thankyoumessage = latestmsg;
		        let response = await ApiRequest.postRequest(this.submitstring,this.state);
		        if (response) {
		  //        console.log('response submitandsend');
			        if (response.status == 200) {
			        	this.getMeetingData();
			        	this.render();
			          toasterAlert("success", "Meeting finalized. Thank you!");
		          }
		        }
		      }
	      }
    }

    handleSubmitonly = async () => {
    	<DataLoading />
        this.setState({
            advisee_meetingfinalized: 1,
        });    	
//        console.log('submitonly');
				this.state.thankyoumessage = ""; /// omit the thankyoumessage before posting
				this.state.nothankyou = 1; // Set nothankyou to true
				this.submitstring = '/api/advisee-meeting-outcome?meetingId=' + this.state.meetingid;
        let response = await ApiRequest.postRequest(this.submitstring,this.state);
        if (response) {
//          console.log('response submitonly');
	        if (response.status == 200) {
	        	this.getMeetingData();
	        	this.render();
	          toasterAlert("success", "Meeting finalized. Thank you!");
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
	                                  <div className="col-12"><a href="/advisee/dashboard"><button className="btn btn-outline-info btn-block">&#171; Back to Advisor Directory</button></a></div>
                                
                                </div>

                                <div className="request-group " id="adviseenoshow"><br/>
                                	<h4><i className="fa fa-calendar-times-o"></i> I was unable to attend this meeting</h4>
                                    <div className="helptext">
<p>We are sorry to hear that you were not able to make your conversation with your Advisor. We completely understand that life can be unpredictable and things can come up. However, we also want to be mindful of our Advisors' time and commitment to the mission at Candoor.</p>
<p>If you haven't already, please send an email to {this.state.meeting_data?.advisorData?.firstname} at {this.state.meeting_data?.advisorData?.email} to provide context. If you'd still like to meet with them, you are welcome to let them know and see if they are still willing to meet.</p>
<p>To ensure we maintain trust and accountability within our community, no-shows are counted as infractions that violate our Code of Conduct. If these infractions are recurring, this can result in suspension or a ban from the Candoor community. We encourage you to be mindful of this policy as you continue to use our platform.</p>
<p>In the meantime, if there is anything that we can improve upon in the scheduling / meeting process, please let us know. We welcome your feedback as you continue on your Candoor journey!</p>
																		</div>
	                                  <div className="col-12"><a href="/advisee/dashboard"><button className="btn btn-outline-info btn-block">&#171; Back to Advisor Directory</button></a></div>
                                
                                </div>

                                <div className="request-group " id="advisornoshow"><br/>
                                	<h4><i className="fa fa-calendar-times-o"></i> Advisor did not attend this meeting</h4>
                                    <div className="helptext">
<p><strong>We're sorry!</strong></p>
<p>We are so sorry to hear that your Advisor did not show up to your meeting. We understand how valuable your time is and are committed to building a community of responsive and supportive professionals. We take any action that compromises the trust within the Candoor network very seriously, and will follow up with the Advisor to reiterate our Code of Conduct surrounding no-shows.</p>
<p>As a token of our apology, we have credited your account with an additional meeting request so that you may book another Advisor.</p>
<p>Thank you for continuing to trust Candoor with your career journey, and if you have any other questions, suggestions, or feedback on how we can improve your experience, please let us know.</p>
																		</div>
                                
	                                  <div className="col-12"><a href="/advisee/dashboard"><button className="btn btn-outline-info btn-block"

	                                  >&#171; Back to Advisor Directory</button></a></div>
                                </div>
                                <div id="meetingoccurred">
	                                <div className="request-group ">
	                                	<h4><i className="fa fa-check"></i> Meeting Occurred Successfully</h4>
		                                <div className="row">
		                                <br/>
		                                  <strong>Excellent! Are you interested in a follow-up meeting with this Advisor?</strong>
		                                  <div className="helptext">If you respond yes, we'll encourage you to reconnect with the Advisor later</div>
		                                  <div className="col-4"><button className="btn btn-outline-info btn-block"
			                                	name="continueoption"
		                                  	value="yes"
//		                                	onClick ={console.log('clicked 239')}
                                        onClick={this.handleAdviseeContinue}
		                                  	>Yes</button></div>
			                                <div className="col-4"><button className="btn btn-outline-info btn-block"
			                                	name="continueoption"
		                                  	value="no"
                                        onClick={this.handleAdviseeContinue}

			                                >No</button></div>
			                                <div className="col-4"><button className="btn btn-outline-info btn-block"
			                                	name="continueoption"
		                                  	value="maybe"
                                        onClick={this.handleAdviseeContinue}
			                                >Maybe</button></div>
		                                </div>
	                                </div>
	                                  <div className="request-group "  id="thankyou">
		                                    <label className="form-label"><strong>Thank You Message (Optional)</strong></label>
		                                    <div className="helptext">Your gratitude means the world to Advisors and keeps them invested in your success. If you'd like to write a thank-you note for your Advisor, please do so here! (optional, but highly recommended). If you are not sure what to write, we've provided an example for inspiration </div>
		                                    <textarea 
		                                      id = "thankyoumessage"
		                                    	className="form-control thankyou" 
		                                    	name="thankyoumessage"
		                                    	defaultValue={this.state.samplemessage}
		                                    	rows={12}
		                                    	/>
		                                </div>
		                                <div className="request-group ">
			                                <div className="request-submit " id="finalize">
																					<input type="hidden" name="advisee_continue" value={this.state.advisee_continue} />
																					<input type="hidden" name="nothankyou" value={this.state.nothankyou} />
		
				                                <a><div
				                                	id="submitsend"
				                                	className="btn btn-info float-right"
				                                	disabled="TRUE"
				                                	value="send"
			                                    onClick={this.handleSubmitandsend}
				                                	>Finalize and send Thank You &#187;</div></a>
		
				                                <a><div 
				                                  id="submitonly"
				                                	className="btn btn-outline-info float-right"
				                                	disabled="TRUE"
				                                	value="submit"
			                                    onClick={this.handleSubmitonly}
		
		
				                                	>Skip Thank You and finalize</div></a>
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

export default FinalizeMeetingAdvisee;