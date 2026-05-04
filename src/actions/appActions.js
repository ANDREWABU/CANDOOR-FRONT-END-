import {
    GET_SESSION,
    SET_SESSION,
    SET_USER_DATA,
} from './types'
import Axios from '../Config/Axios'
import {authHeaders, toastAlert} from '../Helpers/Functions'

export const getUserInfo = () => dispatch => {
    dispatch({
        type: GET_SESSION
    })
}

export const setUserSession = payload => dispatch => {
    dispatch({
        type: SET_SESSION,
        payload: payload ? payload : {}
    })
}

export const getUserData = () => dispatch => {

    Axios.get('user_info', authHeaders()).then(response => {
        console.log(response, 'response')
        if(response.data.code === 200){
            window.$user = response.data.data.user
            window.$workspace = response.data.data.workspace
            dispatch({
                type: SET_SESSION,
                payload: response.data.data
            })
        }
    }).catch( error => {
        console.log(error, 'exception')
    })
}

export const postRoute = (url, payload) => dispatch => {

    return Axios.post(`${url}`, payload, authHeaders()).then(response => {
        console.log(response, 'save data')
        if (response.data.code === 200) {
            if(response.data.message !== 'plan added' && response.data.message !== 'plan updated' && response.data.message !== '')
                toastAlert('success', response.data.message)
        }
        else {
            if (response.data.message)
                toastAlert('error', response.data.message)
        }
        return response.data
    }).catch( error => {
        if(!error.response.data.errors?.outcome_id )
            toastAlert('error', error.response.data.message)

        return error.response
    })
}

export const patchRoute = (url, payload) => dispatch => {

    return Axios.put(`${url}`, payload, authHeaders()).then(res => {
        console.log(res, 'update data')
        if (res.data.code === 200) {
            if(res.data.message)
                toastAlert('success', res.data.message)
        } else {
            if (res.data.message)
                toastAlert(res.data.message, 'error')
        }
        return res.data
    }).catch( error => {
        toastAlert('error', error.response)
        return error.response
    })
}

export const getRoute = url => dispatch => {

    return Axios.get(`${url}`, authHeaders()).then(response => {
        console.log(response, 'listing data response')
        if (response.data.code === 200) {
            if (response.data.message !== 'List of Plans' && response.data.message !== 'plan details' && response.data.message !== 'List of teams' && response.data.message !== '')
                toastAlert('success', response.data.message)
        }
        else {
            console.log('res: ', response.data.message)
            if (response.data.message !== '')
                toastAlert('error', response.data.message)
        }
        return response.data
    }).catch( error => {
/*
        toastAlert('error', error.response)
*/
        return error.response
    })
}

export const getMethod = (url, params) => dispatch => {

    return Axios.get(url,{ params: {...params}, ...authHeaders()}).then(response => {

        console.log(response, 'get method response')
        if (response.data.code === 200) {
            if (response.data.message)
                toastAlert(response.data.message, 'success')

        } else
            toastAlert(response.data.message, 'error')

        return response.data

    }).catch( error => {
        if (error.response && error.response.message)
            toastAlert(error.response.message, 'error')

        console.log(error, 'exception')
    })
}

export const deleteRoute = url => dispatch => {

    return Axios.delete(`${url}`, authHeaders()).then(response => {
        console.log(response, 'deleted response')
        if (response.data.code === 200) {
            if (response.data.message)
                toastAlert('success', response.data.message)

        } else {
             if (response.data.message)
                toastAlert('error', response.data.message)
        }
        return response.data

    }).catch( error => {
        toastAlert('error', error.response)
        return error.response
    })
}

export const setUserData = payload => dispatch => {
    dispatch({
        type: SET_USER_DATA,
        payload
    })
}
