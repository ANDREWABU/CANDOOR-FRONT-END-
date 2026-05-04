// import React from 'react';
// import Jquery from 'jquery';
// import { Link, Switch } from "react-router-dom";
// import Profile from "../../../assets/images/DashboardImgs/profile.png";
// import { destroySession, toasterAlert as toastAlert } from '../../../Helpers/Functions';
// import history from "../../../Utils/history";
// import Header from "../../../Components/Layouts/AdviseeLayout/Header";
// import Footer from "../../../Components/Layouts/Footer";
// import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
// import Msg from "../../../assets/images/WizardImages/mail.png";
// import Search from "../../../assets/images/WizardImages/search.png";
// import EmailYes from "../../../assets/images/WizardImages/EmailYes.png";
// import EmailIcon from "../../../assets/images/WizardImages/email-icon.png";
// import queryString from 'query-string';
// import Axios from "../../../Config/Axios";
// import EditPen from "../../../assets/images/WizardImages/edit-2.png";
// import authService from "../../../Services/auth.service"
// import ApiRequest from "../../../Services/ApiRequest";
// import heart from "../../../assets/images/heart.png";
// import resume from "../../../assets/images/resume.png";
// import congratulations from "../../../assets/images/congratulations.png";
// import profilebg from "../../../assets/images/profilebg.png";
// import myprofile from "../../../assets/images/myprofile.png";
// import editpro from "../../../assets/images/edit-pro.png";
// import CreatableSelect from 'react-select/creatable';
// //import { ColourOption, colourOptions } from './docs/data';
// import { ActionMeta, OnChangeValue } from 'react-select';
// import WorkList from '../../../Components/Common/WorkList';

// import map from "../../../assets/images/map.png";
// import clock from "../../../assets/images/clock.png";
// import resume_blue from "../../../assets/images/resume-blue.png";
// import aboutme from "../../../assets/images/aboutme.png";
// import careericon from "../../../assets/images/career-icon.png";
// import myjourney from "../../../assets/images/myjourney.png";
// import myjourneylist1 from "../../../assets/images/myjourneylist1.png";
// import institutionlogo from "../../../assets/images/institution-logo.png";
// import myjourneylist2 from "../../../assets/images/myjourneylist2.png";
// import workexperience from "../../../assets/images/work-experience.png";
// import plus from "../../../assets/images/plus.png";
// import fun from "../../../assets/images/fun.png";
// import upload from "../../../assets/images/upload.png";
// import search from "../../../assets/images/search.png";
// import Select from "react-select";
// import PreviewImage from '../../../Components/Common/PreviewImage';

// import Moment from 'moment';
// import ImageUploading from "react-images-uploading";
// import MainFooter from "../../../Components/Layouts/MainFooter";

// const maxNumber = 69;
// let tagLists = [];
// let isDisabled = false;
// let isDisablededu = false;
// let isDisabled2 = false;
// let isDisablededu2 = false;

// class AdviseeProfile extends React.Component {
//   state = {
//     title: '', company: '', progress: '', industry: '', sDate: '', resume: '', resumename: '', role: '', employment_type: '', employment_type_other: '',
//     ask_me_about: '', is_current: 0, start_date: '', end_date: '', is_currentedu: 0,
//     start_dateedu: '', end_dateedu: '', years_work_experience: '', comfort_networking_at_signup: '',
//     loading: false, employment_type_checked: 0, tags_list: '', tagvalue: [], highest_degree: '',
//     school: '', schools: [], school_suggestions: [], degree: '', fields_of_study: '', graduation_year: '',
//     loading: false, degrees: [], profile_goal: '', cover_profile: '', profile_pic: '', is_current: 0,
//     taglistview: [], previewImage: '', showEditBasics: false, datalimit: 2, datalimit1: 2, filterworkedu: '',
//     advise_tag_list: '', profileImage: [], coverImage: [], resumeImage: [], base_url: '', profile_about_me: '',
//     about_me: '', profile_current_career_goals: '', progress_percent: '', initial_career_goals: '', profile_just_for_fun: '',
//     just_for_fun: '', dismiss: '', profile_roles: [], profile_industries: [],
//     errors: {

//     },
//     data: {
//       advisees: {},
//       background: {},
//       educationExperience: [],
//       userData: {},
//       workExperience: [],
//     },
//     data2: {
//       work_experiences: [],
//       companies: [],
//       industries: [],
//       work_roles: [],
//       work_exp_dropdown: [],
//       Employment_Type_radio: [],
//       companies_suggestions: [],
//     },
//     userData_firstName: '', userData_lastName: '', profile_goal: '', userData_pronouns: '', userData_headline: ''
//   }

//   componentDidMount() {
//     this.getMainData();
//   }

//   editeducation = (EducationExperienceID) => {
//     let workexp = this.state.data.educationExperience
//     var education = workexp.filter(item => item.EducationExperienceID == EducationExperienceID)[0]
//     this.setState({ filterworkedu: education })

//   }

//   onChangeState = (event) => {

//     // //debugger;
//     const { name, value, checked, id } = event.target;
//     this.setState({ [name]: value })

//     if (name == 'company' || name == 'school') {
//       this.onTextChanged(name, value);
//     }
//     if (name === 'cover_photo') {
//       const image = event.target.files[0];
//       this.setState({ cover_photo: image });
//       this.setState({ flag: true });
//     }
//     if (name === 'resume') {
//       const image = event.target.files[0];
//       this.setState({ resume: image });
//       this.setState({ flag: true });
//     }
//     if (name == 'is_current') {

//       this.setState({ [name]: checked ? 1 : 0 })
//       if (checked == false) {
//         isDisabled2 = false;
//       }
//       else {
//         isDisabled2 = true;
//       }
//       return true;
//     }
//     if (name == 'start_date') {
//       this.setState({ sDate: value });
//     }
//     if (name == 'start_dateedu') {
//       this.setState({ sDate: value });
//     }
//     if (name == 'end_date') {


//       if (value == "") {
//         isDisabled = false;
//       }
//       else {
//         isDisabled = true;
//       }
//     }
//     if (name == 'is_currentedu') {

//       this.setState({ [name]: checked ? 1 : 0 })
//       if (checked == false) {
//         isDisablededu2 = false;
//       }
//       else {
//         isDisablededu2 = true;
//       }
//       return true;
//     }
//     if (name == 'end_dateedu') {


//       if (value == "") {
//         isDisablededu = false;
//       }
//       else {
//         isDisablededu = true;
//       }
//     }
//     // if (name.include('edit-')) {
//     //   let workExData = this.state.data.workExperience;
//     //   const editval = name.split('-');
//     //   const index = this.state.data.workExperience.indexOf(w => w.WorkExperienceID === editval[2]);
//     //   const workEx = this.state.data.workExperience[index];
//     //   workEx[editval[1]] = value;
//     //   workExData[index] = workEx;
//     //   this.setState({data[workExperience]: })
//     // }
//   }

//   getMainData = async () => {
//     let response = await ApiRequest.getRequest('/api/advisees-get-profile-data');
//     let response1 = await ApiRequest.getRequest('/api/get-education-data');
//     let response2 = await ApiRequest.getRequest('/api/get-work-experience-data');
//     // this.setState({base_url:response.ata.base_url});
//     // //debugger;
//     response = response.data;
//     let data = this.state.data;

//     if (response) {

//       data = response.Data;

//       console.log(data)

