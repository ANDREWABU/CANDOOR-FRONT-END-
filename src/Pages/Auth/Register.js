// import React from 'react'
// import logo from "../../assets/images/logo1.png";
// import Gpic from "../../assets/images/gPic.png";
// import { Link } from "react-router-dom";
// import Axios from "../../Config/Axios";
// import Redirect from "../../Utils/history";
// import GoogleLogin from 'react-google-login';
// import { toasterAlert as toastAlert, setSession, isAuthenticated } from "../../Helpers/Functions";
// import userAuthenicated from '../../Services/auth.service'
// import { addUser } from "../../app/Actions"
// import { connect } from "react-redux";
// import Header from "../../Components/Layouts/AuthLayout/Header"


// function mapDispatchToProps(dispatch) {
//     return {
//         addUser: detail => dispatch(addUser(detail))
//     };
// }


// class UserRegister extends React.Component {


//     state = {
//         firstName: '', lastName: '', email: '', password: '', passwordConfirmation: '', loading: false,
//         errors: {
//             firstName: '', lastName: '', email: '', password: '', passwordConfirmation: ''
//         }
//     };

//     componentDidMount() {
//         console.log(this.props)
//         if (isAuthenticated()) {
//             window.location.href = `/`;
//         }
//     }


//     onChangeState = (event) => {
//         const { name, value } = event.target;
//         this.setState({ [name]: value })
//         if(name == 'email'){
//             let email = value
//             Axios.post(`/emailCheck`, { email }).then(response => {
//                 if(response && response.status === 200){
//                     this.setState(prevState => ({
//                         errors:{
//                             ...prevState.error,
//                             email: ''
//                         }
//                     }))
//                 }
//                 console.log(response);
//             }).catch(error => {
//                 if(error && error.response){
//                     this.setState(prevState => ({
//                         errors:{
//                             ...prevState.error,
//                             email: error.response.data.errors.email
//                         }
//                     }))
//                 }
//             });
//         }
//     }
//     responseGoogle = (response) => {
//         console.log(response.accessToken);
//         // Google Access Token
//         Axios.get('/callback?authToken=' + response.accessToken).then(response => {
//             // Authenticated Service
//             userAuthenicated.userAuthResponseHandler(response);
//         }).catch(error => {
//             // if(!error.response.data.errors?.outcome_id )

//             // toastAlert('error', 'Authentication Failed!')
//             //
//             // return error.response
//         }).finally(() => {
//             this.setState({ loading: false });
//         });
//     }
//     mentorForm = () => {

//     }
//     register = () => {
//         const { firstName, lastName, email, password, passwordConfirmation } = this.state;
//         let { firstNameError, lastNameError, emailError, passwordError, passwordConfirmationError } = '';

//         if (!firstName) {
//             firstNameError = "First Name is required";
//         }

//         if (!lastName) {
//             lastNameError = "Last name is required";
//         }

//         if (!email && !this.state.errors.email) {
//             emailError = "Email is required";
//             this.setState(prevState => ({
//                 errors:{
//                     ...prevState.error,
//                     email: emailError
//                 }
//             }))
//         }

//         if (!password) {
//             passwordError = "Password is required";
//         }

//         if (!passwordConfirmation) {
//             passwordConfirmationError = "Password confirmation is required";
//         } else if (password != passwordConfirmation) {
//             passwordConfirmationError = "Password Mismatch";
//         }



//         this.setState(prevState=>({
//             errors: {
//                 ...prevState.errors,
//                 firstName: firstNameError,
//                 lastName: lastNameError,
//                 password: passwordError,
//                 passwordConfirmation: passwordConfirmationError,
//             }
//         }))
//         if (firstNameError || lastNameError || emailError || passwordError || passwordConfirmationError) {
//             return true;
//         }
//         if(this.state.errors.email){
//             return true;
//         }
//         this.setState({ loading: true });
//         const data = {
//             first_name: firstName,
//             last_name: lastName,
//             email: email,
//             password: password,
//             password_confirmation: passwordConfirmation,
//             type: 'Mentee'
//         }
//         Axios.post(`/register`, data).then(response => {
//             console.log(response.data, 'save data')
//             if (response.status === 200) {
//                 // console.log(response);
//                 userAuthenicated.userAuthResponseHandler(response);
//                 localStorage.setItem('RegisterEmail', response.data.user[0].email);
//                 this.props.addUser(response.data.user[0])

//                 // setSession(response.data);
//                 // Redirect.push(`/GetStarted`);
//                 // if(response.data.message !== 'plan added' && response.data.message !== 'plan updated' && response.data.message !== '')
//                 //     toastAlert('success', response.data.message)
//             }
//             else {
//                 // if (response.data.message)
//                 // toastAlert('error', response.data.message)
//             }
//         }).catch(error => {
//             console.log(error, 'error data')
//             // if(!error.response.data.errors?.outcome_id )

