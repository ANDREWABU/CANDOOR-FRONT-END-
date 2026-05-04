// import './onboarding.css';
// Third-party Libs Imports👇
import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CreatableSelect from 'react-select/creatable';

// Custom hooks 👇
import useFetchData from '../../../hooks/useFetchData';

// Project Imports 👇
import Header from '../../../Components/Layouts/AdvisorLayout/Header';
import Search from '../../../assets/images/WizardImages/search.png';
import editimg from '../../../assets/images/edit.png';
import myprofile from '../../../assets/images/myprofile.png';
import upload from '../../../assets/images/upload.png';
import ApiRequest from '../../../Services/ApiRequest';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
import { TextareaWithCount } from '../../../Components/Common/TextareaWithCount';
import { selectOptions } from '../../../Helpers/UtilityFunctions';
import PreviewImage from '../../../Components/Common/PreviewImage';
import { toasterAlert } from '../../../Helpers/Functions';

const defaultValues = {
  headline: '',
  profile_goal: '',
  tags_list: [],
  about_me: '',
  help: '',
};

const schema = yup
  .object({
    headline: yup.string().required('Required'),
    // profile_goal: yup
    //   .mixed()
    //   .required('Required')
    //   .test(
    //     'lessThan10MB',
    //     'Maximum Image upload is 10MB',
    //     (files) => files[0]?.size < 10000000 || 'Max 10MB'
    //   )
    //   .test('acceptedFormats', 'Only PNG, JPEG and JPG are allowed', (files) =>
    //     ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type)
    //   ),
    about_me: yup
      .string()
      .max(500, 'About Me cannot be more than 500 characters!')
      .required('Field cannot be empty'),
    help: yup
      .string()
      .max(300, 'Help section cannot be more than 300 characters!')
      .required('Field cannot be empty'),
    tags_list: yup
      .array()
      .max(5, 'Tags cannot be more than 5.')
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      )
      .required('Required'),
  })
  .required('Required');

