import React from 'react';
import { Link, Switch } from 'react-router-dom';
import Moment from 'react-moment';
import Profile from '../../../assets/images/DashboardImgs/profile.png';
import {
    destroySession,
    toasterAlert as toastAlert,
} from '../../../Helpers/Functions';
import history from '../../../Utils/history';
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import Footer from '../../../Components/Layouts/Footer';
import LogoWhite from '../../../assets/images/WizardImages/Horizontal.png';
import icon2 from '../../../assets/images/icon2.png';
import icon3 from '../../../assets/images/icon3.png';
import heart from '../../../assets/images/heart.png';
import Msg from '../../../assets/images/WizardImages/mail.png';
import ShortLogo from '../../../assets/images/WizardImages/Logomark.png';
import LinkdIn from '../../../assets/images/WizardImages/linkdin.png';
import Search from '../../../assets/images/WizardImages/search.png';
import EmailYes from '../../../assets/images/WizardImages/EmailYes.png';
import EmailIcon from '../../../assets/images/WizardImages/email-icon.png';
import queryString from 'query-string';
import Axios from '../../../Config/Axios';
import EditPen from '../../../assets/images/WizardImages/edit-2.png';
import authService from '../../../Services/auth.service';
import resume_blue from "../../../assets/images/resume-blue.png";
import ApiRequest from '../../../Services/ApiRequest';
import map from '../../../assets/images/map.png';
import clock from '../../../assets/images/clock.png';
import editpro from '../../../assets/images/edit-pro.png';
import profilebg from '../../../assets/images/profilebg.png';
import myprofile from '../../../assets/images/myprofile.png';
import workexperience from '../../../assets/images/work-experience.png';
import upload from '../../../assets/images/upload.png';
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
} from '../../Advisor/modal';

import ViewResume from '../../Advisor/modal/ViewResume';
import { ProgressBar } from 'react-bootstrap';

class AdviseeProfileedit2 extends React.Component {
    state = {
        progress: {},
        advisee: {},
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
        this.getInitialAdviseeData();
    }

