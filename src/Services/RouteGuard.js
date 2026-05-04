import React from "react";
import auth from "./auth.service";
import { isAuthenticated, getSession } from "../Helpers/Functions";
import store from "../app/store";
import Redirect from "../Utils/history";


const mentee = [ 
    "MenteeProfile",
    "MenteeDashboard",
    "SpaceSelection",
    "Profile",
    "Message"
];
const mentor = [
    "MentorProfile",
    "Dashboard",
    "PostJob",
    "JobPosting",
    "Message"
];

export const RouteGuard = (val) => {
    const user = getSession();
    // if(user.__userDetail.roles[0].name === "Mentee"){
    //     let check = mentee.filter(x => x === val);
    //     if(check.length){
    //         Redirect.push('/'+val);
    //     }else{
    //         Redirect.push('/PageNotFound');
    //     }
    // }else if(user.__userDetail.roles[0].name === "Mentor"){
    //     let check = mentor.filter(x => x === val);
    //     if(check.length){
    //         Redirect.push('/'+val);
    //     }else{
    //         Redirect.push('/PageNotFound');
    //     }
    // }

}
const MenteeRedirect = (val) => {
    // if (val.email_verified_at) {
    //     if (val.spaces && val.spaces.length > 0) {
    //         if (val.profile_filled) {
    //             return Redirect.push("/MenteeDashboard")
    //         }
    //         return Redirect.push("/MenteeProfile")
    //     } else {
    //         return Redirect.push("/SpaceSelection")
    //     }
    // } else {
    //     return Redirect.push("/EmailVerify");
    // }
}
const MentorRedirect = (val) => {
    // if (val.email_verified_at) {
    //     if (val.status) {
    //         if (val.profile_filled) {
    //             return Redirect.push("/Dashboard")
    //         }
    //         return Redirect.push("/MentorProfile")
    //     } else {
    //         return Redirect.push("/AccessDenied")
    //     }
    // } else {
    //     return Redirect.push("/EmailVerify");
    // }
}

export const UserRedirectRoute = (val) => {
    // if (val) {
    //     switch (val.roles[0].name) {
    //         case "Mentee":
    //             MenteeRedirect(val);
    //             break;
    //         case "Mentor":
    //             MentorRedirect(val);
    //             break;
    //     }
    // }
}

export const CheckRouteRights = (val) => {
    const user = getSession();
    console.log('ddd ' + mentee, val)
    if(user.__userDetail.roles[0].name === "Mentee"){
        alert()
    }
}

// export const RouteRedirect = (val) =>{
//     if(val.roles[0].name === "Mentee"){

//     }
// }