//       this.setState(() => ({ data }));
//       this.setState({ userData_firstName: data.userData.firstname, userData_lastName: data.userData.lastname, userData_pronouns: data.userData.pronouns, userData_headline: data.advisees.headline })
//       this.setState({ base_url: data.baseUrl });
//       this.setState({ profile_about_me: data.advisees.about_me, about_me: data.advisees.about_me });
//       this.setState({ profile_current_career_goals: data.advisees.current_career_goals, initial_career_goals: data.advisees.initial_career_goals });
//       this.setState({ profile_just_for_fun: data.advisees.just_for_fun, just_for_fun: data.advisees.just_for_fun });
//       this.setState({ profile_goal: data.advisees.profile_goal });
//       this.setState({ progress: (JSON.parse(data.progress)) });
//       this.setState({ cover_profile: data.advisees.cover_profile });
//       this.setState({ resume: data.advisees.resume });


//       this.setState({ taglistview: (JSON.parse(data.advisees.tags_list)) });
//       const tags_list = [];
//       this.state.taglistview.forEach((item) => {
//         const dataItem = {
//           label: item,
//           value: item
//         }
//         tags_list.push(dataItem);
//       });
//       this.setState({ tagvalue: tags_list });


//       const tagListArray = (JSON.parse(this.state.data.advisees.tags_list));

//     }

//     response1 = response1.data;

//     let data1 = this.state.data;
//     if (response1.result) {
//       data.fields_of_study = this.selectOptions(response1.result.field_of_studies);
//       data.education_experiences = response1.result.education_experiences;
//       data.get_heigest_degree_completed = response1.result.get_heigest_degree_completed;
//       this.setState(() => ({ data, highest_degree: response1.result.highest_degree, degrees: response1.result.degrees, schools: response1.result.schools }));
//     }

//     // //debugger
//     response2 = response2.data;

//     let data2 = this.state.data2;
//     if (response2.result) {
//       data2.companies = response2.result.companies;
//       data2.industries = response2.result.industries;
//       data2.work_roles = response2.result.work_roles;
//       data2.work_experiences = response2.result.work_experiences;
//       data2.work_exp_dropdown = response2.result.work_exp_dropdown;
//       data2.Employment_Type_radio = response2.result.Employment_Type;

//       this.setState(() => (
//         {
//           data2,
//           years_work_experience: response2.result.years_work_experience,
//           comfort_networking_at_signup: response2.result.comfort_networking_at_signup

//         }));
//     }

//     let industries = this.state.profile_industries;
//     let work_roles = this.state.profile_roles;

//     response2.result.work_experiences.forEach((item) => {
//       if (!industries.includes(item.industry)) {
//         industries.push(item.industry)
//       }

//       if (!work_roles.includes(item.role)) {
//         work_roles.push(item.role)
//       }
//     })

//     this.setState({
//       ...this.state,
//       profile_roles: work_roles,
//       profile_industries: industries,
//     });

//     console.log(this.state)
//   }


//   getarraylength = async () => {

//     var result = this.state.data.workExperience.length;

//     this.setState({ datalimit: result });

//   }
//   resetarraylength = async () => {



//     this.setState({ datalimit: 2 });

//   }
//   getarraylengtheducation = async () => {


//     var result1 = this.state.data.educationExperience.length;

//     this.setState({ datalimit1: result1 });
//   }
//   resetarraylengtheducation = async () => {


//     this.setState({ datalimit1: 2 });
//   }

//   add = async () => {

//     const { firstname, lastname, pronouns, headline } = this.state.data.userData;
//     let { first_name_error, last_name_error } = '';

//     if (!firstname) {
//       first_name_error = 'This Field is required.'
//     }

//     if (!lastname) {
//       last_name_error = 'This Field is required.';
//     }

//     this.setState(prevState => ({
//       errors: {
//         ...prevState.errors,
//         lastname: last_name_error,
//         firstname: first_name_error,
//       }
//     }))
//     if (first_name_error || last_name_error) {
//       return true;
//     }
//     this.setState({ loading: true });

//     const tags_list = [];
//     this.state.tagvalue.forEach((item) => {
//       tags_list.push(item.value);
//     });

//     const data = new FormData();
//     data.append("firstname", this.state.userData_firstName);
//     data.append("lastname", this.state.userData_lastName);
//     data.append("pronouns", this.state.userData_pronouns);
//     data.append("headline", this.state.userData_headline);

//     if (this.state.previewImage !== "") {
//       data.append("profile_goal", this.state.profileImage);
//       data.append("update_profile_picture", 1);
//     } else {
//       data.append("update_profile_picture", 0);
//     }


//     data.append("cover_profile", this.state.coverImage);


//     data.append("resume", this.state.resumeImage);
//     data.append("tags_list", JSON.stringify(tags_list));

//     let response = await ApiRequest.postRequest('/api/user-update-basic-info', data);
//     console.log(response)
//     if (response.status === 200) {
//       toastAlert('success', 'Request has been processed.');
//       this.setState({ dismiss: 'modal', previewImage: "" });
//       this.setState({ progress: (JSON.parse(response.data.progress)) });
//       this.setState({ resumename: (response.data.resume) });
//       this.getMainData();
//     } else {
//       toastAlert('error', 'Something went wrong');
//     }
//     this.setState({ dismiss: 'modal' });
//     // this.changeStep();
//   }

//   addabout = async () => {

//     const { about_me } = this.state;

//     let { about_me_error } = '';
//     //  this.resetErrors();
//     if (!about_me) {
//       about_me_error = 'This Field is required.'

//     }

//     this.setState(prevState => ({
//       errors: {
//         ...prevState.errors,
//         about_me: about_me_error,
//       }
//     }))
//     if (about_me_error) {
//       return true;
//     }
//     this.setState({ loading: true });
//     const data = {
//       about_me
//     }
//     let response = await ApiRequest.postRequest('/api/advisees-update-about-me ', data);
//     //  //debugger;
//     if (response.data.statusCode === 200) {
//       toastAlert('success', 'Request has been processed.');

//       this.setState({ profile_about_me: about_me });
//       this.setState({ progress: (JSON.parse(response.data.progress)) });
//     } else {
//       toastAlert('error', 'Something went wrong');
//     }

//     // this.setState({ loading: false });
//     // this.changeStep();
//   }
//   addcareerinterest = async () => {

//     const { initial_career_goals, profile_current_career_goals } = this.state;
//     console.log(profile_current_career_goals)

//     let { current_career_goals_error } = '';
//     //  this.resetErrors();
//     if (!profile_current_career_goals) {
//       current_career_goals_error = 'This Field is required.'
//     }

//     this.setState(prevState => ({
//       errors: {
//         ...prevState.errors,
//         current_career_goals: current_career_goals_error,
//       }
//     }))

//     this.setState({ loading: true });

//     if (current_career_goals_error) {
//       return true;
//     }
//     const data = {
//       current_career_goals: profile_current_career_goals
//     }
//     let response = await ApiRequest.postRequest('/api/advisees-update-currer-interests', data);

//     if (response.data.statusCode === 200) {
//       toastAlert('success', 'Request has been processed.');
//       this.setState({ profile_current_career_goals: profile_current_career_goals })
//       this.setState({ progress: (JSON.parse(response.data.progress)) });

//     } else {
//       toastAlert('error', 'Something went wrong');
//     }
//     //this.setState({ loading: false });
//     this.setState({ dismiss: 'modal' });
//     //this.changeStep();
//   }
//   addforfun = async () => {
//     ////debugger;
//     const profile_just_for_fun = this.state.profile_just_for_fun;

//     let { just_for_fun_error } = '';
//     //  this.resetErrors();
//     if (!profile_just_for_fun) {
//       just_for_fun_error = 'This Field is required.'
//     }

