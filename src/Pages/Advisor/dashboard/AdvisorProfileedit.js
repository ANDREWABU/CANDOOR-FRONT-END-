import React from 'react';
import { Link, Switch } from 'react-router-dom';
import Moment from 'react-moment';
import Profile from '../../../assets/images/DashboardImgs/profile.png';
import {
  destroySession,
  toasterAlert as toastAlert,
} from '../../../Helpers/Functions';
import history from '../../../Utils/history';
import Header from '../../../Components/Layouts/AdvisorLayout/Header';
import icon2 from '../../../assets/images/icon2.png';
import icon3 from '../../../assets/images/icon3.png';
import heart from '../../../assets/images/heart.png';

import ApiRequest from '../../../Services/ApiRequest';
import map from '../../../assets/images/map.png';
import clock from '../../../assets/images/clock.png';
import editpro from '../../../assets/images/edit-pro.png';
import profilebg from '../../../assets/images/profilebg.png';
import myprofile from '../../../assets/images/myprofile.png';
import careericon from '../../../assets/images/career-icon.png';
import helplist1 from '../../../assets/images/help-list1.png';
import helplist2 from '../../../assets/images/help-list2.png';
import helplist3 from '../../../assets/images/help-list3.png';
import helplist4 from '../../../assets/images/help-list4.png';
import helplist5 from '../../../assets/images/help-list5.png';
import helplist6 from '../../../assets/images/help-list6.png';
import helplist7 from '../../../assets/images/help-list7.png';
import helplist8 from '../../../assets/images/help-list8.png';
import helplist9 from '../../../assets/images/help-list9.png';
import helplist10 from '../../../assets/images/help-list10.png';
import workexperience from '../../../assets/images/work-experience.png';
import plus from '../../../assets/images/plus.png';
import myprofile2 from '../../../assets/images/myprofile2.png';
import aboutme from '../../../assets/images/aboutme.png';
import myjourney from '../../../assets/images/myjourney.png';
import myjourneylist1 from '../../../assets/images/myjourneylist1.png';
import institutionlogo1 from '../../../assets/images/institution-logo1.png';
import fun from '../../../assets/images/fun.png';
import myjourneylist2 from '../../../assets/images/myjourneylist2.png';
import advisees from '../../../assets/images/advisees.png';
// Utility Functions to make life easier
import { convertStrToArr } from '../../../Helpers/UtilityFunctions';
import ReactPlayer from 'react-player';
import WorkList from '../../../Components/Common/WorkList';
import EducationList from '../../../Components/Common/EducationList';
import TabsWrapper from '../../../Components/Common/TabsWrapper';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
// Modals Import
import {
  BasicInfo,
  Help,
  AboutMe,
  JustForFun,
  AddEducationExperience,
  AddWorkExperience,
  EditEducationExperience,
  EditWorkExperience,
} from '../modal';
import { ProgressBar } from 'react-bootstrap';

const meetingTypesIcons = [
  helplist1,
  helplist2,
  helplist3,
  helplist4,
  helplist5,
  helplist6,
  helplist7,
  helplist8,
  helplist9,
  helplist10,
];

class AdvisorProfileedit extends React.Component {
  state = {
    progress: {},
    advisor: {},
    meetingTypes: [],
    background: {},
    workExperience: [],
    educationExperience: [],
    userData: {},
    loading: true,
    profile_roles: [],
    profile_industries: [],
    dataWork: {
      work_experiences: [],
      companies: [],
      industries: [],
      work_roles: [],
      work_exp_dropdown: [],
      Employment_Type: [],
      companies_suggestions: [],
      Employment_Type_radio: [],
    },
    editWork: {
      modelType: 'add',
      id: '',
    },
    editEducation: {
      modelType: 'add',
      id: '',
    },
  };

  componentDidMount() {
    console.log(process.env.REACT_APP_API_URL)
    this.getInitialAdvisorData();
    this.getMeetingTypes();
  }

