
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
//import Reschedule from '../../Advisee/confirm-meeting/modal/Resechdule';
//import ConfirmMeeting from '../../Advisee/confirm-meeting/modal/ConfirmMeeting';
//import ProposeAlternate from '../../Advisee/confirm-meeting/modal/ProposeAlternate';
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import MainFooter from '../../../Components/Layouts/MainFooter';

const FinalizeMeetingAdvisee = () => {
    let { meetingId } = useParams();

    const { data, isError, isLoading } = useFetchData({
        queryKey: ['AdviseeData', 'Advisee'],
        url: `/api/view-completed-meeting-data?meeting_id=${meetingId}`,
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

                                <div className="request-group ">
                                    <label className="confirmed">
                                        <strong>Meeting Date and Time</strong>
                                        <div>
                                            {' '}
                                            {`${response_data?.meeting_data?.formated_date}, ${response_data?.meeting_data?.formated_start} - ${response_data?.meeting_data?.formated_end} ${response_data?.meeting_data?.confirmed_timezone}`}
                                        </div>
                                    </label>
                                </div>
                                <div className="request-group adviseenoshow">
                                	<h4><i class="fa fa-calendar-times-o"></i> I was unable to attend this meeting</h4>
                                    <div className="helptext">
<p>We are sorry to hear that you were not able to make your conversation with your Advisor. We completely understand that life can be unpredictable and things can come up. However, we also want to be mindful of our Advisors' time and commitment to the mission at Candoor.</p>
<p>If you haven't already, please send an email to ${response_data?.advisorData?.firstname} to provide context. If you'd still like to meet with them, you are welcome to let them know and see if they are still willing to meet.</p>
<p>To ensure we maintain trust and accountability within our community, no-shows are counted as infractions that violate our Code of Conduct. If these infractions are recurring, this can result in suspension or a ban from the Candoor community. We encourage you to be mindful of this policy as you continue to use our platform.</p>
<p>In the meantime, if there is anything that we can improve upon in the scheduling / meeting process, please let us know. We welcome your feedback as you continue on your Candoor journey!</p>
																		</div>
                                
                                </div>
                                <div className="request-submit adviseenoshow">
	                                  <div className="col-12"><button className="btn btn-outline-info btn-block">&#171; Back to Advisor Directory</button></div>
                                
                                </div>

                                <div className="request-group advisornoshow">
                                	<h4><i class="fa fa-calendar-times-o"></i> Advisor did not attend this meeting</h4>
                                    <div className="helptext">
<p><strong>We're sorry!</strong></p>
<p>We are so sorry to hear that your Advisor did not show up to your meeting. We understand how valuable your time is and are committed to building a community of responsive and supportive professionals. We take any action that compromises the trust within the Candoor network very seriously, and will follow up with the Advisor to reiterate our Code of Conduct surrounding no-shows.</p>
<p>As a token of our apology, we have credited your account with an additional meeting request so that you may book another Advisor.</p>
<p>Thank you for continuing to trust Candoor with your career journey, and if you have any other questions, suggestions, or feedback on how we can improve your experience, please let us know.</p>
																		</div>
                                
                                </div>
                                <div className="request-submit advisornoshow">
	                                  <div className="col-12"><button className="btn btn-outline-info btn-block">&#171; Back to Advisor Directory</button></div>
                                
                                </div>

                                <div className="request-group meetingoccurred">
                                	<h4><i class="fa fa-check"></i> Meeting Occurred Successfully</h4>
	                                <div className="row">
	                                <br/>
	                                  <strong>Excellent! Are you interested in a follow-up meeting with this Advisor?</strong>
	                                  <div className="helptext">If you respond yes, we'll encourage you to reconnect with the Advisor later</div>
	                                  <div className="col-4"><button className="btn btn-outline-info btn-block">Yes</button></div>
		                                <div className="col-4"><button className="btn btn-outline-info btn-block">No</button></div>
		                                <div className="col-4"><button className="btn btn-outline-info btn-block">Maybe</button></div>
	                                </div>
                                </div>
                                <div className="request-group meetingoccurred">
                                    <label className="form-label"><strong>Thank You Message (Optional)</strong></label>
                                    <div className="helptext">Your gratitude means the world to Advisors and keeps them invested in your success. If you'd like to write a thank-you note for your Advisor, please do so here! (optional, but highly recommended). If you are not sure what to write, we've provided an example for inspiration </div>
                                    <textarea className="form-control thankyou" >
{`Hi ${response_data?.advisorData?.firstname},
Thank you for taking the time to speak with me. Coming into this conversation, I wasn't fully aware of the different data careers out there, and I am now all the more convinced data analytics is the path for me. I appreciate your recommendation to find opportunities to apply data insights in my current job and build out an analytics portfolio - I plan to do so going forward.

You had mentioned there are websites where I can find publicly available data to help me build this portfolio - could you please share them with me?

Thank you again for your time. I would love to meet again and will book another meeting through Candoor!
- ${response_data?.adviseeData?.firstname} ${response_data?.adviseeData?.lastname}`}
                                    </textarea>
                                    
                                </div>
                                <div className="request-submit meetingoccurred">
	                                <button className="btn btn-info float-right">Finalize and send Thank You &#187;</button>
	                                <button className="btn btn-outline-info float-right">Skip Thank You and finalize</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <MainFooter />
        </>
    );
};

export default FinalizeMeetingAdvisee;