//     this.setState(prevState => ({
//       errors: {
//         ...prevState.errors,
//         profile_just_for_fun: just_for_fun_error,
//       }
//     }))
//     if (just_for_fun_error) {
//       return true;
//     }


//     const data = {
//       "just_for_fun": profile_just_for_fun
//     }
//     let response = await ApiRequest.postRequest('/api/advisees-update-just-for-fun  ', data);
//     if (response.data.statusCode === 200) {
//       toastAlert('success', 'Request has been processed.');
//       this.setState({ just_for_fun: profile_just_for_fun })

//       this.setState({ progress: (JSON.parse(response.data.progress)) });

//       // this.setState({ progress: (JSON.parse(data.progress)) });
//     } else {
//       toastAlert('error', 'Something went wrong');
//     }


//   }

//   addEducation = async (schooldata) => {
//     //  if(schooldata){
//     //    this.state =  schooldata
//     //  }
//     //debugger;
//     const { id, school, degree, fields_of_study, is_currentedu, start_dateedu, end_dateedu, graduation_year } = this.state;
//     let { schoolid, schoolError, degreeError, fields_of_studyError } = '';
//     if (!school) {
//       schoolError = 'This Field is required.'
//     }

//     if (!degree) {
//       degreeError = 'This Field is required.';
//     }
//     if (!fields_of_study) {
//       fields_of_studyError = 'This Field is required.';
//     }

//     this.setState(prevState => ({
//       errors: {
//         ...prevState.errors,
//         school: schoolError,
//         degree: degreeError,
//         fields_of_study: fields_of_studyError,

//       }
//     }))
//     if (schoolError || degreeError || fields_of_studyError) {
//       return true;
//     }
//     if (schooldata) {
//       schoolid = schooldata.EducationExperienceID
//     } else {
//       schoolid = ""
//     }
//     const data = {
//       id: schoolid,
//       // school: schoolid,
//       school: school,
//       degree: degree,
//       fields_of_study: fields_of_study,
//       //  graduation_year: graduation_year,
//       is_current: is_currentedu,
//       start_date: start_dateedu,
//       graduation_year: end_dateedu
//     }
//     let response
//     if (schooldata) {
//       response = await ApiRequest.putRequest('/api/update-education-experience', data);
//     }
//     else {
//       response = await ApiRequest.postRequest('/api/add-education-experience', data);
//     }

//     if (response.status === 200) {
//       let dataState = this.state.data;
//       dataState.educationExperience = response.data.result;
//       this.setState({
//         data: dataState
//       })
//       toastAlert('success', 'Request has been processed.');
//       this.setState({ progress: (JSON.parse(response.data.progress)) });

//     } else {
//       toastAlert('error', 'Something went wrong');
//     }
//     this.setState({ dismiss: 'modal' });

//   }

//   downloadResume = async () => {

//     ApiRequest.getBlobRequest('/api/download-resume/' + this.state.resume.split('/')[2])
//       .then((response) => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'Resume.pdf'); //or any other extension
//         document.body.appendChild(link);
//         link.click();
//         //window.location.href = response.url;
//       });

//   }

//   addWork = async (companydata) => {

//     const { title, company, industry, role, employment_type, employment_type_other, ask_me_about, is_current, start_date, end_date } = this.state;

//     let { companyid, titleError, companyError, industryError, roleError, employment_type_otherError, ask_me_aboutError, is_currentError, start_dateError, end_dateError } = '';
//     if (companydata) { companyid = companydata.WorkExperienceID } else { companyid = ""; }
//     const data = {
//       id: companyid,
//       // companyid : companyid,
//       title, company, industry, role, employment_type, employment_type_other, ask_me_about, is_current,
//       start_date, end_date
//     }
//     let response
//     if (data.id) {
//       response = await ApiRequest.putRequest('/api/update-work-experience', data);
//     }
//     else {
//       response = await ApiRequest.postRequest('/api/add-work-experience', data);
//     }
//     if (response.status === 200) {
//       //   //debugger;
//       let dataState = this.state.data;
//       dataState.workExperience = response.data.result;
//       this.setState({
//         data: dataState
//       })
//       //  console.log(this.state.data2);
//       //  //debugger;
//       toastAlert('success', 'Request has been processed.');
//       this.setState({ progress: (JSON.parse(response.data.progress)) });
//     } else {
//       toastAlert('error', 'Something went wrong');
//     }
//     this.setState({ dismiss: 'modal' });
//     console.log(this.state.dismiss)
//   }

//   handleChange1 = (
//     OnChangeValue,
//     ActionMeta
//   ) => {

//     //console.group('Value Changed');
//     console.log(OnChangeValue);
//     this.setState({ tagvalue: OnChangeValue });
//     console.log('tag', this.state.tagvalue)
//   };

//   deleteworkExperience = async (ID) => {
//     const response = await ApiRequest.deleteRequest('/api/delete-work-experience', ID);

//     if (response.status === 200) {
//       let data = this.state.data;
//       data.workExperience = response.data.result

//       this.setState({
//         data
//       })

//       toastAlert('success', 'Request has been processed.');
//     } else {
//       toastAlert('error', "Something went wrong please try again!");
//     }
//     this.setState({ dismiss: 'modal' });
//   }

//   deleteEducation = async (ID) => {
//     const response = await ApiRequest.deleteRequest('/api/delete-education-experience', ID);

//     if (response.status === 200) {

//       let data = this.state.data;
//       data.educationExperience = response.data.result

//       this.setState({ data })
//       toastAlert('success', 'Request has been processed.');
//     } else {
//       toastAlert('error', "Something went wrong please try again!");
//     }
//     this.setState({ dismiss: 'modal' });
//   }

//   toggleEditBasics = (e) => {
//     this.setState({ showEditBasics: true });
//   }

//   handleChange = (selectedOption, e) => {
//     const { name } = e;

//     this.setState({ [name]: selectedOption }, () =>
//       console.log(`Option selected:`, selectedOption)
//     );
//     // if (name === 'tags_list') {
//     //   tagLists = [];
//     //   selectedOption.forEach(item => { tagLists.push(item) });
//     // }
//     // tagLists = selectedOption;
//   };

//   selectOptions = (list) => {
//     let options = [];
//     list.map(el => {
//       let arr = {
//         value: el.name,
//         label: el.name,
//       }
//       options.push(arr);
//     })
//     return options;
//   }
//   onTextChanged = (name, value) => {

