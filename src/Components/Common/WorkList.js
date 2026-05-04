import { useState, useMemo } from 'react';
import Moment from 'react-moment';
import myjourneylist1 from '../../assets/images/myjourneylist1.png';
import institutionlogo2 from '../../assets/images/institution-logo2.png';
import editpro from '../../assets/images/edit-pro.png';

const WorkList = ({ itemsArr = [], handleWorkEditClick = null }) => {
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

  // console.log(items)

  return (
    <>
      {items?.slice(0, showMore.showMore).map((work) => (
        <>
          <li key={work.company}>
            <div className='myjourneylisticon'>
              <img
                src={myjourneylist1}
                className='img-fluid myjourneylist-icon'
                alt=''
              />
            </div>
            <div className='myjourney-list'>
              {/* <img
                src={institutionlogo2}
                className='img-fluid institutionlogo'
                alt=''
              /> */}
              <div className='myjourney-desc'>
                <h4>{work.company}</h4>
                <h5>{work.title}</h5>
                <h6>
                  <Moment unit='years' format='MMM YYYY ' local element='span'>
                    {work.start_date}
                  </Moment>
                  -
                  {
                    work.end_date ?
                      <>
                        <Moment unit='years' format=' MMM YYYY ' local element='span'>
                          {work.end_date}
                        </Moment>{' '}
                        • {work.duration_time}
                      </>
                      :
                      <>
                        <span>
                        &nbsp;Present
                        </span>{' '}
                        • {work.duration_time}
                      </>
                  }
                </h6>
                {/* <div className='askme'>
                  <a href='#'>
                    {work.ask_me_about ?  `Ask me about ${work.ask_me_about}` : `Ask me about ...`}
                  </a>
                </div> */}
                <input type='hidden' value={work.WorkExperienceID} />
                {handleWorkEditClick && (
                  <>
                    <a
                      className='hovertooltip editicon'
                      href='#'
                      data-toggle='modal'
                      data-target='#myModal5'
                      onClick={(e) =>
                        handleWorkEditClick(e, work.WorkExperienceID)
                      }
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

export default WorkList;
