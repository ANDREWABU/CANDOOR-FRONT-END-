import { useForm } from 'react-hook-form';
import ApiRequest from '../../../Services/ApiRequest';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { selectOptions } from '../../../Helpers/UtilityFunctions';
import { toasterAlert } from '../../../Helpers/Functions';
import { TextareaWithCount } from '../../../Components/Common/TextareaWithCount';
import * as yup from 'yup';
import Search from '../../../assets/images/WizardImages/search.png';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomSelect from '../../../Components/Common/CustomSelect';

const AddEducationExperience = ({ getInitialAdvisorData, isAdvisee }) => {
  return (
    <EducationExperienceForm isAdvisee={isAdvisee} getInitialAdvisorData={getInitialAdvisorData} />
  );
};

const schema = yup
  .object({
    school: yup.mixed().required('Required'),
    degree: yup.string().required('Required'),
    fields_of_study: yup
      .array()
      .max(5, 'Fields of study cannot be more than 5.')
      .required('Required')
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      ),
    // ask_me_about: yup
    //   .string()
    //   .max(300, 'You cannot write more than 300 Characters in this field')
    //   .required('Required')
    //   .nullable(),
    is_current: yup.boolean(),
    start_date: yup.date().required('Field is required'),
    graduation_year: yup.mixed().when('is_current', {
      is: false,
      then: yup
        .date()
        .when('start_date', (start_date, schema) => {
          if (start_date) {
            const dayAfter = new Date(start_date.getTime() + 86400000);

            return schema.min(
              dayAfter,
              'End date has to be after than start date'
            );
          }

          return schema;
        })
        .required('Required'),
      otherwise: yup.string(),
    }),
  })
  .required('Required');

