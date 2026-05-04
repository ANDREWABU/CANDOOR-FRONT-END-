import React from 'react';
import {Link, Switch} from "react-router-dom";
import Profile from "../../../assets/images/DashboardImgs/profile.png";
import {destroySession, toasterAlert as toastAlert} from '../../../Helpers/Functions';
import history from "../../../Utils/history";
import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
import Msg from "../../../assets/images/WizardImages/mail.png";
import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
import Search from "../../../assets/images/WizardImages/search.png";
import EmailYes from "../../../assets/images/WizardImages/EmailYes.png";
import EmailIcon from "../../../assets/images/WizardImages/email-icon.png";
import queryString from 'query-string';
import Axios from "../../../Config/Axios";
import EditPen from "../../../assets/images/WizardImages/edit-2.png";
import authService from "../../../Services/auth.service"
import ApiRequest from "../../../Services/ApiRequest";
class profile_edit extends React.Component {
    state = {
        how_hear_us: '',referralCode: '',belongs_to: [],loading: false, 
        errors:{
            how_hear_us: '',referralCode: '',belongs_to: [],
        },
        data:{
            work_roles: [ ],
            industries:[],
            companies:[],
            timezones:[],
            user_carrer: '',
            here_about_us:[]
        },


    }
    componentDidMount() {
        console.log('user' , this.user);
        this.getMainData();
    }
   

   
    getMainData = async() => {
        let response = await ApiRequest.getRequest('/api/submit-form-request');
        response  = response.data;
        let data = this.state.data;
        if ( response.result){
         //   data.companies = this.selectOptions(response.result.companies);
         //   data.industries = this.selectOptions(response.result.industries);
          //  data.work_roles = this.selectOptions(response.result.work_roles);
          data.here_about_us = response.result.here_about_us;
            this.setState(() => ({data }));
            this.setInputFieldStates(response.result.user_carrer);
        }

        // Axios.post('https://reqres.in/api/articles', {email,password} )
        //     .then(response => console.log(response));
    }
    add = async() => {
        const { how_hear_us,referralCode,belongs_to, is_prescrean_program } = this.state;
        let { how_hear_usError,referralCodeError,belongs_toError} = '';
        this.resetErrors();
        if (!how_hear_us) {
            how_hear_usError = 'This Field is required.'
        }

        if (belongs_to.length == 0) {
            belongs_toError = 'This Field is required.';
        }

        this.setState(prevState=>({
            errors: {
                ...prevState.errors,
                how_hear_us: how_hear_usError,
                belongs_to: belongs_toError,
            }
        }))
        if (how_hear_usError || belongs_toError )
        {
            return true;
        }
        this.setState({ loading: true });
        const data = {
            how_hear_us,referralCode,belongs_to,is_prescrean_program
        }
        let response = await ApiRequest.postRequest('/api/submit-apply-data', data);

        // if (response !== undefined && response.status === 200 && response.status !== 422) {
        //     this.changeStep();
        // } else if (response !== undefined   && response.status == 422) {
        //     toastAlert('error', response.data.errors[0]);
        // } else {
        //     toastAlert('error', "Something went wrong please try again!");
        // }
        this.setState({ loading: false });
        this.changeStep();
    }
    

   
    
