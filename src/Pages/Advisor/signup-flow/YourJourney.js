import React from 'react';
import { Link, Switch } from "react-router-dom";
import Profile from "../../../assets/images/DashboardImgs/profile.png";
import { destroySession, toasterAlert as toastAlert } from '../../../Helpers/Functions';
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
import Select from "react-select";
import Moment from 'moment';
import * as $ from "jquery"
import footprint from '../../../assets/images/footprints_1f463.png';
// import DatePicker from "react-datepicker";


// education css
import "./css/education.css"
// let isDisablededu = false;
// let isDisablededu2 = false;
// let isDisabled = false;
// let empDisabled = true;
// let isDisabled2 = false;


class YourJourney extends React.Component {
    parsed = queryString.parse(history.location.search);
    email = this.parsed?.email;
    user = authService.getCurrentUser()
    state = {
        modelType: '', educationId: '', modal: '', headline: '', currentWorkDisabled: false, currentEducationDisabled: false, workEndDateDisabled: false, educationEndDateDisabled: false, workexperience: '',educationexperience: '',
        highest_degree: '', school: '', degree: '', sDate: '', fields_of_study: '', is_currentedu: 0, start_dateedu: '', end_dateedu: '', graduation_year: '', loading: false,
        title: '', company: '', industry: '', role: '', employment_type: '', ask_me_about: '', is_current: 0, start_date: '', end_date: '', years_work_experience: '', comfort_networking_at_signup: '', loading: false, employment_type_checked: 0, employment_other: '',

        errors: {
            headline: '', highest_degree: '', school: '', degree: '', fields_of_study: '', graduation_year: '', loading: false,
            years_work_experience: '', comfort_networking_at_signup: '', title: '', company: '', industry: '', role: '', employment_type: '', ask_me_about: '', workexperience: '', educationexperience: '', is_current: '', start_date: '', end_date: '', loading: false,

        },
        data: {
            educationData: {
                education_experiences: [],
                schools: [],
                school_suggestions: [],
                degrees: [],
                fields_of_study: [],
                fields_of_study_suggestions: [],
                get_heigest_degree_completed: [],
            },
            workData: {
                work_experiences: [],
                companies: [],
                industries: [],
                work_roles: [],
                work_exp_dropdown: [],
                Employment_Type: [],
                companies_suggestions: [],
                industries_suggestions: [],
                workrole_suggestions: [],
                Employment_Type_radio: []
            }

        },


    }

    componentDidMount() {
        this.getEducation();
        this.getWorkData();
    }