//     let suggestions;
//     let data2;
//     if (name === 'school') {
//       suggestions = this.state.schools;
//     }
//     else {
//       data2 = this.state.data2;
//       suggestions = data2.companies;
//     }
//     if (value && suggestions) {
//       const regex = new RegExp(`${value}`, 'i');
//       suggestions = suggestions.sort().filter(v => regex.test(v.name));
//     }
//     else {
//       suggestions = [];
//     }
//     if (name === 'school') {
//       this.setState({ school_suggestions: suggestions });
//     }
//     else {
//       data2.companies_suggestions = suggestions;
//       this.setState(() => ({ data2 }));
//     }
//   }
//   suggestionSelected(name, value) {
//     if (name === 'school') {
//       this.setState({ school: value, school_suggestions: [] });
//     }
//     else {
//       let data2 = this.state.data2;
//       data2.companies_suggestions = [];
//       this.setState(() => ({
//         [name]: value,
//         data2
//       }));
//     }
//   }
//   renderSuggestions(name) {
//     let suggestions;
//     if (name === 'school') {
//       suggestions = this.state.school_suggestions;
//     }
//     else {
//       suggestions = this.state.data2.companies_suggestions;
//     }
//     if (suggestions.length === 0) {
//       return null;
//     }
//     return (
//       <div className="srchList">
//         <ul class="oneline">
//           {suggestions.map((item) => <span onClick={() => {
//             console.log(item.name);
//             this.suggestionSelected(name, item.name)
//           }}>{item.name}</span>)}
//         </ul>
//       </div>
//     );
//   }
//   setInputFieldStates(item = '') {
//     console.log(this.state.data.workExperience)
//     this.setState({
//       title: item ? item.title : '',
//       company: item ? item.company : '',
//       industry: item ? item.industry : '',
//       role: item ? item.role : '',
//       employment_type: item ? item.employment_type : '',
//       employment_type_other: item ? item.employment_type_other : '',
//       // ask_me_about : item? item.ask_me_about : '',
//       is_current: item ? item.is_current : '',
//       start_date: item ? item.start_date : '',
//       end_date: item ? item.end_date : '',
//       custom_graduation_year: item ? item.end_date : '',
//     })
//   }
//   setInputFieldStates1(item = '') {
//     this.setState({
//       school: item ? item.school : '',
//       degree: item ? item.degree : '',
//       fields_of_study: item ? item.fields_of_study : '',
//       start_date: item ? item.start_date : '',
//       graduation_year: item ? item.graduation_year : '',
//       is_currentedu: item ? item.is_currentedu : '',
//     })
//   }
//   onChangeImage = (event) => {
//     //debugger;

//     const { name, files, checked, id } = event.target;
//     this.setState({ [name]: files[0] })
//     console.log(this.state)

//     if (name === 'profileImage') {
//       this.setState({ previewImage: URL.createObjectURL(files[0]) });
//     }

//     console.log(this.state)
//     if (name === 'cover_photo') {
//       this.setState({ flag: true });
//     }

//     if (name === 'reume') {
//       this.setState({ flag: true });
//     }

//     if (name === 'resumeImage') {
//       this.setState({ flag: true });
//       this.setState({ resumename: files[0]['name'] })
//       const objectURL = URL.createObjectURL(files[0]);
//       let link = document.getElementById('link');
//       link.download = files[0]['name'];
//       link.href = objectURL;
//     }


//     // this.setState({ profileImage: imageList });
//   };

//   onChangeCovorImage = (imageList, addUpdateIndex) => {

//     this.setState({ coverImage: imageList });
//   };

//   onChangeResumeImage = (imageList, addUpdateIndex) => {

//     this.setState({ resumeImage: imageList });
//   };

//   render() {
//     return (
//       <div>
//         <Header />
//         <section className="myprofile-sec">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="myprofile-d">
//                   <h2>My Profile</h2>
//                   {/* <p>Profile Strength :

//                     <span className="advisor-strength" >
//                       {
//                         this.state.progress ?
//                           this.state.progress.progress_percent >= 80 && this.state.progress.progress_percent <= 100 ?
//                             <span class="green"> High</span>
//                             :
//                             this.state.progress.progress_percent >= 40 && this.state.progress.progress_percent < 80 ?
//                               <span class="yellow"> Medium</span>
//                               :
//                               this.state.progress.progress_percent >= 0 && this.state.progress.progress_percent < 40 ?
//                                 <span class="red"> Low</span> :
//                                 ""
//                           : <span class="red"> Low</span>
//                       }

//                     </span>
//                   </p> */}
//                   {/* <div className="progress-sec">
//                     <div className="progress">
//                       {this.state.progress ?
//                         <div className="progress-bar" style={{ width: this.state.progress.progress_percent + "%" }}><span>{this.state.progress.progress_percent + "%"}</span></div>
//                         : <div className="progress-bar" style={{ width: "0%" }}><span>{"0%"}</span></div>
//                       }
//                     </div>
//                   </div> */}
//                   {/* {this.state.progress ?
//                     this.state.progress.progress_percent === 100 ?
//                       <div className="heartbox">
//                         <img src={congratulations} className="img-fluid" alt="" /><p><strong>Congratulations, your profile is the strongest it can be!</strong> Please keep your profile up-to-date so Advisors can support you based on your latest interests & experiences.</p>
//                       </div>
//                       : this.state.progress.complete_profile === '' ?
//                         <div className="heartbox">
//                           <img src={resume} className="img-fluid" alt="" /><p>Upload your <strong>resume</strong> to give Advisors more context on your background and experiences. For tips and templates on writing resumes, click here.</p>
//                         </div>
//                         :
//                         this.state.progress.just_for_fun === '' ?
//                           <div className="heartbox">
//                             <img src={heart} className="img-fluid" alt="" />What do you like to do in your free time? Complete the <strong>Just for Fun</strong>section to provide additional angles of connection with Advisors.
//                           </div>
//                           : <div className="heartbox">
//                             <img src={resume} className="img-fluid" alt="" /><p>Upload your <strong>resume</strong> to give Advisors more context on your background and experiences. For tips and templates on writing resumes, click here.</p>
//                           </div> : ''
//                   } */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="myprofile-info">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-4 col-md-12">
//                 <div className="myprofile-left">
//                   <div className="myprofilebg">
//                     <img style={{
//                       'objectFit': 'cover'
//                     }}

//                       src={
//                         this.state.cover_profile !== null
//                           ? process.env.REACT_APP_API_URL + `/${this.state.cover_profile}`
//                           : profilebg
//                       }

//                       className="img-fluid" alt="" />
//                   </div>
//                   <div className="myprofile-desc">
//                     <div className="profileimg">
//                       <img style={{
//                         'objectFit': 'cover'
//                       }}
//                         src={
//                           this.state.profile_goal !== null
//                             ? process.env.REACT_APP_API_URL + `/${this.state.profile_goal}`
//                             : myprofile
//                         }
//                         className="img-fluid myprofileimg" alt="" />
//                       <a href="#" className="hovertooltip" data-toggle="modal" data-target="#myModal">
//                         <img src={editpro} className="img-fluid" alt="" />
//                         <div className="hovertooltip-d">Click to edit me!</div></a>
//                     </div>
//                     <h3>{this.state.data.userData.firstname} {this.state.data.userData.lastname} <span>{(this.state.data.userData.pronouns ? this.state.data.userData.pronouns : "")}</span></h3>
//                     <h6>{this.state.data.advisees.headline}</h6>
//                     <ul className="profileadd">
//                       {
//                         this.state.resume ? <li><span ><img src={resume_blue} className="img-fluid" alt="" /></span>
//                           <span style={{ 'color': '#3771CA', 'textDecoration': 'underline', 'cursor': 'pointer' }} onClick={this.downloadResume}>Resume</span></li> :
//                           <></>
//                       }


//                       <li><span><img src={map} className="img-fluid" alt="" /></span>{this.state.data.background ? this.state.data.background.city : ""} {this.state.data.background === "NULL" ? (this.state.data.background.state) : ""}, {this.state.data.background ? (this.state.data.background.country) : ""}</li>
//                       <li><span><img src={clock} className="img-fluid" alt="" /></span>{this.state.data.background ? this.state.data.background.time_zone : ""}</li>
//                     </ul>
//                     <div className="profiletag">
//                       {
//                         this.state.taglistview ?
//                           this.state.taglistview.map((tags_list, index) => (
//                             <span>{tags_list}</span>

//                           ))
//                           :
//                           ""
//                       }
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-lg-8 col-md-12">
//                 <div className="myprofile-right">

//                   <div className="myprofile-list">
//                     <h3 className="myprofile-heading"><img src={aboutme} className="img-fluid headingicon" alt="" />
//                       About Me<a href="#" className="hovertooltip" data-toggle="modal" data-target="#myModal2"><img src={editpro} className="img-fluid" alt="" /><div className="hovertooltip-d">Click to edit me!</div></a></h3>
//                     <p>{this.state.profile_about_me}</p>
//                   </div>

