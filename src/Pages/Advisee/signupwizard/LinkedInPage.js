import React, { useState } from 'react';

import { useLinkedIn } from 'react-linkedin-login-oauth2';
import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
// You can use provided image shipped by this package or using your own

function LinkedInPage() {
    //debugger;
    const { linkedInLogin } = useLinkedIn({
        clientId: '7834u4yt2egone',
       
        redirectUri: `http://localhost:3000/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: (code) => {
            alert(code);
            console.log('onSuccess', code);
        },
        onError: (error) => {
            console.log('onError' , error);
        },
    });

    return (
        <button  onClick={linkedInLogin} className="btn btn-apply-"><img src={LinkdIn} alt=""/> Apply with LinkedIn asw</button>
    );
}
export default LinkedInPage;
