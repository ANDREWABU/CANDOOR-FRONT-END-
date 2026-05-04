// Third-party Imports👇
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

// Project Imports👇
// import './onboarding.css';
import Header from '../../../Components/Layouts/AdvisorLayout/Header';
import setting from '../../../assets/images/setting.png';
import deleteee from '../../../assets/images/delete.png';
import add from '../../../assets/images/add.png';
import available from '../../../assets/images/Availability.png';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';

// Custom Hook👇
import useFetchData from '../../../hooks/useFetchData';
import { useMutation, useQueryClient } from 'react-query';
import { toasterAlert } from '../../../Helpers/Functions';
import ApiRequest from '../../../Services/ApiRequest';
import { useEffect } from 'react';

const meetingTimingOptions = ['30', '45', '60', '90'];

function OrientationMeetingPreference() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const {
    data: meetingOptions,
    isLoading,
    isError,
  } = useFetchData({
    queryKey: ['Meetings', 'advisor'],
    url: '/api/get-meetingtype',
  });

  // const { data: timezonesOptions } = useFetchData({
  //   queryKey: ['Countries and Timezones', 'advisor'],
  //   url: '/api/advisor/get-background-data',
  // });

  const { data: userServices } = useFetchData({
    queryKey: ['UserServices'],
    url: '/api/get-user-services',
    options: {
      refetchOnMount: 'always',
      select: (data) => data.data,
    },
  });

  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      meeting_types: [
        {
          meeting_type: 'Career Advice (Exploration)',
          time: 30,
        },
      ],
      // timezone: 'Pacific Standard Time (PST) UTC−08:00',
      monthly_capacity: 2,
      availability_time: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meeting_types',
  });

  useEffect(() => {
    if (userServices) {
      setValue('meeting_types', [
        ...userServices?.Data?.map((service) => {
          return { meeting_type: service.meeting_type, time: service.time };
        }),
      ]);
      // setValue('timezone', userServices?.timezone);
      setValue('availability_time', userServices?.availability);
      setValue('monthly_capacity', userServices?.monthly_capacity);
    }
  }, [setValue, userServices]);

  const postData = async (data, event) => {
    const formData = new FormData();

    let time = [];
    let meeting_type = [];
    let action_type = [];
    let service_id = [];
    data.meeting_types.map((meeting) => {
      time.push(meeting.time);
      meeting_type.push(meeting.meeting_type);
      action_type.push('add');
    });

    for (const [key, value] of Object.entries(data)) {
      formData.set('action_type', JSON.stringify(action_type));
      if (key === 'meeting_types') {
        formData.append('time', JSON.stringify(time));
        formData.append('meeting_type', JSON.stringify(meeting_type));
      } else {
        formData.append(key, value);
      }
    }
    try {
      const response = await ApiRequest.postRequest(
        '/api/save-meeting-services',
        formData
      );
      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        toasterAlert('success', 'Request Has Been Processed!');
        history.push('/advisor/dashboard');
      } else if (response !== undefined && response.status === 422) {
        toasterAlert('error', response.data.errors[0]);
      } else {
        toasterAlert('error', 'Something went wrong please try again!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteService = async ({ index, serviceID }) => {
    if(!serviceID) {
      return remove(index);
    } else { 
        try {
        const response = await ApiRequest.postRequest(
          `/api/delete-user-services?id=${serviceID}`
        );
        if (
          response !== undefined &&
          response.status === 200 &&
          response.status !== 422
        ) {
          toasterAlert('success', 'Request Has Been Processed!');
          remove(index);
        } else if (response !== undefined && response.status === 422) {
          toasterAlert('error', response.data.errors[0]);
        } else {
          toasterAlert('error', 'Something went wrong please try again!');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const { mutateAsync: onSubmit } = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['UserServices']);
    },
  });

  const { mutateAsync: onDelete } = useMutation(deleteService, {
    onSuccess: () => {
      console.log('Successfully Removed Service');
      // queryClient.invalidateQueries(['UserServices']);
    },
  });

  const Loading = isLoading && <DataLoading />;
  const Error = isError && <DataError />;

  return (
    <>
      <Header />
      {Loading || Error || (
        <section className='meeting-preferences'>
          <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='meeting-heading'>
                    <h2>
                      Set Your Meeting Preferences{' '}
                      <img src={setting} className='img-fluid' alt='' />
                    </h2>
                  </div>
                  <div className='preferences-div'>
                    <h3>Meeting Types</h3>
                    <p>
                      Select which meeting types you’ll offer and set a default
                      meeting length for each. Our suggested meeting lengths are
                      below. Advisees will be able to search for you via these
                      services in the Advisor Directory. You can change these in
                      your Settings at any time.
                    </p>
                    <div className='preferences-box'>
                      {fields.map((item, index) => {
                        const selectedMeetingType = watch(
                          `meeting_types.${index}.meeting_type`
                        );
                        const toolTipSelected =
                          meetingOptions?.data?.data?.find(
                            (meeting) =>
                              meeting.name?.trim() === selectedMeetingType
                          );

                        return (
                          <>
                            <div className='row preferencesrow' key={item.id}>
                              <div className='col-md-7'>
                                <div className='input-group'>
                                  <div className='input-group-prepend'>
                                    <span className='input-group-text'>
                                      <i
                                        data-toggle='tooltip'
                                        data-placement='top'
                                        title={
                                          toolTipSelected?.tool_tip || 'Default'
                                        }
                                        className='fa fa-question-circle-o'
                                        aria-hidden='true'
                                      ></i>
                                    </span>
                                  </div>
                                  <select
                                    className='form-control'
                                    id='sel1'
                                    defaultValue={
                                      userServices?.[index]?.meeting_type
                                    }
                                    {...register(
                                      `meeting_types.${index}.meeting_type`
                                    )}
                                  >
                                    {meetingOptions?.data?.data?.map(
                                      (option) => (
                                        <option
                                          value={option?.name?.trim()}
                                          key={option.name}
                                        >
                                          {option?.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              </div>
                              <div className='col-md-4'>
                                <div className='input-group'>
                                  <div className='input-group-prepend'>
                                    <span className='input-group-text'>
                                      <i
                                        className='fa fa-clock-o'
                                        aria-hidden='true'
                                      ></i>
                                    </span>
                                  </div>
                                  <select
                                    className='form-control'
                                    id='sel1'
                                    defaultValue={userServices?.[index]?.time}
                                    {...register(`meeting_types.${index}.time`)}
                                  >
                                    {meetingTimingOptions?.map((option) => (
                                      <option value={option} key={option}>
                                        {option} minutes
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className='col-md-1'>
                                <div className='delete-icon'>
                                  <Link
                                    to='#'
                                    onClick={() =>
                                      onDelete({
                                        index,
                                        serviceID:
                                          userServices?.Data?.[index]?.id || null,
                                      })
                                    }
                                  >
                                    <img
                                      src={deleteee}
                                      className='img-fluid'
                                      alt=''
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='add-service'>
                            <a
                              href='#'
                              onClick={() =>
                                append({
                                  meeting_type: 'Career Advice (Exploration)',
                                  time: 30,
                                })
                              }
                            >
                              <img src={add} className='img-fluid' alt='' />
                              Add Service
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3>Preferences</h3>
                    <p>
                      Set your monthly capacity. Its 2 meetings by default but you can change
                      these in your Settings at any time.
                    </p>
                    <div className='preferences-box'>
                      <div className='row preferencesrow'>
                        <div className='col-md-12'>
                          {/* <div className='form-group'>
                            <label>TImezone</label>
                            <div className='input-group'>
                              <div className='input-group-prepend'>
                                <span className='input-group-text'>
                                  <i
                                    className='fa fa-clock-o'
                                    aria-hidden='true'
                                  ></i>
                                </span>
                              </div>
                              <select
                                className='form-control'
                                id='sel1'
                                {...register('timezone')}
                              >
                                {timezonesOptions?.data?.result?.timezones?.map(
                                  (option) => (
                                    <option
                                      key={option.key}
                                      value={`${option.key} ${option.name}`}
                                    >
                                      {option.key} {option.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div> */}
                          <div className='form-group mb-0'>
                            <label>
                              How many meetings can you offer as an Advisor each
                              month?
                            </label>
                            <input
                              type='number'
                              className='form-control preferences-control'
                              placeholder='2'
                              {...register('monthly_capacity', {
                                valueAsNumber: true,
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3>Availability</h3>
                    <p>
                      Let Advisees know when you’re generally free each week.
                      The more timeslots you offer, the fewer back-and-forths
                      are needed to align on a meeting time. You’ll have the
                      final say before accepting any meeting request.
                    </p>
                    <div className='availability-box'>
                      <div className='form-group'>
                        <label>When are you generally free each week?</label>
                        <textarea
                          className='form-control'
                          required
                          rows='4'
                          id='comment'
                          placeholder='E.g. Weekdays between 3pm - 5pm, Weekends between 10am - 2pm (Pacific Time)'
                          {...register('availability_time')}
                        ></textarea>
                      </div>
                    </div>
                    <div className='preferencesbtn'>
                      <button type='submit' className='btn btn-info'>
                        <i className='fa fa-angle-left' aria-hidden='true'></i>
                        Save and Return to Onboarding Checklist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default OrientationMeetingPreference;
