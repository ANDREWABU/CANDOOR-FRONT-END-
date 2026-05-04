import Cookies from "js-cookie";
import HashIds from "hashids";
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyStyleMaterial from "pnotify/dist/es/PNotifyStyleMaterial.js";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
import countriesDetails from "../assets/countries_cities.json";
import { toast } from "react-toastify";

const hashIds = new HashIds("", 10);

export const encodeId = (id) => hashIds.encode(id);
export const decodeID = (id) => {
  const decodedID = hashIds.decode(id);
  return decodedID.length ? decodedID[0] : decodedID;
};

export const isAuthenticated = () => !!Cookies.get("_session");

export const setSession = (data) => {
  const __session = {
    __token: data.access_token,
    __name: data.user.firstname + " " + data.user.lastname,
    __email: data.user.email,
    __userDetail: data.user,
  };
  Cookies.set("_session", JSON.stringify(__session), { expires: 30 });
};

export const updateSession = (data) => {
  const __session = isAuthenticated()
    ? JSON.parse(Cookies.get("_session"))
    : false;
  Object.keys(data).map((key) => {
    __session[key] = data[key];
  });

  Cookies.set("_session", JSON.stringify(__session), { expires: 30 });
};

export const destroySession = () =>
  isAuthenticated() && Cookies.remove("_session");

export const getSession = () =>
  isAuthenticated() && JSON.parse(Cookies.get("_session"));

export const authHeaders = () => {
  if (isAuthenticated()) {
    return {
      headers: {
        Authorization: "Bearer " + getSession().__token,
        Accept: "application/json",
      },
    };
  }
};

export const getToken = () =>
  isAuthenticated() ? "Bearer " + getSession().__token : null;

export const formatDate = (date) => {
  if (date) {
    const _date = new Date(date);
    let month = _date.getMonth() + 1;
    month = month < 11 ? `0${month}` : month;
    let day = _date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${month}-${day}-${_date.getFullYear()}`;
  }
};

export const formatTime = (date) => {
  date = new Date(date);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + ampm;
};

export const formatDateWithMonth = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (date) {
    const _date = new Date(date);
    return (
      monthNames[_date.getMonth()] +
      " " +
      _date.getDate() +
      ", " +
      _date.getFullYear()
    );
  }
};

export const dateNth = (day) => {
  if (day > 3 && day < 21) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
export const toastAlert = (type = "success", msg) => {
  if (
    msg &&
    (msg.status === 401 || msg.status === 500) &&
    msg.data &&
    msg.data.message
  )
    msg = msg.data.message;
  else msg = msg;

  if (type === "success") {
    PNotify.success({ text: msg });
  } else if (type === "error") {
    PNotify.error({ text: msg });
  } else if (type === "info") {
    PNotify.info({ text: msg });
  } else if (type === "warn") {
    PNotify.notice({ text: msg });
  }
};
export const toasterAlert = (status = "success", msg) => {
  switch (status) {
    case "success":
      return toast.success(msg);
    case "warn":
      return toast.warn(msg);
    case "error":
      return toast.error(msg);
    case "info":
      return toast.info(msg);
    default:
      return { status, msg };
  }
};
export const geyDayName = (dateString) => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const date = new Date(dateString);
  return days[date.getDay()];
};

export const months = () => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
};

export const countries = () => {
  return countriesDetails;
};

export const countryCities = (id) => {
  const countries = countriesDetails;
  let country = countries.filter((obj) => obj.id === id);
  return country[0].cities;
};

export const getCountryById = (id) => {
  const countries = countriesDetails;
  let country = countries.filter((obj) => obj.id === id);
  return country[0];
};

export const getCityById = (country_id, city_id) => {
  const countries = countriesDetails;
  let country = countries.filter((obj) => obj.id === country_id);
  let city = country[0].cities.filter((obj) => obj.id === city_id);
  return city[0];
};
