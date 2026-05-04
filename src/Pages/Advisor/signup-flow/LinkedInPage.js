import React, { useState } from 'react';

import { useLinkedIn } from 'react-linkedin-login-oauth2';
import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
// You can use provided image shipped by this package or using your own

function LinkedInPage(props) {
    
    //console.log('prop', props.redirectUrl);
    const title = props.title ? props.title : 'Sign up with LinkedIn';
    const { linkedInLogin } = useLinkedIn({
        scope: ['r_liteprofile','r_emailaddress'],
        clientId: '779cyzqb54vz72',
        redirectUri: 'https://myapp.candoor.io/' + props.redirectUrl, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
       
        onSuccess: (code) => {
           // //debugger;
            console.log('onSuccess LinkedInPage', code);
        },
        onError: (error) => {
            console.log('onError' , error);
        },
    });

    return (
        <button onClick={(e) => {
            e.preventDefault();
             linkedInLogin();
        }}   className="btn btn-apply-"><img src={LinkdIn} alt=""/> {title}</button>
    );
}

export default LinkedInPage;
