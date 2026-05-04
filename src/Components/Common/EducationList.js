import { useState, useMemo } from 'react';
import myjourneylist2 from '../../assets/images/myjourneylist2.png';
import editpro from '../../assets/images/edit-pro.png';
import institutionlogo3 from '../../assets/images/institution-logo3.png';
import Moment from 'react-moment';

const EducationList = ({ itemsArr = [], handleEducationEditClick = null }) => {
  const [showMore, setShowMore] = useState({ showMore: 2, expand: false });
  const items = useMemo(() => [...itemsArr], [itemsArr]);

  const showMoreWork = () => {
    showMore.showMore === 2
      ? setShowMore({
          showMore: items.length,
          expand: true,
        })
      : setShowMore({ showMore: 2, expand: false });
  };

  return (
    <>
      {items?.slice(0, showMore.showMore).map((education) => (
        <>
          <li key={education.degree}>
            <div className='myjourneylisticon'>
              <img
                src={myjourneylist2}
                className='img-fluid myjourneylist-icon'
                alt=''
              />
            </div>
            <div className='myjourney-list'>
              <div className='myjourney-desc'>
                <h4>{education.school}</h4>
                <h5>{education.degree}</h5>
                <h6>
                  {' '}
                  <Moment
                    format='MMM YYYY '
                    parse='YYYY/MM/DD hh:mm:ss'
                    element='span'
                  >
                    {education.start_date}
                  </Moment>
                  -
                  {education.graduation_year !== null ? (
                    <>
                      <Moment
                        format=' MMM YYYY '
                        parse='YYYY/MM/DD hh:mm:ss'
                        element='span'
                      >
                        {education.graduation_year}
                      </Moment>{' '} • {education.education_duration_time}
                    </>
                  ) : (
                    <>
                      <span> Present </span> {' '} 
                      • {education.education_duration_time}
                    </> 
                  )}
                  
                </h6>
                {/* <div className='askme'>
                  <a href='#'>
                    {education.ask_me_about ?  `Ask me about ${education.ask_me_about}` : `Ask me about ...`}
                  </a>
                </div> */}
                <input type='hidden' value={education.EducationExperienceID} />
                {handleEducationEditClick && (
                  <>
                    <a
                      className='hovertooltip editicon'
                      href='#'
                      data-toggle='modal'
                      data-target='#myModal3'
                      onClick={(e) => handleEducationEditClick(e)}
                    >
                      <img src={editpro} className='img-fluid' alt='' />
                      <div className='hovertooltip-d'>Click to edit me!</div>
                    </a>
                  </>
                )}
              </div>
            </div>
          </li>
        </>
      ))}
      {items.length > 2 && (
        <a className='seemore' onClick={showMoreWork}>
          {showMore.expand ? <span>See less</span> : <span>See more</span>}
        </a>
      )}
    </>
  );
};

export default EducationList;
