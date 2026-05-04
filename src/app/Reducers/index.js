import {
  ADD_EMAIL_VERIFY,
  ADD_USER,
  ADD_MENTOR_AVAIL,
  ADD_COUNTRIES,
  ADD_PROFILE_IMAGE,
} from '../../Helpers/AppConstant';

const initialState = {
  emailVerify: [],
  user: {},
  mentorAvail: [],
  countries: [],
  profileImage: '',
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EMAIL_VERIFY:
      return Object.assign({}, state, {
        emailVerify: action.payload,
      });
    case ADD_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case ADD_MENTOR_AVAIL:
      return {
        ...state,
        mentorAvail: [...state.mentorAvail, action.payload],
      };
    case ADD_COUNTRIES:
      return Object.assign({}, state, {
        countries: action.payload,
      });
    case ADD_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
