import react from 'react';
import myprofile from "../../../assets/images/myprofile.png";
import upload from "../../../assets/images/upload.png";
import Header from "../../../Components/Layouts/AdviseeLayout/Header";
import settingsicon1 from "../../../assets/images/settingsicon1.png";
import search from "../../../assets/images/search.png";
import clock from "../../../assets/images/clock.png";
import { destroySession, toasterAlert as toastAlert } from '../../../Helpers/Functions';
import ApiRequest from "../../../Services/ApiRequest";
import CreatableSelect from 'react-select/creatable';
import Select from "react-select";
import MainFooter from "../../../Components/Layouts/MainFooter";


class EditAdviseeSetting extends react.Component {
    state = {
        meeting_email: "", current_password: "", new_password: "", confirm_new_password: "", job_locations: [],
        errors: {
            meeting_email: "", current_password: "", new_password: "", confirm_new_password: "",
            country: '', city: '', state: '', time_zone: '', next_carrer_goals: '', why_joined: '', dream_roles: [],
            dream_industries: [], dream_companies: [], excited_topics: [], employment_opportunities: '',
            is_prescrean_program: ''
        },
        data: {
            // email:"",
            // meeting_email:"",
            // password:"",  
            userData: []
        },

        data1: {
            countries: [],
            states: [],
            timezones: [],
            BackgroundData: "",

        },
        data2: {
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
        this.getMainData1();
    }
    getMainData1 = async () => {
        let response = await ApiRequest.getRequest('/api/setting-account');
        let response1 = await ApiRequest.getRequest('/api/location-timezone');
        let response2 = await ApiRequest.getRequest('/api/get-carrer-data');
        // this.setState({base_url:response.ata.base_url});
        // //debugger;


        ////debugger
        response = response.data;
        let data = this.state.data;
        if (response.Data) {

            data.userData = response.Data.userData;

            this.setState(() => ({ data }));
            this.setInputFieldStates2(response.Data.userData);
        }


        response1 = response1.data;
        let data1 = this.state.data1;
        if (response1.Data) {

            data1.countries = response1.Data.countries;
            data1.states = response1.Data.states;
            data1.timezones = response1.Data.timezones;
            data1.BackgroundData = response1.Data.BackgroundData;
            this.setState(() => ({ data1 }));
            this.setInputFieldStates1(response1.Data.BackgroundData);
        }

        response2 = response2.data;

        let data2 = this.state.data2;
        if (response2.result) {

            data2.companies = this.selectOptions(response2.result.companies);
            data2.meeting_types = this.selectOptions(response2.result.meeting_types);
            data2.industries = this.selectOptions(response2.result.industries);
            data2.work_roles = this.selectOptions(response2.result.work_roles);
            data2.employment_opportunities = response2.result.employment_opportunities;
            this.setState(() => ({ data2 }));
            this.setInputFieldStates(response2.result.user_carrer);



        }

    }
    handleChange = (selectedOption, e) => {
        const { name } = e;
        console.log('name', name);
        this.setState({ [name]: selectedOption }, () =>
            console.log(`Option selected:`, selectedOption)
        );
    };
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
    setInputFieldStates(item = '') {
        //debugger;
        this.setState({
            next_carrer_goals: item ? item.next_carrer_goals : '',
            why_joined: item ? item.why_joined : '',
            dream_roles: item && item.dream_roles ? (item.dream_roles) : [],
            dream_industries: item && item.dream_industries ? (item.dream_industries) : [],
            dream_companies: item && item.dream_companies ? (item.dream_companies) : [],
            dream_companies_other: item && item.dream_companies_other ? (item.dream_companies_other) : [],
            excited_topics: item && item.excited_topics ? (item.excited_topics) : [],
            employment_opportunities: item ? item.employment_opportunities : '',
            is_prescrean_program: item ? item.is_prescrean_program : '',
            job_locations: item ? item.job_locations ? JSON.parse(item.job_locations) : [] : [],
        })
        // console.log('cns',this.state.next_carrer_goals);
    }
    setInputFieldStates1(item = '') {
        this.setState({
            city: item ? item.city : '',
            country: item ? item.country : '',
            state: item && item.state ? (item.state) : [],
            time_zone: item && item.time_zone ? (item.time_zone) : [],

        })
    }

    setInputFieldStates2(item = '') {
        this.setState({
            email: item ? item.email : '',
            meeting_email: item ? item.meeting_email : '',


        })
    }
    addaccount = async () => {

        const { meeting_email, current_password, new_password, confirm_new_password } = this.state;

        let { meeting_email_error, current_password_error, new_password_error, confirm_password_error } = '';


        if (current_password !== '') {
            if (!new_password) {
                new_password_error = 'This Field is required.'
            }

            if (!confirm_new_password) {
                confirm_password_error = "This Field is required";
            } else if (new_password != confirm_new_password) {
                confirm_password_error = "Password Mismatch";
            }
        }


        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                meeting_email: meeting_email_error,
                current_password: current_password_error,
                new_password: new_password_error,
                confirm_new_password: confirm_password_error,
            }
        }))
        if ((meeting_email_error) || (current_password_error) || (new_password_error) || (confirm_password_error)) {
            return true;
        }
        this.setState({ loading: true });
        const data = {
            meeting_email: meeting_email,
            old_password: current_password,
            password: confirm_new_password
        }
        let response = await ApiRequest.postRequest('/api/update-setting-account ', data);
        //  //debugger;
        if (response.data.statusCode === 200) {
            toastAlert('success', 'Request has been processed.');
            this.setState({ user_meeting_email: meeting_email });
        } else {
            toastAlert('error', response.data.message);
        }


    }
    updatelocation = async () => {

        const { country, city, state, time_zone } = this.state;
        let { countryError, stateError, cityError, time_zoneError } = '';

        if (!country) {
            countryError = 'This Field is required.'
        }
        if (!state) {
            stateError = 'This Field is required.'
        }
        if (!city) {
            cityError = 'This Field is required.';
        }
        if (!time_zone) {
            time_zoneError = 'This Field is required.';
        }


        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                country: countryError,
                city: cityError,
                time_zone: time_zoneError,

            }
        }))
        if (countryError || cityError || time_zoneError) {
            console.log('error', this.state.errors);
            return true;
        }
        this.setState({ loading: true });
        const data = {
            country: country,
            city: city,
            state: state,
            timezone: time_zone
        }
        let response = await ApiRequest.postRequest('/api/update-location-timezone ', data);
        //  //debugger;
        if (response.data.statusCode === 200) {
            toastAlert('success', 'Request has been processed.');

        } else {
            toastAlert('error', 'Something went wrong');
        }


    }
    addcareergoal = async () => {

        const { next_carrer_goals, why_joined, dream_roles, dream_industries, dream_companies, excited_topics, employment_opportunities, is_prescrean_program, job_locations } = this.state;
        let { next_carrer_goals_Error, why_joinedError, dream_rolesError, dream_industriesError, dream_companiesError, excited_topicsError, employment_opportunitiesError, is_prescrean_programError } = '';

        if (!next_carrer_goals) {
            next_carrer_goals_Error = 'This Field is required.'
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
        if (dream_companies.length == 0) {
            dream_companiesError = 'This Field is required.';
        }
        // if (excited_topics.length == 0) {
        //     excited_topicsError = 'This Field is required.';
        // }
        if (!employment_opportunities) {
            employment_opportunitiesError = 'This Field is required.';
        }
        if (!is_prescrean_program) {
            is_prescrean_programError = 'This Field is required.';
        }


        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                next_carrer_goals: next_carrer_goals_Error,
                why_joined: why_joinedError,
                dream_roles: dream_rolesError,
                dream_industries: dream_industriesError,
                dream_companies: dream_companiesError,
                excited_topics: excited_topicsError,
                employment_opportunities: employment_opportunitiesError,
                is_prescrean_program: is_prescrean_programError,


            }
        }))
        if (next_carrer_goals_Error || why_joinedError || dream_rolesError || dream_industriesError || dream_companiesError || excited_topicsError || employment_opportunitiesError || is_prescrean_programError) {
            return true;
        }

        const job_loc = [];
        this.state.job_locations.forEach((item) => {
            job_loc.push(item.value);
        });

        const data = {
            next_carrer_goals: next_carrer_goals,
            why_joined: why_joined,
            dream_roles: dream_roles,
            dream_industries: dream_industries,
            dream_companies: dream_companies,
            excited_topics: excited_topics,
            employment_opportunities: employment_opportunities,
            is_prescrean_program: is_prescrean_program,
            job_locations: (job_loc)
        }
        let response = await ApiRequest.postRequest('/api/update-user-career-settings ', data);
        //  //debugger;
        if (response.data.statusCode === 200) {
            toastAlert('success', 'Request has been processed.');

        } else {
            toastAlert('error', 'Something went wrong');
        }


    }
    handleChange1 = (
        OnChangeValue,
        ActionMeta
    ) => {

        //console.group('Value Changed');
        // console.log(OnChangeValue);
        this.setState({ job_locations: OnChangeValue });
        //console.log('job_locations',this.state.job_locations)
    };
    // handleChange = (selectedOption,e) => {
    //     const  { name } = e;
    //     console.log('name', name);
    //     this.setState({ [name]: selectedOption }, () =>
    //         console.log(`Option selected:`, selectedOption)
    //     );
    // };

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
        // console.log(this.state.next_carrer_goals);
        return (

            <div>
                <Header />
                <section class="settings-page">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="settings-page-heading">
                                    <h2>Settings</h2>
                                    <p>Update your account, location / timezone, meeting preferences and communication settings here.</p>
                                </div>
                            </div>
                        </div>


                        <div class="row settings-row">
                            <div class="col-lg-3 col-md-12">
                                <div class="settings-tab">
                                    <ul class="nav nav-tabs">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="tab" href="#settings1">Account</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#settings2">Location & Timezone</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#settings3">Career Goals</a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-9 col-md-12">
                                <div class="settings-content">
                                    <div class="tab-content">
                                        <div id="settings1" class="tab-pane active">
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Account Email</label>
                                                        <div class="careerlabel">This is the email address you use to log into Candoor and cannot be changed.</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="input-group">
                                                            <div class="input-group-append">
                                                                <span class="input-group-text"><img src={settingsicon1} class="img-fluid" alt="" /></span>
                                                            </div>
                                                            <input disabled type="email" readonly class="form-control" name="currentemail" onChange={this.onChangeState} value={this.state.email} placeholder="currentemailaddress@company.com" />
                                                            <span className="error">{this.state.errors.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Meeting Email</label>
                                                        <div class="careerlabel">Change the email address that Candoor sends calendar invites to.</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="input-group">
                                                            <div class="input-group-append">
                                                                <span class="input-group-text"><img src={settingsicon1} class="img-fluid" alt="" /></span>
                                                            </div>
                                                            <input type="email" class="form-control" name="meeting_email" onChange={this.onChangeState} value={this.state.meeting_email} placeholder="meetingemailaddress@company.com" />
                                                            <span className="error">{this.state.errors.meeting_email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group pb-0">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Password</label>
                                                        <div class="careerlabel">Update your password.</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group-in">
                                                            <label>Current password</label>
                                                            <input type="password" name="current_password" onChange={this.onChangeState} value={this.state.current_password} class="form-control control-d" placeholder="••••••••" />
                                                            <span className="error">{this.state.errors.current_password}</span>
                                                        </div>
                                                        <div class="form-group-in">
                                                            <label>New password</label>
                                                            <input type="password" name="new_password" onChange={this.onChangeState} value={this.state.new_password} class="form-control control-d" placeholder="••••••••" />
                                                            <span className="error">{this.state.errors.new_password}</span>
                                                        </div>
                                                        <div class="form-group-in">
                                                            <label>Confirm new password</label>
                                                            <input type="password" name="confirm_new_password" onChange={this.onChangeState} value={this.state.confirm_new_password} class="form-control control-d" placeholder="••••••••" />
                                                            <span className="error">{this.state.errors.confirm_new_password}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-12 settings-btn">
                                                    <button type="button" class="btn btn-info grayb-btn">Cancel</button>
                                                    <button type="button" onClick={(e) => { this.addaccount(); }} class="btn btn-info">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="settings2" class="tab-pane fade">
                                            <div class="form-group pb-0">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Location</label>
                                                        <div class="careerlabel">Update your physical location.</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group-in">
                                                            <label>Country of Residence</label>
                                                            <select class="form-control control-d" id="sel1" name="country" onChange={this.onChangeState} value={this.state.country}>
                                                                {
                                                                    this.state.data1.countries.map((item, index) => (
                                                                        <option value={item.name}>{item.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <span className="error">{this.state.errors.country}</span>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group-in">
                                                                    <label>City</label>
                                                                    <input type="text" class="form-control control-d" placeholder="Boston" name="city" onChange={this.onChangeState} value={this.state.city} />
                                                                    <span className="error">{this.state.errors.city}</span>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group-in">
                                                                    <label>State (if USA)</label>
                                                                    <select class="form-control control-d" id="sel1" name="state" onChange={this.onChangeState} value={this.state.state}>
                                                                        {
                                                                            this.state.data1.states.map((item, index) => (
                                                                                <option value={item.name}>{item.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    <span className="error">{this.state.errors.state}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Timezone</label>
                                                        <div class="careerlabel">Update your timezone.</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="input-group">
                                                            <div class="input-group-append">
                                                                <span class="input-group-text"><img src={clock} class="img-fluid" alt="" /></span>
                                                            </div>
                                                            <select class="form-control control-d" id="sel1" name="time_zone" onChange={this.onChangeState} value={this.state.time_zone}>
                                                                <option selected>Select your timezone...</option>
                                                                {
                                                                    this.state.data1.timezones.map((item, index) => (
                                                                        <option value={item.name}>{item.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <span className="error">{this.state.errors.time_zone}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12 settings-btn">
                                                    <button type="button" class="btn btn-info grayb-btn">Cancel</button>
                                                    <button type="button" onClick={(e) => { this.updatelocation(); }} class="btn btn-info">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="settings3" class="tab-pane fade">
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Career Goals</label>
                                                        <div class="careerlabel">What are your career goals over the next 3-5 years?</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <textarea maxLength="500" class="form-control control-d" onChange={this.onChangeState} name="next_carrer_goals" value={this.state.next_carrer_goals} rows="4" id="comment" placeholder=""></textarea>
                                                        <div class="textlimit">({this.state.next_carrer_goals ? 500 - this.state.next_carrer_goals.length + "/500" : "500"}) characters remaining</div>
                                                        <span className="error">{this.state.errors.next_carrer_goals}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Candoor Goals</label>
                                                        <div class="careerlabel">How do you hope for Candoor to support you in achieving those goals?</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <textarea maxLength="500" name="why_joined" onChange={this.onChangeState} value={this.state.why_joined} class="form-control control-d" rows="4" id="comment" placeholder=""></textarea>
                                                        <div class="textlimit">({this.state.why_joined ? 500 - this.state.why_joined.length + "/500" : "500"}) characters remaining</div>
                                                        <span className="error">{this.state.errors.why_joined}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Dream Job</label>
                                                        <div class="careerlabel">Tell us about your dream job so we can recommend relevant Advisors, events, job opportunities and resources for you. The sky is the limit!</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group-in">
                                                            <label>My dream industries are...</label>
                                                            <div id="output"></div>
                                                            <Select classNamePrefix="react-select-custom" isMulti options={this.state.data2.industries} name="dream_industries" onChange={this.handleChange} value={this.state.dream_industries} placeholder="Select all that apply..." />
                                                            <span className="error">{this.state.errors.dream_industries}</span>
                                                        </div>
                                                        <div class="form-group-in">
                                                            <label>My dream companies are...</label>
                                                            <div id="output"></div>
                                                            {/* <span class="input-group-text"><img src={search} class="img-fluid" alt="" /></span> */}
                                                            <Select classNamePrefix="react-select-custom" isMulti options={this.state.data2.companies} name="dream_companies" onChange={this.handleChange} value={this.state.dream_companies} placeholder="Select all that apply..." />
                                                            <span className="error">{this.state.errors.dream_companies}</span>

                                                        </div>
                                                        <div class="form-group-in">
                                                            <label>My dream roles are...</label>
                                                            <div id="output"></div>
                                                            <Select classNamePrefix="react-select-custom" isMulti options={this.state.data2.work_roles} name="dream_roles" onChange={this.handleChange} value={this.state.dream_roles} placeholder="Select all that apply..." />
                                                            <span className="error">{this.state.errors.dream_roles}</span>
                                                        </div>
                                                        <div class="form-group-in">
                                                            <label>My preferred job locations are...</label>
                                                            <div id="output"></div>
                                                            <CreatableSelect
                                                                isMulti onChange={this.handleChange1}
                                                                value={this.state.job_locations ? this.state.job_locations : ""} name="job_locations"
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Job Search Status</label>
                                                        <div class="careerlabel">Are you actively looking for employment opportunities?</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <ul class="employment-type">
                                                            <li>
                                                                <div class="radio-d">
                                                                    {this.state.data2.employment_opportunities.map((item, index) => {
                                                                        return <div key={item[index]}><label class="form-check-label"> <input class="form-check-input" type="radio" id={'radio03-' + index} name="employment_opportunities" value={item} onChange={this.onChangeState} checked={this.state.employment_opportunities === item} />
                                                                            {item}</label></div>
                                                                    })}

                                                                </div>
                                                            </li>

                                                        </ul>
                                                        <span className="error">{this.state.errors.employment_opportunities}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Pre-Screening Program</label>
                                                        <div class="careerlabel">We will soon offer a <a href="#">Pre-Screening Program</a> where select Advisors can provide feedback to Advisees and act as a "human signal" to fast-track them to interviews with our partner companies. Would you like to opt in to this program when it becomes available?</div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <ul class="employment-type">
                                                            <li>
                                                                <div class="radio-d">
                                                                    <label class="form-check-label">
                                                                        <input value={1} name="is_prescrean_program" onChange={this.onChangeState} checked={this.state.is_prescrean_program == 1} type="radio" class="form-check-input" />Yes
                                                                    </label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="radio-d">
                                                                    <label class="form-check-label">
                                                                        <input value={0} name="is_prescrean_program" onChange={this.onChangeState} checked={this.state.is_prescrean_program == 0} type="radio" class="form-check-input" />No
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <span className="error">{this.state.errors.is_prescrean_program}</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12 settings-btn">
                                                    <button type="button" class="btn btn-info grayb-btn">Cancel</button>
                                                    <button type="button" onClick={(e) => { this.addcareergoal(); }} class="btn btn-info">Save</button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </section>
                <MainFooter />
            </div>
        )
    }
}

export default EditAdviseeSetting;