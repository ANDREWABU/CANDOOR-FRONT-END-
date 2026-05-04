import { ADD_EMAIL_VERIFY, ADD_USER, ADD_MENTOR_AVAIL, ADD_COUNTRIES, ADD_PROFILE_IMAGE } from "../../Helpers/AppConstant";

export default function addEmailVerify(payload) {
  return { type: ADD_EMAIL_VERIFY, payload };
}

export function addUser(payload) {
  return { type: ADD_USER, payload };
}

export function addMentorAvail(payload) {
  return { type: ADD_MENTOR_AVAIL, payload };
}

export function addCountries(payload) {
  return { type: ADD_COUNTRIES, payload };
}

export function addProfileImage(payload) {
  return { type: ADD_PROFILE_IMAGE, payload };
}