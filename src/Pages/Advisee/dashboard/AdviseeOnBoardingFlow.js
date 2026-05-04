import React from "react";
import { Link, Switch } from "react-router-dom";
import Profile from "../../../assets/images/DashboardImgs/profile.png";
import {
  destroySession,
  toasterAlert as toastAlert,
} from "../../../Helpers/Functions";
import history from "../../../Utils/history";
import Header from "../../../Components/Layouts/AdviseeLayout/Header";
import Footer from "../../../Components/Layouts/Footer";
import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
import Msg from "../../../assets/images/WizardImages/mail.png";
import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
import Search from "../../../assets/images/WizardImages/search.png";
import EmailYes from "../../../assets/images/WizardImages/EmailYes.png";
import EmailIcon from "../../../assets/images/WizardImages/email-icon.png";
import queryString from "query-string";
import Axios from "../../../Config/Axios";
import EditPen from "../../../assets/images/WizardImages/edit-2.png";
import authService from "../../../Services/auth.service";
import ApiRequest from "../../../Services/ApiRequest";
import edit from "../../../assets/images/edit.png";
import myprofile3 from "../../../assets/images/myprofile3.png";
import upload from "../../../assets/images/upload.png";

class AdviseeOnBoardingFlow extends React.Component {
  state = {
    how_hear_us: "",
    referralCode: "",
    belongs_to: [],
    loading: false,
    errors: {
      how_hear_us: "",
      referralCode: "",
      belongs_to: [],
    },
    data: {
      work_roles: [],
      industries: [],
      companies: [],
      timezones: [],
      user_carrer: "",
      here_about_us: [],
    },
  };

  componentDidMount() {
    this.getMainData();
  }

  getMainData = async () => {
    let response = await ApiRequest.getRequest("/api/submit-form-request");
    response = response.data;
    let data = this.state.data;

    if (response.result) {
      data.here_about_us = response.result.here_about_us;
      this.setState(() => ({ data }));
      this.setInputFieldStates(response.result.user_carrer);
    }
  };

  add = async () => {
    const {
      how_hear_us,
      referralCode,
      belongs_to,
      is_prescrean_program,
    } = this.state;
    let { how_hear_usError, referralCodeError, belongs_toError } = "";
    this.resetErrors();
    if (!how_hear_us) {
      how_hear_usError = "This Field is required.";
    }

    if (belongs_to.length == 0) {
      belongs_toError = "This Field is required.";
    }

    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        how_hear_us: how_hear_usError,
        belongs_to: belongs_toError,
      },
    }));

    if (how_hear_usError || belongs_toError) {
      return true;
    }

    this.setState({ loading: true });

    const data = {
      how_hear_us,
      referralCode,
      belongs_to,
      is_prescrean_program,
    };

    let response = await ApiRequest.postRequest("/api/submit-apply-data", data);

    this.setState({ loading: false });
    this.changeStep();
  };

  render() {
    return (
      <div>
        <Header />
        <section class="topbg profilebg">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="topbg-left">
                  <h2>
                    Complete Your Profile{" "}
                    <img src={edit} class="img-fluid" alt="" />
                  </h2>
                  <p>Expected Time to Completion: 4 min.</p>
                  <h5>
                    Not sure what to write? Check out these example profiles (
                    <a href="#">1</a>, <a href="#">2</a>, <a href="#">3</a>,{" "}
                    <a href="#">4</a>) for inspiration!
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="profile-onboarding">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="profile-onboarding-edit form-design">
                  <form>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>
                            Headline <span class="label-star">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Incoming Amazon SWE intern | CS & Math at Iowa State University"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group inputDnD">
                          <label>
                            Profile Photo
                            <span class="label-star">*</span>
                            <div>
                              <span className="label-star">
                                Photo must be &lt;2MB
                              </span>
                            </div>
                          </label>
                          <div class="drag-sec">
                            <div class="dragimg">
                              <img src={myprofile3} class="img-fluid" alt="" />
                            </div>
                            <div class="dragdiv">
                              <input
                                type="file"
                                class="form-control-file text-primary font-weight-bold"
                                id="inputFile"
                                accept="image/*"
                                onchange="readUrl(this)"
                                data-title="Drag &amp; Drop here"
                              />
                              <img src={upload} class="img-fluid" alt="" />
                              <h4>
                                <a href="#">Click to replace</a> or drag and
                                drop{" "}
                                <span>SVG, PNG, JPG or GIF (2 MB Max)</span>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>
                            Tags <span class="label-star">*</span>
                          </label>
                          <div class="careerlabel">
                            If you had to choose 5 words that describe your
                            ideal career path, what would they be? Add up to 5
                            profile tags (e.g. fintech, product,
                            entrepreneurship, female, first-generation, Latinx)
                            so Advisors know what you’re all about!
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Type here..."
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>
                            About Me <span class="label-star">*</span>
                          </label>
                          <div class="careerlabel">
                            Your bio, written in the first-person. If you’re not
                            sure where to start, check out the examples below!
                          </div>
                          <textarea
                            class="form-control"
                            rows="4"
                            id="comment"
                            placeholder="Type here..."
                          ></textarea>
                          <div class="textlimit">
                            500/500 characters remaining
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>
                            Career Interests <span class="label-star">*</span>
                          </label>
                          <div class="careerlabel">
                            What are your career interests or goals for the next
                            3-5 years?
                          </div>
                          <textarea
                            class="form-control"
                            rows="4"
                            id="comment"
                            placeholder="[initial_career_goals]"
                          ></textarea>
                          <div class="textlimit">
                            XX/300 characters remaining
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group ondoarding-btn">
                          <button type="submit" class="btn btn-info">
                            Save and Publish
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AdviseeOnBoardingFlow;
