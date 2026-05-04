import warning from '../../../assets/images/warning.png';
import plus from '../../../assets/images/plus.png';
import CancelMeeting from './modal/CancelMeeting';
import Reschedule from '../../Advisor/confirm-meeting/modal/Resechdule';
import Header from '../../../Components/Layouts/AdvisorLayout/Header';
import useFetchData from '../../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import myprofile from '../../../assets/images/myprofile.png';
import Moment from 'react-moment';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
import CancalMeeting from './modal/CancelMeeting';
import ResechduleWarning from './modal/ResechduleWarning';
import MainFooter from '../../../Components/Layouts/MainFooter';

const MeetingCompleted = () => {
    let { meetingId } = useParams();

    const { data, isLoading, isError } = useFetchData({
        queryKey: ['MeetingRequest', meetingId],
        url: `/api/view-completed-meeting-data?meeting_id=${meetingId}`,
    });
    const response_data = data?.data;

    console.log(response_data)

    const Loading = isLoading && <DataLoading />;
    const Error = isError && <DataError />;

    return (
        <>
            <Header />
            {Loading || Error || (
                <section class="request-viewed">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="request-viewed-card">
                                    <h3>
                                        {response_data?.adviseeData?.firstname}{' '}
                                        {response_data?.adviseeData?.lastname} &{' '}
                                        {response_data?.advisorData?.firstname}{' '}
                                        {response_data?.advisorData?.lastname}
                                    </h3>
                                    <h6>{`${response_data?.meeting_data?.meetingtype} - ${response_data?.meeting_data?.meeting_length_minutes} min`}</h6>
                                    <div class="request-group">
                                        <div class="request-img">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <a href={`/advisee/${response_data?.meeting_data?.AdviseeID}`}>
                                                        <img
                                                            style={{
                                                                'objectFit': 'cover'
                                                            }}
                                                            src={
                                                                !!response_data?.adviseeData?.profile_goal
                                                                    ? process.env.REACT_APP_API_URL + `/${response_data?.adviseeData?.profile_goal}`
                                                                    : myprofile
                                                            }
                                                            class="img-fluid"
                                                            alt=""
                                                        />
                                                        <h5>
                                                            {response_data?.adviseeData?.firstname}{' '}
                                                            {response_data?.adviseeData?.lastname}
                                                        </h5>
                                                    </a>
                                                </div>
                                                <div class="col-md-6">
                                                    <a href="/advisor/advisorProfileedit">
                                                        <img
                                                            style={{
                                                                'objectFit': 'cover'
                                                            }}
                                                            src={
                                                                !!response_data?.advisorData?.profile_goal
                                                                    ? process.env.REACT_APP_API_URL + `/${response_data?.advisorData?.profile_goal}`
                                                                    : myprofile
                                                            }
                                                            class="img-fluid"
                                                            alt=""
                                                        />
                                                        <h5>
                                                            {response_data?.advisorData?.firstname}{' '}
                                                            {response_data?.advisorData?.lastname}
                                                        </h5>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="request-group">
                                        <label class="confirmed">
                                            <strong>Status:</strong>
                                            <span>
                                                {' '}
                                                {response_data?.meeting_data?.meeting_status}
                                            </span>{' '}
                                            {`on ${response_data?.meeting_data?.formated_date}, ${response_data?.meeting_data?.formated_start} - ${response_data?.meeting_data?.formated_end} ${response_data?.meeting_data?.confirmed_timezone}`}
                                        </label>
                                    </div>

                                    <div class="request-group">
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
            )}



            <MainFooter />
        </>
    );
};



export default MeetingCompleted;