const EducationExperienceForm = ({
  preloadedValues = null,
  type = 'add',
  ID = '',
  getInitialAdvisorData,
  handleDelete,
  isAdvisee = true
}) => {
  const defaultValues = useMemo(() => {
    return {
      school: '',
      degree: 'Select Degree',
      fields_of_study: [],
      graduation_year: '',
      ask_me_about: '',
      is_current: false,
      start_date: '',
    };
  }, []);
  const [educationData, setEducationData] = useState({
    education_experiences: [],
    schools: [],
    degrees: [],
    field_of_studies: [],
  });
  const [options, setOptions] = useState([]);
  const {
    register,
    handleSubmit,
    getValues,
    control,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const isCurrentActive = watch('is_current', false);

  useEffect(() => {
    getEducationData();
  }, []);

  // console.log(preloadedValues?.field_of_studies)
  // let user_type = window.location.pathname.split('/')[1]
  // console.log(user_type)
  useEffect(() => {

    reset({
      school: {
        label: preloadedValues?.school,
        value: preloadedValues?.school,
      },
      degree: preloadedValues?.degree,
      fields_of_study: preloadedValues?.fields_of_study,
      graduation_year: preloadedValues?.graduation_year,
      ask_me_about: preloadedValues?.ask_me_about,
      is_current: preloadedValues?.is_current,
      start_date: preloadedValues?.start_date,
    });
  }, [preloadedValues, ID, reset]);

  useEffect(() => {
    if (isSubmitSuccessful && type === 'add') {
      reset({
        ...defaultValues,
      });
    }
  }, [defaultValues, isSubmitSuccessful, reset, type]);

  const getEducationData = useCallback(async () => {
    try {

      let response;
      response = await ApiRequest.getRequest('/api/get-education-dropdowns');


      const { field_of_studies, schools, degrees, education_experiences } =
        response.data.result;
      if (response.data.result) {
        setEducationData({
          field_of_studies,
          schools,
          degrees,
          education_experiences,
        });
        setOptions(
          selectOptions(field_of_studies.map((field) => field['name']))
        );
        // console.log('After State up : ', educationData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  
  const submitEducation = async (hookData, event) => {
    const formData = new FormData(event.target);
    if (getValues('is_current') === true || getValues('is_current') === 1) {
      formData.set('is_current', 1);
      formData.set('graduation_year', '');
    } else {
      formData.set('is_current', 0);
    }
    // console.log("While Submitting Form : ", formData.get('school'));
    // hookData.fields_of_study.forEach(item => {
    //   var st = {}
    //   st['value'] = item['value']
    //   st['label'] = item['label']
    //   field_of_studies_arr.push(st)
    // })
    // console.log(hookData.fields_of_study)
    // console.log(field_of_studies_arr)
    // formData.set('fields_of_study', field_of_studies_arr)
    let user_type = window.location.pathname.split('/')[1]

    try {
      let response;
      if (ID !== '' && type === 'edit') {


        const data = {
          id: parseInt(ID),
          school: formData.get('school'),
          degree: formData.get('degree'),
          fields_of_study: hookData.fields_of_study,
          graduation_year:
            formData.get('graduation_year') && formData.get('graduation_year'),
          start_date: formData.get('start_date'),
          is_current: formData.get('is_current'),
          ask_me_about: formData.get('ask_me_about'),
        };
        formData.set('id', ID);

        if (user_type == 'advisee') {
          response = await ApiRequest.putRequest('/api/update-education-experience', data);

        } else if (user_type == 'advisor') {
          response = await ApiRequest.putRequestAdvisor(
            'update-education-experience',
            data
          );
        }

        document.getElementById('closeEditEducation').click();
      } else {

        const data2 = {
          school: formData.get('school'),
          degree: formData.get('degree'),
          fields_of_study: hookData.fields_of_study,
          graduation_year:
            formData.get('graduation_year') && formData.get('graduation_year'),
          start_date: formData.get('start_date'),
          is_current: formData.get('is_current'),
          ask_me_about: formData.get('ask_me_about'),
        }

        if (user_type == 'advisee') {
          response = await ApiRequest.postRequest('/api/add-education-experience', data2);
        } else if (user_type == 'advisor') {
          response = await ApiRequest.postRequestAdvisor(
            'add-education-experience',
            data2
          );
        }
        document.getElementById('closeAddEducation').click();
      }
      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        toasterAlert('success', 'Education Section has Been Updated!');
        await getInitialAdvisorData();
        reset({ defaultValues });
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
      <form onSubmit={handleSubmit(submitEducation)}>
        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group form-inputs-search'>
              <label>School</label>
              <CustomSelect
                name='school'
                control={control}
                optionsArr={educationData?.schools}
              />
              <img src={Search} alt='' />
            </div>
            {errors.school && (
              <small className='text-danger'>{errors.school.message}</small>
            )}
          </div>
        </div>
        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group'>
              <label>Degree</label>
              <select
                class='form-control'
                id='sel1'
                name='degree'
                {...register('degree')}
              >
                {educationData?.degrees?.map((degree) => (
                  <option value={degree.name}>{degree.name}</option>
                ))}
              </select>
              {errors.degree && (
                <small className='text-danger'>{errors.degree.message}</small>
              )}
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-12'>
            {/* form-inputs-search */}
            <div class='form-group tag-design form-inputs-search'>
              <label>Major(s) / Field(s) of study</label>

              <Controller
                name='fields_of_study'
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      isMulti
                      classNamePrefix='react-select-custom'
                      options={options}
                      {...field}
                    />
                  </>
                )}
              // rules={{ required: 'Fields of Studies are required' }}
              />
              <img src={Search} alt='' />
              {errors.fields_of_study && (
                <small className='text-danger'>
                  {errors.fields_of_study.message}
                </small>
              )}
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group'>
              {/* <label>Graduation or Expected Graduation Date</label> */}
              <div class='row row-half'>
                <div class='col-md-6'>
                  <div class='form-group'>
                    <label>Start Date</label>
                    <input
                      type='date'
                      class='form-control'
                      placeholder='01/20'
                      name='start_date'
                      {...register('start_date')}
                    />
                    {errors.start_date && (
                      <small className='text-danger'>
                        {errors.start_date.message}
                      </small>
                    )}
                  </div>
                </div>
                <div class='col-md-6'>
                  <div class='form-group'>
                    <label>Graduation Date</label>
                    <input
                      type='date'
                      class={`form-control ${isCurrentActive ? null : 'disabled'
                        }`}
                      // placeholder='05/20'
                      disabled={isCurrentActive ? true : false}
                      name='graduation_year'
                      {...register('graduation_year')}
                    />
                    {errors.graduation_year && (
                      <small className='text-danger'>
                        {errors.graduation_year.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group checkbox-design'>
              <label class='form-check-label' html='is_current'>
                <input
                  class='form-check-input'
                  type='checkbox'
                  id='terms'
                  name='is_current'
                  {...register('is_current')}
                />
                I am currently studying.
              </label>
              {errors.is_current && (
                <small className='text-danger'>
                  {errors.is_current.message}
                </small>
              )}
            </div>
          </div>
        </div>
        {/* <div class='row'>
          <div class='col-md-12'>
            <div class='form-group mb-0'>
              <TextareaWithCount
                id='comment'
                label='Ask Me About...'
                defaultLength={getValues('ask_me_about')?.length}
                careerlabel='What were your involvements in school? What perspectives would you like to share?'
                placeholder='E.g. choosing a major, making the most of your summer internships ...'
                maxLength={300}
                error={
                  <>
                    {errors.ask_me_about && (
                      <small className='text-danger'>
                        {errors.ask_me_about.message}
                      </small>
                    )}
                  </>
                }
                {...register('ask_me_about')}
              />
            </div>
          </div>
        </div> */}

        <div class='modal-footer'>
          <div class='modal-footer-btn'>
            <div class='row'>
              <div class='col-md-6'>
                {type === 'edit' ? (
                  <>
                    <button
                      type='button'
                      class='btn btn-info btn-cancel deletebtn'
                      onClick={(e) =>
                        handleDelete(
                          'delete-education-experience',
                          ID,
                          'education'
                        )
                      }
                      data-dismiss='modal'
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    type='button'
                    class='btn btn-info btn-cancel'
                    data-dismiss='modal'
                    id='closeAddEducation'
                  >
                    Cancel
                  </button>
                )}
              </div>
              <div class='col-md-6'>
                {type === 'edit' && (
                  <button
                    type='button'
                    id='closeEditEducation'
                    style={{ display: 'none' }}
                    data-dismiss='modal'
                  />
                )}
                <button type='submit' class='btn btn-info'>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddEducationExperience;
export { EducationExperienceForm };
