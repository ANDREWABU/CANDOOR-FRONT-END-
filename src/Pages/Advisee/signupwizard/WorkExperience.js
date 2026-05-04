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



let isDisabled = false;
let isDisabled2 = false;
let empDisabled = true;
class WorkExperience extends React.Component {
    state = {
        modelType: '', educationId: '',
        title: '', company: '', industry: '', role: '', employment_type: '', ask_me_about: '', is_current: 0, start_date: '', end_date: '', years_work_experience: '', comfort_networking_at_signup: '', loading: false, employment_type_checked: 0,
        errors: {
            years_work_experience: '', comfort_networking_at_signup: '', title: '', company: '', industry: '', role: '', employment_type: '', ask_me_about: '', is_current: '', start_date: '', end_date: '', loading: false,
        },
        data: {
            work_experiences: [

            ],
            companies: [],
            industries: [],
            work_roles: [],
            work_exp_dropdown: [],
            Employment_Type_radio: [],
            companies_suggestions: [],
            industries_suggestions: [],
            workrole_suggestions: [],
        },


    }
    continue = async () => {
        //debugger;
        const { years_work_experience, comfort_networking_at_signup } = this.state;
        let { years_work_experienceError, comfort_networking_at_signupError } = '';
        // if (!years_work_experience) {
        //     years_work_experienceError = 'This Field is required.'
        // }
        // if (!comfort_networking_at_signup) {
        //     comfort_networking_at_signupError = 'This Field is required.'
        // }

        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                years_work_experience: years_work_experienceError,
                comfort_networking_at_signup: comfort_networking_at_signupError,
            }
        }))
        // if (years_work_experienceError || comfort_networking_at_signupError)
        // {
        //     return true;
        // }
        this.setState({ loading: true });
        const data = {
            years_work_experience, comfort_networking_at_signup
        }
        let response = await ApiRequest.postRequest('/api/add-highest-experiece-comfort-level', data);

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
        console.log('user', this.user);
        this.getMainData();
    }
    onChangeState = (event) => {
        const { name, value, checked, id } = event.target;
        if (name == 'is_current') {
            console.log('value', this.setState.is_current);
            console.log('checked', checked);
            this.setState({ [name]: checked ? 1 : 0 })
            if (checked == false) {
                isDisabled2 = false;
            }
            else {
                isDisabled2 = true;
            }
            return true;
        }
        this.setState({ [name]: value })
        if ((name == 'company') || (name == 'industry') || (name == 'role')) {
            this.onTextChanged(name, value);
        }

        if (name == 'end_date') {


            if (value == "") {
                isDisabled = false;
            }
            else {
                isDisabled = true;
            }
        }
        // //debugger;
        if (name == 'employment_type') {

            if (value == "Other (Specify)") {
                empDisabled = false;
            }
            else {
                empDisabled = true;
            }

            const splitId = id.split("-");
            console.log(splitId);
            const actualId = parseInt(splitId[1]);

            this.setState({ employment_type_checked: actualId });
        }
    }

    handleChange = (selectedOption, e) => {
        const { name } = e;
        console.log('name', name);
        this.setState({ [name]: selectedOption }, () =>
            console.log(`Option selected:`, selectedOption['label'])
        );
    };
    getMainData = async () => {
        let response = await ApiRequest.getRequest('/api/get-work-experience-data');
        response = response.data;
        console.log('workexpirience', response.result);
        let data = this.state.data;
        if (response.result) {
            data.companies = response.result.companies;
            data.industries = response.result.industries;
            data.work_roles = this.selectOptions(response.result.work_roles);
            data.work_experiences = response.result.work_experiences;
            data.work_exp_dropdown = response.result.work_exp_dropdown;
            data.Employment_Type_radio = response.result.Employment_Type;

            this.setState(() => (
                {
                    data,
                    years_work_experience: response.result.years_work_experience,
                    comfort_networking_at_signup: response.result.comfort_networking_at_signup
                }));
        }

        // Axios.post('https://reqres.in/api/articles', {email,password} )
        //     .then(response => console.log(response));
    }

    refreshAsyncData = async () => {
        let response = await ApiRequest.getRequest('/api/get-work-experience-data');
        response = response.data;
        console.log('work', response.result);
        let data = this.state.data;
        if (response.result) {
            data.companies = response.result.companies;
            data.industries = response.result.industries;
            data.work_roles = this.selectOptions(response.result.work_roles);
            data.work_experiences = response.result.work_experiences;
            // data.work_exp_dropdown = response.result.work_exp_dropdown;
            data.Employment_Type_radio = response.result.Employment_Type;

            this.setState(() => (
                {
                    data,
                    // years_work_experience: response.result.years_work_experience,
                    // comfort_networking_at_signup: response.result.comfort_networking_at_signup
                }));
        }

        // Axios.post('https://reqres.in/api/articles', {email,password} )
        //     .then(response => console.log(response));
    }
    add = async () => {
        const { title, company, industry, role, employment_type, employment_type_other, ask_me_about, is_current, start_date, end_date } = this.state;
        let { titleError, companyError, industryError, employment_type_otherError,
            roleError, employment_typeError, ask_me_aboutError, is_currentError, start_dateError, end_dateError } = '';

        if (title != '' || company != '' || industry != '' || role != '' || employment_type != '' || start_date != '' || end_date != '') {


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
            if (!employment_type) {
                employment_typeError = 'This Field is required.';
            }
            if (!employment_type_other) {
                employment_type_otherError = 'This Field is required.';
            }
            if (!ask_me_about) {
                ask_me_aboutError = 'This Field is required.';
            }
            if (isDisabled == false) {
                if (!is_current) {
                    is_currentError = 'This Field is required.';
                }
            }
            if (!start_date) {
                start_dateError = 'This Field is required.';
            }
            if (isDisabled2 == false) {
                if (!end_date) {
                    end_dateError = 'This Field is required.';
                }
            }
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    title: titleError,
                    company: companyError,
                    industry: industryError,
                    role: roleError,
                    employment_type: employment_typeError,
                    employment_type_other: employment_type_otherError,
                    ask_me_about: ask_me_aboutError,
                    is_current: is_currentError,
                    start_date: start_dateError,
                    end_date: end_dateError
                }
            }))
            if (titleError || companyError || industryError || roleError || employment_typeError || start_dateError || end_dateError) {
                console.log('error', this.state.errors);
                return true;
            }
        }
        this.setState({ loading: true });
        const data = {
            id: this.state.ID,
            role: this.state.role['label'],

            title, company, industry, employment_type, employment_type_other, ask_me_about, is_current,
            start_date, end_date
        }
        let response
        if (this.state.ID) {
            response = await ApiRequest.putRequest('/api/update-work-experience', data);
        }
        else {
            response = await ApiRequest.postRequest('/api/add-work-experience', data);
        }
        if (response !== undefined && response.status === 200 && response.status !== 422) {
            // this.getMainData();
            this.refreshAsyncData();
            // let dataState = this.state.data;
            // dataState.work_experiences = response.data.result;
            // this.setState({
            //     data: dataState
            // })
            document.getElementById("addBtn").click();
            toastAlert('success', 'Request has been processed.');
            isDisabled = false;
            isDisabled2 = false;
            empDisabled = true;
        } else if (response !== undefined && response.status == 422) {
            toastAlert('error', response.data.errors[0]);
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
        console.log(response);
        this.setState({ loading: false });
    }
    resetErrors() {
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                title: '',
                company: '',
                industry: '',
                role: '',
                employment_type: '',
                employment_type_other: '',
                // ask_me_about: '',
                // is_current: '',
                start_date: '',
                end_date: ''
            }
        }))
    }
    setInputFieldStates(item = '') {
        console.log(item)
        this.setState({
            title: item ? item.title : '',
            company: item ? item.company : '',
            industry: item ? item.industry : '',
            // role: item ? item.role : '',
            role: item ? { 'value': item.role, label: item.role } : '',
            employment_type: item ? item.employment_type : '',
            employment_type_other: item ? item.employment_type_other : '',
            is_current: item ? item.is_current : '',
            start_date: item ? item.start_date : '',
            end_date: item ? item.end_date : '',
            custom_graduation_year: item ? item.end_date : '',

        })

    }
    addModel() {
        this.setInputFieldStates();
        this.resetErrors();
        this.setState({
            modelType: 'add',
            ID: ''
        })
    }
    edit(item) {
        console.log(item);
        this.setInputFieldStates(item);
        this.resetErrors();
        this.setState({
            modelType: 'edit',
            ID: item.id
        })

    }
    delete = async () => {
        //  //debugger;
        const response = await ApiRequest.deleteRequest('/api/delete-work-experience', this.state.ID);
        if (response !== undefined && response.status === 200 && response.status !== 422) {
            let dataState = this.state.data;
            dataState.work_experiences = response.data.result;
            this.setState({
                data: dataState
            })
            document.getElementById("addBtn").click();
            toastAlert('success', 'Request has been processed.');
        } else {
            toastAlert('error', "Something went wrong please try again!");
        }
    }
    changeStep(position = 'next') {
        if (position == 'back') {
            history.push('/signupwizard/education')
        }
        else {
            // if (this.state.data.work_experiences.length == 0) {
            //     toastAlert('error', 'Please fill work experiences information!');
            //     return true;
            // }
            history.push('/signupwizard/background')
        }
    }



    onTextChanged = (name, value) => {
        let data = this.state.data;
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

        this.setState(() => ({ data }));
    }
    suggestionSelected(name, value) {
        let data = this.state.data;
        if (name == 'company') {
            data.companies_suggestions = [];
        }
        if (name == 'industry') {
            data.industries_suggestions = [];
        }
        if (name == 'role') {
            data.workrole_suggestions = [];
        }
        this.setState(() => ({
            [name]: value,
            data
        }));
    }
    renderSuggestions(name) {
        let suggestions = this.state.data.companies_suggestions;
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
    renderSuggestions1(name) {
        let isuggestions = this.state.data.industries_suggestions;
        if (isuggestions.length === 0) {
            return null;
        }
        return (
            <div className="srchList">
                <ul class="oneline">
                    {isuggestions.map((item) => <span onClick={() => this.suggestionSelected(name, item.name)}>{item.name}</span>)}
                </ul>
            </div>
        );
    }

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

    renderSuggestions2(name) {
        let wsuggestions = this.state.data.workrole_suggestions;
        if (wsuggestions.length === 0) {
            return null;
        }
        return (
            <div className="srchList">
                <ul class="oneline">
                    {wsuggestions.map((item) => <span onClick={() => this.suggestionSelected(name, item.name)}>{item.name}</span>)}
                </ul>
            </div>
        );
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={`row mar-width-0  mt-80  fourthStep NewStepThird__Wrapper`}>
                    <div className="col-md-12 wizardlogoimg">
                        <img src={ShortLogo} alt="" />
                    </div>
                    <div className="col-md-12 text-center wizardHeading">
                        <h2>Apply to Candoor as an Advisee</h2>
                        <h6><span>Step 4:</span> Tell us about your work experience</h6>
                    </div>
                    <div className="col-md-12 form-inputs-">
                        <label htmlFor="">How many years of <i>full-time</i> work experience do you have? Please exclude internships.</label>
                        <select className="form-select" aria-label="Default select example" name="years_work_experience" onChange={this.onChangeState} value={this.state.years_work_experience}>
                            <option selected>Select your Experience</option>
                            {
                                this.state.data.work_exp_dropdown.map((item, index) => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </select>
                        <span className="error">{this.state.errors.years_work_experience}</span>
                    </div>
                    <div className="col-md-12 NewStepThird-p1">
                        <p>
                            To what extent do you <b>agree</b> or <b>disagree</b> with the following statement:
                            <i>“I am comfortable using networking as a tool to advance my career”? </i>
                            (Our platform is designed to make networking easy, effective and fun, so don’t worry if you’ve never networked before!)
                        </p>


                        <div className="text-center agreeWrap">
                            <span>Strongly Disagree</span>
                            <div className="custom02">
                                <input type="radio" id="radio03-01" name="comfort_networking_at_signup" onChange={this.onChangeState} value={1} checked={this.state.comfort_networking_at_signup == 1} /><label
                                    htmlFor="radio03-01"></label>
                                <input type="radio" id="radio03-02" name="comfort_networking_at_signup" onChange={this.onChangeState} value={2} checked={this.state.comfort_networking_at_signup == 2} /><label
                                    htmlFor="radio03-02"></label>
                                <input type="radio" id="radio03-03" name="comfort_networking_at_signup" onChange={this.onChangeState} value={3} checked={this.state.comfort_networking_at_signup == 3} /><label
                                    htmlFor="radio03-03"></label>
                                <input type="radio" id="radio03-04" name="comfort_networking_at_signup" onChange={this.onChangeState} value={4} checked={this.state.comfort_networking_at_signup == 4} /><label
                                    htmlFor="radio03-04"></label>
                                <input type="radio" id="radio03-05" name="comfort_networking_at_signup" onChange={this.onChangeState} value={5} checked={this.state.comfort_networking_at_signup == 5} /><label
                                    htmlFor="radio03-05"></label>
                            </div>
                            <span>Strongly Agree</span>
                        </div>
                        <span className="error">{this.state.errors.comfort_networking_at_signup}</span>
                        <p>
                            Add your work experience below. If you have no full-time work experience, please include internships and part-time roles, if any.
                        </p>
                    </div>
                    <div className="col-md-12 mb-2">
                        <button className="btn btn-resend-" onClick={(e) => {
                            e.preventDefault();
                            this.addModel();
                        }} data-toggle="modal" id="addBtn" data-target="#addExperience">Add Work Experience</button>
                    </div>
                    <div className="col-md-12">
                        <div className="row mar-width-0 educationPanel row0">
                            <div className="col-md-12 educationPanelHeader">
                                <p>Your Work Experience</p>
                            </div>
                            {
                                this.state.data.work_experiences.map((item, index) => (
                                    <div className="row mar-width-0 educationPanelData">
                                        <div className="col-md-10 p-0">
                                            <h6>{item.company}</h6>
                                            <p>{item.role} ({item.employment_type})</p>

                                            <span><i>{item.custom_start_date}{item.is_current === 0 ? " - " + item.custom_end_date : " - Present"}</i></span>
                                        </div>
                                        <div className="col-md-2 text-right align-self-center">
                                            <a onClick={(e) => {
                                                e.preventDefault();
                                                this.edit(item);
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
                        <button className="btn btn-back-" id="step_three" onClick={(e) => {
                            e.preventDefault();
                            this.changeStep('back');
                        }}>Back</button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-continue-" id="step_five" disabled={this.state.loading} onClick={(e) => {
                            e.preventDefault();
                            this.continue();
                        }}>Continue</button>
                    </div>
                </div>
                <div className="modal modalsWizard fade" id="addExperience" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addExperienceTitle">{this.state.ID ? 'Edit' : 'Add'}  Work Experience</h5>
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
                                    <input type="search" className="form-control" name="company" onChange={this.onChangeState}
                                        value={this.state.company} autoComplete="off" placeholder="Search or type your company..." />
                                    <span className="error">{this.state.errors.company}</span>
                                    <img src={Search} alt="" />
                                    {this.renderSuggestions('company')}
                                </div>

                                <div className="col-md-12 form-inputs- NewStepThird__Wrapper form-inputs-search">
                                    <label htmlFor="">Industry</label>
                
                                    <input type="search" className="form-control" name="industry" onChange={this.onChangeState}
                                        value={this.state.industry} autoComplete="off" placeholder="Search or type your industry..." />
                                    <span className="error">{this.state.errors.industry}</span>
                                    <img src={Search} alt="" />
                                    {this.renderSuggestions1('industry')}
                                    <span className="error">{this.state.errors.industry}</span>
                                </div>

           
                                <div className="col-md-12 form-inputs- NewStepThird__Wrapper form-inputs-search">
                                    <label htmlFor="">Role</label>
                                    <img src={Search} alt="" />
                                    {this.renderSuggestions2('role')}
                                    <Select classNamePrefix="react-select-custom" options={this.state.data.work_roles} name="role" onChange={this.handleChange} value={this.state.role} placeholder="Search or type your role..." />
                                    <span className="error">{this.state.errors.role}</span>
                                </div>

                                <div className="col-md-12 NewStepThird-p1">
                                    <div className=" agreeWrap mt-0">
                                        <label htmlFor="" className="label-custom-"> Employment Type</label>
                                        <div className="custom02 d-block">
                                            {this.state.data.Employment_Type_radio.map((item, index) => {
                                                return <div key={item[index]}><input type="radio" id={'radio03-' + index} name="employment_type" value={item} onChange={this.onChangeState} checked={this.state.employment_type === item ? 'checked' : ''} />
                                                    <label htmlFor={'radio03-' + index}>{item}</label></div>
                                            })}
                                        </div>
                                    </div>
                                    <span className="error">{this.state.errors.employment_type}</span>
                                </div>
                                <div className="col-md-12 form-inputs- NewStepThird__Wrapper">
                                    <label htmlFor="">(Optional) Dont see your Employment Type? Type it here</label>
                                    <input disabled={empDisabled} type="text" className="form-control" placeholder="Type it here..." name="employment_type_other" onChange={this.onChangeState} value={this.state.employment_other} />
                                    <span className="error">{this.state.errors.employment_type_other}</span>
                                </div>
                                <div className="row date_padding form-inputs-">
                                    <div className="col-md-6 form-inputs-"      >
                                        <label htmlFor="">Start Date</label>
                                        <input type="date" className="form-control" placeholder="MM/YY" name="start_date" onChange={this.onChangeState} value={this.state.start_date} />
                                        <span className="error">{this.state.errors.start_date}</span>
                                    </div>
                                    <div className="col-md-6 form-inputs-">
                                        <label htmlFor="">End Date</label>
                                        <input type="date" className="form-control" name="end_date" disabled={this.state.is_current == 1 ? 'disabled' : ''} onChange={this.onChangeState} value={this.state.end_date} placeholder="MM/YY" />
                                        <span className="error">{this.state.errors.end_date}</span>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div>
                                        <input disabled={isDisabled} className="styled-checkbox" id="styled-checkbox-23" checked={this.state.is_current == 1 ? 'checked' : ''} name="is_current" onChange={this.onChangeState}
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
                this.add();
            }}>Save</button>;
        } else {
            return <div className="row footer-btns">
                <div className="col-6 pl-0">
                    <button type="button" className="btn btn-danger- btn-danger" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.delete();
                    }}>Delete</button>
                </div>
                <div className="col-6 pr-0">
                    <button type="button" className="btn btn-continue-" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.add();
                    }}>Save Changes</button>
                </div>
            </div>
        }

    }
}

export default WorkExperience;
