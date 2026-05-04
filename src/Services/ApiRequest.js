import React, { Component } from "react";
import Axios from '../Config/Axios'
import { toasterAlert as toastAlert } from "../Helpers/Functions";


class ApiRequest extends React.Component{

    getRequest = (url) => {
        try {
            const response = Axios.get(`${url}`);
            return response;
        } catch (error) {
            // console.log(error.response.data, 'error data')
            // if(!error.response.data.errors?.outcome_id )
            toastAlert('error', 'Authentication Failed!');
        }
    }

    getBlobRequest = (url) => {
        try {
            const response = Axios({
                url : `${url}`,
                method: 'GET',
                responseType: 'blob',
        });
            return response;

        } catch (error) {
            // console.log(error.response.data, 'error data')
            // if(!error.response.data.errors?.outcome_id )
            toastAlert('error', 'Authentication Failed!');
        }
    }
    deleteRequest = async (url,id) => {
        try {
            const response = await Axios.delete(`${url+'?id='+id}`);
            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            // console.log(error.response.data, 'error data')
            // if(!error.response.data.errors?.outcome_id )
            // toastAlert('error', 'Authentication Failed!');
        }
    }
    postRequest(url,data){
        return Axios.post(`${url}`,data ).then(response=>{
            if(response.status === 200){
                return response;
            }
        }).catch(error => {
            // console.log(error.response.data, 'error data')
            // if(!error.response.data.errors?.outcome_id )

            // toastAlert('error', 'Authentication Failed!')
            //
            return error.response
        }).finally(() => {
            this.setState({ loading: false });
        });
    }
    putRequest(url,data){
        return Axios.put(`${url}`,data ).then(response=>{
            if(response.status === 200){
                return response;
            }
        }).catch(error => {
            // console.log(error.response.data, 'error data')
            // if(!error.response.data.errors?.outcome_id )

            // toastAlert('error', 'Authentication Failed!')
            //
            // return error.response
        }).finally(() => {
            this.setState({ loading: false });
        });
    }


    getRequestAdvisor = (url) => {
        try {
            const response = Axios.get(`/api/advisor/${url}`);
            return response;
            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            // console.log(error.response.data, 'error data')
            // if(!error.response.data.errors?.outcome_id )
            toastAlert('error', 'Authentication Failed!');
        }
    }
    deleteRequestAdvisor = async (url,id) => {
        try {
            const response = await Axios.delete(`/api/advisor/${url+'?id='+id}`);
            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            // console.log(error.response.data, 'error data')
            // if(!error.response.data.errors?.outcome_id )
            // toastAlert('error', 'Authentication Failed!');
        }
    }
    postRequestAdvisor(url,data){
        return Axios.post(`/api/advisor/${url}`,data ).then(response=>{
            if(response.status === 200){
                return response;
            }
        }).catch(error => {
            // console.log(error.response.data, 'error data')
            // if(!error.response.data.errors?.outcome_id )

            // toastAlert('error', 'Authentication Failed!')
            //
            return error.response
        }).finally(() => {
            this.setState({ loading: false });
        });
    }
    putRequestAdvisor(url,data){
        return Axios.put(`/api/advisor/${url}`,data ).then(response=>{
            if(response.status === 200){
                return response;
            }
        }).catch(error => {
            // console.log(error.response.data, 'error data')
            // if(!error.response.data.errors?.outcome_id )

            // toastAlert('error', 'Authentication Failed!')
            //
            // return error.response
        }).finally(() => {
            this.setState({ loading: false });
        });
    }

    skillPostRequest =  async (url,skill) => {
        try {
            const response = await Axios.post(`${url}`, { skill });
            // console.log(response);
            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            console.log(error);
            // if(!error.response.data.errors?.outcome_id )
            toastAlert('error', 'Authentication Failed!');
        }
    }

}


export default new ApiRequest;

// export const skillPostRequest = async (url,skill) => {
//     return await Axios.post(`${url}`,{ skill }).then(response=>{
//         // console.log(response);
//         if(response.status === 200){
//             return response;
//         }
//     }).catch(error => {
//         console.log(error.response.data, 'error data')
//         // if(!error.response.data.errors?.outcome_id )

//         toastAlert('error', 'Authentication Failed!')
//         //
//         // return error.response
//     });
// }

// export const getRequest = async(url) =>{
//     return await Axios.get(`${url}`).then(response =>{
//         if(response.status === 200){
//             return response;
//         }

//     }).catch(error => {
//         // console.log(error.response.data, 'error data')
//         // if(!error.response.data.errors?.outcome_id )

//         toastAlert('error', 'Authentication Failed!')
//         //
//         // return error.response
//     });
// }