    render() {
        return (
       <div>    
<section class="myprofile-info">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <div class="myprofile-left">
          <div class="myprofilebg">
          <img src="assets/images/profilebg.png" class="img-fluid" alt=""/>
          </div>
          <div class="myprofile-desc">
          <div class="profileimg">
          <img src="assets/images/myprofile2.png" class="img-fluid myprofileimg" alt=""/>         
           </div>
           <h3>Kristina Hu <span>(She/Her)</span></h3>
           <h6>Co-Founder, Candoor | Harvard MBA '22 | ex-Uber, Morgan Stanley</h6>
           <ul class="profileadd">
             <li><span><img src="assets/images/map.png" class="img-fluid" alt=""/></span>Boston (MA), United States</li>
             <li><span><img src="assets/images/clock.png" class="img-fluid" alt=""/></span>Eastern Standard Time (EST)</li>
           </ul>
           <div class="profiletag">
            <span>Female</span><span>Asian American</span><span>Product</span><span>Entrepreneurship</span><span>Social Impact</span>
           </div>
            <div class="myprofile-left-btn">
            <a href="#" class="btn btn-info favorited"><i class="fa fa-heart" aria-hidden="true"></i>Favorited</a>
            <a href="request-a-meeting.html" class="btn btn-info"><img src="assets/images/handshake.png" class="img-fluid headingicon" alt=""/>Request to Meet</a>
            </div>
        </div>
        </div>

        <div class="myprofile-left">
          <div class="myprofile-desc">
            <div class="myprofile-list">
            <h3 class="myprofile-heading"><img src="assets/images/career-icon.png" class="img-fluid headingicon" alt=""/>How I can Help</h3>
            <p>Breaking into finance and tech, working and living abroad, non-technical roles in tech (strategy, business development, data analytics, operations, product management), applying to business school, personal finance </p>
            <ul class="help-list">
              <li><img src="assets/images/help-list1.png" class="img-fluid" alt=""/>Career Advice (Exploration)</li>
              <li><img src="assets/images/help-list2.png" class="img-fluid" alt=""/>Career Advice (Preparation)</li>
              <li><img src="assets/images/help-list3.png" class="img-fluid" alt=""/>Job Search Strategy</li>
              <li><img src="assets/images/help-list4.png" class="img-fluid" alt=""/>Networking Strategy</li>
              <li><img src="assets/images/help-list5.png" class="img-fluid" alt=""/>Resume Review</li>
              <li><img src="assets/images/help-list6.png" class="img-fluid" alt=""/>Cover Letter Review</li>
              <li><img src="assets/images/help-list7.png" class="img-fluid" alt=""/>Mock Interview (Behavioral)</li>
              <li><img src="assets/images/help-list7.png" class="img-fluid" alt=""/>Mock Interview (Technical)</li>
              <li><img src="assets/images/help-list8.png" class="img-fluid" alt=""/>Career Advice (Advancement)</li>
              <li><img src="assets/images/help-list9.png" class="img-fluid" alt=""/>Startup Advice</li>
              <li><img src="assets/images/help-list10.png" class="img-fluid" alt=""/>Graduate School Application Advice</li>
            </ul>
           
            </div>
           </div>
        </div>

      </div>

      <div class="col-lg-8 col-md-12">
        <div class="myprofile-right">

          <div class="myprofile-list">
            <h3 class="myprofile-heading"><img src="assets/images/aboutme.png" class="img-fluid headingicon" alt=""/>About Me</h3>
            <p>I’m a student at Harvard Business School and Co-Founder of Candoor. I've pivoted multiple times in my career, including changing industries (finance to tech), geographies (USA to Netherlands) and roles (product management). At school, I lead the Tech Club and am involved in the DEI Council and Asian Affinity Business Association. I’m passionate about the creator economy, mental health and helping underserved candidates unlock their full potential.</p>
            <div class="myprofile-list-video">
              <iframe width="727" height="409" src="https://www.youtube.com/embed/07d2dXHYb94" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </div>
          </div>

          <div class="myprofile-list">
            <h3 class="myprofile-heading"><img src="assets/images/myjourney.png" class="img-fluid headingicon" alt=""/>My Journey</h3>
           <ul class="myjourney">
             <li>
              <div class="myjourneylisticon"><img src="assets/images/myjourneylist1.png" class="img-fluid myjourneylist-icon" alt=""/></div>
               <div class="myjourney-list">
                <img src="assets/images/institution-logo1.png" class="img-fluid institutionlogo" alt=""/>
                <div class="myjourney-desc">
                <h4>Uber</h4>
                <h5>Product Manager</h5>
                <h6>Jan 2020 - May 2020 • 5 months</h6>
                <div class="askme"><p>Ask me about pivoting to product management, what to do in your first 30/60/90 days, building and maintaining relationships</p></div>               
                </div>
                <div class="myjourney-desc">
                <h5>Strategy & Planning Lead, EMEA Business Development</h5>
                <h6>Feb 2019 - Dec 2019 • 1 year</h6>
                <div class="askme"><p>Ask me about finding executive sponsors, building trust in remote teams, negotiating strategic partnerships</p></div>               
                </div>
                <div class="myjourney-desc">
                <h5>Global Business Analyst, EMEA Central Operations</h5>
                <h6>Aug 2017 - Jan 2019 • 1 year 5 months</h6>
                <div class="askme"><p>Ask me about pivoting to tech from a non-technical background, working and living in Amsterdam, technical skills for data analysts, launching a product from scratch</p></div>
                </div>
               </div>
             </li>
             <li>
              <div class="myjourneylisticon"><img src="assets/images/myjourneylist1.png" class="img-fluid myjourneylist-icon" alt=""/></div>
               <div class="myjourney-list">
                <img src="assets/images/institution-logo2.png" class="img-fluid institutionlogo" alt=""/>
                <div class="myjourney-desc">
                <h4>Morgan Stanley</h4>
                <h5>Investment Banking Analyst</h5>
                <h6>Jul 2016 - Aug 2017 • 1 year 2 months</h6>
                <div class="askme"><p>Ask me about managing up, impostor syndrome, preventing burnout, work-life balance, deciding not to recruit for buy-side jobs</p></div>
                </div>                
               </div>
             </li>
             <li>
               <div class="myjourneylisticon"><img src="assets/images/myjourneylist2.png" class="img-fluid myjourneylist-icon" alt=""/></div>
               <div class="myjourney-list">
                <img src="assets/images/institution-logo3.png" class="img-fluid institutionlogo" alt=""/>
                <div class="myjourney-desc">
                <h4>Harvard College</h4>
                <h5>B.A. in Economics, Minor in Computer Science</h5>
                <h6>Aug 2012 - May 2016 • 4 years</h6>
                <div class="askme"><p>Ask me about choosing a major, making the most of your summer internships, studying abroad, applying to Harvard Business School’s 2+2 early decision program</p></div>
                </div>
               </div>
             </li>
           </ul>
           <a href="#" class="seemore">See more</a>
          </div>

          <div class="myprofile-list">
            <h3 class="myprofile-heading"><img src="assets/images/work-experience.png" class="img-fluid headingicon" alt=""/>Work Experience</h3>
            <div class="myprofile-work">
              <h6>Industries:</h6>
              <span>Technology</span><span>Financial Services</span>
            </div>
            <div class="myprofile-work">
              <h6>Roles:</h6>
              <span>Product Management</span><span>Business Development</span><span>Investment Banking</span><span>Strategy & Planning</span><span>Operations</span><span>Data Science & Analytics</span>
            </div>
          </div>

          <div class="myprofile-list">
            <h3 class="myprofile-heading"><img src="assets/images/fun.png" class="img-fluid headingicon" alt=""/>Just for Fun</h3>
            <div class="whatfun"><p>Video games, TikTok, writing, DJing, yoga, traveling, indoor cycling, pilates, cooking, hiking, improvisational piano</p></div>
          </div>


        </div>
      </div>

    </div>
  </div>
</section> 
</div> 
        );
    }
}

export default profile_edit;
