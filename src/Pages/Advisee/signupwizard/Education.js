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
import Moment from 'moment';
import Axios from "../../../Config/Axios";
import EditPen from "../../../assets/images/WizardImages/edit-2.png";
import authService from "../../../Services/auth.service"
import ApiRequest from "../../../Services/ApiRequest";
import Select from "react-select";
import * as $ from "jquery"
// education css
import './css/education.css'
//import "./css/education.css"
let isDisablededu = false;
let isDisablededu2 = false;
class Education extends React.Component {
    parsed = queryString.parse(history.location.search);
    email = this.parsed?.email;
    user = authService.getCurrentUser()
    state = {
        modelType: '', educationId: '',
        highest_degree: '', school: '', degree: '', sDate: '', fields_of_study: '', is_currentedu: 0, start_dateedu: '', end_dateedu: '', loading: false,
        errors: {
            highest_degree: '', school: '', degree: '', fields_of_study: '', is_currentedu: 0, start_dateedu: '', end_dateedu: '', loading: false,
        },
        data: {
            education_experiences: [

            ],
            schools: [],
            school_suggestions: [],
            degrees: [],
            fields_of_study: [],
            fields_of_study_suggestions: [],
            get_heigest_degree_completed: []
        },


    }
    continue = async () => {
        const { highest_degree, is_currentedu, start_dateedu, end_dateedu } = this.state;
        let { highest_degreeError } = '';
        //debugger;
        if (!highest_degree || highest_degree == 'Select your degree') {
            highest_degreeError = 'This Field is required.'
        }

        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                highest_degree: highest_degreeError,

            }
        }))
        if (highest_degreeError) {
            return true;
        }
        this.setState({ loading: true });
        const data = {
            highest_degree
        }
        let response = await ApiRequest.postRequest('/api/add-highest-degree', data);

        if (response !== undefined && response.status === 200 && response.status !== 422) {
            this.changeStep();
        } else if (response !== undefined && response.status == 422) {
            toastAlert('error', response.data.errors[0]);
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
        this.setState({ loading: false });
    }
    componentDidMount() {
        this.getEducation();
    }
    onChangeState = (event) => {
        const { name, value, checked, id } = event.target;
        this.setState({ [name]: value })
        if (name == 'school') {
            this.onTextChanged(name, value);
        }
        if (name == 'is_currentedu') {

            this.setState({ [name]: checked ? 1 : 0 })
            if (checked == false) {
                isDisablededu2 = false;
            }
            else {
                isDisablededu2 = true;
            }
            return true;
        }
        if (name == 'start_dateedu') {
            this.setState({ sDate: value });
        }
        if (name == 'end_dateedu') {


            if (value == "") {
                isDisablededu = false;
            }
            else {
                isDisablededu = true;
            }
        }
    }
    getEducation = async () => {

        let response = await ApiRequest.getRequest('/api/get-education-data');
        response = response.data;
        console.log('getEducation', response.result);
        let data = this.state.data;
        if (response.result) {
            data.fields_of_study = this.selectOptions(response.result.field_of_studies);
            data.schools = response.result.schools;
            data.degrees = response.result.degrees;
            data.education_experiences = response.result.education_experiences;
            data.get_heigest_degree_completed = response.result.get_heigest_degree_completed;
            this.setState(() => ({ data, highest_degree: response.result.highest_degree }));
        }
    }


    refreshAsyncData = async () => {
        let response = await ApiRequest.getRequest('/api/get-education-data');
        response = response.data;
        console.log('getEducation', response.result);
        let data = this.state.data;
        if (response.result) {
            data.fields_of_study = this.selectOptions(response.result.field_of_studies);
            data.schools = response.result.schools;
            data.degrees = response.result.degrees;
            data.education_experiences = response.result.education_experiences;
            data.get_heigest_degree_completed = response.result.get_heigest_degree_completed;
            this.setState(() => ({ data }));
        }

    }
    addEducation = async () => {
        const { school, degree, fields_of_study, is_currentedu, start_dateedu, end_dateedu } = this.state;
        let { schoolError, degreeError, fields_of_studyError, graduation_yearError, is_currentError, start_dateError, end_dateError } = '';
        //debugger;
        if (!school) {
            schoolError = 'This Field is required.'
        }

        if (!degree) {
            degreeError = 'This Field is required.';
        }
        if (!fields_of_study) {
            fields_of_studyError = 'This Field is required.';
        }
        if (isDisablededu == false) {
            if (!is_currentedu) {
                is_currentError = 'This Field is required.';
            }
        }
        if (!start_dateedu) {
            start_dateError = 'This Field is required.';

        }
        if (isDisablededu2 == false) {
            if (!end_dateedu) {
                end_dateError = 'This Field is required.';
                // return true;
            }
        }
        // if (!graduation_year) {
        //     graduation_yearError = 'This Field is required.';
        // }
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                school: schoolError,
                degree: degreeError,
                fields_of_study: fields_of_studyError,
                is_current: is_currentError,
                start_dateedu: start_dateError,
                end_dateedu: end_dateError
                //    graduation_year: graduation_yearError,
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
            start_date: start_dateedu,
            graduation_year: end_dateedu
        }
        let response
        //  //debugger;
        if (this.state.educationId) {
            //   console.log(this.state.educationId)
            response = await ApiRequest.putRequest('/api/update-education-experience', data);
        }
        else {
            response = await ApiRequest.postRequest('/api/add-education-experience', data);
        }
        if (response.status === 200) {
            this.refreshAsyncData()
            // //debugger;

            // let dataState = this.state.data;
            // if (this.state.educationId){
            //     // let index = dataState.education_experiences.findIndex(key => key.id === this.state.educationId);
            //     // let newdata = dataState.education_experiences.splice(index,1);
            //     dataState.education_experiences = response.data.result;
            // }
            // else{
            //     dataState.education_experiences.push(response.data.result[response.data.result.length - 1]);
            // }
            // this.setState({
            //     data: dataState
            // })
            document.getElementById("addEducationBtn").click();
            toastAlert('success', 'Request has been processed.');
            isDisablededu = false;
            isDisablededu2 = false;
        } else if (response && response.status === 422) {
            toastAlert('error', response.data.errors[0]);
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
        this.setState({ loading: false });
    }
    resetErrors() {
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                school: '',
                degree: '',
                fields_of_study: '',
                graduation_year: '',
            }
        }))
    }
    setInputFieldStates(item = '') {
        this.setState({
            school: item ? item.school : '',
            degree: item ? item.degree : '',
            fields_of_study: item ? item?.fields_of_study : '',
            end_dateedu: item ? item?.graduation_year : '',
            start_dateedu: item ? item?.start_date : '',
            is_currentedu: item ? item?.is_current : '',
        })

    }
    addEducationModel() {
        this.setInputFieldStates();
        this.resetErrors();
        this.setState({
            modelType: 'add',
            educationId: ''
        })
    }
    editEducation(item) {
        console.log(item);
        this.setInputFieldStates(item);
        this.resetErrors();
        this.setState({
            modelType: 'edit',
            educationId: item.id
        })

    }
    deleteEducation = async () => {
        const response = await ApiRequest.deleteRequest('/api/delete-education-experience', this.state.educationId);
        if (response !== undefined && response.status === 200 && response.status !== 422) {
            let dataState = this.state.data;
            dataState.education_experiences = response.data.result;
            this.setState({
                data: dataState
            })
            document.getElementById("addEducationBtn").click();
            toastAlert('success', 'Request has been processed.');
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
    }
    changeStep(position = 'next') {
        if (position == 'back') {
            history.push('/signupwizard/emailVerification')
        }
        else {
            // if (this.state.data.education_experiences.length == 0) {
            //     toastAlert('error', 'Please fill education information!');
            //     return true;
            // }
            history.push('/signupwizard/workExperience')
        }
    }


    constructor(props) {
        super(props);
    }

    onTextChanged = (name, value) => {
        let data = this.state.data;
        let suggestions = data[name == 'school' ? 'schools' : 'fields_of_study'];
        if (value && suggestions) {
            const regex = new RegExp(`${value}`, 'i');
            suggestions = suggestions.sort().filter(v => regex.test(v.name));
        }
        else {
            suggestions = [];
        }
        data[name + '_suggestions'] = suggestions;
        this.setState(() => ({ data }));
    }
    suggestionSelected(name, value) {
        let data = this.state.data;
        data[name + '_suggestions'] = [];
        this.setState(() => ({
            [name]: value,
            data
        }));
    }
    renderSuggestions(name) {
        let suggestions = this.state.data[name + '_suggestions'];
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <div className="srchList">
                <ul class="oneline">
                    {suggestions.map((item) => <span onClick={() => this.suggestionSelected(name, item.name)}>{item.name}</span>)}
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
        console.log('name', name);
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
                <div className="col-md-12 wizardlogoimg">
                    <img src={ShortLogo} alt="" />
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>Apply to Candoor as an Advisee</h2>
                    <h6><span>Step 3:</span> Tell us about your education</h6>
                </div>

                <div className="col-md-12 form-inputs-">
                    <label htmlFor="">What is the highest degree or level of school you have completed?</label>
                    <select className="form-select" aria-label="Default select example" name="highest_degree" onChange={this.onChangeState} value={this.state.highest_degree}>
                        <option selected>Select your degree</option>
                        {
                            this.state.data.get_heigest_degree_completed.map((item, index) => (
                                <option value={item.name}>{item.name}</option>
                            ))
                        }
                    </select>
                    <span className="error">{this.state.errors.highest_degree}</span>
                </div>
                <div className="col-md-12 NewStepThird-p1">
                    <p>
                        Add your education experience below. Please do not include high schools or secondary schools.
                    </p>
                </div>
                <div className="col-md-12 mb-2">
                    <button type="button" className="btn btn-resend-" onClick={(e) => {
                        e.preventDefault();
                        this.addEducationModel();
                    }} data-toggle="modal" id="addEducationBtn" data-target="#addEducation">{this.state.educationId ? 'Edit' : 'Add'} Education</button>
                </div>
                <div className="col-md-12">
                    <div className="row mar-width-0 educationPanel">
                        <div className="col-md-12 educationPanelHeader">
                            <p>Your Education</p>
                        </div>
                        {this.state.data.education_experiences.map((item, index) => (
                            <div className="row mar-width-0 educationPanelData">
                                <div className="col-md-10 p-0">
                                    <h6>{item.school}</h6>
                                    <p>{item.degree}</p>

                                    <span><i>{Moment(item.start_date).format("MM/YY")}</i></span>
                                    <span><i>{item.is_current === 0 ? " - " + item.custom_graduation_year : " - Present"}</i></span>
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
                <div className="col-md-6">
                    <button className="btn btn-back-" id="step_two" onClick={(e) => {
                        e.preventDefault();
                        this.changeStep('back');
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
                                <h5 className="modal-title" id="addEducationTitle">Add Education Experience</h5>
                            </div>
                            <div className="modal-body pb-0">
                                <div className="col-md-12 form-inputs- form-inputs-search">
                                    <label htmlFor="">School</label>
                                    <input type="search" className="form-control" name="school" onChange={this.onChangeState}
                                        value={this.state.school} autoComplete="off" placeholder="Search or type your school..." />
                                    <span className="error">{this.state.errors.school}</span>
                                    <img src={Search} alt="" />
                                    {this.renderSuggestions('school')}
                                </div>
                                <div className="col-md-12 form-inputs- NewStepThird__Wrapper">
                                    <label htmlFor="">Degree</label>
                                    <select className="form-select" name="degree" onChange={this.onChangeState} value={this.state.degree}
                                        aria-label="Default select example">
                                        <option selected>Select your degree</option>
                                        {
                                            this.state.data.degrees.map((item, index) => (
                                                <option value={item.name}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    <span className="error">{this.state.errors.degree}</span>

                                </div>


                                <div className="col-md-12 form-inputs- form-inputs-search">
                                    <label htmlFor="">Major(s) / Field(s) of study</label>
                                    <Select classNamePrefix="react-select-custom" isMulti options={this.state.data.fields_of_study} name="fields_of_study" onChange={this.handleChange} value={this.state.fields_of_study} placeholder="Select all that apply..." />
                                    {/*<input type="search" name="fields_of_study" onChange={this.onChangeState} autoComplete="off"*/}
                                    {/*       value={this.state.fields_of_study} className="form-control" placeholder="Type your major..."/>*/}
                                    <img src={Search} alt="" />
                                    <span className="error">{this.state.errors.fields_of_study}</span>
                                    {this.renderSuggestions('fields_of_study')}
                                </div>

                                <div className="row row-half">
                                    <div className="col-md-6 form-inputs-">
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input type="date" className="form-control" placeholder="MM/YY" name="start_dateedu" onChange={this.onChangeState} value={this.state.start_dateedu} />
                                            <span className="error">{this.state.errors.start_dateedu}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 form-inputs-">
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input type="date" min={this.state.sDate} className="form-control" name="end_dateedu" disabled={this.state.is_currentedu == 1 ? 'disabled' : ''} onChange={this.onChangeState} value={this.state.end_dateedu} placeholder="MM/YY" />
                                            <span className="error">{this.state.errors.end_dateedu}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group checkbox-design">
                                            <label className="form-check-label">
                                                <input disabled={isDisablededu} checked={this.state.is_currentedu == 1 ? 'checked' : ''} name="is_currentedu" onChange={this.onChangeState}
                                                    type="checkbox" /> I am currently studying
                                            </label>
                                        </div>
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
                this.addEducation();
            }}>Save</button>;
        } else {
            return <div className="row footer-btns">
                <div className="col-6 pl-0">
                    <button type="button" className="btn btn-danger- btn-danger" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.deleteEducation();
                    }}>Delete</button>
                </div>
                <div className="col-6 pr-0">
                    <button type="button" className="btn btn-continue-" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.addEducation();
                    }}>Save Changes</button>
                </div>
            </div>
        }

    }
}

export default Education;
