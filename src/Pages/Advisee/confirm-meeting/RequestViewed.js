import React from 'react';
import requestview from '../../../assets/images/requestview.png';
import myprofile2 from '../../../assets/images/myprofile2.png';
import warning from '../../../assets/images/warning.png';
import plus from '../../../assets/images/plus.png';
import { useParams, Link } from 'react-router-dom';
import useFetchData from '../../../hooks/useFetchData';
import myprofile from '../../../assets/images/myprofile.png';
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import MainFooter from '../../../Components/Layouts/MainFooter';
import DataError from '../../../Utils/DataError';
import DataLoading from '../../../Utils/DataLoading/DataLoading';

const RequestViewed = () => {
  let { meetingId } = useParams();

  const { data, isError, isLoading } = useFetchData({
    queryKey: ['AdviseeData', 'Advisee'],
    url: `/api/view-meeting-data?meeting_id=${meetingId}`,
  });
  const response_data = data?.data;

  if (isError) {
    return <DataError />;
  }
  if (isLoading) {
    return <DataLoading />;
  }

  return (
    <>
      <Header />
      <section class="request-viewed">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="request-viewed-card">
                <h3>
                  {' '}
                  {response_data?.advisorData?.firstname}{' '}
                  {response_data?.advisorData?.lastname} & {' '}
                  {response_data?.adviseeData?.firstname}{' '}
                  {response_data?.adviseeData?.lastname}
                </h3>
                <h6>{`${response_data?.meeting_data?.meetingtype} - ${response_data?.meeting_data?.meeting_length_minutes} min`}</h6>
                <div class="request-group">
                  <div class="request-img">
                    <div class="row">
                      <div class="col-md-6">
                      <Link to={`/advisor/${response_data?.advisorData?.AdvisorID}`}>
                          <img
                            src={
                              !!response_data?.advisorData?.profile_goal
                                ? process.env.REACT_APP_API_URL + `/${response_data?.advisorData?.profile_goal}`
                                : myprofile
                            }
                            class="img-fluid"
                            alt=""
                          />
                          <h5>
                            {' '}
                            {response_data?.advisorData?.firstname}{' '}
                            {response_data?.advisorData?.lastname}
                          </h5>
                          </Link>
                      </div>
                      <div class="col-md-6">
                        <a href="#">
                          <img
                            src={
                              !!response_data?.adviseeData?.profile_goal
                                ? process.env.REACT_APP_API_URL + `/${response_data?.adviseeData?.profile_goal}`
                                : myprofile
                            }
                            class="img-fluid"
                            alt=""
                          />
                          <h5>
                            {' '}
                            {response_data?.adviseeData?.firstname}{' '}
                            {response_data?.adviseeData?.lastname}
                          </h5>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="request-group">
                  <label>
                    <strong>Status:</strong>{' '}
                    <span> {response_data?.meeting_data?.meeting_status}</span>
                  </label>
                </div>

                <div class="request-group">
                  <label>
                    <strong>Message:</strong>
                  </label>
                  <p>
                    Hi {response_data?.adviseeData?.firstname}{' '}
                    {response_data?.adviseeData?.lastname},
                  </p>
                  <p>{response_data?.meeting_data?.message}</p>
                  <p></p>
                  <p>Thank you in advance for your time and consideration.</p>
                  <p>
                    Sincerely,
                    <span>
                      {' '}
                      {response_data?.advisorData?.firstname}{' '}
                      {response_data?.advisorData?.lastname}
                    </span>
                  </p>
                </div>
                {(response_data?.interval_1 ||
                  response_data?.interval_2 ||
                  response_data?.interval_3) && (
                  <div class="request-group">
                    <label>
                      <strong>
                        Jane’s Availability ([Current User’s Timezone]):
                      </strong>
                    </label>
                    <ul>
                      <li>
                        {response_data?.interval_1 && response_data?.interval_1}
                      </li>
                      <li>
                        {response_data?.interval_2 && response_data?.interval_2}
                      </li>
                      <li>{response_data?.interval_3 && response_data?.interval_3}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <MainFooter />
    </>
  );
};

export default RequestViewed;
