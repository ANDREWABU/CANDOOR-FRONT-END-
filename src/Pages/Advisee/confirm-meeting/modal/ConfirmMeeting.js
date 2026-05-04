import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import ModalWrapper from '../../../../Components/Common/ModalWrapper';
import { TextareaWithCount } from '../../../../Components/Common/TextareaWithCount';
import { toasterAlert } from '../../../../Helpers/Functions';
import ApiRequest from '../../../../Services/ApiRequest';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import * as yup from 'yup';

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
      '/api/advisee-confirm-meeting',
      formData
    );
    if (
      response !== undefined &&
      response.status === 200 &&
      response.status !== 422
    ) {
      toasterAlert(
        'success',
        'Your meeting is confirmed. You’ll receive a calendar invite with a Zoom link in your inbox shortly.'
      );
      document.getElementById('closeBtnAdviseeCM')?.click();
    } else if (response !== undefined && response.status === 422) {
      toasterAlert('error', response.data.errors[0]);
    } else {
      toasterAlert('error', 'Something went wrong please try again!');
    }
  } catch (error) {
    console.error(error);
  }
};

function ConfirmMeeting({ id, service, intervals_time_zone }) {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [sendCalendarInvite, setsendCalendarInvite ] = useState('Send Calendar Invite');

  
  const { mutate: postData } = useMutation(sendPostRequest, {
    onSuccess: () => {
      history.push('/advisee/dashboard');
      document.getElementById('closeBtnAdviseeCM')?.click();
    },
  });


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
    formData.set('interval_timezone', intervals_time_zone);
console.log('85');

    postData(formData);
  }

  return (
    <ModalWrapper
      id="myModal2"
      title="Confirm Meeting"
      className="modal-dnew mwidth-five"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              {/* <p>
                By default, your {service?.meeting_type} meetings are set to{' '}
                {service?.time} minutes. To change this, go to{' '}
                <a href="/advisee/setting" style={{ color: '#458dfc' }}>
                  Settings.
                </a>
    
              </p> */}
              <p>Confirm meeting time in <strong><span className='timezone-bright-red'>{intervals_time_zone}</span></strong></p>

            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
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

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>From</label>
              <div className="input-group">
                <input
                  type="time"
                  className="form-control"
                  placeholder="Select start time..."
                  {...register('from')}
                />
              </div>
              {errors.from && (
                <small className="text-danger">{errors.from.message}</small>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>To</label>
              <div className="input-group">
                <input
                  type="time"
                  className="form-control"
                  placeholder="Select end time..."
                  {...register('to')}
                />
              </div>
              {errors.to && (
                <small className="text-danger">{errors.to.message}</small>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group mb-0">
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
        <div className="modal-footer">
          <div className="modal-footer-btn">
            <div className="row">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-info btn-cancel"
                  data-dismiss="modal"
                  id="closeBtnAdviseeCM"
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-6">
                <button type="submit" className="btn btn-info">
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