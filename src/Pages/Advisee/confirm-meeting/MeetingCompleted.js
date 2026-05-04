
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
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import MainFooter from '../../../Components/Layouts/MainFooter';

const MeetingCompleted = () => {
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

                                <div className="request-group">
                                    <label className="confirmed">
                                        <strong>Status:</strong>
                                        <span>
                                            {' '}
                                            {response_data?.meeting_data?.meeting_status}
                                        </span>

                                            {' '}
                                            {` on ${response_data?.meeting_data?.formated_date}, ${response_data?.meeting_data?.formated_start} - ${response_data?.meeting_data?.formated_end} ${response_data?.meeting_data?.confirmed_timezone}`}
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <MainFooter />
        </>
    );
};

export default MeetingCompleted;