//                   <div className="myprofile-list">
//                     <h3 className="myprofile-heading"><img src={careericon} className="img-fluid headingicon" alt="" />Career Interests<a href="#" className="hovertooltip" data-toggle="modal" data-target="#myModal3"><img src={editpro} className="img-fluid" alt="" /><div className="hovertooltip-d">Click to edit me!</div></a></h3>
//                     <p>{this.state.profile_current_career_goals} </p>
//                   </div>

//                   <div className="myprofile-list">
//                     <h3 className="myprofile-heading"><img src={myjourney} className="img-fluid headingicon" alt="" />My Journey<a href="#" className="hovertooltip" data-toggle="modal" data-target="#myModal4"><img src={plus} className="img-fluid" alt="" /><div className="hovertooltip-d">Click to add me!</div></a></h3>
//                     <ul className="myjourney">
//                       <li>
//                         <div className="myjourneylisticon"><img src={myjourneylist1} className="img-fluid myjourneylist-icon" alt="" /></div>
//                         <div className="myjourney-list">
//                           {/* <WorkList itemsArr={this.state.data.workExperience} /> */}




//                           {/* <img src={institutionlogo} className="img-fluid institutionlogo" alt="" /> */}
//                           {
//                             this.state.data.workExperience.slice(0, this.state.datalimit).map((company, index) => (
//                               <div className="myjourney-desc">
//                                 <h4>{company.company}</h4>
//                                 <h5>{company.title}</h5>
//                                 <h6>
//                                   {Moment(company.start_date).format("MMM YYYY ")}
//                                   -
//                                   {

//                                     company.is_current === 0 ?
//                                       <>
//                                         {Moment(company.end_date).format(" MMM YYYY")}
//                                         {/* <Moment unit='years' format=' MMM YYYY ' local element='span'>
//                                     {work.end_date}
//                                   </Moment> */}

//                                         {' '}
//                                         • {company.duration_time}
//                                       </> :
//                                       <>
//                                         <span>
//                                           &nbsp;Present
//                                         </span>{' '}
//                                         • {company.duration_time}
//                                       </>

//                                   }
//                                 </h6>


//                                 {/* <h6>{Moment(company.start_date).format("MMM YYYY")} - {Moment(company.end_date).format("MMM YYYY")}  {company.duration_time === '' ? '' : "•" + company.duration_time}</h6> */}



//                                 <a className="hovertooltip editicon" href="#" data-toggle="modal" data-target={"#myModal" + company.WorkExperienceID}>
//                                   <img src={editpro} className="img-fluid" alt="" onClick={e => this.setInputFieldStates(company)} /> <div className="hovertooltip-d">Click to edit me!</div></a>
//                                 <div class="modal fade modal-d" id={"myModal" + company.WorkExperienceID}>
//                                   <div class="modal-dialog modal-lg">
//                                     <div class="modal-content">
//                                       <div class="modal-header">
//                                         <h4 class="modal-title">Edit Work Experience</h4>
//                                       </div>
//                                       <div class="modal-body">
//                                         <form>
//                                           <div class="row">
//                                             <div class="col-md-12">
//                                               <div class="form-group">
//                                                 <label>Title</label>
//                                                 <input type="text" class="form-control" name="title" onChange={this.onChangeState} placeholder="Product Manager" value={this.state.title} />
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div class="row">
//                                             <div class="col-md-12">
//                                               <div class="form-group">
//                                                 <label>Company</label>
//                                                 <div class="input-group">
//                                                   <div class="input-group-append">
//                                                     <span class="input-group-text">
//                                                       <img src={search} class="img-fluid" alt="" /></span>
//                                                   </div>
//                                                   <input type="text" class="form-control" onChange={this.onChangeState} name="company" placeholder="Uber" value={this.state.company} />
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div class="row">
//                                             <div class="col-md-12">
//                                               <div class="form-group">
//                                                 <label>Industry</label>
//                                                 <select className="form-control" aria-label="Default select example" name="industry" onChange={this.onChangeState}
//                                                   value={this.state.industry}>
//                                                   <option selected>Select an industry</option>
//                                                   {
//                                                     this.state.data2.industries.map((item, index) => (
//                                                       <option value={item.name}>{item.name}</option>
//                                                     ))
//                                                   }
//                                                 </select>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div class="row">
//                                             <div class="col-md-12">
//                                               <div class="form-group">
//                                                 <label>Role</label>
//                                                 <select className="form-control" aria-label="Default select example" name="role" onChange={this.onChangeState}
//                                                   value={this.state.role}>
//                                                   <option selected>Select a role</option>
//                                                   {
//                                                     this.state.data2.work_roles.map((item, index) => (
//                                                       <option value={item.name}>{item.name}</option>
//                                                     ))
//                                                   }
//                                                 </select>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div className="row">
//                                             <div className="col-md-12">
//                                               <div className="form-group">
//                                                 <label>Employment Type</label>
//                                                 <ul className="employment-type">
//                                                   <li>
//                                                     <div className="radio-d">

//                                                       {this.state.data2.Employment_Type_radio.map((item, index) => {
//                                                         return <div key={'ta' + item}>
//                                                           <label className="form-check-label">
//                                                             <input class="form-check-input" type="radio" id={'radio03-' + index} name="employment_type"
//                                                               value={item} onChange={this.onChangeState} checked={this.state.employment_type === item ? 'checked' : ''} />
//                                                             {item}
//                                                           </label>
//                                                         </div>
//                                                       })}

//                                                     </div>
//                                                   </li>
//                                                 </ul>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div class="row">
//                                             <div class="col-md-12">
//                                               <div class="form-group">
//                                                 <label>(Optional) Dont see your Employment Type? Type it here</label>
//                                                 <input type="text" className="form-control" placeholder="Type it here..." name="employment_type_other" onChange={this.onChangeState} value={this.state.employment_other} />
//                                                 <span className="error">{this.state.errors.employment_type_other}</span>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div className="row row-half">
//                                             <div className="col-md-6">
//                                               <div className="form-group">
//                                                 <label>Start Date</label>
//                                                 <input type="date" className="form-control" placeholder="MM/YY" name="start_date" onChange={this.onChangeState} value={this.state.start_date} />
//                                               </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                               <div className="form-group">
//                                                 <label>End Date</label>
//                                                 <input type="date" className="form-control" name="end_date" disabled={this.state.is_current == 1 ? 'disabled' : ''} onChange={this.onChangeState} value={this.state.end_date} placeholder="MM/YY" />
//                                               </div>
//                                             </div>
//                                           </div>

//                                           <div className="row">
//                                             <div className="col-md-12">
//                                               <div className="form-group checkbox-design">
//                                                 <label className="form-check-label">
//                                                   <input disabled={isDisabled} checked={this.state.is_current == 1 ? 'checked' : ''} name="is_current" onChange={this.onChangeState}
//                                                     type="checkbox" /> I currently work in this role
//                                                 </label>
//                                               </div>
//                                             </div>
//                                           </div>

//                                         </form>


//                                       </div>

//                                       <div class="modal-footer">
//                                         <div class="modal-footer-btn">
//                                           <div class="row">
//                                             <div class="col-md-6">
//                                               <button type="button" class="btn btn-info btn-cancel deletebtn" onClick={(e) => {
//                                                 e.preventDefault();
//                                                 this.deleteworkExperience(company.WorkExperienceID);
//                                               }} data-dismiss={this.state.dismiss}>Delete</button>
//                                             </div>
//                                             <div class="col-md-6">
//                                               <button onClick={(e) => {
//                                                 //  e.preventDefault();
//                                                 this.addWork(company);
//                                               }} type="button" class="btn btn-info">Save Changes</button>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>

