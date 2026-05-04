import ModelWrapper from '../../../Components/Common/ModalWrapper';
import { useEffect, useState } from 'react';
import { WorkExperienceForm } from './WorkExperience';
import moment from 'moment';

function EditWorkExperience({
  workExperience,
  id = '',
  getInitialAdvisorData,
  handleDelete,
}) {
  const [preloadForm, setPreloadForm] = useState({});
 useEffect(() => {
   if (parseInt(id)) {
     const selectedWork = workExperience?.find(
       (work) => work.WorkExperienceID === parseInt(id)
     );
     console.log(selectedWork)

     setPreloadForm({
       company: selectedWork?.company?.trim(),
       title: selectedWork?.title,
       industry: selectedWork?.industry?.trim(),
       employment_type: selectedWork?.employment_type,
       employment_type_other: selectedWork?.employment_type_other || '',
       role: selectedWork?.role,
       is_current: selectedWork?.is_current,
       start_date: moment(selectedWork?.start_date, 'YYYY-MM-DD').format(
         'YYYY-MM-DD'
       ),
       end_date: selectedWork?.end_date? moment(selectedWork?.end_date, 'YYYY-MM-DD').format(
         'YYYY-MM-DD'
       ):'',
       ask_me_about: selectedWork?.ask_me_about,
     });
   }
 }, [workExperience, id]);

  return (
    <>
      <ModelWrapper title='Edit Work Experience' id='myModal5'>
        <div className='modal-body'>
          <WorkExperienceForm
            type='edit'
            preloadedValues={preloadForm}
            ID={id}
            getInitialAdvisorData={getInitialAdvisorData}
            handleDelete={handleDelete}
          />
        </div>
      </ModelWrapper>
    </>
  );
}

export default EditWorkExperience;
