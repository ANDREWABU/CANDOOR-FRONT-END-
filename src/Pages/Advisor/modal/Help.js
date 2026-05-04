import ModelWrapper from '../../../Components/Common/ModalWrapper';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import ApiRequest from '../../../Services/ApiRequest';
import { toasterAlert } from '../../../Helpers/Functions';
import { TextareaWithCount } from '../../../Components/Common/TextareaWithCount';
import { Link } from 'react-router-dom';

function Help({ advisorData, getInitialAdvisorData }) {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      help: '',
    },
  });

  useEffect(() => {
    reset({
      help: advisorData?.help,
    });
  }, [advisorData]);

  const submitHelp = async (data) => {
    try {
      let response = await ApiRequest.postRequest(
        '/api/advisor-update-help',
        data
      );
      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        toasterAlert('success', 'How can I Help Section has been Updated!');
        await getInitialAdvisorData();
        document.getElementById('closeHelp').click();
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
      <ModelWrapper id='myModal7' title='How I Can Help'>
        <form onSubmit={handleSubmit(submitHelp)}>
          <div class='modal-body'>
            <div class='modalnot'>
              {/* Not sure where to start? Check out these example profiles (
              <a href='#'>1</a>, <a href='#'>2</a>, <a href='#'>3</a>,{' '}
              <a href='#'>4</a>) for inspiration! */}

              What are some specific ways you can help Advisees?
            </div>
            <div class='row'>
              <div class='col-md-12'>
                <div class='form-group mb-0'>
                  <TextareaWithCount
                    id='comment'
                    label='How I can Help'
                    defaultLength={getValues('help')?.length}
                    // rows='7'
                    placeholder='E.g. Preparing for technical interviews, switching careers...'
                    maxLength={300}
                    error={
                      <>
                        {errors.help && (
                          <small className='text-danger'>
                            {errors.help.message}
                          </small>
                        )}
                      </>
                    }
                    {...register('help', {
                      required: 'Field is required',
                    })}
                  />
                  {/* <label htmlFor='help'>How I can Help</label>
                  <textarea
                    class='form-control'
                    rows='4'
                    name='help'
                    placeholder='Breaking into finance and tech, working and living abroad, non-technical roles in tech (strategy, business development, data analytics, operations, product management), applying to business school, personal finance '
                    {...register('help', {
                      required: 'Help value is requird',
                    })}
                  ></textarea>
                  {errors.help && (
                    <small className='text-danger'>{errors.help.message}</small>
                  )}
                  <div class='textlimit'>300/300 characters remaining</div> */}
                </div>
              </div>
            </div>
            <div class='row'>
              <div class='col-md-12'>
                <div class='location-edit'>
                  <p>
                    To edit your meeting types, go to{' '}
                    <Link
                      to='/advisor/setting'
                      onClick={() =>
                        document.getElementById('closeHelp').click()
                      }
                    >
                      Settings
                    </Link>
                  </p>
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
                    id='closeHelp'
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
}

export default Help;
