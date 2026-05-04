import react from 'react';
import myprofile from "../../../assets/images/myprofile.png";
import upload from "../../../assets/images/upload.png";
import Header from "../../../Components/Layouts/AdvisorLayout/Header";
import settingsicon1 from "../../../assets/images/settingsicon1.png";
import del from "../../../assets/images/delete.png";
import add from "../../../assets/images/add.png";
import clock from "../../../assets/images/clock.png";
import { destroySession, toasterAlert as toastAlert } from '../../../Helpers/Functions';
import ApiRequest from "../../../Services/ApiRequest";
import Select from "react-select";
import MainFooter from "../../../Components/Layouts/MainFooter";
class EditAdvisorSetting extends react.Component {
  state = {
    meeting_email: "", current_password: "", new_password: "", confirm_new_password: "",
    Userservices: [{ meeting_type: "", time: "" }],
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
      MeetingTypes: [],
      Userservices: [],
      prescreening: '',

    },
    data3: {

      HiringStatus: '',

    },
  }
  componentDidMount() {
    this.getMainData1();
  }
  getMainData1 = async () => {
    let response = await ApiRequest.getRequest('/api/setting-account');
    let response1 = await ApiRequest.getRequest('/api/location-timezone');
    let response2 = await ApiRequest.getRequest('/api/setting-preferences');
    let response3 = await ApiRequest.getRequest('/api/get-hiring-status');
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
    //  Userservices = this.selectOptions(response2.Data.Userservices);
    let data2 = this.state.data2;
    if (response2.Data) {
      // //debugger;
      data2.MeetingTypes = this.selectOptions(response2.Data.MeetingTypes);
      //    data2.Userservices = this.selectOptions(response2.Data.Userservices);
      data2.prescreening = response2.Data.prescreening;

      this.setState(() => ({ data2 }));

      // let Userservices = this.state.data;
      console.log(response2)
      let userser = [];
      response2.Data.Userservices.forEach((item) => {
        userser.push({ meeting_type: item.meeting_type, time: item.time, id: item.id, is_active: item.is_active })
      });
      console.log(userser)
      this.setState({
        Userservices: userser
      })
      this.setInputFieldStates(response2.Data.prescreening);


    }
    response3 = response3.data;

    let data3 = this.state.data3;
    if (response3.HiringStatus !== '') {


      data3.HiringStatus = response3.HiringStatus;

      this.setState(() => ({ data3 }));
      this.setInputFieldStates3(response3.HiringStatus);


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
    // //debugger;
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
    this.setState({
      availability_time: item ? item.availability_time : '',
      // offer_meeting_each_month: item ? item.offer_meeting_each_month : '',
      monthly_capacity: item ? item.monthly_capacity : '',
      prescreening_program_opt_in: item ? item.prescreening_program_opt_in : '',


    })
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
  setInputFieldStates3(item = '') {
    this.setState({
      hiringstatus: item ? item : '',
    })
  }

  addaccount = async () => {

    const { meeting_email, current_password, new_password, confirm_new_password } = this.state;

    let { meeting_email_error, current_password_error, new_password_error, confirm_password_error } = '';

    //Attempting to reset password
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
      meeting_email: meeting_email ? meeting_email : '',
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
  addsettingprefrence = async () => {

    console.log('m', this.state.Userservices);

    const meet_list = [];
    const time_list = [];
    const service_id = [];
    const action_type = []
    this.state.Userservices.forEach((item) => {
      meet_list.push(item.meeting_type);
      time_list.push(item.time);
    });
    const { availability_time, monthly_capacity, prescreening_program_opt_in } = this.state;

    let { availability_time_error, monthly_capacity_error, prescreening_program_opt_in_error } = '';

    if (!availability_time) {
      availability_time_error = 'This Field is required.'

    }
    if (!monthly_capacity) {
      monthly_capacity_error = 'This Field is required.'

    }
    if (!prescreening_program_opt_in) {
      prescreening_program_opt_in_error = 'This Field is required.'

    }

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        availability_time: availability_time_error,
        monthly_capacity: monthly_capacity_error,
        prescreening_program_opt_in: prescreening_program_opt_in_error,
        //  meeting_type: meeting_type_error,
      }
    }))
    // if ((availability_time_error) || (offer_meeting_each_month_error) || (prescreening_program_opt_in_error)) {
    //   return true;
    // }

    const data = {
      monthly_capacity: monthly_capacity,
      availability_time: availability_time,
      prescreening_program_opt_in: prescreening_program_opt_in,
      meeting_type: meet_list,
      time: time_list,

      // meeting_type: JSON.stringify(meet_list),
      // time: JSON.stringify(time_list),
    }
    let response = await ApiRequest.postRequest('/api/update-setting-preferences ', data);
    //  //debugger;
    if (response.data.statusCode === 200) {
      toastAlert('success', 'Request has been processed.');

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
  addhiringstatus = async () => {

    const { hiringstatus } = this.state;
    let { hiringstatus_error } = '';

    if (!hiringstatus) {
      hiringstatus_error = 'This Field is required.'
    }

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        hiringstatus: hiringstatus_error,

      }
    }))
    if (hiringstatus_error) {
      return true;
    }

    const data = {
      actively_hiring: hiringstatus
    }
    let response = await ApiRequest.postRequest('/api/update-hiring-status', data);
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
    this.setState({ job_locations: OnChangeValue });

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

  addFormFields() {
    console.log(this.state.Userservices)

    this.setState({
      Userservices: [...this.state.Userservices, { meeting_type: "Career Advice (Advancement)", time: 30 }]
    })
    console.log('us', this.state.Userservices);
  }
  removeFormFields(i) {

    let Userservices = this.state.Userservices;
    // Userservices[i].is_active = 0
    Userservices.splice(i, 1);
    this.setState({ Userservices });
    console.log(Userservices)
  }
  handleChange2(i, e) {
    // //debugger
    let Userservices = this.state.Userservices;
    Userservices[i][e.target.name] = e.target.value;
    this.setState({ Userservices });
  }
  render() {
    const mt = this.state.Userservices;
    //  //debugger;
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
                      <a class="nav-link" data-toggle="tab" href="#settings3">Meeting Preferences</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#settings4">Hiring Status</a>
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
                            <div class="careerlabel">Change the email address you use to log into Candoor.</div>
                          </div>
                          <div class="col-md-8">
                            <div class="input-group">
                              <div class="input-group-append">
                                <span class="input-group-text"><img src={settingsicon1} class="img-fluid" alt="" /></span>
                              </div>
                              <input type="email" disabled={true} readonly class="form-control" name="currentemail" onChange={this.onChangeState} value={this.state.email} placeholder="currentemailaddress@company.com" />
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
                            <label>Capacity</label>
                            <div class="careerlabel">How many meetings can you offer as an Advisor each month?</div>
                          </div>
                          <div class="col-md-8">
                            <input type="text" class="form-control control-d" name="monthly_capacity" onChange={this.onChangeState} value={this.state.monthly_capacity} placeholder="2" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="row">
                          <div class="col-md-4">
                            <label>Meeting Types</label>
                            <div class="careerlabel">Select which meeting types you’ll offer and set a default meeting length for each. Advisees will be able to search for you via these services in the Advisor Directory.</div>
                          </div>
                          <div class="col-md-8">
                            <div class="preferences-box">
                              {this.state.Userservices.map((element, index) =>

                                <div class="row preferencesrow">
                                  <div class="col-md-7">
                                    <div class="input-group">
                                      <div class="input-group-prepend">
                                        <span class="input-group-text"><i data-toggle="tooltip" data-placement="top" title="" class="fa fa-question-circle-o" aria-hidden="true" data-original-title="Hooray!"></i></span>
                                      </div>
                                      <select class="form-control control-d" name="meeting_type" onChange={e => this.handleChange2(index, e)} value={element.meeting_type}>


                                        {
                                          this.state.data2.MeetingTypes.map((item, index) => (
                                            <option value={item.value}>{item.label}</option>
                                          ))
                                        }


                                      </select>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="input-group">
                                      <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
                                      </div>
                                      <select class="form-control" name="time" onChange={e => this.handleChange2(index, e)} id="sel1" value={element.time}>
                                        <option value="30">30 minutes</option>
                                        <option value="45">45 minutes</option>
                                        <option value="60">60 minutes</option>
                                        <option value="90">90 minutes</option>

                                      </select>
                                    </div>
                                  </div>
                                  <div class="col-md-1">
                                    <div class="delete-icon">
                                      <a href="#" onClick={() => this.removeFormFields(index)}><img src={del} class="img-fluid" alt="" /></a>
                                    </div>
                                  </div>
                                </div>


                              )

                              }

                              <div class="row">
                                <div class="col-md-12">
                                  <div class="add-service">
                                    <a href="#" onClick={() => this.addFormFields()} id="add_service"><img src={add} class="img-fluid" alt="" />Add Service</a>
                                  </div>
                                </div>
                              </div>

                            </div>
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
                                    <input type="radio" class="form-check-input" value="1" name="prescreening_program_opt_in" onChange={this.onChangeState} checked={this.state.prescreening_program_opt_in == 1} />Yes
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div class="radio-d">
                                  <label class="form-check-label">
                                    <input type="radio" class="form-check-input" value="0" name="prescreening_program_opt_in" onChange={this.onChangeState} checked={this.state.prescreening_program_opt_in == 0} />No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="row">
                          <div class="col-md-4">
                            <label>Availability</label>
                            <div class="careerlabel">Let Advisees know when you’re generally free each week. The more timeslots you offer, the fewer back-and-forths are needed to align on a meeting time. You’ll have the final say before accepting any meeting request.</div>
                          </div>
                          <div class="col-md-8">
                            <div class="advisor-availability">
                              <div class="form-group-in">
                                <label>When are you generally free each week?</label>
                                <textarea class="form-control control-d" rows="4" id="comment" value={this.state.availability_time} name="availability_time" onChange={this.onChangeState} placeholder="Weekdays between 9am - 5pm and Weekends between 10am - 2pm (Pacific Time)"></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 settings-btn">
                          <button type="button" class="btn btn-info grayb-btn">Cancel</button>
                          <button type="button" onClick={(e) => { this.addsettingprefrence(); }} class="btn btn-info">Save</button>
                        </div>
                      </div>

                    </div>
                    <div id="settings4" class="tab-pane fade">
                      <div class="form-group">
                        <div class="row">
                          <div class="col-md-4">
                            <label>Hiring Status</label>
                            <div class="careerlabel">Are you actively hiring — now or in the future? If so, we’ll keep you posted on the latest initiatives to help you connect with relevant candidates.</div>
                          </div>
                          <div class="col-md-8">
                            <ul class="employment-type">
                              <li>
                                <div class="radio-d">
                                  <label class="form-check-label">
                                    <input type="radio" checked={this.state.hiringstatus == 1} class="form-check-input" onChange={this.onChangeState} value="1" name="hiringstatus" />Yes
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div class="radio-d">
                                  <label class="form-check-label">
                                    <input type="radio" checked={this.state.hiringstatus == 0} class="form-check-input" onChange={this.onChangeState} value="0" name="hiringstatus" />No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 settings-btn">
                          <button type="button" class="btn btn-info grayb-btn">Cancel</button>
                          <button type="button" onClick={(e) => { this.addhiringstatus(); }} class="btn btn-info">Save</button>
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

export default EditAdvisorSetting;