    continue = async () => {
        const { headline } = this.state;
        let { headlineError } = '';
        if (!headline) {
            headlineError = 'This field is required.'
        }
        const { workexperience } = this.state.data.workData;
        let { workexperienceError } = '';
        if (!this.state.data.workData.work_experiences.length) {
            workexperienceError = 'Some work experience is required.'
        }
        const { schoolexperience } = this.state.data.educationData;
        let { educationexperienceError } = '';
        if (!this.state.data.educationData.education_experiences.length) {
            educationexperienceError = 'Some educational background is required.'
        }


        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                headline: headlineError,
                workexperience: workexperienceError,
                educationexperience: educationexperienceError,
            }
        }))
        if (headlineError) {
            return true;
        }
        if (workexperienceError) {
            return true;
        }
        if (educationexperienceError) {
            return true;
        }
        this.setState({ loading: true });
        const data = {
            headline
        }
        let response = await ApiRequest.postRequestAdvisor('add-journey-headline', data);

        if (response !== undefined && response.status === 200 && response.status !== 422) {
            this.changeStep();
        } else if (response !== undefined && response.status == 422) {
            toastAlert('error', response.data.errors[0]);
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
        this.setState({ loading: false });
    }

    onChangeState = (event) => {
        const { name, value, checked, id } = event.target;
        this.setState({ [name]: value })
        if (name == 'school') {
            this.onTextChanged(name, value);
        }
        if (name == 'company' || name == 'industry' | name == 'role') {
            this.onWorkTextChange(name, value);
        }

        if (name == 'is_current') {
            this.setState({ [name]: checked ? 1 : 0 })
            if (checked == false) {
                this.setState({
                    workEndDateDisabled: false
                })
                // isDisabled2 = false;
            }
            else {
                this.setState({
                    workEndDateDisabled: true
                })
                // isDisabled2 = true;
            }


            return true;
        }

        if (name == 'is_currentedu') {

            this.setState({ [name]: checked ? 1 : 0 })
            if (checked == false) {
                // isDisablededu2 = false;
                
            }
            else {
                // isDisablededu2 = true;
            }
            return true;
        }

        // if (name == 'start_dateedu' || name == 'start_date' || name == 'end_dateedu' || name == 'end_date') {
        //     this.setState({ [name]: this.createDBDateObject(value) });
        // }

        if (name == 'end_dateedu') {
            if (value == "") {
                this.setState({
                    currentEducationDisabled: false
                })
            }
            else {
                this.setState({
                    currentEducationDisabled: true
                })
            }
        }

        if (name == 'end_date') {
            if (value == "") {
                this.setState({
                    currentWorkDisabled: false
                })
            }
            else {
                this.setState({
                    currentWorkDisabled: true
                })
            }
        }
    }

    isDateValidFormat = (inputDate) => {
        let dateFormatRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/g;
        return dateFormatRegex.test(inputDate);
    }

    createDBDateObject = (value) => {
        //00-30 --> year starts with 20  (i.e.  21 interpreted as 2021)
        //31-99 --> year starts with 19 (i.e. 86 interpreted as 1986)
        let value_split = value.split("/");

        if (value_split[1] >= 0 && value_split[1] <= 30) {
            return '20' + value_split[1] + '-' + value_split[0] + '-01'
        }
        if (value_split[1] >= 31 && value_split[1] <= 99) {
            return '19' + value_split[1] + '-' + value_split[0] + '-01'
        }
    }

    parseDateToMMYY = (value) => {
        if (!value) return ''
        let value_split = value.split("-"); //Split 2022-08 into 2022, 08
        return value_split[1] + '/' + value_split[0].substring(2)
    }

    parsePreviewDate = (value) => {
        let value_split = value.split("-"); //Split 2022-08 into 2022, 08
        return value_split[1] + '/' + value_split[0].substring(2)
    }

    getEducation = async () => {
	    	let { educationexperienceError } = '';
        let response = await ApiRequest.getRequestAdvisor('get-education-data');
        response = response.data;
        // console.log('getEducation' , response.result);
        let data = this.state.data.educationData;
        if (response.result) {
            data.fields_of_study = this.selectOptions(response.result.field_of_studies);
            data.schools = response.result.schools;
            data.degrees = response.result.degrees;
            data.get_heigest_degree_completed = response.result.get_heigest_degree_completed;
            data.education_experiences = response.result.education_experiences;
            this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    educationData: data
                },
                highest_degree: response.result.highest_degree
            }))
            // reset education error?

        }
    }

    getWorkData = async () => {
	    	let { workexperienceError } = '';
        let response = await ApiRequest.getRequestAdvisor('get-work-experience-data');
        response = response.data;
        let data = this.state.data.workData;
        let headline = ''
        if (response.result) {
            headline = response.result.headline;
            data.companies = response.result.companies;
            data.industries = response.result.industries;
            data.work_roles = this.selectOptions(response.result.work_roles);
            data.work_experiences = response.result.work_experiences;
            data.work_exp_dropdown = response.result.work_exp_dropdown;
            data.Employment_Type_radio = response.result.Employment_Type;

            this.setState(prevState => ({
                headline: headline,
                data: {
                    ...prevState.data,
                    workData: data
                },
            }));
            // reset work error?

        }
    }

    refreshAsyncEducationData = async () => {
	    	let { educationexperienceError } = '';
        let response = await ApiRequest.getRequestAdvisor('get-education-data');
        response = response.data;
        let data = this.state.data.educationData;
        if (response.result) {
            data.fields_of_study = this.selectOptions(response.result.field_of_studies);
            data.schools = response.result.schools;
            data.degrees = response.result.degrees;
            data.get_heigest_degree_completed = response.result.get_heigest_degree_completed;
            data.education_experiences = response.result.education_experiences;
            this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    educationData: data
                },
            }))
	          // reset education error?
            educationexperienceError = ''
        }
    }

    refreshAsyncWorkData = async () => {
	    	let { workexperienceError } = '';
        let response = await ApiRequest.getRequestAdvisor('get-work-experience-data');
        response = response.data;
        let data = this.state.data.workData;
        if (response.result) {
            data.companies = response.result.companies;
            data.industries = response.result.industries;
            data.work_roles = this.selectOptions(response.result.work_roles);
            data.work_experiences = response.result.work_experiences;
            data.work_exp_dropdown = response.result.work_exp_dropdown;
            data.Employment_Type_radio = response.result.Employment_Type;
            this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    workData: data
                },
            }))
            // reset work error?
        }
    }

    addEducation = async () => {
        const { school, degree, fields_of_study, is_currentedu, start_dateedu, end_dateedu, currentEducationDisabled } = this.state;
        let { schoolError, degreeError, fields_of_studyError, is_currentError, start_dateError, end_dateError } = '';

        if (!school) {
            schoolError = 'This Field is required.'
        }

        if (!degree) {
            degreeError = 'This Field is required.';
        }
        if (!fields_of_study) {
            fields_of_studyError = 'This Field is required.';
        }

        if(!currentEducationDisabled){
            if (!is_currentedu) {
                is_currentError = 'This Field is required.';
            }
        }

        if (!start_dateedu || !this.isDateValidFormat(start_dateedu)) {
            start_dateError = 'Please enter a date of format MM/YY';
        }

        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                school: schoolError,
                degree: degreeError,
                fields_of_study: fields_of_studyError,
                is_current: is_currentError,
                start_dateedu: start_dateError,
                end_dateedu: end_dateError

            }
        }))
        if (schoolError || degreeError || fields_of_studyError || start_dateError || end_dateError) {
            return true;
        }

        this.setState({ loading: true });

        const data = {
            id: this.state.educationId,
            school: school,
            degree: degree,
            fields_of_study: fields_of_study,
            is_current: is_currentedu,
            start_date: this.createDBDateObject(start_dateedu),
            graduation_year: this.createDBDateObject(end_dateedu),
        }
        let response
        if (this.state.educationId) {
            response = await ApiRequest.putRequestAdvisor('update-education-experience', data);
        }
        else {
            response = await ApiRequest.postRequestAdvisor('add-education-experience', data);
        }
        if (response.status === 200) {
            this.setState({
                currentEducationDisabled: false
            })
            this.refreshAsyncEducationData();
            document.getElementById("addEducationBtn").click();
            toastAlert('success', 'Request has been processed.');
            // isDisablededu = false;
            // isDisablededu2 = false;
        } else if (response && response.status === 422) {
            toastAlert('error', response.data.errors[0]);
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
        this.setState({ loading: false });
    }

    addWorkData = async () => {
        const { title, company, industry, role, employment_type, ask_me_about, is_current, start_date, end_date, employment_other, currentWorkDisabled } = this.state;
        let { titleError, companyError, industryError, roleError, is_currentError, start_dateError, end_dateError } = '';

        if (!title) {
            titleError = 'This Field is required.'
        }
        if (!company) {
            companyError = 'This Field is required.';
        }
        if (!industry) {
            industryError = 'This Field is required.';
        }
        if (!role) {
            roleError = 'This Field is required.';
        }
        if(!currentWorkDisabled){
            if (!is_current) {
                is_currentError = 'This Field is required';
            }
        }

        if (!start_date || !this.isDateValidFormat(start_date)) {
            start_dateError = 'Please enter a date of format MM/YY';
        }

        if (!this.state.workEndDateDisabled) {
            if (!end_date || !this.isDateValidFormat(end_date)) {
                end_dateError = 'Please enter a date of format MM/YY';
            }
        }


        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                title: titleError,
                company: companyError,
                industry: industryError,
                role: roleError,
                is_current: is_currentError,
                start_date: start_dateError,
                end_date: end_dateError
            }
        }))

        if (titleError || companyError || industryError || roleError || start_dateError || end_dateError) {
            console.log('error', this.state.errors);

            return true;
        }
        this.setState({ loading: true });
        const data = {
            id: this.state.ID,
            title, company, industry,
            role: this.state.role['label'],
            employment_type, 
            ask_me_about, 
            is_current: !is_current ? 0 : is_current, 
            start_date: this.createDBDateObject(start_date), 
            end_date: this.createDBDateObject(end_date), 
            employment_other
        }
        let response
        if (this.state.ID) {
            response = await ApiRequest.putRequestAdvisor('update-work-experience', data);
        }
        else {
            response = await ApiRequest.postRequestAdvisor('add-work-experience', data);
        }
        if (response !== undefined && response.status === 200 && response.status !== 422) {
            this.setState({
                currentWorkDisabled: false
            })
            this.refreshAsyncWorkData()
            document.getElementById("addBtn").click();
            toastAlert('success', 'Request has been processed.');
        } else if (response !== undefined && response.status == 422) {
            toastAlert('error', response.data.errors[0]);
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
        this.setState({ loading: false });
    }

    resetSchoolErrors() {
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                school: '',
                degree: '',
                fields_of_study: '',
                graduation_year: '',
                educationexperience: ''
            }
        }))
    }

    resetWorkErrors() {
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                title: '',
                company: '',
                industry: '',
                role: '',
                is_current: '',
                start_date: '',
                end_date: '',
                workexperience: ''
            }
        }))
    }

    setEducationInputFieldStates(item = '') {
        this.setState({
            school: item ? item.school : '',
            degree: item ? item.degree : '',
            fields_of_study: item ? item?.fields_of_study : '',
            end_dateedu: this.parseDateToMMYY(item?.graduation_year),
            start_dateedu: this.parseDateToMMYY(item?.start_date),
            is_currentedu: item ? item?.is_current : '',
        })
    }

    setWorkInputFieldStates(item = '') {
        this.setState({
            title: item ? item.title : '',
            company: item ? item.company : '',
            industry: item ? item.industry : '',
            role: item ? { 'value': item.role, label: item.role } : '',
            employment_type: item ? item.employment_type : '',
            is_current: item ? item.is_current : '',
            start_date: this.parseDateToMMYY(item?.start_date),
            end_date: this.parseDateToMMYY(item?.end_date),
        })
    }

    addEducationModel() {
        this.setEducationInputFieldStates();
        this.resetSchoolErrors();
        this.setState({
            modelType: 'add',
            educationId: '',
            modal: 'education'
        })
    }

    addWorkExperienceModel() {
        this.setWorkInputFieldStates();
        this.resetWorkErrors();
        this.setState({
            modelType: 'add',
            ID: '',
            modal: 'work'
        })
    }

    editEducation(item) {
        this.setEducationInputFieldStates(item);
        this.resetSchoolErrors();
        this.setState({
            modelType: 'edit',
            educationId: item.id,
            modal: 'education'
        })
    }

    editWork(item) {
        this.setWorkInputFieldStates(item);
        this.resetWorkErrors();
        this.setState({
            modelType: 'edit',
            ID: item.id,
            modal: 'work'
        })
    }

    deleteEducation = async () => {
        const response = await ApiRequest.deleteRequestAdvisor('delete-education-experience', this.state.educationId);
        if (response !== undefined && response.status === 200 && response.status !== 422) {
            let dataState = this.state.data.educationData;
            dataState.education_experiences = response.data.result;

            this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    educationData: dataState
                },
            }))

            document.getElementById("addEducationBtn").click();
            toastAlert('success', 'Request has been processed.');
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
    }


    deleteWork = async () => {
        const response = await ApiRequest.deleteRequestAdvisor('delete-work-experience', this.state.ID);
        if (response !== undefined && response.status === 200 && response.status !== 422) {
            let dataState = this.state.data.workData;
            dataState.work_experiences = response.data.result;
            this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    workData: dataState
                },
            }))
            document.getElementById("addBtn").click();
            toastAlert('success', 'Request has been processed.');
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
    }
    // changeStep(position = 'next') {
    //     if (position == 'back') {
    //         history.push('/advisor/signupwizard/emailVerification')
    //     }
    //     else {
    //         if (this.state.data.education_experiences.length == 0) {
    //             toastAlert('error', 'Please fill education information!');
    //             return true;
    //         }
    //         history.push('/advisor/signupwizard/workExperience')
    //     }
    // }


    changeStep = () => {
        history.push(
            `/advisor/signupwizard/background`
        );
    }

    constructor(props) {
        super(props);
    }

    onTextChanged = (name, value) => {
        let data = this.state.data.educationData;
        let suggestions = data[name == 'school' ? 'schools' : 'fields_of_study'];
        // console.log(value, suggestions);
        if (value && suggestions) {
            const regex = new RegExp(`${value}`, 'i');
            suggestions = suggestions.sort().filter(v => regex.test(v.name));
        }
        else {
            suggestions = [];
        }
        data[name + '_suggestions'] = suggestions;


        this.setState(prevState => ({
            data: {
                ...prevState.data,
                educationData: data
            },
        }))
    }

    onWorkTextChange = (name, value) => {
        let data = this.state.data.workData;
        if (name == 'company') {
            let suggestions = data.companies;
            if (value && suggestions) {
                const regex = new RegExp(`${value}`, 'i');
                suggestions = suggestions.sort().filter(v => regex.test(v.name));
            }
            else {
                suggestions = [];
            }
            data.companies_suggestions = suggestions;
        }
        if (name == 'industry') {
            let industry_suggestions = data.industries;
            if (value && industry_suggestions) {
                const regex = new RegExp(`${value}`, 'i');
                industry_suggestions = industry_suggestions.sort().filter(v => regex.test(v.name));
            }
            else {
                industry_suggestions = [];
            }
            data.industries_suggestions = industry_suggestions;
        }
        if (name == 'role') {
            let work_role_suggestion = data.work_roles;
            if (value && work_role_suggestion) {
                const regex = new RegExp(`${value}`, 'i');
                work_role_suggestion = work_role_suggestion.sort().filter(v => regex.test(v.name));
            }
            else {
                work_role_suggestion = [];
            }
            data.workrole_suggestions = work_role_suggestion;
        }
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                workData: data
            },
        }))
    }

    suggestionEducationSelected(name, value) {
        let data = this.state.data.educationData;
        data[name + '_suggestions'] = [];
        this.setState(prevState => ({
            [name]: value,
            data: {
                ...prevState.data,
                educationData: data
            }
        }));
    }

    renderEducationSuggestions(name) {
        // debugger;
        let suggestions = this.state.data.educationData[name + '_suggestions'];
        // console.log('suggestions', name+'_suggestions');
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <div className="srchList">
                <ul className="oneline">
                    {suggestions.map((item) => <span onClick={() => this.suggestionEducationSelected(name, item.name)}>{item.name}</span>)}
                </ul>
            </div>
        );
    }

    suggestionWorkSelected(name, value) {
        let data = this.state.data.workData;
        if (name == 'company') {
            data.companies_suggestions = [];
        }
        if (name == 'industry') {
            data.industries_suggestions = [];
        }
        if (name == 'role') {
            data.workrole_suggestions = [];
        }
        this.setState(prevState => ({
            [name]: value,
            data: {
                ...prevState.data,
                workData: data
            }
        }));
    }


    renderWorkSuggestions(name) {
        let suggestions = this.state.data?.workData?.companies_suggestions;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <div className="srchList">
                <ul className="oneline">
                    {suggestions.map((item, index) => <span key={'advisor-srch-' + index} onClick={() => this.suggestionWorkSelected(name, item.name)}>{item.name}</span>)}
                </ul>
            </div>
        );
    }

    renderIndustriesSearch(name) {
        let isuggestions = this.state.data.workData.industries_suggestions;
        if (isuggestions.length === 0) {
            return null;
        }
        return (
            <div className="srchList">
                <ul className="oneline">
                    {isuggestions.map((item) => <span onClick={() => this.suggestionWorkSelected(name, item.name)}>{item.name}</span>)}
                </ul>
            </div>
        );
    }

    degreeSelectOptions = (stateName) => {
        if (this.state.countries) {
            let options = [];
            this.state.countries.map(el => {
                let arr = {
                    value: el.id,
                    label: el.name,
                }
                options.push(arr);
            })
            return (
                <Select options={options} onChange={(e) => this.onChangeCountry(stateName, e)} value={this.state[stateName].countryOption} style={{ color: "red" }} />
            );
        }
    }
    handleChange = (selectedOption, e) => {
        const { name } = e;
        // console.log('name', name);
        this.setState({ [name]: selectedOption }, () =>
            console.log(`Option selected:`, selectedOption)
        );
    };
    selectOptions = (list) => {
        let options = [];
        list.map(el => {
            let arr = {
                value: el.name,
                label: el.name,
            }
            options.push(arr);
        })
        return options;
    }
    render() {
        return (
            <div className={`row mar-width-0   mt-80 NewStepThird__Wrapper`}>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>
                        Your Journey
                        <img
                            src={footprint}
                            className="img-fluid signup-icons"
                            alt=""
                        />

                    </h2>
                    <p>Tell us about your career journey. The more experiences you add, the more relevant your conversations will be.</p>
                </div>

                <div className="col-md-12 form-inputs-">
                    <label htmlFor=""><b>Headline</b> (how you’d introduce yourself to a potential Advisee. When in doubt, use your LinkedIn headline.)</label>

                    <input
                        type="text"
                        name="headline"
                        onChange={this.onChangeState}
                        value={this.state.headline}
                        className="form-control"
                        placeholder="Title at Company | your unique value propsotion"
                    />


                    <span className="error">{this.state.errors.headline}</span>
                </div>
                <div className="col-md-12 form-inputs- NewStepThird-p1">
                    <label htmlFor=""><b>Education</b> (please do not include high schools or secondary schools)</label>
                </div>
                <div className="col-md-12 mb-2">
                    <button type="button" className="btn btn-resend-" onClick={(e) => {
                        e.preventDefault();
                        this.addEducationModel();
                    }} data-toggle="modal" id="addEducationBtn" data-target="#addEducation">Add Education</button>
	                  <span className="error">{this.state.errors.educationexperience}</span>
                </div>
                <div className="col-md-12">
                    <div className="row mar-width-0 educationPanel">
        
                        {this.state.data.educationData.education_experiences.map((item, index) => (
                            <div className="row mar-width-0 educationPanelData">
                                <div className="col-md-10 p-0">
                                    <h6>{item.school}</h6>
                                    <p>{item.degree}</p>
                                    <span><i>{this.parsePreviewDate(item.start_date)}</i></span>
                                    <span><i>{item.is_current === 0 ? " - " + this.parsePreviewDate(item.graduation_year) : " - Present"}</i></span>
                                </div>
                                <div className="col-md-2 text-right align-self-center">
                                    <a onClick={(e) => {
                                        e.preventDefault();
                                        this.editEducation(item);
                                    }}>
                                        <img className="cursor-pointer" data-toggle="modal" data-target="#addEducation" src={EditPen} alt="" />
                                    </a>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div>

                </div>
                <div className="col-md-12 form-inputs- NewStepThird-p1 margintop">
                    <label htmlFor=""><b>Work Experience</b> (please include your current or most recent role. You can add to or edit these later)</label>
                </div>

                <div className="col-md-12 mb-2">
                    <button className="btn btn-resend-" onClick={(e) => {
                        e.preventDefault();
                        this.addWorkExperienceModel();
                    }} data-toggle="modal" id="addBtn" data-target="#addExperience">Add Work Experience</button>
	                  <span className="error">{this.state.errors.workexperience}</span>

                </div>
                <div className="col-md-12">
                    <div className="row mar-width-0 educationPanel">
                        {/* <div className="col-md-12 educationPanelHeader">
                            <p>Your Work Experience</p>
                        </div> */}
                        {
                            this.state.data.workData?.work_experiences.map((item, index) => (
                                <div className="row mar-width-0 educationPanelData">
                                    <div className="col-md-10 p-0">
                                        <h6>{item.company}</h6>
                                        <p>{item.title}</p>
                                        <span><i>{this.parsePreviewDate(item.start_date)}{item.is_current === 0 ? " - " + this.parsePreviewDate(item.end_date) : " - Present"}</i></span>
                                    </div>
                                    <div className="col-md-2 text-right align-self-center">
                                        <a onClick={(e) => {
                                            e.preventDefault();
                                            this.editWork(item);
                                        }}>
                                            <img className="cursor-pointer" data-toggle="modal" data-target="#addExperience" src={EditPen} alt="" />
                                        </a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>


                <div className="col-md-6">
                    <button className="btn btn-back-" id="step_two" onClick={(e) => {
                        e.preventDefault();
                        // this.changeStep('back');
                    }} >Back</button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-continue-" id="step_four" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.continue();
                    }}>Continue</button>
                </div>

                <div className="modal modalsWizard fade" id="addEducation" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addEducationTitle">{this.state.educationId ? 'Edit' : 'Add'} Education</h5>
                            </div>
                            <div className="modal-body pb-0">
                                <div className="col-md-12 form-inputs- form-inputs-search">
                                    <label htmlFor="">School</label>
                                    <input type="search" className="form-control" name="school" onChange={this.onChangeState}
                                        value={this.state.school} autoComplete="off" placeholder="Search or type your school..." />
                                    <span className="error">{this.state.errors.school}</span>
                                    <img src={Search} alt="" />
                                    {this.renderEducationSuggestions('school')}
                                </div>
                                <div className="col-md-12 form-inputs- NewStepThird__Wrapper">
                                    <label htmlFor="">Degree</label>
                                    <select className="form-select" name="degree" onChange={this.onChangeState} value={this.state.degree}
                                        aria-label="Default select example">
                                        <option selected>Select your degree</option>
                                        {
                                            this.state.data.educationData.degrees.map((item, index) => (
                                                <option value={item.name}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    <span className="error">{this.state.errors.degree}</span>

                                </div>


                                <div className="col-md-12 form-inputs- form-inputs-search">
                                    <label htmlFor="">Major(s) / Field(s) of study</label>
                                    <Select classNamePrefix="react-select-custom" isMulti options={this.state.data.educationData.fields_of_study} name="fields_of_study" onChange={this.handleChange} value={this.state.fields_of_study} placeholder="Select all that apply..." />
                                    {/*<input type="search" name="fields_of_study" onChange={this.onChangeState} autoComplete="off"*/}
                                    {/*       value={this.state.fields_of_study} className="form-control" placeholder="Type your major..."/>*/}
                                    <img src={Search} alt="" />
                                    <span className="error">{this.state.errors.fields_of_study}</span>
                                    {this.renderEducationSuggestions('fields_of_study')}
                                </div>
                                <div className="row row-half">
                                    <div className="col-md-6">
                                        <div className="form-inputs-">
                                            <label>Start Date</label>
                                            <input type="text" className="form-control" placeholder="MM/YY" name="start_dateedu" onChange={this.onChangeState} value={(this.state.start_dateedu)} />
                                            <span className="error">{this.state.errors.start_dateedu}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inputs-">
                                            <label>End Date</label>
                                            <input type="text"
                                                className="form-control" name="end_dateedu" disabled={this.state.is_currentedu == 1 ? 'disabled' : ''} onChange={this.onChangeState} value={(this.state.end_dateedu)} placeholder="MM/YY" />
                                            <span className="error">{this.state.errors.end_dateedu}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group checkbox-design">
                                            <label className="form-check-label">
                                                <input disabled={this.state.currentEducationDisabled} checked={this.state.is_currentedu == 1 ? 'checked' : ''} name="is_currentedu" onChange={this.onChangeState}
                                                    type="checkbox" /> I currently study in this school
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-12 form-inputs-">
                                    <label htmlFor="">Graduation or Expected Graduation Date</label>
                                    <input type="date" name="graduation_year" onChange={this.onChangeState} value={this.state.graduation_year}
                                           className="form-control" placeholder="MM/YY"/>
                                    <span className="error">{this.state.errors.graduation_year}</span>
                                </div> */}

                            </div>
                            <div className="modal-footer">
                                {this.renderModelButton()}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal modalsWizard fade" id="addExperience" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addExperienceTitle">{this.state.ID ? 'Edit' : 'Add'} Work Experience</h5>
                            </div>
                            <div className="modal-body pb-0">

                                <div className="col-md-12 form-inputs-">
                                    <label htmlFor="">Title</label>
                                    <input type="text" name="title" onChange={this.onChangeState}
                                        value={this.state.title} className="form-control" placeholder="Type your title" />
                                    <span className="error">{this.state.errors.title}</span>
                                </div>
                                <div className="col-md-12 form-inputs- form-inputs-search">
                                    <label htmlFor="">Company</label>
{/*                                    <input type="search" className="form-control" name="company" onChange={this.onChangeState}
                                        value={this.state.company} autoComplete="off" placeholder="Search or type your company..." />
*/}
                                    <input type="text" className="form-control" name="company" onChange={this.onChangeState}
                                        value={this.state.company} autoComplete="off" placeholder="Type your company..." />
                                    <span className="error">{this.state.errors.company}</span>
{/*                                    <img src={Search} alt="" />
	*/}
                                    {this.renderWorkSuggestions('company')}
                                </div>

                                <div className="col-md-12 form-inputs- NewStepThird__Wrapper form-inputs-search">
                                    <label htmlFor="">Industry</label>
                                    <input type="search" className="form-control" name="industry" onChange={this.onChangeState}
                                        value={this.state.industry} autoComplete="off" placeholder="Search or type your industry..." />
                                    <span className="error">{this.state.errors.industry}</span>
                                    <img src={Search} alt="" />
                                    {this.renderIndustriesSearch('industry')}
                                    <span className="error">{this.state.errors.industry}</span>
                                </div>

                                <div className="col-md-12 form-inputs- NewStepThird__Wrapper form-inputs-search">
                                    <label htmlFor="">Role</label>
                                    <Select classNamePrefix="react-select-custom" options={this.state.data.workData.work_roles} name="role" onChange={this.handleChange} value={this.state.role} placeholder="Select roles that apply..." />
                                    <span className="error">{this.state.errors.role}</span>
                                </div>
                                <div className="row date_padding form-inputs-">
                                    <div className="col-md-6 form-inputs-">
                                        <label htmlFor="">Start Date</label>
                                        <input type="text" className="form-control" placeholder="MM/YY" name="start_date" onChange={this.onChangeState} value={(this.state.start_date)} />
                                        <span className="error">{this.state.errors.start_date}</span>
                                    </div>
                                    <div className="col-md-6 form-inputs-">
                                        <label htmlFor="">End Date</label>
                                        <input type="text" className="form-control"
                                            name="end_date" onChange={this.onChangeState} disabled={this.state.is_current == 1 ? 'disabled' : ''} value={(this.state.end_date)} placeholder="MM/YY" />
                                        <span className="error">{this.state.errors.end_date}</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div>
                                        <input disabled={this.state.currentWorkDisabled} className="styled-checkbox" checked={this.state.is_current == 1 ? 'checked' : ''} id="styled-checkbox-23" name="is_current" onChange={this.onChangeState}
                                            type="checkbox" />
                                        <label htmlFor="styled-checkbox-23">
                                            I currently work in this role
                                        </label>
                                        {/* <span className="error">{this.state.errors.is_current}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {this.renderModelButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderModelButton() {
        if (this.state.modelType == 'add') {
            return <button type="button" className="btn btn-continue- " disabled={this.state.loading} onClick={(e) => {
                e.preventDefault();
                if (this.state.modal == 'work') {
                    this.addWorkData();
                } else {
                    this.addEducation();
                }

            }}>Save</button>;
        } else {
            return <div className="row footer-btns">
                <div className="col-6 pl-0">
                    <button type="button" className="btn btn-danger- btn-danger" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        if (this.state.modal == 'work') {
                            this.deleteWork();
                        } else {
                            this.deleteEducation();
                        }
                    }}>Delete</button>
                </div>
                <div className="col-6 pr-0">
                    <button type="button" className="btn btn-continue-" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        if (this.state.modal == 'work') {
                            this.addWorkData();
                        } else {
                            this.addEducation();
                        }
                    }}>Save Changes </button>
                </div>
            </div>
        }

    }
}

export default YourJourney;
