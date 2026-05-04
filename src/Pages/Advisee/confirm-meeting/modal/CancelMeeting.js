import ModalWrapper from '../../../../Components/Common/ModalWrapper';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { toasterAlert } from '../../../../Helpers/Functions';
import ApiRequest from '../../../../Services/ApiRequest';
import { TextareaWithCount } from '../../../../Components/Common/TextareaWithCount';
import { useState } from 'react';
import Resechdule from './Resechdule';


const schema = yup
  .object({
    note: yup.string().required('Required'),
  })
  .required();

const sendPostRequest = async (formData) => {

  console.log(formData)
  try {
    const response = await ApiRequest.postRequest(
      '/api/cancel-meeting',
      formData
    );
    if (
      response !== undefined &&
      response.status === 200 &&
      response.status !== 422
    ) {
      toasterAlert(
        'success',
        'Your meeting has been cancelled.'
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

function CancalMeeting({ type = '', image = null, meetingID, id, service,advisee_timezone,  meeting_data}) {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [cancelButtonText, setcancelButtonText ] = useState('Yes, Cancel');

  const { mutate: postData } = useMutation(sendPostRequest, {
    onSuccess: () => {
      history.push('/advisee/dashboard');
    },
  });

  function onSubmit(data) {
    const formData = new FormData();
    setcancelButtonText('Loading ...')
    for (const [key, value] of Object.entries(data)) {
      formData.set(key, value);
    }
    formData.set('meeting_id', meetingID);
	    postData(formData);
  }

  return (
    <>
      <ModalWrapper
        id="myModalCancel"
        title={
          type === 'warning'
            ? 'Warning: Last-Minute Cancellation'
            : 'Are you sure you want to cancel?'
        }
        className="modal-dnew mwidth-five"
        image={image ? image : null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                {type === 'warning' ? (
                  <>
                    <p style={{ color: '#D62755' }}>
                      Your meeting is less than 12 hours away!
                    </p>
                    <p>
                      While we understand that life happens, cancelling
                      last-minute can make the other person feel like their time
                      isn’t being valued.
                    </p>
                    <p>
                      As a reminder, users who reschedule or cancel less than
                      12 hours in advance of their meeting will be removed from
                      our platform after 3 violations.
                    </p>
                  </>
                ) : (
                  <p>
                    While we understand that life happens, cancelling a meeting
                    can make the other person feel like they aren’t valued.
                    Candoor reserves the right to terminate the accounts of
                    users who cancel too frequently.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-0">
                <label>Add a Note (Required)</label>
                {/* <p>Please explain  you need to cancel this meeting.</p> */}
                
                <TextareaWithCount
                placeholder=""
                rows="4"
                careerlabel="Please explain why you need to cancel this meeting."
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
                  <div
                    type="button"
                    data-dismiss="modal"
                    id="closeBtnAdviseeCM"
                  ></div>

              <div class="row">
                
                <div class="col-md-6">
                  <button type="button" data-toggle="modal" data-dismiss="modal" data-target="#myModal16" class="btn btn-info grayb-btn">
                    No, I’ll reschedule instead
                  </button>
                </div>
                <div class="col-md-6">
                  <button type="submit" class="btn btn-info redbtn">
                    {cancelButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModalWrapper>
      <Resechdule ModalId="myModal16" advisee_timezone={advisee_timezone} meeting_data={meeting_data} id={id} service={service} /> 

    </>
  );
};

export default CancalMeeting;
