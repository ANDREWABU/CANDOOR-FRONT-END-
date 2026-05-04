import ModelWrapper from '../../../Components/Common/ModalWrapper';

import { useEffect, useState } from 'react';
import { EducationExperienceForm } from './EducationExperience';
import moment from 'moment';

const EditEducationExperience = ({
  educationExperience,
  id = '',
  getInitialAdvisorData,
  handleDelete,
  isAdvisee
}) => {
  const [preloadForm, setPreloadForm] = useState({});
  // console.log(isAdvisee)
  useEffect(() => {
    if (id) {
      const selectedEducation = educationExperience.find(
        (edu) => edu.EducationExperienceID === parseInt(id)
      );

      setPreloadForm({
        school: selectedEducation?.school?.trim(),
        degree: selectedEducation?.degree,
        fields_of_study: JSON.parse(selectedEducation?.fields_of_study),
        graduation_year: moment(
          selectedEducation?.graduation_year,
          'YYYY-MM-DD'
        ).format('YYYY-MM-DD'),
        ask_me_about: selectedEducation?.ask_me_about,
        is_current: selectedEducation?.is_current,
        start_date:
          moment(selectedEducation?.start_date, 'YYYY-MM-DD').format(
            'YYYY-MM-DD'
          ) || '',
      });
    }
  }, [educationExperience, id]);

  return (
    <>
      <ModelWrapper title='Edit Education Experience' id='myModal3'>
        <div className='modal-body'>
          <EducationExperienceForm
            type='edit'
            preloadedValues={preloadForm}
            ID={id}
            getInitialAdvisorData={getInitialAdvisorData}
            handleDelete={handleDelete}
            isAdvisee={isAdvisee}
          />
        </div>
      </ModelWrapper>
    </>
  );
};

export default EditEducationExperience;
