import React from 'react';
import {Link, Switch} from "react-router-dom";

import Header from "../../Components/Layouts/AuthLayout/Header";
import MainFooter from "./../../Components/Layouts/MainFooter";

import '../../assets/css/style.css';


class codeOfConduct extends React.Component {
    state = {
       
       
    }
  

    render() {
        return (
         <div>
           <Header />
<section class="legal-page">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="legal-page-width">
          <div class="legal-page-heading">
          <span class="legaldate">Current as of 27 Jun 2022</span>
          <h1>Code of Conduct</h1>
          </div>
          <div class="legal-page-desc">
         <p>At Candoor, we treat each other with respect and help each other succeed. To ensure our community remains safe, trustworthy and professional, we have a zero-tolerance policy for hate, unwanted advances, harassment, identity falsification and spam. Anyone who violates these rules will be removed from the platform immediately.</p>
          <p>Please take a moment to review our Code of Conduct below:</p>
          <ul>
            <li>Do not be hateful</li>
            <li>Do not engage in romantic advances</li>
            <li>Do not harass or bully</li>
            <li>Do not threaten, incite, or promote violence</li>
            <li>Do not create a fake profile or falsify information about yourself</li>
            <li>Respect others' privacy</li>
            <li>Do not engage in unsolicited or unauthorized advertising</li>
          </ul>
          <p>If you see something you believe may violate our policies, whether in profiles, posts, messages, comments, or anywhere else, please report it to us via the “Contact Us” page (if logged out) or “Share Feedback” page (if logged in). Please use these reporting tools responsibly and only for their intended purposes. For further detail, you can review these policies at any time in our Terms of Use.</p>
          <p>Thanks for keeping the Candoor community great!</p>




         </div>
        </div>
      </div>
    </div>
  </div>
</section>
<MainFooter />
</div>


        );
    }
}

export default codeOfConduct;
