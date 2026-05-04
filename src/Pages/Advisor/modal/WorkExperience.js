import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextareaWithCount } from '../../../Components/Common/TextareaWithCount';
import { toasterAlert } from '../../../Helpers/Functions';
import ApiRequest from '../../../Services/ApiRequest';
import * as yup from 'yup';
import Search from "../../../assets/images/WizardImages/search.png";
import { yupResolver } from '@hookform/resolvers/yup';
import CustomSelect from '../../../Components/Common/CustomSelect';

const AddWorkExperience = ({ getInitialAdvisorData }) => {
  return <WorkExperienceForm getInitialAdvisorData={getInitialAdvisorData} />;
};

const schema = yup
  .object({
    title: yup
      .string()
      .min(3, 'Title cannot be less than 3 Characters.')
      .required('Required'),
//    company: yup.mixed().required('Required'),
    company: yup.string().required('Required'),
    industry: yup.mixed().required('Required'),
    role: yup.string().required('Required'),
    employment_type: yup
      .string()
      .max(300, 'You cannot write more than 300 Characters in this field')
      .required('Required'),
    // ask_me_about: yup
    //   .string()
    //   .max(300, 'You cannot write more than 300 Characters in this field')
    //   .notRequired(),
    is_current: yup.boolean(),
    start_date: yup.date().required('Field is required'),
    end_date: yup.mixed().when('is_current', {
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

const WorkExperienceForm = ({
  preloadedValues = null,
  type = 'add',
  ID = '',
  getInitialAdvisorData,
  handleDelete,
}) => {
  const defaultValues = useMemo(() => {
    return {
      title: '',
      company: '',
      industry: '',
      role: 'Select Role',
      employment_type: '',
      ask_me_about: '',
      is_current: 0,
      start_date: '',
      end_date: '',
    };
  }, []);

  const [workData, setWorkData] = useState({
    work_experiences: [],
    companies: [],
    industries: [],
    work_roles: [],
    Employment_Type: [],
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const isCurrentActive = watch('is_current');

  useEffect(() => {
    getWorkData();
  }, []);


  useEffect(() => {
    // console.log('preloaded is_current',preloadedValues?.is_current)
    reset({
      title: preloadedValues?.title,
      company: preloadedValues?.company,
/*      company: {
        label: preloadedValues?.company,
        value: preloadedValues?.company
      },
      industry: preloadedValues?.industry,
*/
      industry: {
        label: preloadedValues?.industry,
        value: preloadedValues?.industry
      },
      role: preloadedValues?.role,
      employment_type: preloadedValues?.employment_type,
      employment_type_other: preloadedValues?.employment_type_other,
      ask_me_about: preloadedValues?.ask_me_about,
      is_current: preloadedValues?.is_current,
      start_date: preloadedValues?.start_date,
      end_date: preloadedValues?.end_date,
    });
    setValue('employment_type', preloadedValues?.employment_type);
  }, [preloadedValues, ID, reset]);

  useEffect(() => {
    if (isSubmitSuccessful && type === 'add') {
      reset({
        ...defaultValues,
      });
    }
  }, [defaultValues, isSubmitSuccessful, reset, type]);

  const getWorkData = useCallback(async () => {
    try {

      let response = await ApiRequest.getRequest('/api/get-work-dropdowns');
      // let response = await ApiRequest.getRequestAdvisor(
      //   'get-work-dropdowns'
      // );

      const { companies, industries, work_roles, Employment_Type } =
        response.data.result;

      if (response.data.result) {
        setWorkData({
          companies,
          industries,
          work_roles,
          Employment_Type,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const submitWork = async (data, event) => {
    console.log('called')
    const formData = new FormData(event.target);
    if (getValues('is_current') === true || getValues('is_current') === 1) {
      formData.set('is_current', 1);
    } else {
      formData.set('is_current', 0);
    }

    let user_type = window.location.pathname.split('/')[1]
    try {
      let response;
      if (ID !== '' && type === 'edit') {

        const sendData = {
          id: parseInt(ID),
          company: formData.get('company'),
          employment_type: data.employment_type,
          start_date: formData.get('start_date'),
          end_date: formData.get('end_date'),
          industry: formData.get('industry'),
          is_current: formData.get('is_current'),
          role: data.role,
          title: data.title,
          ask_me_about: data.ask_me_about,
        };
        // console.log(sendData)
        formData.set('id', ID);

      
        if(user_type == 'advisee'){
          response = await ApiRequest.putRequest('/api/update-work-experience', sendData);
        }else if(user_type == 'advisor'){
          response = await ApiRequest.putRequestAdvisor(
            'update-work-experience',
            sendData,
            ID
          );
        }
        document.getElementById('closeEditWork').click();
      } else {


        if(user_type == 'advisee'){
          response = await ApiRequest.postRequest('/api/add-work-experience', formData);
        }else if(user_type == 'advisor'){
          response = await ApiRequest.postRequestAdvisor(
            'add-work-experience',
            formData
          );
        }

        document.getElementById('closeAddWork').click();
      }
      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        toasterAlert('success', 'Work Experience has Been Updated!');
        await getInitialAdvisorData();
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
      <form onSubmit={handleSubmit(submitWork)}>
        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group'>
              <label name='title'>Title</label>
              <input
                type='text'
                class='form-control'
                placeholder='E.g. Product Manager'
                name='title'
                {...register('title')}
              />
              {errors.title && (
                <small className='text-danger'>{errors.title.message}</small>
              )}
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group  form-inputs-search'>
              <label>Company</label>
              <input
                type='text'
                class='form-control'
                placeholder=''
                name='company'
                {...register('company')}
              />
              {errors.company && (
                <small className='text-danger'>{errors.company.message}</small>
              )}
              
              {/* <select
                class='form-control'
                id='company'
                {...register('company')}
              >
                {workData?.companies?.map((company) => (
                  <option value={company?.name?.trim()}>{company.name}</option>
                ))}
              </select> */}
              {/*<CustomSelect
                name='company'
                control={control}
                optionsArr={workData?.companies}
              />
              <img src={Search} alt='' />
              {errors.company && (
                <small className='text-danger'>{errors.company.message}</small>
              )}
              */}
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group form-inputs-search'>
              <label>Industry</label>
              <CustomSelect
                name='industry'
                control={control}
                optionsArr={workData?.industries}
              />
              <img src={Search} alt='' />
              {errors.industry && (
                <small className='text-danger'>{errors.industry.message}</small>
              )}
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group'>
              <label>Role</label>
              <select
                class='form-control'
                id='sel1'
                name='role'
                placeholder='role'
                {...register('role')}
              >
                {workData?.work_roles?.map((role) => (
                  <option value={role.name}>{role.name}</option>
                ))}
              </select>
              {errors.work_roles && (
                <small className='text-danger'>
                  {errors.work_roles.message}
                </small>
              )}
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group'>
              <label>Employment Type</label>
              <ul class='employment-type'>
                {workData.Employment_Type?.map((employType) => (
                  <li key={employType}>
                    <div class='radio-d'>
                      <label class='form-check-label'>
                        <input
                          type='radio'
                          class='form-check-input'
                          name='employment_type'
                          value={employType}
                          // defaultChecked={employType === 'Full-time'}
                          {...register('employment_type')}
                        />
                        {employType}
                      </label>
                    </div>
                  </li>
                ))}
                 <li>
                  <input
                    type='text'
                    disabled={watch('employment_type') !== 'Other (Specify)' ? true : false}
                    {...register('employment_type_other')}
                  />
                </li>           
                {errors.employment_type && (
                  <small className='text-danger'>
                    {errors.employment_type.message}
                  </small>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div class='row row-half'>
          <div class='col-md-6'>
            <div class='form-group'>
              <label>Start Date</label>
              <input
                type='date'
                class='form-control'
                placeholder='01/20/2000'
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
              <label>End Date</label>
              <input
                type={isCurrentActive == 1? 'text' : 'date'}
                class={`form-control ${isCurrentActive == 1 ? null : 'disabled'}`}
                name='end_date'
                disabled={isCurrentActive == 1 ? true : false}
                {...register('end_date')}
              />
              {errors.end_date && (
                <small className='text-danger'>{errors.end_date.message}</small>
              )}
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-12'>
            <div class='form-group'>
              <div class=' checkbox-design'>
                <label class='form-check-label' html='is_current'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    name='is_current'
                    {...register('is_current')}
                  />
                  I currently work in this role
                </label>
              </div>
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
                careerlabel='Why did you choose this role? How did you land it — and succeed? What challenges did you overcome?'
                placeholder='E.g. Breaking into finance, working and living abroad ...'
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
                        handleDelete('delete-work-experience', ID)
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
                    id='closeAddWork'
                  >
                    Cancel
                  </button>
                )}
              </div>
              <div class='col-md-6'>
                {type === 'edit' && (
                  <button
                    type='button'
                    id='closeEditWork'
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

export default AddWorkExperience;
export { WorkExperienceForm };
