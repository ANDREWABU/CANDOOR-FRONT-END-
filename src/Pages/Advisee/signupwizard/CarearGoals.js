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
import { css, cx } from '@emotion/css'
class CarearGoals extends React.Component {
    state = {
        next_carrer_goals: '', why_joined: '', dream_roles: [], dream_industries: [], dream_companies: [], excited_topics: [], dream_companies_other: '', employment_opportunities: '', is_prescrean_program: '', loading: false, employment_opportunities_checked: -1,
        errors: {
            next_carrer_goals: '', why_joined: '', dream_roles: [], dream_industries: [], dream_companies: [], excited_topics: [], employment_opportunities: '', is_prescrean_program: ''
        },
        data: {
            work_roles: [],
            industries: [],
            companies: [],
            timezones: [],
            meeting_types: [],
            user_carrer: '',
            employment_opportunities: []
        },


    }
    componentDidMount() {
        console.log('user', this.user);
        this.getMainData();
    }
    onChangeState = (event) => {
        const { name, value, checked, id } = event.target;
        if (name == 'employment_opportunities') {

            const splitId = id.split("-");
            console.log(splitId);
            const actualId = parseInt(splitId[1]);

            this.setState({ employment_opportunities_checked: actualId });
        }
        this.setState({ [name]: value })
    }

