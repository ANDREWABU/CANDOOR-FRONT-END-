import React from "react";
import axios from "axios";
import { toasterAlert as toastAlert, setSession, isAuthenticated, getToken, getSession } from "../Helpers/Functions";
import Redirect from "../Utils/history";
import { connect } from "react-redux";
import addEmailVerify from "../app/Actions"
import store from "../app/store"

function mapDispatchToProps(dispatch) {
    return {
        addEmailVerify: detail => dispatch(addEmailVerify(detail))
    };
}
const mapStateToProps = state => {
    return { 
        emailVerify: state.emailVerify,
        user:state.user 
    };
};

class UserAuth extends React.Component{
    test(){
        console.log('here')
    }
    render(){
        return(
            <h1>dsfasdf</h1>
        );
    }
}

const Auth = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAuth);

export default Auth