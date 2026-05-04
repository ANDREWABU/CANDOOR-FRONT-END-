// Third-party Imports 👇
import { Link } from "react-router-dom";

//Project Imports 👇

import Olivia_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Olivia.png";
import Wadood_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Wadood.png";
import Shelby_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Shelby.png";
import Uma_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Uma.png";
import Jamila_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Jamila.png";
import Lejorne_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Lejorne.png";
import Alexandria_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Alexandria.png";
import Kristina_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Kristina.png";
import Laquavious_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Laquavious.png";
import Weston_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Weston.png";
import Jocelyn_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Jocelyn.png";
import Estevan_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Estevan.png";
import Shaden_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Shaden.png";
import Terrence_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Terrence.png";
import Jasmin_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Jasmin.png";
import Reks_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Reks.png";
import Isa_png from "../../../assets/images/Highlighted_Advisors_Advisee_Confirm_Eligibility/Isa.png";
import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
import history from "../../../Utils/history";
import Pphoto6 from "../../../assets/images/AdviseeDashboard/profilephoto6.png";
import "./css/confirmEligibility.css";


function ConfirmEligibility() {

    return (

        <div className="dashoboardAdviseeWrapper">

            <div className="container-fluid p-0">
                <div className="Dashboard-sections">
                    <div className="row mar-width-0 Dashboard-sections-main">


                        <div className="col-md-6 Dashboard-section-left dashboard-advisee">

                            <div className="content">
                                <div className="flexbox">

                                    <div className="item">
                                        <img src={Olivia_png} alt="" />
                                        <h6 className="title">Olivia</h6>
                                        <p>
                                            Product Management
                                            <br />
                                            <span>Google</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Wadood_png} alt="" />
                                        <h6 className="title">Wadood</h6>
                                        <p>
                                            Program Management <br />
                                            <span>Microsoft</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Shelby_png} alt="" />
                                        <h6 className="title">Shelby</h6>
                                        <p>
                                            Management Consulting
                                            <br />
                                            <span>L.E.K. Consulting</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Uma_png} alt="" />
                                        <h6 className="title">Uma</h6>
                                        <p>
                                            Software Engineering
                                            <br />
                                            <span>Microsoft</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Jamila_png} alt="" />
                                        <h6 className="title">Jamilia</h6>
                                        <p>
                                            Consulting Analytics
                                            <br />
                                            <span>Deloitte</span>
                                        </p>
                                    </div>

                                    <div className="item">
                                        <img src={Lejorne_png} alt="" />
                                        <h6 className="title">Lejorne</h6>
                                        <p>
                                            Diversity & Inclusion
                                            <br />
                                            <span>CreditKarma</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Pphoto6} alt="" />
                                        <h6 className="title">Udie</h6>
                                        <p>
                                            Product Design
                                            <br />
                                            <span>Honeycomb.io</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Alexandria_png} alt="" />
                                        <h6 className="title">Alexandria</h6>
                                        <p>
                                            Program Manager
                                            <br />
                                            <span>Google</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Kristina_png} alt="" />
                                        <h6 className="title">Kristina</h6>
                                        <p>
                                            Investment Banking <br />
                                            <span>Morgan Stanley</span>
                                        </p>
                                    </div>

                                    <div className="item">
                                        <img src={Laquavious_png} alt="" />
                                        <h6 className="title">Laquavious</h6>
                                        <p>
                                            Engineering PM
                                            <br />
                                            <span>Apple</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Weston_png} alt="" />
                                        <h6 className="title">Weston</h6>
                                        <p>
                                            Systems Engineering
                                            <br />
                                            <span>Lookheed Martin</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Jocelyn_png} alt="" />
                                        <h6 className="title">Jocelyn</h6>
                                        <p>
                                            Product Equity & Impact
                                            <br />
                                            <span>Candoor</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Estevan_png} alt="" />
                                        <h6 className="title">Estevan</h6>
                                        <p>
                                            Operations Management
                                            <br />
                                            <span>Collective Health</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Shaden_png} alt="" />
                                        <h6 className="title">Shaden</h6>
                                        <p>
                                            Software Engineering
                                            <br />
                                            <span>JP Morgan Chase</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Terrence_png} alt="" />
                                        <h6 className="title">Terrence</h6>
                                        <p>
                                            Analytucs Engineering
                                            <br />
                                            <span>Netflix</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Jasmin_png} alt="" />
                                        <h6 className="title">Jasmin</h6>
                                        <p>
                                            Industrial Engineering
                                            <br />
                                            <span>Ulta Beauty</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Reks_png} alt="" />
                                        <h6 className="title">Reks</h6>
                                        <p>
                                            Data Engineering
                                            <br />
                                            <span>Accenture</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Isa_png} alt="" />
                                        <h6 className="title">Isa</h6>
                                        <p>
                                            Product Management
                                            <br />
                                            <span>Nuvocargo</span>
                                        </p>
                                    </div>
                                    <div className="item">
                                        <img src={Olivia_png} alt="" />
                                        <h6 className="title">Chuks</h6>
                                        <p>
                                            Site Reliablity Engineering
                                            <br />
                                            <span>MyFitnessPal</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="col-md-6 Dashboard-section-right pr-5 pl-0 ">
                            <div className="confirm_eligibility">
                                <div className="col-md-12 wizardlogoimg">
                                    <img src={ShortLogo} alt="" />
                                </div>
                                <div className="col-md-12 text-center wizardHeading text-1">
                                    <h2>You dont have to figure <br></br> everything out on your own.</h2>
                                </div>

                                <div className="col-md-12 wizardHeading ">

                                    <p>
                                        Whether you’re exploring majors and career paths or actively searching for your next job, our Advisors are here to help. We’ve been in your shoes before and believe in your ability to make an impact in the world!
                                    </p>

                                    <div className="text-2">
                                        <b>
                                            Candoor is best suited for Advisees who...
                                        </b>
                                    </div>

                                    <div className="bulletpoints">
                                        <p>
                                            <br></br>
                                            <p> ✅  Have at least a high school diploma or GED.</p>

                                            <p> ✅  Have fewer than six years of professional experience, or are considering pivoting careers.</p>

                                            <p> ✅  Have limited access to a professional network or social capital.</p>

                                            <p> ✅  Desire to pursue a career in tech, finance, consulting, or STEM (excluding medicine and academia) in the US.</p>


                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <b>If this sounds like you, sign up below! </b>Otherwise, join our waitlist to be notified when we expand!
                                        </p>
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <button
                                        className="btn btn-continue-"
                                        onClick={(e) => {
                                            history.push('/advisee/signupwizard/createAccount')
                                            // e.preventDefault();
                                        }}
                                    >
                                        Continue
                                    </button>
                                </div>
                                <div className="col-md-12">
                                    <button
                                        className="btn btn-resend-"
                                        // disabled={this.state.loading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(
                                                "https://gpcyeic8882.typeform.com/to/Fudisj5H",
                                                "_blank" // <- This is what makes it open in a new window.
                                            );
                                        }}
                                    >
                                        Join The Wait List
                                    </button>
                                </div>
                                <div className="col-md-12 alreadyTagLine">
                                    <p>
                                        Already have an account?{" "}
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                history.push("/login");
                                            }}
                                        >
                                            {" "}
                                            Log in
                                        </a>
                                    </p>
                                </div>
                                <div className="heightspacer">

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )



}

export default ConfirmEligibility;