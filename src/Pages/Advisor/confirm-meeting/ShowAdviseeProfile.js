// import profile from '../../../assets/images/profile.png';
import React, { Component } from 'react';
import ApiRequest from '../../../Services/ApiRequest';
import map from '../../../assets/images/map.png';
import clock from '../../../assets/images/clock.png';
import editpro from '../../../assets/images/edit-pro.png';
import profilebg from '../../../assets/images/profilebg.png';
import myprofile from '../../../assets/images/myprofile.png';
// import handshake from '../../../assets/images/handshake.png';
import careericon from '../../../assets/images/career-icon.png';
import institutionlogo2 from '../../../assets/images/institution-logo2.png';
import institutionlogo3 from '../../../assets/images/institution-logo3.png';
import workexperience from '../../../assets/images/work-experience.png';
import resume_blue from "../../../assets/images/resume-blue.png";

// import upload from '../../../assets/images/upload.png';
// import plus from '../../../assets/images/plus.png';
// import myprofile2 from '../../../assets/images/myprofile2.png';
import aboutme from '../../../assets/images/aboutme.png';
import myjourney from '../../../assets/images/myjourney.png';
// import myjourneylist1 from '../../../assets/images/myjourneylist1.png';
// import institutionlogo1 from '../../../assets/images/institution-logo1.png';
import fun from '../../../assets/images/fun.png';
import myjourneylist2 from '../../../assets/images/myjourneylist2.png';
import advisees from '../../../assets/images/advisees.png';
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

import Header from '../../../Components/Layouts/AdvisorLayout/Header';
import { Link, useParams, useLocation } from 'react-router-dom';
import useFetchData from '../../../hooks/useFetchData';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
import WorkList from '../../../Components/Common/WorkList';
import EducationList from '../../../Components/Common/EducationList';
// import ReactPlayer from 'react-player';
import MainFooter from '../../../Components/Layouts/MainFooter';

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

class AdviseeProfile extends Component {

  state = {
    profile_picture: '',
    background_picture: '',
    first_name: '',
    last_name: '',
    pronouns: '',
    headline: '',
    resume: '',
    tags_list: '',
    just_for_fun: '',
    about_me: '',
    current_career_goals: '',
    time_zone: '',
    country: '',
    state: '',
    city: '',
    profile_industries: [],
    profile_roles: [],
    work_experiences: [],
    education_experiences: []

  }

  componentDidMount() {
    this.getAdviseeData();
  }

  getAdviseeData = async () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    // const location = useLocation();

    const { location } = this.props;
    // console.log(location.pathname.slice(0, location.pathname.lastIndexOf('/')))
    console.log(location.pathname)
    const adviseeID = location.pathname.split('/')[2]
    console.log(adviseeID)

