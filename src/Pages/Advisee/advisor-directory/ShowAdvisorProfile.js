import profile from '../../../assets/images/profile.png';
import React, { Component } from 'react';

import ApiRequest from '../../../Services/ApiRequest';
import map from '../../../assets/images/map.png';
import clock from '../../../assets/images/clock.png';
import editpro from '../../../assets/images/edit-pro.png';
import profilebg from '../../../assets/images/profilebg.png';
import myprofile from '../../../assets/images/myprofile.png';
import handshake from '../../../assets/images/handshake.png';
import careericon from '../../../assets/images/career-icon.png';
import institutionlogo2 from '../../../assets/images/institution-logo2.png';
import institutionlogo3 from '../../../assets/images/institution-logo3.png';
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

import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import { Link, useParams } from 'react-router-dom';
import useFetchData from '../../../hooks/useFetchData';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
import WorkList from '../../../Components/Common/WorkList';
import EducationList from '../../../Components/Common/EducationList';
import ReactPlayer from 'react-player';
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

class AdvisorProfile extends Component {

  state = {
    user: {},
    advisorID: '',
    profile_roles: [],
    profile_industries: [],
    taglistview: [],
    userservices: []
  }


  componentDidMount() {
    this.getAdvisorData();
  }


  getAdvisorData = async () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    // const location = useLocation();

    const { location } = this.props;
    // console.log(location.pathname)
    const advisorID = location.pathname.split('/')[2]
    this.setState({ advisorID: advisorID })
    // console.log(advisorID)


    let response = await ApiRequest.getRequest(`/api/get-advisor-profile?id=${advisorID}`).then((response) => {
      // console.log(response)
      this.setState({
        user: response.data.Data,
        userservices: response.data.Data.user_services
      })
      let industries = this.state.profile_industries;
      let work_roles = this.state.profile_roles;
//console.log(this.state.user?.advisor);
      response.data.Data.workExperience.forEach((item) => {
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

      // console.log(this.state)

      //Creating tags list
      this.setState({ taglistview: (JSON.parse(response.data.Data.advisor.tags_list)) });
      const tags_list = [];
      this.state.taglistview.forEach((item) => {
        const dataItem = {
          label: item,
          value: item
        }
        tags_list.push(dataItem);
      });
      this.setState({ tagvalue: tags_list });
      this.storeProfileView()
    })

  }

  storeProfileView = async () => {
    const formData = new FormData();
    formData.append('AdvisorID', this.state.advisorID)

    ApiRequest.postRequest(
      '/api/store-advisor-profile-view',
      formData
    );
  }

  render() {

    return (
      <>
        <Header />
        
        <>
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
                          this.state.user?.advisor?.cover_profile
                            ? process.env.REACT_APP_API_URL + `/${this.state.user?.advisor?.cover_profile}`
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
                            this.state.user?.advisor?.profile_goal
                              ? process.env.REACT_APP_API_URL + `/${this.state.user?.advisor?.profile_goal}`
                              : myprofile
                          }
                          className="img-fluid myprofileimg"
                          alt=""
                        />
                      </div>
                      <h3>
                        {this.state.user?.userData?.firstname} {this.state.user?.userData?.lastname}{' '}
                        <span>
                          {this.state.user?.userData?.pronouns
                            ? `(${this.state.user?.userData?.pronouns})`
                            : ''}
                        </span>
                      </h3>
                      <h6>{this.state.user?.advisor?.headline}</h6>
                      <ul className="profileadd">
                        <li>
                          <span>
                            <img src={map} className="img-fluid" alt="" />
                          </span>
                          {this.state.user?.background?.city}{' '}
                          {this.state.user?.background?.state &&
                            `(${this.state.user?.background?.state}),`}
                          {this.state.user?.background?.country}
                        </li>
                        <li>
                          <span>
                            <img src={clock} className="img-fluid" alt="" />
                          </span>
                          {this.state.user?.background?.time_zone}
                        </li>
                      </ul>
                      <div className="profiletag">
                        {
                          this.state.taglistview.map((tags_list, index) => (
                            <span>{tags_list}</span>

                          ))
                        }
                      </div>
                      <div className="myprofile-left-btn request-single-btn">
                        <Link
                          to={`/advisee/request-meeting/${this.state.advisorID}`}
                          className={
                            this.state.user?.advisor?.monthly_capacity_remaining > 0
                              ? `btn btn-info`
                              : `btn btn-info disabled`
                          }
                        >
                          <img
                            src={handshake}
                            className="img-fluid headingicon"
                            alt=""
                          />
                          Request to Meet
                        </Link>
													{
                            this.state.user?.advisor?.monthly_capacity_remaining < 1
                              ? 
                              <div className="careerlabel">This advisor is not currently available.</div>
                              : ``
                          }
                        
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
                        </h3>
                        <p>
                          {/* Breaking into finance and tech, working and living
                          abroad, non-technical roles in tech (strategy,
                          business development, data analytics, operations,
                          product management), applying to business school,
                          personal finance{' '} */}
                          {this.state.user?.advisor?.help}
                        </p>
                        <ul className="help-list">
                          {this.state.userservices.map((service) => (
                            <>
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

                                {service?.meeting_type}
                              </li>
                            </>
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
                      </h3>
                      <p>{this.state.user?.advisor?.about_me}</p>
                      {this.state.user?.advisor?.profile_video && (
                        <>
                          <div className="myprofile-list-video">
                            <ReactPlayer
                              width="620"
                              height="349"
                              controls
                              url={process.env.REACT_APP_API_URL + `/${this.state.user?.advisor?.profile_video}`}
                            ></ReactPlayer>
                          </div>
                        </>
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
                      </h3>
                      <ul className="myjourney">
                        <WorkList itemsArr={this.state.user?.workExperience} />
                        <EducationList itemsArr={this.state.user?.educationExperience} />
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
                        {this.state.profile_industries.map((industry) => (
                          <span>{industry}</span>
                        ))}
                      </div>
                      <div className="myprofile-work">
                        <h6>Roles:</h6>
                        {this.state.profile_roles.map((role) => (
                          <span>{role}</span>
                        ))}
                      </div>
                    </div>

                    <div className="myprofile-list">
                      <h3 className="myprofile-heading">
                        <img src={fun} className="img-fluid headingicon" alt="" />
                        Just for Fun
                      </h3>
                      <div className="whatfun">
                        <p>{this.state.user?.advisor?.just_for_fun}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
        
        <MainFooter />
      </>
    );
  }
}

export default AdvisorProfile;