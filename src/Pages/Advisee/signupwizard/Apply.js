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
class Apply extends React.Component {
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
            here_about_us:[],
            advisee_apply:[]
        },


    }
    componentDidMount() {
        console.log('user' , this.user);
        this.getMainData();
    }
    onChangeState = (event) => {
        const { name, value, checked } = event.target;
        this.setState({ [name]: value })
    }

    onChangeCheckBox = (event) => {
       // //debugger;
        const { name,value, checked } = event.target;
        let options = this.state[name];
        if(checked){
            options.push(value);
        }
        else {
            options = options.filter(obj => obj != value);
        }
        this.setState({ [name]: options })
        console.log('this.state[name]', this.state[name]);
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
          data.advisee_apply = response.result.advisee;
            this.setState(() => ({data }));
            this.setInputFieldStates(response.result.advisee);
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

        if (belongs_to.length < 4) {
            belongs_toError = 'All checkboxes are required';
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
            how_hear_us : how_hear_us,
            referralCode : referralCode,
            belongs_to : belongs_to,
            is_prescrean_program : is_prescrean_program,
            signup : 1
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
    resetErrors(){
        this.setState(prevState=>({
            errors: {
                ...prevState.errors,
                next_carrer_goals: '',
                why_joined: '',
                dream_roles: '',
                dream_industries: '',
                dream_companies: '',
                excited_topics: '',
                employment_opportunities: '',
                is_prescrean_program:''
            }
        }))
    }
    setInputFieldStates(item = ''){
      //  //debugger;
        this.setState({
            how_hear_us:item? item.hear_about_us : '',
           referralCode:item? item.referral_code:'',
           
           belongs_to : item.apply_notes != null ? JSON.parse(item.apply_notes) : [],
        })
    }

    changeStep(position = 'next'){
        if (position == 'back')
        {
            history.push('/signupwizard/goals')
        }
        else
        {
            history.push('/signupwizard/applied')
        }
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
    render() {
        return (
            <div className={`row mar-width-0 mt-80 e  sevenStep NewStepThird__Wrapper`}>
                <div className="col-md-12 wizardlogoimg">
                    <img src={ShortLogo} alt=""/>
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>Apply to Candoor as an Advisee</h2>
                    <h6><span>Step 7:</span> Submit</h6>
                </div>


                <div className="col-md-12 form-inputs-">
                    <label htmlFor="">How did you hear about us?</label>
                    {console.log('hear',this.state.how_hear_us)}
                    <select className="form-select" aria-label="Default select example" name="how_hear_us" onChange={this.onChangeState}   value={this.state.how_hear_us}>
                    <option selected>Select ...</option>
                        {
                            this.state.data.here_about_us.map((item, index) => (
                                <option value={item}>{item}</option>
                            ))
                        }
                    </select>
                    <span className="error">{this.state.errors.how_hear_us}</span>
                </div>
                <div className="col-md-12 form-inputs-">
                    <label htmlFor="">Referral Code (Optional)</label>
                    <input type="text" className="form-control" name="referralCode" onChange={this.onChangeState}   value={this.state.referralCode} placeholder="Start typing..."/>
                </div>

                <div className="col-md-12 NewStepThird-p1">
                    <div className=" agreeWrap agreeWrap2 mt-0">
                        <label htmlFor="" className="label-custom-">Our Advisors are volunteering their time, so it is important that Advisees respect their commitments. If accepted to candoor as an Advisee, you commit to (please check all boxes)</label>

                        <div className="mt-2">
                          
                            <input  className="styled-checkbox" id="styled-checkbox-12" name="belongs_to" 
                             onChange={this.onChangeCheckBox}
                                   type="checkbox" checked={this.state.belongs_to ? this.state.belongs_to.includes("Sending a thank-you note to your Advisor after every conversation") : false} value="Sending a thank-you note to your Advisor after every conversation" />
                            <label htmlFor="styled-checkbox-12">
                                🙏🏿 Sending a thank-you note to your Advisor after every conversation
                            </label>
                        </div>
                        <div>
                            <input className="styled-checkbox" id="styled-checkbox-13" name="belongs_to"  onChange={this.onChangeCheckBox}
                                   type="checkbox" checked={this.state.belongs_to ? this.state.belongs_to.includes("Respecting the allotted meeting time and only rescheduling or cancelling in extenuating circumstances") : false} value="Respecting the allotted meeting time and only rescheduling or cancelling in extenuating circumstances"  />
                            <label htmlFor="styled-checkbox-13">
                                ⏰ Respecting the allotted meeting time and only rescheduling or cancelling in extenuating circumstances
                            </label>
                        </div>
                        <div>
                            <input className="styled-checkbox" id="styled-checkbox-14" name="belongs_to"  onChange={this.onChangeCheckBox}
                                   type="checkbox" checked={this.state.belongs_to ? this.state.belongs_to.includes("Following up with Advisors about any commitments made during your conversations") : false} value="Following up with Advisors about any commitments made during your conversations" />
                            <label htmlFor="styled-checkbox-14">
                                💬 Following up with Advisors about any commitments made during your conversations
                            </label>
                        </div>
                        <div>
                            <input className="styled-checkbox" id="styled-checkbox-15" name="belongs_to"  onChange={this.onChangeCheckBox}
                                   type="checkbox"  checked={this.state.belongs_to ? this.state.belongs_to.includes("Updating Advisors to share your progress and accomplishments so they can follow your journey and remain invested in your success") : false} value="Updating Advisors to share your progress and accomplishments so they can follow your journey and remain invested in your success" />
                            <label htmlFor="styled-checkbox-15">
                                🔁 Updating Advisors to share your progress and accomplishments so they can follow your journey and remain invested in your success
                            </label>
                        </div>
                    </div>
                    <span className="error">{this.state.errors.belongs_to}</span>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-back-" onClick={(e) => {
                        e.preventDefault();
                        this.changeStep('back');
                    }}>Back</button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-continue-" id="step_eight" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.add();
                    }}>Continue</button>
                </div>
            </div>
        );
    }
}

export default Apply;