//             toastAlert('error', error)
//             //
//             // return error.response
//         }).finally(() => {
//             this.setState({ loading: false });
//         });

//         // Axios.post('https://reqres.in/api/articles', {email,password} )
//         //     .then(response => console.log(response));
//     }
//     render() {
//         return (
//             <>
//                 <div className="container-fluid login-wrapper">
//                     <Header />
//                     <div className="row mar-width-0 width-wrap pt-5">
//                         <div className="col-md-12 text-center pt-2 ">
//                             {/* <Link to="/"> <img src={logo} alt="" /></Link> */}
//                         </div>
//                         <div className="col-md-12 login-heading">
//                             <p className="font-family">Make the most of your professional life</p>
//                         </div>

//                         <div className="row mar-width-0 form-bg">
//                             <div className="col-md-12 p-0">
//                                 <h3 className="font-family lo-title">SignUp</h3>
//                             </div>
//                             <div className="col-md-12 form-wrap p-0">
//                                 <form className="w-100">
//                                     <div className="row mar-width-0">
//                                         <div className="col-md-6 pl-0">
//                                             <div className="form-group">
//                                                 <label htmlFor="exampleInputEmail11">First name <span>*</span></label>
//                                                 <input type="text" name="firstName" onChange={this.onChangeState} value={this.state.firstName} className="form-control" id="exampleInputEmail11"
//                                                 />
//                                                 <span className="error">{this.state.errors.firstName}</span>
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6 pr-0">
//                                             <div className="form-group">
//                                                 <label htmlFor="exampleInputEmail12">Last name <span>*</span></label>
//                                                 <input type="text" name="lastName" onChange={this.onChangeState} value={this.state.lastName} className="form-control" id="exampleInputEmail12"
//                                                 />
//                                                 <span className="error">{this.state.errors.lastName}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="exampleInputEmail1">Email <span>*</span></label>
//                                         <input type="email" name="email" onChange={this.onChangeState} value={this.state.email} className="form-control" id="exampleInputEmail1"
//                                         />
//                                         <span className="error">{this.state.errors.email}</span>
//                                     </div>

//                                     <div className="form-group">
//                                         <label htmlFor="passwordInput1">Password</label>
//                                         <input type="password" name="password" onChange={this.onChangeState} value={this.state.password} className="form-control" id="passwordInput1" />
//                                         <span className="error">{this.state.errors.password}</span>
//                                     </div>

//                                     <div className="form-group">
//                                         <label htmlFor="passwordInput2">Confirm Password </label>
//                                         <input type="password" name="passwordConfirmation" onChange={this.onChangeState} value={this.state.passwordConfirmation} className="form-control" id="passwordInput2" />
//                                         <span className="error">{this.state.errors.passwordConfirmation}</span>
//                                     </div>

//                                     <div className="col-md-12 bottom-wrap pb-0">
//                                         <span>By clicking Agree & Join, you agree to the LinkedIn
//                                             <Link to="#"> User Agreement,</Link>
//                                             <Link to="#">  Privacy Policy,</Link>  and
//                                             <Link to="#"> Cookie Policy.</Link>
//                                         </span>


//                                     </div>
//                                     <button type="button" disabled={this.state.loading} onClick={this.register} className="btn btn-primary btnLogin">Agree and Join</button>
//                                 </form>
//                             </div>
//                             <div className="col-md-12 or-wrap">
//                                 <h2 className="h2_2"><span>or</span></h2>
//                             </div>
//                             <div className="col-md-12 p-0">
//                                 <GoogleLogin
//                                     clientId="340365300393-1ma31t11b7akqn61tsbpt8h0g9e134a7.apps.googleusercontent.com"
//                                     render={renderProps => (
//                                         <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-primary btnGoogle"><img className="gpic" src={Gpic} alt="" /> Join with Google</button>
//                                     )}
//                                     buttonText="Login"
//                                     onSuccess={this.responseGoogle}
//                                     onFailure={this.responseGoogle}
//                                     cookiePolicy={'single_host_origin'}
//                                 />

//                             </div>

//                             <div className="col-md-12 bottom-wrap2 p-0">
//                                 <span>Already on CANDOOR?</span> &nbsp;
//                                 <Link to="/login" className="">Sign In</Link>

//                             </div>
//                         </div>


//                     </div>
//                 </div>
//             </>
//         )
//     }
// }
// const Register = connect(null, mapDispatchToProps)(UserRegister)

// export default Register
