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
import { Button } from 'react-bootstrap';


const schema = yup
  .object({
    note: yup.string().required('Please include a note to the Advisee'),
  })
  .required();
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
  const sendPostRequest = async (formData) => {

//    console.log(formData)
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


function CancalMeeting ({ type = '', image = null, meetingID, advisor_timezone, meeting_data, id, service}) {
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: postData } = useMutation(sendPostRequest, {
    onSuccess: () => {
//      history.go();
//      document.getElementById('closeBtnAdvisorCM')?.click();
      history.push('/advisor/dashboard');
//      document.getElementById('closeBtnAdvisorCM')?.click();

    },
  });

  const [cancelButtonText, setcancelButtonText ] = useState('Yes, Cancel');


  function onSubmit(data) {
    setcancelButtonText('Loading ...')
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.set(key, value);
    }
    formData.set('meeting_id', meetingID);
    formData.set('meeting_id', id);
    
  console.log('87 formData');
  console.log(formData);
    postData(formData);
  }

  return (
    <>
      <ModalWrapper
        id="myModal"
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
                {/* <p>Please explain why you need to cancel this meeting.</p> */}
                
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
              <div class="row">
                <div class="col-md-6">
                  <div
                    type="hidden"
                    data-dismiss="modal"
                    id="closeBtnAdvisorCM"
                  >
                  </div>

                  <button  type="button" data-toggle="modal" data-dismiss="modal" data-target="#myModal11" class="btn btn-info grayb-btn">
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
      <Resechdule ModalId="myModal11" advisor_timezone={advisor_timezone} meeting_data={meeting_data} id={id} service={service} />
    </>
  );
};

export default CancalMeeting;