    downloadResume = async () => {

        ApiRequest.getBlobRequest('/api/download-resume/' + this.state.advisee.resume.split('/')[2])
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Resume.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
//            window.location.href = response.url;
          });
    
    }
    displayResume = async () => {

        ApiRequest.getBlobRequest('/api/download-resume/' + this.state.advisee.resume.split('/')[2])
          .then((response) => {
            const url = URL.createObjectURL(new Blob([response.data]));
				    document.getElementById('embedme').src = [url];
//				    const modalelement = document.getElementById('myModalResume');
						const parentnode = document.getElementById('myModalResume');
						try{
							parentnode.querySelector('div.modal-dialog').style.height = '90%';
							parentnode.querySelector('div.modal-content').style.height = '100%';
							parentnode.querySelector('div.modal-header').style.height = '100%';
							parentnode.querySelector('div.modal-body').style.height = '100%';
						}
						catch{};

          });
    
    }



    async getInitialAdviseeData() {
        try {
            let response = await ApiRequest.getRequest(
                '/api/advisees-get-profile-data'
            );

            const {
                advisees,
                background,
                educationExperience,
                userData,
                workExperience,
                progress,
            } = response.data.Data;


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
                advisees: {
                    ...advisees,
                    tags_list: JSON.parse(advisees?.tags_list)
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
            var advisees_d = this.state.advisees
            this.setState({ advisee: advisees_d })
        } catch (error) {
            console.log(error);
        }
    }

      deleteworkExperience = async (ID) => {
    const response = await ApiRequest.deleteRequest('/api/delete-work-experience', ID);

    if (response.status === 200) {
      let data = this.state.data;
      data.workExperience = response.data.result

      this.setState({
        data
      })

      toastAlert('success', 'Request has been processed.');
    } else {
      toastAlert('error', "Something went wrong please try again!");
    }
    this.setState({ dismiss: 'modal' });
  }

  deleteEducation = async (ID) => {
    const response = await ApiRequest.deleteRequest('/api/delete-education-experience', ID);

    if (response.status === 200) {

      let data = this.state.data;
      data.educationExperience = response.data.result

      this.setState({ data })
      toastAlert('success', 'Request has been processed.');
    } else {
      toastAlert('error', "Something went wrong please try again!");
    }
    this.setState({ dismiss: 'modal' });
  }

    delete = async (url, id, type = 'work') => {

        let response;
        if(type == 'work'){
            response = await ApiRequest.deleteRequest('/api/delete-work-experience', id);
        }else if(type == 'education'){
            response = await ApiRequest.deleteRequest('/api/delete-education-experience', id);
        }


        // const response = await ApiRequest.deleteRequestAdvisor(url, parseInt(id));
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
            await this.getInitialAdviseeData();
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

    // render(){
    //     return (
    //         <div>Hello</div>
    //     )
    // }

    render() {
        return (
            <div>
                {!!this.state.loading ? (
                    <DataLoading />
                ) : (
                    <>
                        <Header />
                        <section class="myprofile-sec">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="myprofile-d">
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
                                            {/* <div class="progress-sec progress-advisee">
                                                <ProgressBar
                                                    now={
                                                        this.state.progress &&
                                                            this.state.progress?.progress_percent
                                                            ? this.state.progress?.progress_percent
                                                            : 0
                                                    }
                                                />
                                                <span>
                                                    {`${this.state.progress?.progress_percent === undefined
                                                        ? 0
                                                        : this.state.progress?.progress_percent >= 100 ? 100 : this.state.progress?.progress_percent
                                                        }%`}
                                                </span>
                                            </div> */}
                                            {/* <div class="heartbox">
                                                {this.state.progress?.my_journey === 0 ||
                                                    this.state.progress?.complete_profile === 0 ? (
                                                    <>
                                                        <img src={advisees} class="img-fluid" alt="" />
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
                                                        <img src={heart} class="img-fluid" alt="" />
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
                                                        <img src={icon2} class="img-fluid" alt="" />
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
                                                        <img src={icon3} class="img-fluid" alt="" />
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
                                                        <img src={advisees} class="img-fluid" alt="" />
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

                        <section class="myprofile-info">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="myprofile-left">
                                            <div class="myprofilebg">
                                                <img
                                                    style={{
                                                        'objectFit': 'cover'
                                                    }}
                                                    src={
                                                        this.state.advisee.cover_profile !== null
                                                            ? process.env.REACT_APP_API_URL + `/${this.state.advisee?.cover_profile}`
                                                            : profilebg
                                                    }
                                                    class="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="myprofile-desc">
                                                <div class="profileimg">
                                                    <img
                                                        style={{
                                                            'objectFit': 'cover'
                                                        }}
                                                        src={
                                                            this.state.advisee?.profile_goal !== null
                                                                ? process.env.REACT_APP_API_URL + `/${this.state.advisee?.profile_goal}`
                                                                : myprofile
                                                        }
                                                        class="img-fluid myprofileimg"
                                                        alt=""
                                                    />
                                                    <a
                                                        href="#"
                                                        class="hovertooltip"
                                                        data-toggle="modal"
                                                        data-target="#myModal"
                                                    >
                                                        <img src={editpro} class="img-fluid" alt="" />
                                                        <div class="hovertooltip-d">Click to edit me!</div>
                                                    </a>
                                                </div>
                                                <h3>
                                                    {this.state.userData?.firstname}{' '}
                                                    {this.state.userData?.lastname}{' '}
                                                    {this.state.userData?.pronouns && (
                                                        <span>({this.state.userData?.pronouns})</span>
                                                    )}
                                                </h3>
                                                <h6>{this.state.advisee?.headline}</h6>
                                                <ul class="profileadd">
                                                    {
                                                        this.state.advisee.resume ? <li>
                                                        <span ><img src={resume_blue} className="img-fluid" alt="" style={{'cursor': 'pointer','display':'none'}} /></span>
                                                    <a onClick={this.displayResume}
                                                        
                                                        data-toggle="modal"
                                                        data-target="#myModalResume"
                                                        style={{'cursor': 'pointer','display':'none'}}
                                                    >View Resume</a><br/>
				                                                    <span ><img src={resume_blue} className="img-fluid" alt="" /></span>
                                                            <span style={{ 'color': '#3771CA', 'textDecoration': 'underline', 'cursor': 'pointer' }} onClick={this.downloadResume}>Download Resume</span>
                                                            </li> :
                                                            <></>
                                                    }
                                                    <li>
                                                        <span>
                                                            <img src={map} class="img-fluid" alt="" />
                                                        </span>
                                                        {this.state.background?.city}
                                                        {this.state.background?.state &&
                                                            ` (${this.state.background?.state}), `}
                                                        {this.state.background?.country}
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <img src={clock} class="img-fluid" alt="" />
                                                        </span>
                                                        {this.state.background?.time_zone}
                                                    </li>
                                                </ul>
                                                <div class="profiletag">
                                                    {this.state.advisee?.tags_list?.map((tag) => (
                                                        <span>{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="col-lg-8 col-md-12">
                                        <div class="myprofile-right">
                                            <div class="myprofile-list">
                                                <h3 class="myprofile-heading">
                                                    <img
                                                        src={aboutme}
                                                        class="img-fluid headingicon"
                                                        alt=""
                                                    />
                                                    About Me
                                                    <a
                                                        href="#"
                                                        class="hovertooltip"
                                                        data-toggle="modal"
                                                        data-target="#myModal2"
                                                    >
                                                        <img src={editpro} class="img-fluid" alt="" />
                                                        <div class="hovertooltip-d">Click to edit me!</div>
                                                    </a>
                                                </h3>
                                                <p>{this.state.advisee?.about_me}</p>
                                                {this.state.advisee?.profile_video && (
                                                    <div className="myprofile-list-video">
                                                        <ReactPlayer
                                                            width="620"
                                                            height="349"
                                                            controls
                                                            url={
                                                                this.state.advisee?.profile_video &&
                                                                process.env.REACT_APP_API_URL + `/${this.state.advisee?.profile_video}`
                                                            }
                                                        ></ReactPlayer>
                                                    </div>
                                                )}
                                            </div>

                                            <div class="myprofile-list">
                                                <h3 class="myprofile-heading">
                                                    <img
                                                        src={myjourney}
                                                        class="img-fluid headingicon"
                                                        alt=""
                                                    />
                                                    My Journey
                                                    <a
                                                        href="#"
                                                        class="hovertooltip"
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
                                                        <img src={plus} class="img-fluid" alt="" />
                                                        <div class="hovertooltip-d">Click to edit me!</div>
                                                    </a>
                                                </h3>
                                                <ul class="myjourney">
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

                                            <div class="myprofile-list">
                                                <h3 class="myprofile-heading">
                                                    <img
                                                        src={workexperience}
                                                        class="img-fluid headingicon"
                                                        alt=""
                                                    />
                                                    Work Experience
                                                </h3>
                                                <div class="myprofile-work">
                                                    <h6>Industries:</h6>
                                                    {this.state.profile_industries?.map((industry) => (
                                                        <>
                                                            <span>{industry}</span>
                                                        </>
                                                    ))}
                                                </div>
                                                <div class="myprofile-work">
                                                    <h6>Roles:</h6>
                                                    {this.state.profile_roles?.map((role, index) => (
                                                        <span>{role}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div class="myprofile-list">
                                                <h3 class="myprofile-heading">
                                                    <img src={fun} class="img-fluid headingicon" alt="" />
                                                    Just for Fun
                                                    <a
                                                        class="hovertooltip"
                                                        href="#"
                                                        data-toggle="modal"
                                                        data-target="#myModal6"
                                                    >
                                                        <img src={editpro} class="img-fluid" alt="" />
                                                        <div class="hovertooltip-d">Click to edit me!</div>
                                                    </a>
                                                </h3>
                                                <div class="whatfun">
                                                    {this.state.advisee?.just_for_fun === '' ? (
                                                        <a href="#">What do you do for fun?</a>
                                                    ) : (
                                                        <p>{this.state.advisee?.just_for_fun}</p>
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
                            advisorData={this.state.advisee}
                            getInitialAdvisorData={() => this.getInitialAdviseeData()}
                            isAdvisee={true}
                        />

                        <AboutMe
                            advisorData={this.state.advisee}
                            getInitialAdvisorData={() => this.getInitialAdviseeData()}
                            isAdvisee={true}
                        />

                        <TabsWrapper
                            id="myModal4"
                            modalTitle="Add Experience"
                            tabContent={[
                                <AddEducationExperience
                                    getInitialAdvisorData={() => this.getInitialAdviseeData()}
                                />,
                                <AddWorkExperience
                                    getInitialAdvisorData={() => this.getInitialAdviseeData()}
                                />,
                            ]}
                        />

                        <EditWorkExperience
                            id={this.state.editWork?.id}
                            workExperience={this.state.workExperience}
                            getInitialAdvisorData={() => this.getInitialAdviseeData()}
                            handleDelete={this.delete}
                        />

                        <EditEducationExperience
                            id={this.state.editEducation?.id}
                            educationExperience={this.state.educationExperience}
                            getInitialAdvisorData={() => this.getInitialAdviseeData()}
                            handleDelete={this.delete}
                            isAdvisee={true}
                        />

                        <JustForFun
                            advisorData={this.state.advisee}
                            getInitialAdvisorData={() => this.getInitialAdviseeData()}
                            isAdvisee={true}
                        />
                        <ViewResume
                            id="myModalResume"
                            isAdvisee={true}
                        />

                    </>
                )

                }
            </div>
        );
    }
}

export default AdviseeProfileedit2;