import React from 'react';
import {Link, Switch} from "react-router-dom";
import Header from "../../Components/Layouts/AuthLayout/Header";
import MainFooter from "./../../Components/Layouts/MainFooter";

import '../../assets/css/style.css';



class privacyPolicy extends React.Component {
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
                  <h1>Privacy Policy</h1>
                  <p>Your privacy is important to us at Candoor. We respect your privacy regarding any information we may collect from you across our website.</p>
                  </div>
                  <div class="legal-page-desc">
                 <p>This Privacy Policy for Candoor, Inc. (“Company”, “we”, “us” “our”) describes how we collect, use and disclose information about users of the Company’s website (www.candoor.io), applications, services, tools and features (collectively, the “Services”).  For the purposes of this Privacy Policy, “you” and “your” means you as the user of the Services. </p>
                 <p>PLEASE READ THIS PRIVACY POLICY CAREFULLY.  BY USING, ACCESSING, OR DOWNLOADING ANY OF THE SERVICES, YOU AGREE TO THE USE OF YOUR INFORMATION IT DESCRIBES AND TO THE OTHER TERMS OF THIS PRIVACY POLICY.  IF YOU DO NOT AGREE TO THIS PRIVACY POLICY, PLEASE DO NOT ACCESS AND USE THE SERVICES.</p>
                 <h2>Updating this Privacy Polilcy</h2>
                 <p>We may modify this Privacy Policy from time to time in which case we will update the “Last Revised” date at the top of this Privacy Policy. If we make changes that are material, we will use reasonable efforts to notify you (e.g. by email sent to the email address specified in your account) and obtain your consent and take additional steps as required by applicable law. Notice may be by email to you at the last email address you provided us, by posting notice of such changes on the Services, or by other means, consistent with applicable law.  IF YOU DO NOT AGREE TO ANY UPDATES TO THIS PRIVACY POLICY PLEASE DO NOT ACCESS OR CONTINUE TO USE THE SERVICES.</p>
                 <h2>2. Company’s Collection and Use of Information</h2>
                 <p>In order to provide you with particular services, we may ask you to provide us with certain details or information about you. Information that you submit through our Services include:</p>
                 <ul>
                   <li>Profile Information, as follows (ex: name, city, state, country, email, education history, employment history, resume,  and self-reported demographic data ). We collect profile information to build your profile that will be made available on the Services.</li>
                   <li>Account information, as follows (ex: username, password). We collect account information to maintain and secure your account with us. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately.</li>
                   <li>Any other information you choose to include in communications with us, for example, when sending a message through the Contact Us web form.</li>
                 </ul>
                 <p>Some features of the Services may require you to enter certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.</p>
                 <p>We also automatically collect certain information about your interaction with the Services (“Usage Data”). To do this, we may use cookies (“Tracking Technologies”). Usage Data may include:</p>
                 <ul>
                   <li>Unique device identifier</li>
                   <li>Device type, such as your phone, computer, or tablet</li>
                   <li>IP address</li>
                   <li>Browser type</li>
                   <li>Date and time stamps, such as the date and time you first accessed the Services</li>
                   <li>Operating system</li>
                   <li>Log data</li>
                   <li>Precise location</li>
                   <li>Other information regarding your interaction with the Services, such as clickstream data and ad impressions</li>
                 </ul>
                 <p>We use the information we collect automatically to tailor features and content to you, to market to you, to provide you with offers or promotions, to run analytics and better understand user interaction with the Services.</p>
                 <p>We may obtain information about you from outside sources. Such information may include:</p>
                 <ul>
                   <li>Information we collect about you from other sources, such as:
                    <ul>
                      <li>Consumer marketing databases or other data enrichment companies, which is used to better customize advertising and marketing to you</li>
                    </ul>
                   </li>
                   <li>Information from third parties that you choose to share with us, for example
                    <ul>
                      <li>When you choose to link any social media platforms to your account, such as LinkedIn or Google. This information is used to maintain your account and login information.</li>
                    </ul>
                   </li>
                 </ul>
                 <p>Any information we receive from outside sources will be treated in accordance with this Privacy Policy. We are not responsible or liable for the accuracy of the information provided to us by third parties and are not responsible for any third party’s policies or practices. See Section 7 below for more information.</p>
                 <p>In addition to the foregoing, we may use all of the above information to comply with any applicable legal obligations, to enforce any applicable terms of service, and to protect or defend the Services, our rights, the rights of our users, or others.</p>
                 <h2>3. How the Company Shares Your Information</h2>
                 <p>In certain circumstances, the Company may share your information with third parties. Such circumstances may include:</p>
                 <ul>
                   <li>With vendors or other service providers, such as
                    <ul>
                      <li>Data analytics vendors</li>
                      <li>Cloud storage providers</li>
                      <li>IT service management vendors</li>
                      <li>Email marketing services vendors</li>
                      <li>Security vendors</li>
                      <li>Video-conferencing providers</li>
                      <li>Calendar integration services</li>
                    </ul>
                   </li>
                   <li>To comply with applicable law or any obligations thereunder, including cooperation with law enforcement, judicial orders, and regulatory inquiries</li>
                   <li>In connection with an asset sale, merger, bankruptcy, or other business transaction</li>
                   <li>To enforce any applicable terms of service</li>
                   <li>To ensure the safety and security of the Company and/or its users</li>
                   <li>When you request us to share certain information with third parties, such as through your use of social media widgets or login integrations</li>
                   <li>With professional advisors, such as auditors, law firms, or accounting firms</li>
                 </ul>
                 <p>You acknowledge that such sharing of information may occur in all of the aforementioned circumstances and is permitted by and subject to this Privacy Policy.</p> 
                 <h2>4. Cookies and Other Tracking Technologies</h2>
                 <p><i>Do Not Track Signals</i></p>
                  <p>Your browser settings may also allow you to transmit a “Do Not Track” signal when you visit various websites. Like many websites, our website is not designed to respond to “Do Not Track” signals received from browsers. To learn more about “Do Not Track” signals, you can visit http://www.allaboutdnt.com/.</p>
                  <p><i>Cookies and Other Tracking Technologies</i></p>
                  <p>You may control the way in which your devices permit the use of Tracking Technologies. If you so choose, you may block or delete our cookies from your browser; however, blocking or deleting cookies may cause some of the Services, including any portal features and general functionality, to work incorrectly.</p> 
                  <p>Most browsers accept cookies automatically. However, you may be able to configure your browser settings to use the Services without some cookie functionality. You can delete cookies manually or set your browser to automatically delete cookies on a pre-determined schedule. </p> 
                  <p>If you have questions regarding the specific information about you that we process or retain, as well as your choices regarding our collection and use practices, please contact us using the information listed below.</p>
                  <h2>5. User Generated Content</h2>
                  <p>The Services also allow you to upload information for your profile. Through your participation, you may submit resumes, profile photos, profile videos, messages and other information (“User-Generated Content” or “UGC”). We or others may store, display, reproduce, publish, or otherwise use UGC, and may or may not attribute it to you. Others may also have access to UGC and may have the ability to share it with third parties. If you choose to submit UGC to any public area of the Services, your UGC will be considered “public” and will be accessible by anyone, including the Company.</p>
                  <p>Please note that we do not control who will have access to the information that you choose to make available to others, and cannot ensure that parties who have access to such information will respect your privacy or keep it secure.  We are not responsible for the privacy or security of any information that you make publicly available on the features permitting creation of UGC or what others do with information you share with them on such platforms.  We are not responsible for the accuracy, use or misuse of any UGC that you disclose or receive from third parties through the forums or email lists.</p>
                  <h2>6. Social Content</h2>
                  <p>Certain features of the Services permit you to initiate interactions between the Services and third-party services or platforms, such as social networks (“Social Features”). Social Features include features that allow you to click and access the Company’s pages on certain third-party platforms, such as Facebook and Twitter, and from there to “like” or “share” our content on those platforms. Use of Social Features may entail a third party’s collection and/or use of your data. If you use Social Features or similar third-party services, information you post or otherwise make accessible may be publicly displayed by the third-party service you are using. Both the Company and the third party may have access to information about you and your use of both the Services and the third-party service. For more information on third-party websites and platforms, see Section 7.</p>
                  <h2>7. Third Party Websites & Links</h2>
                  <p>We may provide links to third-party websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions.  We do not guarantee and are not responsible for the privacy or security of these sites, including the accuracy, completeness, or reliability of their information. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms (such as LinkedIn or Google) may also be viewable by other users of the Services and/or users of those third-party online platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators except as disclosed on the Services. We expressly disclaim any and all liability for the actions of third parties, including but without limitation to actions relating to the use and/or disclosure of personal information by third parties. Any information submitted by you directly to these third parties is subject to that third party’s privacy policy.</p>
                  <h2>8. Childrens’ Privacy</h2>
                  <p>Children under the age of 13 are not permitted to use the Services, and we do not seek or knowingly collect any personal information about children under 13 years of age. If we become aware that we have unknowingly collected information about a child under 13 years of age, we will make commercially reasonable efforts to delete such information from our database.</p>
                  <p>If you are the parent or guardian of a child under 13 years of age who has provided us with their personal information, you may contact us using the below information to request that it be deleted.</p>
                  <h2>9. Data Security</h2>
                  <p>Please note that any information you send to us electronically, while using the Services or otherwise interacting with us, may not be secure when it is transmitted to us. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us. Please be aware though that, despite our best efforts, no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” Any information you transmit to us you do so at your own risk.</p>
                  <h2>10. California Privacy Rights</h2>
                  <p>We do not share personal information as defined by California Civil Code Section 1798.83 (“Shine The Light Law”) with third parties for their direct marketing purposes. </p>
                  <p><i>Users Under 18</i></p>
                  <p>Any California residents under the age of eighteen (18) who have registered to use the Services, and who have posted content or information on the Services, can request that such information be removed from the Services by contacting us at the e-mail or address set forth in the “Contact us” section below. Such request must state that they personally posted such content or information and detail where the content or information is posted. We will make reasonable good faith efforts to remove the post from prospective public view or anonymize it so the minor cannot be individually identified. This removal process cannot ensure complete or comprehensive removal. For instance, third-parties may have republished the post and archived copies of it may be stored by search engines and others that we do not control.</p>
                  <h2>11. International Users</h2>
                  <p>The Services are designed for users in the United States only and are not intended for users located outside the United States. </p>
                  <h2>12. How to Contact Us</h2>
                  <p>Should you have any questions about our privacy practices or this Privacy Policy, please email us at hello@candoor.io or contact us at 5701 Whispering Springs Drive, Ann Arbor, MI 48108.</p>
        
        
        
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

export default privacyPolicy;