    let response = await ApiRequest.getRequest(`/api/advisees-get-profile/${adviseeID}`).then((response) => {

      console.log(response)
      const response_data = response.data.Data
      this.setState({
        profile_picture: response_data.advisees.profile_goal,
        headline: response_data.advisees.headline,
        first_name: response_data.userData.firstname,
        last_name: response_data.userData.lastname,
        pronouns: response_data.userData.pronouns,
        resume: response_data.advisees.resume,
        tags_list: JSON.parse(response_data.advisees.tags_list),
        just_for_fun: response_data.advisees.just_for_fun,
        about_me: response_data.advisees.about_me,
        current_career_goals: response_data.advisees.current_career_goals,
        time_zone: response_data.background.time_zone,
        city: response_data.background.city,
        country: response_data.background.country,
        state: response_data.background.state,
        taglistview: [],
        work_experiences: response_data.workExperience,
        education_experiences: response_data.educationExperience
      })


      let industries = this.state.profile_industries;
      let work_roles = this.state.profile_roles;

      response_data.workExperience.forEach((item) => {
        if (!industries.includes(item.industry)) {
          industries.push(item.industry)
        }
  
        if (!work_roles.includes(item.role)) {
          work_roles.push(item.role)
        }
      })
  
      this.setState({
        ...this.state,
        profile_roles: work_roles,
        profile_industries: industries,
      });

      //Creating tags list
      this.setState({ taglistview: (JSON.parse(response.data.Data.advisees.tags_list)) });
      const tags_list = [];
      this.state.taglistview.forEach((item) => {
        const dataItem = {
          label: item,
          value: item
        }
        tags_list.push(dataItem);
      });
      this.setState({ tagvalue: tags_list });


    })

  }


  downloadResume = async () => {

    ApiRequest.getBlobRequest('/api/download-resume/' + this.state.resume.split('/')[2])
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Resume.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
        //window.location.href = response.url;
      });

  }

  // const Loading = isLoading && <DataLoading />;
  // const Error = isError && <DataError />;

  render() {
    return (
      <>
        <Header />
        {

          (
            <>
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
                              this.state.background_picture == '' ? profilebg
                                : process.env.REACT_APP_API_URL + `/${this.state.background_picture}`
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

                                this.state.profile_picture == '' ?
                                  myprofile
                                  : process.env.REACT_APP_API_URL + `/${this.state.profile_picture}`
                              }
                              class="img-fluid myprofileimg"
                              alt=""
                            />
                          </div>

                          <h3>
                            {this.state.first_name} {this.state.last_name}{' '}
                            <span>
                              {this.state.pronouns
                                ? `(${this.state.pronouns})`
                                : ''}
                            </span>
                          </h3>
                          <h6>{this.state.headline}</h6>
                          <ul class="profileadd">

                            {
                              this.state.resume ? <li><span ><img src={resume_blue} className="img-fluid" alt="" /></span>
                                <span style={{ 'color': '#3771CA', 'textDecoration': 'underline', 'cursor': 'pointer' }} onClick={this.downloadResume}>Resume</span></li> :
                                <></>
                            }
                            <li>
                              <span>
                                <img src={map} class="img-fluid" alt="" />
                              </span>
                              {this.state.city}{' '}
                              {this.state.country &&
                                `(${this.state.state}),`}
                              {this.state.country}
                            </li>
                            <li>
                              <span>
                                <img src={clock} class="img-fluid" alt="" />
                              </span>
                              {this.state.time_zone}
                            </li>
                          </ul>

                          <div className="profiletag">
                            {
                              this.state.taglistview ?
                                this.state.taglistview.map((tags_list, index) => (
                                  <span>{tags_list}</span>

                                ))
                                :
                                ""
                            }
                          </div>
                          <div class="myprofile-left-btn request-single-btn">
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
                          </h3>
                          <p>{this.state.about_me}</p>

                        </div>

                        <div className="myprofile-list">
                    <h3 className="myprofile-heading"><img src={careericon} className="img-fluid headingicon" alt="" />Career Interests</h3>
                    <p>{this.state.current_career_goals} </p>
                  </div>

                        <div class="myprofile-list">
                          <h3 class="myprofile-heading">
                            <img
                              src={myjourney}
                              class="img-fluid headingicon"
                              alt=""
                            />
                            My Journey
                          </h3>
                          <ul class="myjourney">
                            <WorkList itemsArr={this.state.work_experiences} />
                          {/* <WorkList itemsArr={user?.workExperience} /> */}

                          <EducationList itemsArr={this.state.education_experiences} />
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
                            {this.state.profile_industries.map((industry) => (
                            <span>{industry}</span>
                          ))}
                          </div>
                          <div class="myprofile-work">
                            <h6>Roles:</h6>
                            {this.state.profile_roles.map((role) => (
                            <span>{role}</span>
                          ))}
                          </div>
                        </div>

                        <div class="myprofile-list">
                          <h3 class="myprofile-heading">
                            <img src={fun} class="img-fluid headingicon" alt="" />
                            Just for Fun
                          </h3>
                          <div class="whatfun">
                            <p>{this.state.just_for_fun}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )

        }
        <MainFooter />
      </>
    )
  };
}

export default AdviseeProfile;