function CompleteProfile() {
  const { data, isSuccess, isError, isLoading } = useFetchData({
    queryKey: ['CompleteProfileData', 'advisor'],
    url: '/api/complete-profile',
  });
  // console.log(data)
  const queryClient = useQueryClient();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const profile = watch('profile_goal');

  const postData = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === 'profile_goal') {
        if (typeof value !== 'string') formData.append(key, value[0]);
      } else if (key === 'tags_list') {
        formData.append(key, JSON.stringify(value.map((field) => field.value)));
      } else {
        formData.append(key, value);
      }
    }

    try {
      const response = await ApiRequest.postRequest(
        '/api/update-complete-profile',
        formData
      );
      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        if (isSubmitSuccessful) reset({ defaultValues });
        toasterAlert('success', 'Request Has Been Processed!');
        history.goBack();
      } else if (response !== undefined && response.status === 422) {
        toasterAlert('error', response.data.errors[0]);
      } else {
        toasterAlert('error', 'Something went wrong please try again!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { mutateAsync: onSubmit } = useMutation(postData, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries(['CompleteProfileData', 'advisor']);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const {
        completeProfileData: {
          headline,
          about_me,
          profile_goal,
          help,
          tags_list,
        },
      } = data.data;
      const options = selectOptions(JSON.parse(tags_list));
      // console.log(tags_list)
      reset({
        headline,
        about_me,
        profile_goal,
        help,
        tags_list: options,
      });
    }
  }, [isSuccess, data, reset]);

  if (isLoading) {
    return (
      <>
        <Header />
        <DataLoading />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />
        <DataError />
      </>
    );
  }

  return (
    <>
      <Header />
      <section class='topbg profilebg'>
        <div class='container'>
          <div class='row'>
            <div class='col-md-12'>
              <div class='topbg-left'>
                <h2>
                  Complete Your Profile{' '}
                  <img src={editimg} class='img-fluid' alt='' />
                </h2>
                <p>Expected Time to Completion: 4 min.</p>
                {/* <h5>
                  Not sure what to write? Check out these example profiles (
                  <Link href='#'>1</Link>, <Link href='#'>2</Link>,{' '}
                  <Link href='#'>3</Link>, <Link href='#'>4</Link>) for
                  inspiration!
                </h5> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class='profile-onboarding'>
        <div class='container'>
          <div class='row'>
            <div class='col-md-12'>
              <div class='profile-onboarding-edit form-design'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class='row'>
                    <div class='col-md-12'>
                      <div class='form-group'>
                        <label>
                          Headline <span class='label-star'>*</span>
                        </label>
                        <input
                          type='text'
                          class='form-control'
                          placeholder="Type here...."
                          {...register('headline')}
                        />
                        {errors.headline && (
                          <small className='text-danger'>
                            {errors.headline.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-md-12'>
                      <div class='form-group inputDnD'>
                        <label>
                          Profile Photo <span class='label-star'>*</span>
                          <div>
                            <span className="label-star">
                              Photo must be &lt;2MB
                            </span>
                          </div>
                        </label>
                        <div class='drag-sec'>
                          <div class='dragimg'>
                            {profile && (
                              <PreviewImage
                                file={profile && profile[0]}
                                initialImg={
                                  profile instanceof File || (
                                    <img
                                      style={{
                                        'objectFit': 'cover'
                                      }}
                                      src={
                                        profile !== null
                                          ? process.env.REACT_APP_API_URL + `/${profile}`
                                          : myprofile
                                      }
                                      className='img-fluid'
                                      alt=''
                                    />
                                  )
                                }
                              />

                            )}
                          </div>
                          <div class='dragdiv'>
                            <input
                              type='file'
                              class='form-control-file text-primary font-weight-bold'
                              accept='image/*'
                              onchange='readUrl(this)'
                              data-title='Drag &amp; Drop here'
                              {...register('profile_goal')}
                            />
                            <img src={upload} class='img-fluid' alt='' />
                            <h4>
                              {profile && (
                                <>
                                  <span
                                    style={{
                                      margin: '2px',
                                      fontSize: '0.75em',
                                    }}
                                  >
                                    {profile && profile[0]?.name}
                                  </span>
                                </>
                              )}
                              <Link href='#'>Click to replace</Link> or drag and
                              drop <span>SVG, PNG, JPG or GIF (2 MB Max)</span>
                              {errors.profile_goal && (
                                <small className='text-danger'>
                                  {errors.profile_goal.message}
                                </small>
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class='row'>
                    <div class='col-md-12'>
                      <div class='form-group tag-design'>
                        <label>
                          Tags <span class='label-star'>*</span>
                        </label>
                        <div class='careerlabel'>
                          If you had to choose 5 words that describe your career
                          journey, what would they be? Add up to 5 profile tags
                          (e.g. fintech, growth equity, entrepreneurship,
                          female, first-generation, Latinx) so Advisees can
                          search for you in our Directory.
                        </div>
                        <Controller
                          name='tags_list'
                          control={control}
                          render={({ field }) => (
                            <CreatableSelect
                              isMulti
                              isClearable
                              classNamePrefix='react-select-custom'
                              {...field}
                            />
                          )}
                        />
                        {/* <img src={Search} alt='' /> */}
                        {errors.tags_list && (
                          <small className='text-danger'>
                            {errors.tags_list.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class='row'>
                    <div class='col-md-12'>
                      <div class='form-group'>
                        <TextareaWithCount
                          required
                          label='About Me'
                          maxLength={500}
                          defaultLength={getValues('about_me')?.length}
                          careerlabel='Your bio, written in the first-person. Tell Advisees who you are and what you’re passionate about!'
                          placeholder='Type here...'
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

                  <div class='row'>
                    <div class='col-md-12'>
                      <div class='form-group'>
                        <TextareaWithCount
                          required
                          label='How I Can Help'
                          defaultLength={getValues('help')?.length}
                          careerlabel='What are some unique insights and ways you can help Advisees?'
                          error={
                            <>
                              {errors.help && (
                                <small className='text-danger'>
                                  {errors.help.message}
                                </small>
                              )}
                            </>
                          }
                          placeholder='Type here...'
                          {...register('help')}
                        />
                      </div>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-md-12'>
                      <div class='form-group ondoarding-btn'>
                        <button type='submit' class='btn btn-info'>
                          Save and Publish
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CompleteProfile;
