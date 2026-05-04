import { Link, useParams, useHistory } from 'react-router-dom';
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import useFetchData from '../../../hooks/useFetchData';
import myprofile from '../../../assets/images/myprofile.png';
import profilebg from '../../../assets/images/profilebg.png';
import map from '../../../assets/images/map.png';
import clock from '../../../assets/images/clock.png';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
import { useForm } from 'react-hook-form';
import moment, { months } from 'moment';
import ApiRequest from '../../../Services/ApiRequest';
import { toasterAlert } from '../../../Helpers/Functions';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import MainFooter from '../../../Components/Layouts/MainFooter';



function RequestMeeting() {
  const history = useHistory();
  const { id } = useParams();
  const [createdMeetingInstance, setcreatedMeetingInstance] = useState(null);

  const [requestButtonText, setRequestButtonText ] = useState('Send Meeting Request');


  const sendPostRequest = async (formData, isSubmitSuccessful) => {

    formData.append('createdMeetingInstance', createdMeetingInstance);
    formData.append('meeting_status', 'Request Sent');
    formData.append('advisee_time_zone', user?.advisee_timezone?.time_zone)

    try {
      var adviseeMonthlyRequestsRemaining = data.data.Data.advisees_monthly_requests_remaining;

      if (adviseeMonthlyRequestsRemaining == 0) {
        toasterAlert('error', 'You\'ve used all your requests this month. Come back next month to send more requests');
        return;
      }

      const response = await ApiRequest.postRequest(
        '/api/save-advisor-meeting-request',
        formData
      );
      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        // console.log(response.status);
        if (isSubmitSuccessful);
        if (response.data.statusCode === 500) {
          toasterAlert('error', response.data.message);
        } else {
          toasterAlert('success', 'Request has been processed!');
          history.push('/advisee/meeting-success');
        }
      } else if (response !== undefined && response.status === 422) {
        toasterAlert('error', response.data.errors[0]);
      } else {
        toasterAlert('error', 'Something went wrong please try again!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    // resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const { data, isLoading, isError, isSuccess } = useFetchData({
    queryKey: ['AdvisorMeeting', id],
    url: `/api/get-advisor-request-meeting-types?id=${id}`,
  });



  useEffect(() => {
    //Create meeting instance in the database
    const formData = new FormData();
    formData.append('AdvisorID', id)
    formData.append('meeting_status', 'Request Opened')


    ApiRequest.postRequest(
      '/api/create-new-meeting-instance',
      formData
    ).then((response) => {
      setcreatedMeetingInstance(response.data.meeting_instance)
    })
  }, [])



  let user = {};
  if (isSuccess) {
    user = { ...data.data?.Data };
  }

  const meetingType = watch('meeting_type');

  const service = user?.services?.find((service) => {
    return service.meeting_type === meetingType;
  });
  const serviceTime = service?.time;


  const Loading = isLoading && <DataLoading />;
  const Error = isError && <DataError />;

  const onSubmit = async (data) => {
    setRequestButtonText('Loading ...')
    const formData = new FormData();
    formData.append('meeting_length', serviceTime);
    formData.append('message', message);

    if (message == undefined) {
      console.log('Message is undefined')
      setMessageError('Please update the message and ensure it has no place holders (<-XXX->)')
      setRequestButtonText('Send Meeting Request')
      return
    }else{
      setMessageError('')
    }

    let count = 1;
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        if (key === `interval_${count}_from`) {
          formData.append(key, moment(value, 'hh:mm a').format('hh:mm a'));
        } else if (key === `interval_${count}_to`) {
          formData.append(key, moment(value, 'hh:mm a').format('hh:mm a'));
          count = count + 1;
        } else {
          formData.append(key, value);
        }
      }
    }
    const selectedService = user.services.find((service) => {
      return service.meeting_type === data.meeting_type;
    });
    formData.set('user_services_id', selectedService?.id);
    formData.set('id', id);

    postData(formData, isSubmitSuccessful);
  };
  const { mutateAsync: postData } = useMutation(sendPostRequest, {
    onSuccess: () => {
      // history.push('/advisee/meeting-success');
      console.log('Everything went Smoothly🥳');
    },
  });

  const [message, onMessageChange] = useState();
  const [messageError, setMessageError] = useState();

  //   useEffect(() => {
  //     onMessageChange(
  // `Hi ${user?.userData?.firstname},
  // My name is ${user?.advisee_first_name} and I am a ${user?.school_or_company}.

  // I’m reaching out because I saw that you  <-XXX->  and I’m interested in learning more about  <-XXX-> .
  // I’d love to schedule a call to <-XXX->. Would you be open to connecting at any of the times provided?

  // Thank you in advance for your time and consideration.
  // Sincerely, 
  // ${user?.advisee_first_name} ${user?.advisee_last_name}`
  //     );

  //   }, [user]);


  const handleMessageChange = event => {
    // 👇️ update textarea value
    onMessageChange(event.target.value);
  };

  return (
    <>
      <Header />
      {Loading || Error || (
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="request-meeting">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <div className="request-left">
                    <h3>Request to Meet {user?.userData?.firstname}</h3>
										{
                      user?.advisor.monthly_capacity_remaining < 1
                        ? 
                        <div className="careerlabel error">This advisor is not currently available.</div>
                        : ``
                    }
                    <div className="form-group">
                      <div className="border-div"></div>
                      <label>
                        <strong>Step 1:</strong> Select Meeting Type
                      </label>
                      <select
                        className="form-control"
                        id="sel1"
                        {...register('meeting_type', {
                          required:
                            'Please select a meeting type from the Advisor’s list.',
                        })}
                      >
                        {user?.services?.map((service, index) => (
                          <option key={index} value={service.meeting_type}>
                            {`${service.meeting_type} - ${service.time}min`}
                          </option>
                        ))}
                      </select>
                      {errors.carrer_advice && (
                        <small className="text-danger">
                          {errors.carrer_advice.message}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <div className="border-div"></div>
                      <label>
                        <strong>Step 2:</strong> Share Your Availability
                      </label>
                      <p>
                        All times are in your local timezone of{' '}
                        <span className='timezone-bright-red'>{user?.advisee_timezone?.time_zone ||
                          'Advisee Timezone'}</span>
                        {user?.advisor?.availability_time === null ?
                          '.' :
                          <>
                            , and your Advisor’s preferred availability is{' '}
                            <strong>
                              {user?.advisor?.availability_time}.
                            </strong></>
                        }
                      </p>
                      <div className="request-a-meeting-availability">
                        <div className="row proposetoprow">
                          <div className="col-md-3">
                            <label></label>
                          </div>
                          <div className="col-md-3">
                            <label>Date</label>
                          </div>
                          <div className="col-md-3">
                            <label>From</label>
                          </div>
                          <div className="col-md-3">
                            <label>To</label>
                          </div>
                        </div>
                        <div className="propose-add-box">
                          <IntervalFields
                            dateName="interval_1_date"
                            fromName="interval_1_from"
                            toName="interval_1_to"
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            errors={errors}
                            serviceTime={serviceTime}
                            IntervalFields="Timeslot #1"
                          />
                          <IntervalFields
                            dateName="interval_2_date"
                            fromName="interval_2_from"
                            toName="interval_2_to"
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            errors={errors}
                            serviceTime={serviceTime}
                            IntervalFields="Timeslot #2"
                          />
                          <IntervalFields
                            dateName="interval_3_date"
                            fromName="interval_3_from"
                            toName="interval_3_to"
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            errors={errors}
                            serviceTime={serviceTime}
                            IntervalFields="Timeslot #3"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <strong>Step 3:</strong> Write a Personalized Message
                      </label>
                      <p>
                        Write a personalized message to your Advisor — we’ve
                        provided a template to get you started. The more context
                        you provide, the more helpful the meeting will be.
                      </p>
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <p>
                        Please double check that your message contains no placeholder text (“XXX”) before sending.
                      </p>
                      <textarea
                        className="form-control"
                        //                         value={`Hi ${user?.userData?.firstname},
                        // My name is ${user?.advisee_first_name} and I am a ${user?.school_or_company}. 
                        // I’m reaching out because I saw that you  <-XXX->  and I’m interested in learning more about  <-XXX-> .
                        // I’d love to schedule a call to <-XXX->. Would you be open to connecting at any of the times provided?
                        // Thank you in advance for your time and consideration.
                        // Sincerely, 
                        // ${user?.advisee_first_name} ${user?.advisee_last_name}`}
                        value={message}
                        defaultValue={
                          `Hi ${user?.userData?.firstname},
My name is ${user?.advisee_first_name} and I am a ${user?.advisee_headline}.
  
I’m reaching out because I saw that you  <-XXX->  and I’m interested in learning more about  <-XXX-> .
I’d love to schedule a call to <-XXX->. Would you be open to connecting at any of the times provided?
Thank you in advance for your time and consideration.
Sincerely, 
${user?.advisee_first_name} ${user?.advisee_last_name}`

                        }
                        onChange={handleMessageChange}
                        rows="12"
                        id="comment"
                        required


                        // {...register('message', {
                        //   required:
                        //     'Please double check that your message contains no placeholder text (“XXX”) before sending.',
                        // })}
                        placeholder=""
                      ></textarea>
                      <small className="text-danger">
                        {messageError}
                      </small>

                    </div>

                    <div className="form-group request-meeting-btn">
                      <button type="submit"
	                      className=
                            {user?.advisor.monthly_capacity_remaining > 0
                              ? `btn btn-info`
                              : `btn btn-info disabled`
	                          }
                      >
                        {requestButtonText}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12">
                  <div className="myprofile-left">
                    <div className="myprofilebg">
                      <img
                        style={{
                          'objectFit': 'cover'
                        }}
                        src={profilebg} className="img-fluid" alt="" />
                    </div>
                    <div className="myprofile-desc">
                      <div className="profileimg">
                        <img
                          style={{
                            'objectFit': 'cover'
                          }}
                          src={
                            user?.advisor?.profile_goal !== null
                              ? process.env.REACT_APP_API_URL + `/${user?.advisor?.profile_goal}`
                              : myprofile
                          }
                          className="img-fluid myprofileimg"
                          alt=""
                        />
                      </div>
                      <h3>
                        {user?.userData?.firstname} {user?.userData?.lastname}
                        <span>
                          {user?.userData?.pronouns &&
                            `(${user?.userData?.pronouns})`}
                        </span>
                      </h3>
                      <h6>{user?.advisor?.headline}</h6>
                      <ul className="profileadd">
                        <li>
                          <span>
                            <img src={map} className="img-fluid" alt="" />
                          </span>
                          {user?.background?.city &&
                            `${user?.background?.city},`}{' '}
                          {'  '}
                          {user?.background?.state &&
                            `${user?.background?.state},`}{' '}
                          {'  '}
                          {user?.background?.country}
                        </li>
                        <li>
                          <span>
                            <img src={clock} className="img-fluid" alt="" />
                          </span>
                          {user?.background?.time_zone}
                        </li>
                      </ul>
                      <div className="profiletag">
                        {user?.advisor?.tags_list &&
                          JSON.parse(user?.advisor?.tags_list)?.map(
                            (tag, index) => <span key={index}>{tag}</span>
                          )}
                      </div>
                      <div className="myprofile-left-btn request-single-btn">
                        <Link
                          to={`/advisor/${user?.advisor?.AdvisorID}`}
                          className="btn btn-info"
                        >
                          <i className="fa fa-search" aria-hidden="true"></i>View
                          Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      )}
      <MainFooter />
    </>
  );
}

function IntervalFields({
  register,
  errors,
  dateName,
  fromName,
  toName,
  watch,
  setValue,
  serviceTime,
  IntervalFields,
}) {
  const getFromTime = watch(fromName);
  // console.log('getFromTime' + getFromTime);
  // console.log('servicetime   =' + serviceTime);

  // useEffect(() => {
  //   setValue(
  //     toName,
  //     moment(getFromTime, 'hh:mm').add(serviceTime, 'minutes').format('HH:mm')
  //   );
  // }, [getFromTime, serviceTime, setValue, toName]);

  var futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 2)
  var futureDateMin = futureDate.toISOString().substring(0, 10);

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <label>{IntervalFields}</label>
        </div>
        <div className="col-md-3">
          <label className="propose-mobile">Date</label>
          <div className="input-group">
            <input
              type="date"
              min={futureDateMin}
              className="form-control"
              placeholder="Jan 12"
              {...register(dateName, {
                required: 'Required',
              })}
            />
          </div>
          {errors[dateName] && (
            <small className="text-danger">{errors[dateName]?.message}</small>
          )}
        </div>
        <div className="col-md-3">
          <label className="propose-mobile">From</label>
          <div className="input-group">
            <input
              type="time"
              className="form-control"
// TRIED ALL OF THESE. JMS 10.2.2023
//              step="60" ... anything under 60 adds seconds and fractional seconds to the picker
//              step="900" ... should be 15 minute intervals, but doesn't affect the picker itself
//              step="3600" ... defaults the minute value to :00
// 							stepminute="15"
// 							minutestep="15"
// 							minutes-step="15"
              placeholder="2:00 PM"
              {...register(fromName, {
                required: 'Required',
              })}
            />
          </div>
          {errors[fromName] && (
            <small className="text-danger">{errors[fromName].message}</small>
          )}
        </div>
        <div className="col-md-3">
          <label className="propose-mobile">To</label>
          <div className="input-group">
            <input
              // readOnly
              type="time"
              className="form-control"
//              step="3600"
              placeholder="5:00 PM"
              {...register(toName, {
                required: 'Required',
              })}
            />
          </div>
          {errors[toName] && (
            <small className="text-danger">{errors[toName].message}</small>
          )}
        </div>
      </div>
    </>
  );
}

export default RequestMeeting;