//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))
//                           }
//                         </div>
//                       </li>
//                       {this.state.data.workExperience.length > 2 ?
//                         this.state.datalimit == 2 ?
//                           <a href="#" onClick={(e) => {

//                             this.getarraylength();
//                           }} className="seemore">See more</a>

//                           :
//                           <a href="#" onClick={(e) => {

//                             this.resetarraylength();
//                           }} className="seemore">See Less</a>

//                         : ""
//                       }
//                       <li>
//                         <div className="myjourneylisticon"><img src={myjourneylist2} className="img-fluid myjourneylist-icon" alt="" /></div>
//                         <div className="myjourney-list">
//                           {/* <img src={institutionlogo} className="img-fluid institutionlogo" alt="" /> */}
//                           {
//                             this.state.data.educationExperience.slice(0, this.state.datalimit1).map((school, index) => (
//                               <div>
//                                 <div className="myjourney-desc">
//                                   <h4>{school.school}</h4>
//                                   <h5>{school.degree}</h5>

//                                   <h6>
//                                     {Moment(school.start_date).format("MMM YYYY ")}
//                                     -
//                                     {
//                                       school.is_current === 0 ?
//                                         <>
//                                           {Moment(school.graduation_year).format(" MMM YYYY")}
//                                           {/* <Moment unit='years' format=' MMM YYYY ' local element='span'>
//                                     {work.end_date}
//                                   </Moment> */}

//                                           {' '}
//                                           • {school.duration_time}
//                                         </> :
//                                         <>
//                                           <span>
//                                             &nbsp;Present
//                                           </span>{' '}
//                                           • {school.duration_time}
//                                         </>

//                                     }
//                                   </h6>


//                                   {/* <h6>{Moment(school.start_date).format("MMM YYYY")} - {Moment(school.graduation_year).format("MMM YYYY")}</h6> */}


//                                   <a onClick={e => this.setInputFieldStates1(school)} href="#" className="hovertooltip editicon" data-toggle="modal" data-target={"#myModaledu" + school.EducationExperienceID}>
//                                     <img src={editpro} className="img-fluid" alt="" /></a>

//                                   <div className="modal fade modal-d" id={"myModaledu" + school.EducationExperienceID}>
//                                     <div className="modal-dialog modal-lg">
//                                       <div className="modal-content">
//                                         <div className="modal-header">
//                                           <h4 className="modal-title">Edit Education Experience</h4>
//                                         </div>
//                                         <div className="modal-body">

//                                           <form>
//                                             <div className="row">
//                                               <div className="col-md-12">
//                                                 <div className="form-group">
//                                                   <label>School</label>
//                                                   <div className="input-group">
//                                                     <div className="input-group-append">
//                                                       <span className="input-group-text"><img src={search} className="img-fluid" alt="" /></span>
//                                                     </div>
//                                                     <input type="search" className="form-control" name="school" onChange={this.onChangeState}
//                                                       value={this.state.school} autoComplete="off" placeholder="Search or type your school..." />


//                                                     {this.renderSuggestions('school')}
//                                                   </div>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                             <div className="row">
//                                               <div className="col-md-12">
//                                                 <div className="form-group">
//                                                   <label>Degree</label>
//                                                   <select className="form-control" name="degree"
//                                                     aria-label="Default select example" onChange={this.onChangeState} value={this.state.degree}>
//                                                     <option selected>Select your degree</option>
//                                                     {
//                                                       this.state.degrees.map((item, index) => (
//                                                         <option value={item.name}>{item.name}</option>
//                                                       ))
//                                                     }
//                                                   </select>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                             <div className="row">
//                                               <div className="col-md-12">
//                                                 <div className="form-group tag-design">
//                                                   <label>Major(s) / Field(s) of study</label>
//                                                   <Select classNamePrefix="react-select-custom" isMulti options={this.state.data.fields_of_study} name="fields_of_study" onChange={this.handleChange} value={this.state.fields_of_study} placeholder="Select all that apply..." />
//                                                 </div>
//                                               </div>
//                                             </div>

//                                             <div className="row row-half">
//                                               <div className="col-md-6">
//                                                 <div className="form-group">
//                                                   <label>Start Date</label>
//                                                   <input type="date" className="form-control" placeholder="MM/YY" name="start_date" onChange={this.onChangeState} value={this.state.start_date} />
//                                                 </div>
//                                               </div>
//                                               <div className="col-md-6">
//                                                 <div className="form-group">
//                                                   <label>End Date</label>
//                                                   <input type="date" min={this.state.sDate} className="form-control" name="graduation_year" disabled={this.state.is_currentedu == 1 ? 'disabled' : ''} onChange={this.onChangeState} value={this.state.graduation_year} placeholder="MM/YY" />
//                                                 </div>
//                                               </div>
//                                             </div>
//                                             <div className="row">
//                                               <div className="col-md-12">
//                                                 <div className="form-group checkbox-design">
//                                                   <label className="form-check-label">
//                                                     <input disabled={isDisablededu} checked={this.state.is_currentedu == 1 ? 'checked' : ''} name="is_currentedu" onChange={this.onChangeState}
//                                                       type="checkbox" /> I am currently studying
//                                                   </label>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </form>
//                                         </div>
//                                         <div className="modal-footer">
//                                           <div className="modal-footer-btn">
//                                             <div className="row">
//                                               <div className="col-md-6">
//                                                 <button type="button" onClick={(e) => {
//                                                   e.preventDefault();
//                                                   this.deleteEducation(school.EducationExperienceID);
//                                                 }} className="btn btn-info btn-cancel deletebtn" data-dismiss="modal">Delete</button>
//                                               </div>
//                                               <div className="col-md-6">
//                                                 <button type="button" onClick={(e) => {
//                                                   e.preventDefault();
//                                                   this.addEducation(school);
//                                                 }} className="btn btn-info" data-dismiss={this.state.dismiss}>Save Changes</button>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))
//                           }
//                         </div>
//                       </li>
//                       {this.state.data.educationExperience.length > 2 ?
//                         this.state.datalimit1 == 2 ?
//                           <a href="#" onClick={(e) => {
//                             this.getarraylengtheducation();
//                           }} className="seemore">See more</a>
//                           :
//                           <a href="#" onClick={(e) => {
//                             this.resetarraylengtheducation();
//                           }} className="seemore">See Less</a>
//                         : ""
//                       }
//                     </ul>
//                   </div>
//                   <div className="myprofile-list">
//                     <h3 className="myprofile-heading"><img src={workexperience} className="img-fluid headingicon" alt="" />Work Experience</h3>
//                     <div className="myprofile-work">
//                       <h6>Industries:</h6>
//                       {
//                         this.state.profile_industries?.map((industry) => (
//                           <span>{industry}</span>
//                         ))
//                       }
//                     </div>
//                     <div className="myprofile-work">
//                       <h6>Roles:</h6>
//                       {
//                         this.state.profile_roles?.map((role) => (
//                           <span>{role}</span>
//                         ))
//                       }
//                     </div>
//                   </div>
//                   <div className="myprofile-list">
//                     <h3 className="myprofile-heading">
//                       <img src={fun} className="img-fluid headingicon" alt="" />Just for Fun
//                       <a className="hovertooltip" href="#" data-toggle="modal" data-target="#myModal6">
//                         <img src={editpro} className="img-fluid" alt="" />
//                         <div className="hovertooltip-d">Click to edit me!</div>
//                       </a>
//                     </h3>
//                     <p>{this.state.just_for_fun}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="modal fade modal-d" id="myModal">
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title">The Basics</h4>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label>First name <span className="label-star">*</span></label>
//                         <input type="text" name="userData_firstName" onChange={this.onChangeState} value={this.state.userData_firstName} className="form-control" placeholder="First Name" />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label>Last name <span className="label-star">*</span></label>
//                         <input type="text" name="userData_lastName" onChange={this.onChangeState} value={this.state.userData_lastName} className="form-control" placeholder="Last Name" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="form-group">
//                         <label>Pronouns</label>
//                         <input type="text" className="form-control" onChange={this.onChangeState} name="userData_pronouns" value={this.state.userData_pronouns} placeholder="Pronouns" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="form-group">
//                         <label>Headline <span className="label-star">*</span></label>
//                         <input type="text" name="userData_headline" onChange={this.onChangeState} className="form-control" value={this.state.userData_headline} placeholder="Headline" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="form-group tag-design">
//                         <label>Tags <span className="label-star">*</span></label>
//                         <div id="output"></div>
//                         <CreatableSelect
//                           isMulti
//                           onChange={this.handleChange1}
//                           value={this.state.tagvalue ? this.state.tagvalue : ""} name="tagvalue"
//                         />
//                         {/* <Select classNamePrefix="react-select-custom" isMulti options={options} value={tagLists} name="tags_list" onChange={this.handleChange} placeholder="Select all that apply..." /> */}
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-md-12">
//                       <div class="form-group inputDnD">
//                         <label>Profile Photo <span class="label-star">*</span></label>
//                         <div class="drag-sec">
//                           <div class="dragimg">
//                             {
//                               this.state.previewImage == "" ?
//                                 <img
//                                   style={{ objectFit: 'cover' }}
//                                   src={
//                                     this.state.profile_goal !== null
//                                       ? process.env.REACT_APP_API_URL + `/${this.state.profile_goal}`
//                                       : myprofile
//                                   }
//                                   class="img-fluid" alt="" />
//                                 :
//                                 <PreviewImage
//                                   initialImg={
//                                     <img
//                                       style={{
//                                         'objectFit': 'cover'
//                                       }}
//                                       src={
//                                         this.state.previewImage
//                                       }
//                                       className="img-fluid"
//                                       alt=""
//                                     />
//                                   }
//                                 />
//                             }
//                           </div>
//                           <div class="dragdiv">
//                             <input type="file" class="form-control-file text-primary font-weight-bold" id="inputFile" name="profileImage" accept="image/*" onChange={this.onChangeImage} data-title="Drag & Drop here" />
//                             <img src={upload} class="img-fluid" alt="" />
//                             <h4><a href="#">Click to replace</a> or drag and drop <span>SVG, PNG, JPG or GIF (2 MB Max)</span></h4>
//                           </div>

