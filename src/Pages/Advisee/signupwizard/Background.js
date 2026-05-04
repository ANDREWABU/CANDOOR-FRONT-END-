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
import Select from 'react-select';

class Background extends React.Component {
    state = {
        modelType: '', educationId: '',
        country: '', city: '', state: '', time_zone: '', gender: '', race: [], belongs_to: [], extra_info: '', loading: false, gender_checked: -1, belongs_to_checked: -1,
        errors: {
            country: '', city: '', state: '', time_zone: '', gender: '', race: [], belongs_to: [], extra_info: '', loading: false,
        },
        data: {
            work_experiences: [],
            countries: [],
            usa_states: [],
            timezones: [],
            race_ethnicities: [],
            gender: [],
            identity: []
        },


    }
    componentDidMount() {
        this.getMainData();
    }
    onChangeState = (event) => {
        const { name, value, checked, id } = event.target;
        this.setState({ [name]: value })
        if (name == 'gender') {

            const splitId = id.split("-");
            console.log(splitId);
            const actualId = parseInt(splitId[1]);

            this.setState({ gender_checked: actualId });
        }
    }
    onChangeStateBelongsTo = (event) => {
        const { name, value, checked, id } = event.target;

        let options = this.state.belongs_to;
        options.forEach(item => {
            if (item.name === value) {
                item.checked = checked;
            }
        })
        console.log(options);
        this.setState({ belongs_to: options });
    }
    getMainData = async () => {
        let response = await ApiRequest.getRequest('/api/get-background-data');
        response = response.data;
        let data = this.state.data;
        if (response.result) {
            data.countries = response.result.countries;
            data.usa_states = response.result.usa_states;
            data.timezones = response.result.timezones;
            data.work_roles = response.result.work_roles;
            data.gender = response.result.gender;
            data.identity = response.result.identity;
            data.race_ethnicities = this.racesSelectOptions(response.result.race_ethnicities);

            this.edit(response.result.user_background)

            this.setState(() => ({ data }));

            if (data.identity.length > 0 && response.result.user_background === null) {
                const identity_belongto = [];
                data.identity.forEach((item, index) => {
                    let identity = { 'name': item, 'checked': false };
                    identity_belongto.push(identity);
                });
                this.setState({ belongs_to: identity_belongto });
            }
            // console.log('belongto', this.state.belongs_to);
        }

    }
    add = async () => {
        //debugger;
        const { country, city, state, time_zone, gender, race, belongs_to, extra_info } = this.state;
        let { countryError, cityError, time_zoneError, genderError, raceError, belongs_toError, extra_infoError } = '';

        if (!country) {
            countryError = 'This Field is required.'
        }

        if (!city) {
            cityError = 'This Field is required.';
        }
        if (!time_zone) {
            time_zoneError = 'This Field is required.';
        }
        if (!gender) {
            genderError = 'This Field is required.';
        }
        if (race.length == 0) {
            raceError = 'This Field is required.';
        }
        if (belongs_to.length == 0) {
            belongs_toError = 'This Field is required.';
        }

        var thestate = this.state.state
        if(thestate === 'Select your state...'){
            thestate = 'NULL'
        }
        // if (!extra_info) {
        //     extra_infoError = 'This Field is required.';
        // }

        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                country: countryError,
                city: cityError,
                time_zone: time_zoneError,
                gender: genderError,
                race: raceError,
                belongs_to: belongs_toError,
                extra_info: extra_infoError
            }
        }))
        if (cityError || time_zoneError || genderError || raceError || belongs_toError || countryError) {
            console.log('error', this.state.errors);
            return true;
        }
        this.setState({ loading: true });
        const data = {
            country: country,
            city: city,
            state: thestate,
            time_zone: time_zone,
            gender: gender,
            race: race,
            belongs_to: belongs_to,
            extra_info: extra_info
        }
        let response = await ApiRequest.postRequest('/api/add-user-background', data);

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
                title: '',
                company: '',
                industry: '',
                role: '',
                employment_type: '',
                // ask_me_about: '',
                // is_current: '',
                start_date: '',
                end_date: ''
            }
        }))
    }
    setInputFieldStates(item = '') {
        //  //debugger;
        this.setState({
            country: item ? item.country : '',
            city: item ? item.city : '',
            state: item ? item.state : '',
            time_zone: item ? item.time_zone : '',
            gender: item ? item.gender : '',
            race: item ? JSON.parse(item.race) : [],
            belongs_to: item ? JSON.parse(item.belongs_to) : [],
            extra_info: item ? item.extra_info : ''

        })
    }
    edit(item) {
        this.setInputFieldStates(item);
        this.resetErrors();
    }
    changeStep(position = 'next') {
        if (position == 'back') {
            history.push('/signupwizard/workExperience')
        }
        else {
            history.push('/signupwizard/goals')
        }
    }
    handleRceChange = (selectedOption) => {
        this.setState({ race: selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };
    racesSelectOptions = (race_ethnicities) => {
        let options = [];
        race_ethnicities.map(el => {
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
            <div className={`row mar-width-0 mt-80  fifthStep NewStepThird__Wrapper`}>
                <div className="col-md-12 wizardlogoimg">
                    <img src={ShortLogo} alt="" />
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>Apply to Candoor as an Advisee</h2>
                    <h6><span>Step 5:</span> Tell us about your background</h6>
                </div>
                <div className="col-md-12 form-inputs-">
                    <label htmlFor="">Country of Residence</label>

                    <select className="form-select" aria-label="Default select example" name="country" onChange={this.onChangeState}    value={this.state.country}>
                        <option selected>Select your country...</option>
                        {
                            this.state.data.countries.map((item, index) => (
                                <option value={item.name}>{item.name}</option>
                            ))
                        }
                    </select>


{/* 
                    {this.state.country ?
                        <select className="form-select" aria-label="Default select example" name="country" onChange={this.onChangeState} value={this.state.country}>

                            <option selected>Select your country...</option>
                            {
                                this.state.data.countries.map((item, index) => (
                                    <option value={item.name}>{item.name}</option>
                                ))
                            }
                        </select>
                        :
                        <select className="form-select" aria-label="Default select example" name="country" onChange={this.onChangeState} value="United States">

                            <option selected>Select your country...</option>
                            {
                                this.state.data.countries.map((item, index) => (
                                    <option value={item.name}>{item.name}</option>
                                ))
                            }
                        </select>
                    } */}
                    <span className="error">{this.state.errors.country}</span>
                </div>
                <div className="col-md-6 form-inputs-">
                    <label htmlFor="">City</label>
                    <input type="text" className="form-control" name="city" onChange={this.onChangeState} value={this.state.city} placeholder="Type your city..." />
                    <span className="error">{this.state.errors.city}</span>
                </div>

                <div className="col-md-6 form-inputs-">
                    <label htmlFor="">State (if USA)</label>
                    <select className="form-select" aria-label="Default select example" name="state" onChange={this.onChangeState} value={this.state.state}>
                        <option selected>Select your state...</option>
                        {
                            this.state.data.usa_states.map((item, index) => (
                                <option value={item.name}>{item.name}</option>
                            ))
                        }
                    </select>
                    <span className="error">{this.state.errors.state}</span>
                </div>
                <div className="col-md-12 form-inputs-">
                    <label htmlFor="" className="label-custom-">What timezone are you based out of?</label>
                    <select className="form-select" aria-label="Default select example" name="time_zone" onChange={this.onChangeState} value={this.state.time_zone}>
                        <option selected>Select your timezone...</option>
                        {
                            this.state.data.timezones.map((item, index) => (
                                <option value={item.name}>{item.name}</option>
                            ))
                        }
                    </select>
                    <span className="error">{this.state.errors.time_zone}</span>
                </div>
                <div className="col-md-12 NewStepThird-p1">
                    <div className=" agreeWrap mt-0">
                        <label htmlFor="" className="label-custom-">What is your gender identity?</label>
                        <div className="custom02 d-block">
                            {/* <input type="radio" id="radio03-011" name="gender" value="Female" onChange={this.onChangeState}  checked={this.state.gender === "Female"}/><label
                            htmlFor="radio03-011">Female</label>
                            <input type="radio" id="radio03-021" name="gender" value="Male" onChange={this.onChangeState}  
                            checked={this.state.gender === "Male"}/><label
                            htmlFor="radio03-021">Male</label>
                            <input type="radio" id="radio03-031" name="gender" value="Non-binary" onChange={this.onChangeState}  checked={this.state.gender === "Non-binary"}/><label
                            htmlFor="radio03-031">Non-binary</label>
                            <input type="radio" id="radio03-041" name="gender" value="Prefer not to answer" onChange={this.onChangeState}  checked={this.state.gender === "Prefer not to answer"}/><label
                            htmlFor="radio03-041">Prefer not to answer</label> */}
                            {this.state.data.gender.map((item, index) => {
                                return <div key={item[index]}><input type="radio" id={'radio03-' + index}
                                    name="gender" value={item} onChange={this.onChangeState}
                                    checked={this.state.gender === item ? 'checked' : ''} />
                                    <label htmlFor={'radio03-' + index}>{item}</label></div>
                            })}
                        </div>
                    </div>
                    <span className="error">{this.state.errors.gender}</span>

                </div>
                <div className="col-md-12 form-inputs-">
                    <label htmlFor="">What is your race / ethnicity? (Select all that apply)</label>
                    <Select classNamePrefix="react-select-custom" isMulti options={this.state.data.race_ethnicities} onChange={this.handleRceChange} value={this.state.race} />
                    <span className="error">{this.state.errors.race}</span>
                </div>
                <div className="col-md-12 NewStepThird-p1">
                    <div className=" agreeWrap agreeWrap2 mt-0">
                        <label htmlFor="" className="label-custom-">I am... (Select all that apply)</label>
                        <div className="mt-2">
                            {this.state.belongs_to.map((item, index) => {
                                return <div key={index}><input className="styled-checkbox" type="checkbox"
                                    id={'styled-checkbox-' + index} name="belongs_to" value={item.name}
                                    onChange={this.onChangeStateBelongsTo} checked={item.checked} />
                                    <label htmlFor={'styled-checkbox-' + index}>{item.name}</label></div>
                            })}
                        </div>
                    </div>
                    <span className="error">{this.state.errors.belongs_to}</span>
                </div>

                <div className="col-md-12 NewStepThird-p1">
                    <div className=" agreeWrap agreeWrap2 mt-0">
                        <label htmlFor="" className="label-custom-">(Optional)  Candoor was created to help candidates who traditionally have lacked access to professional networks and opportunities.
                            Briefly explain any individual challenges and/or financial hardship you have faced or will face in seeking career opportunities and your potential to succeed.</label>
                    </div>
                </div>
                <div className="col-md-12 NewStepThird-p1">
                    <textarea maxLength="300" id="" placeholder="Type your answer..." name="extra_info" value={this.state.extra_info} onChange={this.onChangeState}></textarea>
                    <p className="text-right min-words">({this.state.extra_info ? 300 - this.state.extra_info.length + "/300" : "300"}) characters remaining</p>
                    <span className="error">{this.state.errors.extra_info}</span>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-back-" id="step_four" onClick={(e) => {
                        e.preventDefault();
                        this.changeStep('back');
                    }}>Back</button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-continue-" id="step_six" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.add();
                    }}>Continue</button>
                </div>
            </div>
        );
    }
}

export default Background;
