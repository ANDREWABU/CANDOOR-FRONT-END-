import React, { Component } from "react";
import { ToastContainer, Slide } from "react-toastify";
import Axios from "../../Config/Axios";
import { connect } from "react-redux";
import history from "../../Utils/history";

import store from "../../app/store";
import { getToken } from "../../Helpers/Functions";
import Loading from "../../Utils/Loading";

class Dashboard extends Component {
  state = {
    loading: true,
  };

  componentDidMount = async () => {
    Axios.interceptors.request.use(
      (request) => this.requestHandler(request),
      (error) => this.errorHandler(error)
    );
    Axios.interceptors.response.use(
      (response) => {
        if (response && response.status === 200) {
          this.setState({
            loading: false,
          });
        }
        return response;
      },
      (error) => {
        this.setState({
          loading: false,
        });
        return Promise.reject(error);
      }
    );
  };
  requestHandler = (request) => {
    request.headers.Authorization = getToken();
    return request;
  };
  errorHandler = (error) => {
    return Promise.reject(error);
  };

  render() {
    if (this.state.loading) {
      {
        return <Loading />;
      }
    }

    return (
      <>
        {this.props.children}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Dashboard);
