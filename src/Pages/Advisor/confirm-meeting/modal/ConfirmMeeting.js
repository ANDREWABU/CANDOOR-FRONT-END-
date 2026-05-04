import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import ModalWrapper from '../../../../Components/Common/ModalWrapper';
import { TextareaWithCount } from '../../../../Components/Common/TextareaWithCount';
import { toasterAlert } from '../../../../Helpers/Functions';
import ApiRequest from '../../../../Services/ApiRequest';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { fromPairs } from 'lodash';



const schema = yup
  .object({
    date: yup.string().required('Required'),
    from: yup.string().required('Required'),
    to: yup.string().required('Required'),
    note: yup.string(),
  })
  .required();

const sendPostRequest = async (formData) => {
  try {
    const response = await ApiRequest.postRequest(
      '/api/advisor-confirm-meeting',
      formData
    );
    if (
      response !== undefined &&
      response.status === 200 &&
      response.status !== 422
    ) {
      toasterAlert(
        'success',
        'Your meeting is confirmed. You’ll receive a calendar invite with a Zoom link in your inbox shortly'
      );
      document.getElementById('closeBtnAdvisorCM')?.click();
    } else if (response !== undefined && response.status === 422) {
      toasterAlert('error', response.data.errors[0]);
    } else {
      toasterAlert('error', 'Something went wrong please try again!');
    }
  } catch (error) {
    console.error(error);
  }
};

function ConfirmMeeting({ id, service, interval_timezone}) {
  let history = useHistory();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate: postData } = useMutation(sendPostRequest, {
    onSuccess: () => {
      document.getElementById('closeBtnAdvisorCM')?.click();
      history.push('/advisor/dashboard');
    },
  });

  const [sendCalendarInvite, setsendCalendarInvite ] = useState('Confirm');


  const getFromTime = watch('from');


    useEffect(() => {
    setValue(
      'to',
      moment(getFromTime, 'hh:mm').add(service?.meeting_length_minutes, 'minutes').format('HH:mm')
    );
  }, [getFromTime, service, setValue]);
  
  function onSubmit(data) {
    setsendCalendarInvite('Loading ...')
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === 'from' || key === 'to') {
        formData.set(key, moment(value, 'HH:mm').format('hh:mma'));
      } else {
        formData.set(key, value);
      }
    }
    formData.set('meeting_id', id);
    formData.set('interval_timezone', interval_timezone);

    postData(formData);
  }

  

  return (
    <ModalWrapper
      id="myModal2"
      title="Confirm Meeting"
      className="modal-dnew mwidth-five"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <p>
                By default, your {service?.meetingtype} meetings are set to{' '}
                {service?.meeting_length_minutes} minutes. To change this, go to{' '}

                {/* <Link
                      to='/advisor/setting'
                      onClick={() =>
                        document.getElementById('cancelBtn').click()
                      }
                    >
                      Settings
                    </Link> */}
                <a href="/advisor/setting" style={{ color: '#458dfc' }}>
                  Settings.
                </a>
              </p>

              <p>Confirm meeting time in <strong><span className='timezone-bright-red'>{interval_timezone}</span></strong></p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <div class="input-group">
                <input
                  type="date"
                  class="form-control"
                  placeholder="Select Date..."
                  {...register('date')}
                />
              </div>
              {errors.date && (
                <small className="text-danger">{errors.date.message}</small>
              )}
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>From</label>
              <div class="input-group">
                <input
                  type="time"
                  class="form-control"
                  placeholder="Select"
                  {...register('from')}
                />
              </div>
              {errors.from && (
                <small className="text-danger">{errors.from.message}</small>
              )}
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>To</label>
              <div class="input-group">
                <input
                  type="time"
                  class="form-control"
                  placeholder="Select"
                  {...register('to')}
                />
              </div>
              {errors.to && (
                <small className="text-danger">{errors.to.message}</small>
              )}
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-0">
              <label>Add a Note (Optional)</label>
              <TextareaWithCount
                placeholder="Looking forward to meeting you!"
                rows="4"
                careerlabel="Your note will be included in the body of the email containing
                the calendar invite."
                {...register('note')}
              />
              {errors.note && (
                <small className="text-danger">{errors.note.message}</small>
              )}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-footer-btn">
            <div class="row">
              <div class="col-md-6">
                <button
                  type="button"
                  class="btn btn-info btn-cancel"
                  data-dismiss="modal"
                  id="closeBtnAdvisorCM"
                >
                  Cancel
                </button>
              </div>
              <div class="col-md-6">
                <button type="submit" class="btn btn-info">
                  {sendCalendarInvite}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default ConfirmMeeting;