    onChangeStateBelongsTo = (event) => {
        const { name, value, checked } = event.target;
        let options = this.state[name];
        if (checked) {
            options.push(value);
        }
        else {
            options = options.filter(obj => obj != value);
        }
        this.setState({ [name]: options })
        console.log('this.state[name]', this.state[name]);
    }
    getMainData = async () => {
        let response = await ApiRequest.getRequest('/api/get-carrer-data');
        response = response.data;
        let data = this.state.data;
        if (response.result) {
            data.companies = this.selectOptions(response.result.companies);
            data.meeting_types = this.selectOptions(response.result.meeting_types);
            data.industries = this.selectOptions(response.result.industries);
            data.work_roles = this.selectOptions(response.result.work_roles);
            data.employment_opportunities = response.result.employment_opportunities;
            this.setState(() => ({ data }));
            this.setInputFieldStates(response.result.user_carrer);
        }

        // Axios.post('https://reqres.in/api/articles', {email,password} )
        //     .then(response => console.log(response));
    }
    add = async () => {
        const { next_carrer_goals, why_joined, dream_roles, dream_industries, dream_companies, dream_companies_other, excited_topics, employment_opportunities, is_prescrean_program } = this.state;
        let { next_carrer_goalsErrFor, why_joinedError, dream_rolesError, dream_industriesError, dream_companiesError, excited_topicsError, employment_opportunitiesError, is_prescrean_programError, next_carrer_goalsError } = '';
        this.resetErrors();
        //debugger;
        if (!next_carrer_goals) {
            next_carrer_goalsError = 'This Field is required.'
        }

        if (!why_joined) {
            why_joinedError = 'This Field is required.';
        }

        if (dream_roles.length == 0) {
            dream_rolesError = 'This Field is required.';
        }
        if (dream_industries.length == 0) {
            dream_industriesError = 'This Field is required.';
        }

        if ((dream_companies.length == 0) && (dream_companies_other.length == 0)) {
            dream_companiesError = 'Please type your dream company';
        }
        // if (dream_companies_other.length == 0) {
        //     dream_companiesError = 'This Field is required.';
        // }
        if (excited_topics.length == 0) {
            excited_topicsError = 'This Field is required.';
        }
        if (!employment_opportunities) {
            employment_opportunitiesError = 'This Field is required.';
        }
        if (!is_prescrean_program) {
            is_prescrean_programError = 'This Field is required.';
        }

        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                next_carrer_goals: next_carrer_goalsError,
                why_joined: why_joinedError,
                dream_roles: dream_rolesError,
                dream_industries: dream_industriesError,
                dream_companies: dream_companiesError,
                excited_topics: excited_topicsError,
                employment_opportunities: employment_opportunitiesError,
                is_prescrean_program: is_prescrean_programError
            }
        }))
        if (next_carrer_goalsError || why_joinedError || dream_rolesError || dream_industriesError || dream_companiesError || excited_topicsError || employment_opportunitiesError || is_prescrean_programError) {
            return true;
        }
        this.setState({ loading: true });
        const data = {
            next_carrer_goals, why_joined, dream_roles, dream_industries, dream_companies, dream_companies_other, excited_topics, employment_opportunities, is_prescrean_program
        }
        let response = await ApiRequest.postRequest('/api/add-user-carrer-goal', data);

        if (response !== undefined && response.status === 200 && response.status !== 422) {
            this.changeStep();
        } else if (response !== undefined && response.status == 422) {
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
                next_carrer_goals: '',
                why_joined: '',
                dream_roles: '',
                dream_industries: '',
                dream_companies: '',
                excited_topics: '',
                employment_opportunities: '',
                is_prescrean_program: ''
            }
        }))
    }
    setInputFieldStates(item = '') {
        this.setState({
            next_carrer_goals: item ? item.next_carrer_goals : '',
            why_joined: item ? item.why_joined : '',
            dream_roles: item && item.dream_roles ? (item.dream_roles) : [],
            dream_industries: item && item.dream_industries ? (item.dream_industries) : [],
            dream_companies: item && item.dream_companies ? (item.dream_companies) : [],
            excited_topics: item && item.excited_topics ? (item.excited_topics) : [],
            employment_opportunities: item ? item.employment_opportunities : '',
            dream_companies_other: item ? item.dream_companies_other : '',
            is_prescrean_program: item ? item.is_prescrean_program : '',
        })
    }

    changeStep(position = 'next') {
        if (position == 'back') {
            history.push('/signupwizard/background')
        }
        else {
            history.push('/signupwizard/apply')
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
            <div className={`row mar-width-0 mt-80 e sixStep NewStepThird__Wrapper `}>
                <div className="col-md-12 wizardlogoimg">
                    <img src={ShortLogo} alt="" />
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>Apply to Candoor as an Advisee</h2>
                    <h6><span>Step 6:</span> Tell us about your career goals</h6>
                </div>
                <div className="col-md-12 NewStepThird-p1">
                    <label htmlFor="" className="label-custom-">What are your career goals over the next 3-5 years? (If you’re unsure, no problem — just tell us what you’re interested in!)</label>
                    <textarea maxLength="300" name="next_carrer_goals" onChange={this.onChangeState} value={this.state.next_carrer_goals} placeholder="Type your answer..."></textarea>
                    <p className="text-right min-words">({this.state.next_carrer_goals ? 300 - this.state.next_carrer_goals.length + "/300" : "300"}) characters remaining</p>
                    <span className="error">{this.state.errors.next_carrer_goals}</span>
                </div>
                <div className="col-md-12 NewStepThird-p1">
                    <label htmlFor="" className="label-custom-">How do you hope for Candoor to support you in achieving those goals?</label>
                    <textarea maxLength="300" name="why_joined" onChange={this.onChangeState} value={this.state.why_joined} placeholder="Type your answer..."></textarea>
                    <p className="text-right min-words"> ({this.state.why_joined ? 300 - this.state.why_joined.length + "/300" : "300"}) characters remaining</p>
                    <span className="error">{this.state.errors.why_joined}</span>
                </div>
                <div className="col-md-12 form-inputs-">
                    <label htmlFor="">My dream roles are...</label>
                    <Select classNamePrefix="react-select-custom" isMulti options={this.state.data.work_roles} name="dream_roles" onChange={this.handleChange} value={this.state.dream_roles} placeholder="Select all that apply..." />
                    <span className="error">{this.state.errors.dream_roles}</span>
                </div>
                <div className="col-md-12 form-inputs-">
                    <label htmlFor="">My dream industries are...</label>
                    <Select classNamePrefix="react-select-custom" isMulti options={this.state.data.industries} name="dream_industries" onChange={this.handleChange} value={this.state.dream_industries} placeholder="Select all that apply..." />
                    <span className="error">{this.state.errors.dream_industries}</span>
                </div>
                <div className="col-md-12 form-inputs-">
                    <label htmlFor="" className="label-custom-">My dream companies are...</label>
                    <Select classNamePrefix="react-select-custom" isMulti options={this.state.data.companies} name="dream_companies" onChange={this.handleChange} value={this.state.dream_companies} placeholder="Select all that apply..." />
                    <span className="error">{this.state.errors.dream_companies}</span>
                </div>
                <div className="col-md-12 form-inputs-">
                    <label htmlFor="" className="label-custom-">(Optional) Dont see your company in the list above? Type it here</label>
                    <input type="text" className="form-control" name="dream_companies_other" onChange={this.onChangeState} value={this.state.dream_companies_other} placeholder="Start typing..." />
                    {/* <span className="error">{this.state.errors.dream_companies}</span> */}
                </div>
                <div className="col-md-12 form-inputs-">
                    <label htmlFor="" className="label-custom-">What topics would you be most excited to discuss with Candoor Advisors?</label>
                    <Select classNamePrefix="react-select-custom" isMulti options={this.state.data.meeting_types} name="excited_topics" onChange={this.handleChange} value={this.state.excited_topics} placeholder="Select all that apply..." />
                    <span className="error">{this.state.errors.excited_topics}</span>
                </div>
                <div className="col-md-12 NewStepThird-p1">
                    <div className=" agreeWrap mt-0">
                        <label htmlFor="" className="label-custom-">Are you actively looking for employment opportunities? Note: This is not a prerequisite for joining Candoor. Should you join, you can change this setting in your profile at any time.</label>
                        <div className="custom02 d-block">
                            {/* <input type="radio" id="radio03-0111" name="employment_opportunities" value="Yes; I’m actively looking for full-time roles" onChange={this.onChangeState}  checked={this.state.employment_opportunities === "Yes; I’m actively looking for full-time roles"}/><label
                            htmlFor="radio03-0111">Yes; I’m actively looking for full-time roles</label>
                            <input type="radio" id="radio03-0211" name="employment_opportunities" value="Yes; I’m actively looking for part-time / internship roles" onChange={this.onChangeState} checked={this.state.employment_opportunities === "Yes; I’m actively looking for part-time / internship roles"}/><label
                            htmlFor="radio03-0211">Yes; I’m actively looking for part-time / internship roles</label>
                            <input type="radio" id="radio03-0311" name="employment_opportunities" value="Maybe; I’m casually browsing" onChange={this.onChangeState} checked={this.state.employment_opportunities === "Maybe; I’m casually browsing"}/><label
                            htmlFor="radio03-0311">Maybe; I’m casually browsing</label>
                            <input type="radio" id="radio03-0411" name="employment_opportunities" value="No; I’m not interested in employment opportunities at this time" onChange={this.onChangeState} checked={this.state.employment_opportunities === "No; I’m not interested in employment opportunities at this time"}/><label
                            htmlFor="radio03-0411">No; I’m not interested in employment opportunities at this time</label> */}
                            {this.state.data.employment_opportunities.map((item, index) => {
                                return <div key={item[index]}><input type="radio" id={'radio03-' + index} name="employment_opportunities" value={item} onChange={this.onChangeState} checked={this.state.employment_opportunities === item} />
                                    <label htmlFor={'radio03-' + index}>{item}</label></div>
                            })}
                        </div>
                    </div>
                    <span className="error">{this.state.errors.employment_opportunities}</span>
                </div>
                <div className="col-md-12 NewStepThird-p1">
                    <div className=" agreeWrap mt-0">
                        <label htmlFor="" className="label-custom- Ec-Tooltip">We will soon offer a <a href="#">Pre-Screening Program</a> where select Advisors can provide feedback to Advisees and act as a "human signal" to fast-track them to interviews with our partner companies. Would you like to opt in to this program when it becomes available?
                            <div className="tooltip-eligibile position-relative">
                                <h6>Pre-Screening Program</h6>
                                <p>This program entails Advisors providing candid feedback on an Advisee’s interview readiness for a role they are targeting. By opting into this program, you grant permission for Candoor to share this feedback with partner employers.</p>
                            </div>
                        </label>
                        <div className="custom02 d-block">
                            <input type="radio" id="radio03-0112" value={1} name="is_prescrean_program" onChange={this.onChangeState} checked={this.state.is_prescrean_program == 1} /><label
                                htmlFor="radio03-0112">Yes</label>
                            <input type="radio" id="radio03-0212" value={0} name="is_prescrean_program" onChange={this.onChangeState} checked={this.state.is_prescrean_program == 0} /><label
                                htmlFor="radio03-0212">No</label>
                        </div>
                    </div>
                    <span className="error">{this.state.errors.is_prescrean_program}</span>

                </div>
                <div className="col-md-6">
                    <button className="btn btn-back-" id="step_five" onClick={(e) => {
                        e.preventDefault();
                        this.changeStep('back');
                    }}>Back</button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-continue-" id="step_seven" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.add();
                    }}>Continue</button>
                </div>
            </div>
        );
    }
}

export default CarearGoals;