  async getMeetingTypes() {

    let get_users_settings = await ApiRequest.getRequest('/api/setting-preferences');
    get_users_settings = get_users_settings.data;
    if (get_users_settings.Data) {
      let userser = [];
      get_users_settings.Data.Userservices.forEach((item) => {
        userser.push({ name: item.meeting_type })
      });
      this.setState({ ...this.state, meetingTypes: userser, loading: false });
    }
  }

  async getInitialAdvisorData() {
    try {
      let response = await ApiRequest.getRequest(
        '/api/advisor-get-profile-data'
      );
      const {
        advisor,
        background,
        educationExperience,
        userData,
        workExperience,
        progress,
      } = response.data.Data;

      // console.log(response.data.Data)

      let industries = this.state.profile_industries;
      let work_roles = this.state.profile_roles;

      workExperience.forEach((item) => {
        if (!industries.includes(item.industry)) {
          industries.push(item.industry)
        }

        if (!work_roles.includes(item.role)) {
          work_roles.push(item.role)
        }
      })

      this.setState({
        ...this.state,
        advisor: {
          ...advisor,
          tags_list: JSON.parse(advisor?.tags_list)
        },
        background,
        educationExperience,
        userData,
        workExperience,
        profile_roles: work_roles,
        profile_industries: industries,
        progress: JSON.parse(progress),
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  delete = async (url, id, type = 'work') => {
    const response = await ApiRequest.deleteRequestAdvisor(url, parseInt(id));
    if (
      response !== undefined &&
      response.status === 200 &&
      response.status !== 422
    ) {
      if (type === 'work') {
        const newWorkArr = response.data.result;
        this.setState({
          ...this.state,
          workExperience: [...newWorkArr],
          editWork: { ...this.state.editWork, id: '' },
        });
      }
      if (type === 'education') {
        const newWorkArr = response.data.result;
        this.setState({
          ...this.state,
          educationExperience: [...newWorkArr],
          editEducation: { ...this.state.editEducation, id: '' },
        });
      }
      toastAlert('success', 'Request has been processed.');
      await this.getInitialAdvisorData();
    } else {
      toastAlert('error', 'Something went wrong please try again!');
    }
  };

  handleWorkEditClick = (e) => {
    const idInput = e.target.parentElement.previousSibling.value;
    this.setState({
      ...this.state,
      editWork: { id: idInput, modelType: 'edit' },
    });
  };

  handleEducationEditClick = (e) => {
    const idInput = e.target.parentElement.previousSibling.value;
    this.setState({
      ...this.state,
      editEducation: { id: idInput, modelType: 'edit' },
    });
  };

  render() {
    return (
      <div>
        {!!this.state.loading ? (
          <DataLoading />
        ) : (
          <>
            <Header />
            <section className="myprofile-sec">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="myprofile-d">
                      <h2>My Profile</h2>
                      {/* <p>
                        Profile Strength:{' '}
                        <span>
                          {this.state.progress?.progress_percent < 40 ||
                            this.state.progress?.progress_percent === '' ||
                            this.state.progress?.progress_percent === null ||
                            this.state.progress?.progress_percent === undefined
                            ? 'Low'
                            : this.state.progress?.progress_percent >= 40 &&
                              this.state.progress?.progress_percent < 70
                              ? 'Medium'
                              : 'High'}
                        </span>
                      </p> */}
                      {/* Progress Bar Section 👇 */}
                      <div className="progress-sec progress-advisor">
                        {/* <ProgressBar
                          now={
                            this.state.progress &&
                              this.state.progress?.progress_percent
                              ? this.state.progress?.progress_percent
                              : 0
                          }
                        /> */}
                        {/* <span>
                          {`${this.state.progress?.progress_percent === undefined
                            ? 0
                            : this.state.progress?.progress_percent >= 100 ? 100 : this.state.progress?.progress_percent
                            }%`}
                        </span> */}
                      </div>
                      <div className="heartbox">
                        {!this.state.advisor?.help ?
                          <>
                            <img src={advisees} className="img-fluid" alt="" />
                            <p>
                              In what unique ways are you looking to support Advisees?
                              Complete the <strong>How I can Help section</strong>{' '} to help Advisees understand
                              how you can support their development. Note: This section is included
                              in the Advisor Directory preview.
                            </p>
                          </> :
                          this.state.advisor?.help && !this.state.advisor?.just_for_fun ?
                            <>
                              <img src={heart} className="img-fluid" alt="" />
                              <p>
                                What do you like to do in your free time? Complete
                                the  <strong>Just for Fun</strong> section to provide
                                additional angles of connection with Advisees.
                              </p>
                            </> :
                            <>
                              <img src={icon3} className="img-fluid" alt="" />
                              <p>
                                <strong>
                                  Congratulations, your profile is the strongest
                                  it can be!
                                </strong>{' '}
                                Please keep your profile up-to-date to ensure
                                future meeting requests from Advisees are relevant
                                to your latest experience.
                              </p>
                            </>
                        }
                      </div>
                      {/* <div className="heartbox">
                        {this.state.progress?.my_journey === 0 ||
                          this.state.progress?.complete_profile === 0 ? (
                          <>
                            <img src={advisees} className="img-fluid" alt="" />
                            <p>
                              Advisees are curious not just about the{' '}
                              <i>“what”</i> and
                              <i>“when,”</i> but also the <i>“why”</i> and{' '}
                              <i>“how.”</i>
                              Why and how have you gotten to where you are
                              today? Complete the <strong>
                                My Journey
                              </strong>{' '}
                              section by expanding upon key decisions and
                              challenges you’ve overcome in your career.
                            </p>
                          </>
                        ) : (this.state.progress?.help === 0 ||
                          this.state.progress?.just_for_fun === 0) &&
                          this.state.progress?.my_journey === 1 ? (
                          <>
                            <img src={heart} className="img-fluid" alt="" />
                            <p>
                              What do you like to do in your free time? Complete
                              the
                              <strong>Just for Fun</strong> section to provide
                              additional angles of connection with Advisees.
                            </p>
                          </>
                        ) : this.state.progress?.about_me === 0 &&
                          this.state.progress?.help === 1 &&
                          this.state.progress?.just_for_fun === 1 ? (
                          <>
                            <img src={icon2} className="img-fluid" alt="" />
                            <p>
                              <strong>Upload a 1-2 minute intro video</strong>in
                              the About Me section so Advisees can get to know
                              you better.
                            </p>
                          </>
                        ) : this.state.progress?.progress_percent === 100 &&
                          this.state.progress?.my_journey === 1 &&
                          this.state.progress?.complete_profile === 1 &&
                          this.state.progress?.help === 1 &&
                          this.state.progress?.just_for_fun === 1 &&
                          this.state.progress?.about_me === 1 ? (
                          <>
                            <img src={icon3} className="img-fluid" alt="" />
                            <p>
                              <strong>
                                Congratulations, your profile is the strongest
                                it can be!
                              </strong>{' '}
                              Please keep your profile up-to-date to ensure
                              future meeting requests from Advisees are relevant
                              to your latest experience.
                            </p>
                          </>
                        ) : (
                          <>
                            <img src={advisees} className="img-fluid" alt="" />
                            <p>
                              Advisees are curious not just about the{' '}
                              <i>“what”</i> and
                              <i>“when,”</i> but also the <i>“why”</i> and{' '}
                              <i>“how.”</i>
                              Why and how have you gotten to where you are
                              today? Complete the <strong>
                                My Journey
                              </strong>{' '}
                              section by expanding upon key decisions and
                              challenges you’ve overcome in your career.
                            </p>
                          </>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>


            <section className="myprofile-info">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="myprofile-left">
                      <div className="myprofilebg">
                        <img
                          style={{
                            'objectFit': 'cover'
                          }}
                          src={
                            this.state.advisor.cover_profile !== null
                              ? process.env.REACT_APP_API_URL + `/${this.state.advisor?.cover_profile}`
                              : profilebg
                          }
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="myprofile-desc">
                        <div className="profileimg">
                          <img
                            style={{
                              'objectFit': 'cover'
                            }}
                            src={
                              this.state.advisor?.profile_goal !== null
                                ? process.env.REACT_APP_API_URL + `/${this.state.advisor?.profile_goal}`
                                : myprofile
                            }
                            className="img-fluid myprofileimg"
                            alt=""
                          />
                          <a
                            href="#"
                            className="hovertooltip"
                            data-toggle="modal"
                            data-target="#myModal"
                          >
                            <img src={editpro} className="img-fluid" alt="" />
                            <div className="hovertooltip-d">Click to edit me!</div>
                          </a>
                        </div>
                        <h3>
                          {this.state.userData?.firstname}{' '}
                          {this.state.userData?.lastname}{' '}
                          {this.state.userData?.pronouns && (
                            <span>({this.state.userData?.pronouns})</span>
                          )}
                        </h3>
                        <h6>{this.state.advisor?.headline}</h6>
                        <ul className="profileadd">
                          <li>
                            <span>
                              <img src={map} className="img-fluid" alt="" />
                            </span>
                            {this.state.background?.city}
                            {this.state.background?.state &&
                              ` (${this.state.background?.state}), `}
                            {this.state.background?.country}
                          </li>
                          <li>
                            <span>
                              <img src={clock} className="img-fluid" alt="" />
                            </span>
                            {this.state.background?.time_zone}
                          </li>
                        </ul>
                        <div className="profiletag">
                          {this.state.advisor?.tags_list?.map((tag) => (
                            <span>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="myprofile-left">
                      <div className="myprofile-desc">
                        <div className="myprofile-list">
                          <h3 className="myprofile-heading">
                            <img
                              src={careericon}
                              className="img-fluid headingicon"
                              alt=""
                            />
                            How I can Help
                            <a
                              href="#"
                              className="hovertooltip"
                              data-toggle="modal"
                              data-target="#myModal7"
                            >
                              <img src={editpro} className="img-fluid" alt="" />
                              <div className="hovertooltip-d">
                                Click to edit me!
                              </div>
                            </a>
                          </h3>
                          <p>{this.state.advisor?.help}</p>
                          <ul className="help-list">
                            {this.state.meetingTypes?.map((meeting, i) => (
                              <li>
                                <img
                                  src={
                                    meetingTypesIcons[
                                    Math.floor(
                                      Math.random() * meetingTypesIcons.length
                                    )
                                    ]
                                  }
                                  className="img-fluid"
                                  alt=""
                                />
                                {meeting.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-12">
                    <div className="myprofile-right">
                      <div className="myprofile-list">
                        <h3 className="myprofile-heading">
                          <img
                            src={aboutme}
                            className="img-fluid headingicon"
                            alt=""
                          />
                          About Me
                          <a
                            href="#"
                            className="hovertooltip"
                            data-toggle="modal"
                            data-target="#myModal2"
                          >
                            <img src={editpro} className="img-fluid" alt="" />
                            <div className="hovertooltip-d">Click to edit me!</div>
                          </a>
                        </h3>
                        <p>{this.state.advisor?.about_me}</p>
                        {this.state.advisor?.profile_video && (
                          <div className="myprofile-list-video">
                            <ReactPlayer
                              width="620"
                              height="349"
                              controls
                              url={
                                this.state.advisor?.profile_video &&
                                process.env.REACT_APP_API_URL + `/${this.state.advisor?.profile_video}`
                              }
                            ></ReactPlayer>
                          </div>
                        )}
                      </div>

                      <div className="myprofile-list">
                        <h3 className="myprofile-heading">
                          <img
                            src={myjourney}
                            className="img-fluid headingicon"
                            alt=""
                          />
                          My Journey
                          <a
                            href="#"
                            className="hovertooltip"
                            data-toggle="modal"
                            data-target="#myModal4"
                            onClick={(e) =>
                              this.setState({
                                ...this.state,
                                editEducation: { id: '', modelType: 'add' },
                                editWork: { id: '', modelType: 'add' },
                              })
                            }
                          >
                            <img src={plus} className="img-fluid" alt="" />
                            <div className="hovertooltip-d">Click to edit me!</div>
                          </a>
                        </h3>
                        <ul className="myjourney">
                          <WorkList
                            handleWorkEditClick={(e) =>
                              this.handleWorkEditClick(e)
                            }
                            itemsArr={this.state.workExperience}
                          />
                          <EducationList
                            itemsArr={this.state.educationExperience}
                            handleEducationEditClick={
                              this.handleEducationEditClick
                            }
                          />
                        </ul>
                      </div>

                      <div className="myprofile-list">
                        <h3 className="myprofile-heading">
                          <img
                            src={workexperience}
                            className="img-fluid headingicon"
                            alt=""
                          />
                          Work Experience
                        </h3>
                        <div className="myprofile-work">
                          <h6>Industries:</h6>
                          {this.state.profile_industries?.map((industry) => (
                            <>
                              <span>{industry}</span>
                            </>
                          ))}
                        </div>
                        <div className="myprofile-work">
                          <h6>Roles:</h6>
                          {this.state.profile_roles?.map((role, index) => (
                            <span>{role}</span>
                          ))}
                        </div>
                      </div>

                      <div className="myprofile-list">
                        <h3 className="myprofile-heading">
                          <img src={fun} className="img-fluid headingicon" alt="" />
                          Just for Fun
                          <a
                            className="hovertooltip"
                            href="#"
                            data-toggle="modal"
                            data-target="#myModal6"
                          >
                            <img src={editpro} className="img-fluid" alt="" />
                            <div className="hovertooltip-d">Click to edit me!</div>
                          </a>
                        </h3>
                        <div className="whatfun">
                          {this.state.advisor?.just_for_fun === '' ? (
                            <a href="#">What do you do for fun?</a>
                          ) : (
                            <p>{this.state.advisor?.just_for_fun}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* All Modals 👇🏻*/}

            <BasicInfo
              user={this.state.userData}
              advisorData={this.state.advisor}
              getInitialAdvisorData={() => this.getInitialAdvisorData()}
              isAdvisee={false}
            />

            <AboutMe
              advisorData={this.state.advisor}
              getInitialAdvisorData={() => this.getInitialAdvisorData()}
              isAdvisee={false}
            />

            <TabsWrapper
              id="myModal4"
              modalTitle="Add Experience"
              tabContent={[
                <AddEducationExperience
                  getInitialAdvisorData={() => this.getInitialAdvisorData()}
                />,
                <AddWorkExperience
                  getInitialAdvisorData={() => this.getInitialAdvisorData()}
                />,
              ]}
            />

            <EditWorkExperience
              id={this.state.editWork?.id}
              workExperience={this.state.workExperience}
              getInitialAdvisorData={() => this.getInitialAdvisorData()}
              handleDelete={this.delete}
              isAdvisee={false}
            />

            <EditEducationExperience
              id={this.state.editEducation?.id}
              educationExperience={this.state.educationExperience}
              getInitialAdvisorData={() => this.getInitialAdvisorData()}
              handleDelete={this.delete}
              isAdvisee={false}
            />

            <JustForFun
              advisorData={this.state.advisor}
              getInitialAdvisorData={() => this.getInitialAdvisorData()}
              isAdvisee={false}
            />
            <Help
              advisorData={this.state.advisor}
              getInitialAdvisorData={() => this.getInitialAdvisorData()}
            />
          </>
        )}
      </div>
    );
  }
}

export default AdvisorProfileedit;