//                         </div>
//                       </div>
//                     </div>
//                   </div>


//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="form-group inputDnD resume">
//                         <label>Resume <span className="label-star"></span></label>
//                         <div className="drag-sec">


//                           <div class="dragdiv">
//                             <input type="file" name="resumeImage" class="form-control-file text-primary font-weight-bold" id="inputFile" accept="application/pdf" onChange={this.onChangeImage} data-title="Drag & Drop here" />
//                             <img src={upload} class="img-fluid" alt="" />
//                             <h4><a href="#">Click to upload</a> or drag and drop


//                               <span>PDF, DOC or DOCX (5 MB max)</span></h4>

//                           </div>

//                           <a id="link" download> {this.state.resumename ? this.state.resumename : ""} {this.state.resumename ? <i class="fa fa-download" aria-hidden="true"> </i> : ""}</a>


//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="location-edit">
//                         <p>
//                           To edit your location or timezone, go to{' '}
//                           <Link
//                             to='/advisee/setting'
//                             onClick={() =>
//                               document.getElementById('adviseecancelBtn2').click()
//                             }
//                           >
//                             Settings
//                           </Link>
//                         </p>
//                       </div>
//                     </div>
//                   </div>


//                 </form>
//               </div>

//               <div className="modal-footer">
//                 <div className="modal-footer-btn">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <button type="button" id="adviseecancelBtn2" className="btn btn-info btn-cancel" data-dismiss="modal">Cancel</button>
//                     </div>
//                     <div className="col-md-6">
//                       <button type="button" onClick={(e) => {
//                         // e.preventDefault();
//                         this.add();
//                       }} className="btn btn-info" data-dismiss="modal">Save Changes</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         <div className="modal fade modal-d" id="myModal2">
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title">About Me</h4>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   {/* <div className="modalnot">Not sure where to start? Check out these example profiles (<a href="#">1</a>, <a href="#">2</a>, <a href="#">3</a>, <a href="#">4</a>) for inspiration!</div> */}

//                   <div className="modalnot"> Introduce yourself to Advisors! What would you like them to know about your background, career & education journey and goals?</div>


//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="form-group mb-0">
//                         <label>About Me <span className="label-star">*</span></label>

//                         <textarea maxLength="500" required onChange={this.onChangeState} name="about_me" className="form-control" rows="7" id="about_us" placeholder="" value={this.state.about_me}></textarea>
//                         <div className="textlimit">
//                           {this.state.about_me ? this.state.about_me.length + "/500" : "500"} characters</div>
//                         <span className="error">{this.state.errors.about_me}</span>
//                       </div>
//                     </div>
//                   </div>

//                 </form>
//               </div>

//               <div className="modal-footer">
//                 <div className="modal-footer-btn">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <button type="button" className="btn btn-info btn-cancel" data-dismiss="modal">Cancel</button>
//                     </div>
//                     <div className="col-md-6">
//                       <button type="submit" onClick={(e) => {
//                         // e.preventDefault();
//                         this.addabout();
//                       }} className="btn btn-info" data-dismiss="modal" >Save Changes</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         <div className="modal fade modal-d" id="myModal3">
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title">Career Interests</h4>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="form-group mb-0">
//                         <label>Career Interests <span className="label-star">*</span></label>
//                         <div className="careerlabel">What are your career interests or goals for the next 3-5 years?</div>
//                         <textarea maxLength="300" onChange={this.onChangeState} name="profile_current_career_goals" className="form-control" rows="4" id="comment" value={this.state.profile_current_career_goals} placeholder=""></textarea>
//                         <div className="textlimit"> {this.state.profile_current_career_goals ? this.state.profile_current_career_goals.length + "/300" : "300"} characters</div>
//                         <span className="error">{this.state.errors.current_career_goals}</span>
//                       </div>
//                     </div>
//                   </div>

//                 </form>
//               </div>

//               <div className="modal-footer">
//                 <div className="modal-footer-btn">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <button type="button" className="btn btn-info btn-cancel" data-dismiss="modal">Cancel</button>
//                     </div>
//                     <div className="col-md-6">
//                       <button onClick={(e) => {
//                         // e.preventDefault();
//                         this.addcareerinterest();
//                       }} type="button" className="btn btn-info" data-dismiss="modal" >Save Changes</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         <div className="modal fade modal-d" id="myModal4">
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title">Add Experience</h4>
//               </div>
//               <div className="modal-body">
//                 <ul className="nav nav-tabs" role="tablist">
//                   <li className="nav-item">
//                     <a className="nav-link active" data-toggle="tab" href="#addedu">Add Education Experience</a>
//                   </li>
//                   <li className="nav-item">
//                     <a className="nav-link" data-toggle="tab" href="#addwork">Add Work Experience</a>
//                   </li>
//                 </ul>

