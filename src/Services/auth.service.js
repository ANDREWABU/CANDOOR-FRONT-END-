import React from "react";
import axios from "axios";
import { toasterAlert as toastAlert, setSession, isAuthenticated, getToken, getSession } from "../Helpers/Functions";
import Redirect from "../Utils/history";
import store from "../app/store"
import { UserRedirect,UserRedirectRoute } from "./RouteGuard";



const API_URL = "http://localhost:8080/api/auth/";

class AuthService extends React.Component {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  userAuthResponseHandler(response) {
    if (response.status === 200) {
      setSession(response.data);
      let token = axios.defaults.headers.common['Authorization'] = getToken()
      // if (response.data.user.email_verified) {
      //   Redirect.push('/signupwizard/education');
      //   // UserRedirectRoute(response.data.user[0]);
      // } else {
      //   Redirect.push('/signupwizard/emailVerificationPending');
      // }

      // if(response.data.message !== 'plan added' && response.data.message !== 'plan updated' && response.data.message !== '')
      //     toastAlert('success', response.data.message)
    }
    else {
      // if (response.data.message)
      toastAlert('error', 'Authentication Failed!')
    }
  }
  userRedirectHandler(response) {
    if (response.status === 200) {
      axios.defaults.headers.common['Authorization'] = getToken()
      console.log('response.data.user.user_roles[0]',response.data.user.user_roles[0]);
      if (response.data.user.email_verified) {
        if (response.data.user.user_roles.length !== 0) {
            if (response.data.user.user_roles.length !== 0 && response.data.user.user_roles[0] == 'Advisor') {
              Redirect.push('/signupwizard/education');
            } else if (response.data.user.user_roles.length !== 0 && response.data.user.user_roles[0] == 'Advisee') {
              Redirect.push('/signupwizard/education');
            } else {
              toastAlert('error', 'Access denied!')
            }

        } else {
          // Redirect.push(`/GetStarted`);
          // Redirect.push('/GetStarted');
        }
      } else {
        Redirect.push('/signupwizard/emailVerificationpending');
      }
      // if (response.data.user) {
      //   if (response.data.user[0].roles.length !== 0 && response.data.user[0].roles[0].name == 'Mentor') {
      //     Redirect.push('/MentorProfile');
      //   } else if (response.data.user[0].roles.length !== 0 && response.data.user[0].roles[0].name == 'Mentee') {
      //     Redirect.push('/MenteeProfile');
      //   } else {
      //     toastAlert('error', 'Access denied!')
      //   }
      // } else {
      //   // Redirect.push(`/GetStarted`);
      //   Redirect.push('/GetStarted');
      // }

      // if(response.data.message !== 'plan added' && response.data.message !== 'plan updated' && response.data.message !== '')
      //     toastAlert('success', response.data.message)
    }
    else {
      // if (response.data.message)
      toastAlert('error', 'Authentication Failed!')
    }
  }

  userVerified() {
    const session = getSession();
    console.log(session)
    if (session.__userDetail && session.__userDetail.email_verified) {
      return true
    } else {
      return false
    }
  }
  verifiedUserRedirect() {
    // if (this.userVerified()) {
    //   const session = getSession();
    //   switch(session.__userDetail.roles[0].name){
    //     case "Mentor":
    //       Redirect.push("/MentorProfile");
    //     case "Mentee":
    //       Redirect.push("/SpaceSelection")
    //     default:
    //       Redirect.push("/");
    //   }
    // }else{
    //   Redirect.push("/EmailVerify")
    // }
  }
}
// const test = new AuthUserService;

export default new AuthService
