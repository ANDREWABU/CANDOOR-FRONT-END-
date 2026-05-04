import { useEffect } from 'react';
import ModelWrapper from '../../../Components/Common/ModalWrapper';

import { useForm } from 'react-hook-form';
import ApiRequest from '../../../Services/ApiRequest';
import { toasterAlert } from '../../../Helpers/Functions';
import { TextareaWithCount } from '../../../Components/Common/TextareaWithCount';

const JustForFun = ({ isAdvisee, advisorData, getInitialAdvisorData }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      just_for_fun: '',
    },
  });

  useEffect(() => {
    reset({
      just_for_fun: advisorData?.just_for_fun,
    });
  }, [advisorData]);

  const submitJustForFun = async (data) => {
    try {

      let response;
      if (isAdvisee) {
        response = await ApiRequest.postRequest(
          '/api/advisees-update-just-for-fun',
          data
        );
      } else {
        response = await ApiRequest.postRequest(
          '/api/advisor-update-just-for-fun',
          data
        );
      }

      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        toasterAlert('success', 'Just For Fun Has Been Updated!');
        await getInitialAdvisorData();
        document.getElementById('closeJustForFun').click();
      } else if (response !== undefined && response.status === 422) {
        toasterAlert('error', response.data.errors[0]);
      } else {
        toasterAlert('error', 'Something went wrong please try again!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ModelWrapper title='Just for Fun' id='myModal6'>
        <form onSubmit={handleSubmit(submitJustForFun)}>
          <div class='modal-body'>
            <div class='row'>
              <div class='col-md-12'>
                <div class='form-group mb-0'>
                  <TextareaWithCount
                    id='comment'
                    label='Just for Fun'
                    defaultLength={getValues('just_for_fun')?.length}
                    careerlabel='What do you like to do outside of work?'
                    // rows='7'
                    placeholder='learning new languages (Spanish, French, Mandarin), running (training for my first marathon), playing bass guitar, volunteering at the homeless shelter, hiking with my Golden Retriever...'
                    maxLength={300}
                    // error={
                    //   <>
                    //     {errors.just_for_fun && (
                    //       <small className='text-danger'>
                    //         {errors.just_for_fun.message}
                    //       </small>
                    //     )}
                    //   </>
                    // }
                    {...register('just_for_fun', {
                      required: 'Field is Required',
                    })}
                  />
                  {/* <label>Just for Fun</label>
                  <div class='careerlabel'>
                    What do you like to do outside of work?
                  </div>
                  <textarea
                    class='form-control'
                    rows='3'
                    id='comment'
                    name='just_for_fun'
                    placeholder='learning new languages (Spanish, French, Mandarin), running (training for my first marathon), playing bass guitar, volunteering at the homeless shelter, hiking with my Golden Retriever...'
                    {...register('just_for_fun', {
                      required: 'Fun value is requird',
                    })}
                  ></textarea>
                  {errors.just_for_fun && (
                    <small className='text-danger'>
                      {errors.just_for_fun.message}
                    </small>
                  )}
                  <div class='textlimit'>300/300 characters remaining</div> */}
                </div>
              </div>
            </div>
          </div>
          <div class='modal-footer'>
            <div class='modal-footer-btn'>
              <div class='row'>
                <div class='col-md-6'>
                  <button
                    type='button'
                    class='btn btn-info btn-cancel'
                    data-dismiss='modal'
                    id='closeJustForFun'
                  >
                    Cancel
                  </button>
                </div>
                <div class='col-md-6'>
                  <button type='submit' class='btn btn-info'>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModelWrapper>
    </>
  );
};

export default JustForFun;
