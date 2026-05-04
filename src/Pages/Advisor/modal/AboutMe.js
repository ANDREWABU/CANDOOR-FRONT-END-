import ModelWrapper from '../../../Components/Common/ModalWrapper';
import { useForm } from 'react-hook-form';

import { useEffect } from 'react';
import { toasterAlert } from '../../../Helpers/Functions';
import ApiRequest from '../../../Services/ApiRequest';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextareaWithCount } from '../../../Components/Common/TextareaWithCount';
import { formatBytes } from '../../../Helpers/UtilityFunctions';

const schema = yup.object({
  about_me: yup
    .string()
    .max(500, 'About Me cannot be more than 500 characters!')
    .required('Field cannot be empty'),
  profile_video: yup.mixed().nullable(),
});

function AboutMe({ isAdvisee, advisorData, getInitialAdvisorData }) {

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    about_me: '',
    profile_video: '',
    resolver: yupResolver(schema),
  });
  const profile_video = watch('profile_video');
  let fileSize = null;
  if (profile_video && profile_video[0]?.name) {
    fileSize = formatBytes(profile_video[0]?.size);
  }
  useEffect(() => {
    reset({
      about_me: advisorData?.about_me,
      profile_video: advisorData?.profile_video,
    });
  }, [advisorData, reset]);

  const submitAboutMe = async (data, event) => {
    const formData = new FormData(event.target);


    try {

      let response;
      if(isAdvisee){
        response = await ApiRequest.postRequest(
          '/api/advisees-update-about-me',
          formData
        );
        
      }else{
        response = await ApiRequest.postRequest(
          '/api/advisor-update-about-me',
          formData
        );
      }





      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        toasterAlert('success', 'About me Has Been Updated!');
        await getInitialAdvisorData();
        document.getElementById('closeAboutMe').click();
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
      <ModelWrapper title='About Me' id='myModal2'>
        <form onSubmit={handleSubmit(submitAboutMe)}>
          <div class='modal-body'>
            <div class='modalnot'>
              {
                isAdvisee ? `Introduce yourself to Advisors! What would you like them to know about your background, career & education journey and goals?` : `Tell Advisees about yourself in the first-person! What are you passionate about? How did you get to where you are today?`
              }

              {/* Not sure where to start? Check out these example profiles (
              <a href='#'>1</a>, <a href='#'>2</a>, <a href='#'>3</a>,{' '}
              <a href='#'>4</a>) for inspiration! */}
            </div>
            <div class='row'>
              <div class='col-md-12'>
                <div class='form-group mb-0'>
                  <TextareaWithCount
                    id='comment'
                    label='About Me'
                    defaultLength={getValues('about_me')?.length}
                    // rows='7'
                    placeholder="E.g I am currently a Program manager at ...."
                    maxLength={500}
                    error={
                      <>
                        {errors.about_me && (
                          <small className='text-danger'>
                            {errors.about_me.message}
                          </small>
                        )}
                      </>
                    }
                    {...register('about_me')}
                  />
                </div>
              </div>
            </div>

            {/* <div class='row'>
              <div class='col-md-12'>
                <div class='form-group inputDnD cover-photo'>
                  <label>Intro Video (1-2 min.) </label>
                  <div class='careerlabel'>
                    Advisors who upload intro videos have a higher likelihood of
                    receiving meeting requests from Advisees.
                  </div>
                  <div class='drag-sec'>
                    <div class='dragdiv'>
                      <input
                        type='file'
                        name='profile_video'
                        class='form-control-file text-primary font-weight-bold'
                        accept='video/*'
                        onchange='readUrl(this)'
                        data-title='Drag & Drop here'
                        {...register('profile_video')}
                      />
                      <img
                        src='assets/images/upload.png'
                        class='img-fluid'
                        alt=''
                      />
                      <h4>
                        {profile_video !== null && (
                          <>
                            {profile_video !== null && (
                              <>
                                <span
                                  style={{ margin: '2px', fontSize: '1.25em' }}
                                >
                                  {profile_video && profile_video[0]?.name}
                                </span>
                                <span
                                  style={{ margin: '2px', fontSize: '1em' }}
                                >
                                  {profile_video && fileSize}
                                </span>
                              </>
                            )}
                          </>
                        )}
                        <a href='#'>Click to upload</a> or drag and drop{' '}
                        <span>MP4, MOV, etc.</span>
                        {errors.profile_video && (
                          <small className='text-danger'>
                            {errors.profile_video.message}
                          </small>
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div class='modal-footer'>
            <div class='modal-footer-btn'>
              <div class='row'>
                <div class='col-md-6'>
                  <button
                    type='button'
                    class='btn btn-info btn-cancel'
                    data-dismiss='modal'
                    id='closeAboutMe'
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

export default AboutMe;