//                 <div className="tab-content">
//                   <div id="addedu" className="tab-pane active">
//                     <form>
//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group sgstform-inputs-search">
//                             <label>School</label>
//                             <input type="search" className="form-control" name="school" onChange={this.onChangeState}
//                               value={this.state.school} autoComplete="off" placeholder="Search or type your school..." />
//                             {/* <span className="error">{this.state.errors.school}</span> */}
//                             <img src={Search} alt="" />
//                             {this.renderSuggestions('school')}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group">
//                             <label>Degrees</label>
//                             <select className="form-control" name="degree"
//                               aria-label="Default select example" onChange={this.onChangeState} value={this.state.degree}>
//                               <option selected>Select your degree</option>
//                               {
//                                 this.state.degrees.map((item, index) => (
//                                   <option value={item.name}>{item.name}</option>
//                                 ))
//                               }
//                             </select>
//                           </div>

//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group form-inputs-search tag-design">
//                             <label>Major(s) / Field(s) of study</label>

//                             <Select classNamePrefix="react-select-custom" isMulti options={this.state.data.fields_of_study} name="fields_of_study" onChange={this.handleChange} value={this.state.fields_of_study} placeholder="Select all that apply..." />
//                             <img src={Search} alt="" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row row-half">
//                         <div className="col-md-6">
//                           <div className="form-group">
//                             <label>Start Date</label>
//                             <input type="date" className="form-control" placeholder="MM/YY" name="start_dateedu" onChange={this.onChangeState} value={this.state.start_dateedu} />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="form-group">
//                             <label>End Date</label>
//                             <input type="date" min={this.state.sDate} className="form-control" name="end_dateedu" disabled={this.state.is_currentedu == 1 ? 'disabled' : ''} onChange={this.onChangeState} value={this.state.end_dateedu} placeholder="MM/YY" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group checkbox-design">
//                             <label className="form-check-label">
//                               <input disabled={isDisablededu} checked={this.state.is_currentedu == 1 ? 'checked' : ''} name="is_currentedu" onChange={this.onChangeState}
//                                 type="checkbox" /> I currently study in this school
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="modal-footer">
//                         <div className="modal-footer-btn">


//                           <div className="row">
//                             <div className="col-md-6">
//                               <button type="button" className="btn btn-info btn-cancel" data-dismiss="modal">Cancel</button>
//                             </div>
//                             <div className="col-md-6">
//                               <button type="button" onClick={(e) => {
//                                 e.preventDefault();
//                                 this.addEducation();
//                               }} className="btn btn-info" data-dismiss={this.state.dismiss}>Save Changes</button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                   <div id="addwork" className="tab-pane fade">
//                     <form>
//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group">
//                             <label>Title</label>
//                             <input type="text" className="form-control" onChange={this.onChangeState}
//                               name="title" value={this.state.title}
//                               placeholder="Type your title" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group sgstform-inputs-search">
//                             <label>Company</label>


//                             <input type="search" className="form-control" name="company" onChange={this.onChangeState}
//                               value={this.state.company} autoComplete="off" placeholder="Search or type your company..." />

//                             <img src={Search} alt="" />
//                             {this.renderSuggestions('company')}

//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group">
//                             <label>Industry</label>
//                             <select className="form-control" aria-label="Default select example" name="industry" onChange={this.onChangeState}
//                               value={this.state.industry}>
//                               <option selected>Select an industry</option>
//                               {
//                                 this.state.data2.industries.map((item, index) => (
//                                   <option value={item.name}>{item.name}</option>
//                                 ))
//                               }
//                             </select>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group">
//                             <label>Role</label>
//                             <select className="form-control" aria-label="Default select example" name="role" onChange={this.onChangeState}
//                               value={this.state.role}>
//                               <option selected>Select a role</option>
//                               {
//                                 this.state.data2.work_roles.map((item, index) => (
//                                   <option value={item.name}>{item.name}</option>
//                                 ))
//                               }
//                             </select>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group">
//                             <label>Employment Type</label>
//                             <ul className="employment-type">
//                               <li>
//                                 <div className="radio-d">

//                                   {this.state.data2.Employment_Type_radio.map((item, index) => {
//                                     return <div key={'test' + item}>
//                                       <label className="form-check-label">
//                                         <input class="form-check-input" type="radio" id={'radio03-' + index} name="employment_type"
//                                           value={item} onChange={this.onChangeState} checked={this.state.employment_type === item ? 'checked' : ''} />
//                                         {item}
//                                       </label>
//                                     </div>
//                                   })}

//                                 </div>
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="row">
//                         <div class="col-md-12">
//                           <div class="form-group">
//                             <label>(Optional) Dont see your Employment Type? Type it here</label>
//                             <input type="text" className="form-control" placeholder="Type it here..." name="employment_type_other" onChange={this.onChangeState} value={this.state.employment_other} />
//                             <span className="error">{this.state.errors.employment_type_other}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row row-half">
//                         <div className="col-md-6">
//                           <div className="form-group">
//                             <label>Start Date</label>
//                             <input type="date" className="form-control" placeholder="MM/YY" name="start_date" onChange={this.onChangeState} value={this.state.start_date} />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="form-group">
//                             <label>End Date</label>
//                             <input type="date" className="form-control" name="end_date" disabled={this.state.is_current == 1 ? 'disabled' : ''} onChange={this.onChangeState} value={this.state.end_date} placeholder="MM/YY" />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="row">
//                         <div className="col-md-12">
//                           <div className="form-group checkbox-design">
//                             <label className="form-check-label">
//                               <input disabled={isDisabled} checked={this.state.is_current == 1 ? 'checked' : ''} name="is_current" onChange={this.onChangeState}
//                                 type="checkbox" /> I currently work in this role
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="modal-footer">
//                         <div className="modal-footer-btn">
//                           <div className="row">
//                             <div className="col-md-6">
//                               <button type="button" className="btn btn-info btn-cancel" data-dismiss="modal">Cancel</button>
//                             </div>
//                             <div className="col-md-6">
//                               <button type="button" onClick={(e) => {
//                                 //  e.preventDefault();
//                                 this.addWork();
//                               }} className="btn btn-info" data-dismiss={this.state.dismiss}>Save Changes</button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>



//               </div>



//             </div>
//           </div>
//         </div>



//         <div className="modal fade modal-d" id="myModal6">
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title">Just for Fun</h4>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="form-group mb-0">
//                         <label>Just for Fun</label>
//                         <div className="careerlabel">What do you like to do outside of work?</div>
//                         <textarea maxLength="300" onChange={this.onChangeState} name="profile_just_for_fun" className="form-control" rows="3" id="comment" value={this.state.profile_just_for_fun} placeholder=""></textarea>
//                         <div className="textlimit"> {this.state.profile_just_for_fun ? this.state.profile_just_for_fun.length + "/300" : "300"} characters</div>
//                         <span className="error">{this.state.errors.profile_just_for_fun}</span>
//                       </div>
//                     </div>
//                   </div>

//                 </form>
//               </div>

//               <div className="modal-footer">
//                 <div className="modal-footer-btn">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <button type="button" className="btn btn-info btn-cancel" data-dismiss="modal">Cancel</button>
//                     </div>
//                     <div className="col-md-6">
//                       <button type="submit" onClick={(e) => {
//                         // e.preventDefault();
//                         this.addforfun();
//                       }} className="btn btn-info" data-dismiss="modal">Save Changes</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//         <MainFooter />

//       </div>
//     );
//   }
// }

// export default AdviseeProfile;
