
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
import ApiRequest from "../../../Services/ApiRequest";
import { destroySession, toasterAlert as toastAlert } from '../../../Helpers/Functions';

//import Reschedule from '../../Advisee/confirm-meeting/modal/Resechdule';
//import ConfirmMeeting from '../../Advisee/confirm-meeting/modal/ConfirmMeeting';
//import ProposeAlternate from '../../Advisee/confirm-meeting/modal/ProposeAlternate';
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import MainFooter from '../../../Components/Layouts/MainFooter';

class UpdateMeetingOutcome extends React.Component {
    state = {
        meetingoutcome: 'occurred',
        meetingid: "",
        meeting_data: "",
        data: {
            userData: []
        },
    }
    componentDidMount() {
        this.getMeetingData();
    }


    getMeetingData = async () => {
        //	    let { meetingId } = useParams();
        // ^^ CAN'T USE useParams BECAUSE  IT'S AN "Invalid hook call"
        this.setState({ meetingid: this.props.match.params.meetingId })
        let response = await ApiRequest.getRequest('/api/view-completed-meeting-data?meeting_id=' + this.props.match.params.meetingId);//${meetingId}');
        if (response.data) {
            this.setState({ meeting_data: response.data })
        }
    }

    handleOutcomeChange = (event) => {
        console.log(event.target.value)
        let value = event.target.value;

        this.setState({
            meetingoutcome: event.target.value
        });



    }
    onChangeState = (event) => {
        // maybe don't do anything except change the class of the submit button
    }
    setInputFieldStates(item = '') {
        this.setState({
        })

    }
    updateoutcome = async () => {
        //        const { meetingid, meetingoutcome } = this.state;
        console.log('meetingid: ' + this.state.meetingid);
        console.log('meetingoutcome: ' + this.state.meetingoutcome);
        const meetingoutcome = this.state.meetingoutcome;
        let response = await ApiRequest.postRequest('/api/advisee-meeting-outcome?meetingId=' + this.state.meetingid + '&meetingoutcome=' + this.state.meetingoutcome);//${meetingId}');
        if (response) {
            console.log('response: ' + response);
            //	        this.setState({meeting_data: response.data})
        }

    }
    render() {
        console.log(this.state.meetingoutcome);

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

                                    <div className="request-group">
                                        <label className="confirmed">
                                            <strong>Meeting Date and Time</strong>
                                            <div>
                                                {' '}
                                                {`${this.state.meeting_data?.meeting_data?.formated_date}, ${this.state.meeting_data?.meeting_data?.formated_start} - ${this.state.meeting_data?.meeting_data?.formated_end} ${this.state.meeting_data?.meeting_data?.confirmed_timezone}`}
                                            </div>
                                        </label>
                                    </div>
                                    <div className="request-group">
                                        <strong>Did this meeting occur?</strong>

                                        <br /><br />
                                        <form>
                                            <div className="custom02 ">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="meetingoutcome1"
                                                        value="occurred"
                                                        onChange={this.handleOutcomeChange}
                                                        checked={this.state.meetingoutcome == "occurred"}
                                                    />

                                                    Yes, this meeting happened as scheduled
                                                </label>
                                                <label >
                                                    <input
                                                        type="radio"
                                                        name="meetingoutcome2"
                                                        value="adviseenoshow"
                                                        onChange={this.handleOutcomeChange}
                                                        checked={this.state.meetingoutcome == "adviseenoshow"}

                                                    />

                                                    No, I was unable to attend this meeting
                                                </label>
                                                <label >
                                                    <input
                                                        type="radio"
                                                        name="meetingoutcome3"
                                                        value="advisornoshow"
                                                        onChange={this.handleOutcomeChange}
                                                        checked={this.state.meetingoutcome == "advisornoshow"}
                                                    />

                                                    No,  Advisor did not attend this meeting
                                                </label>
                                            </div>

                                            </form>
                                    </div>
                                    <div className="request-submit">this.state.meetingId: {this.state.meetingid}


                                        <a
                                        ><button
                                            className="btn btn-info btn-block"
                                            onClick={(e) => { this.updateoutcome(this.state.meetingid); }}
                                        >Continue &#187;</button></a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <MainFooter />
            </div>

        )
    }

};

export default UpdateMeetingOutcome;