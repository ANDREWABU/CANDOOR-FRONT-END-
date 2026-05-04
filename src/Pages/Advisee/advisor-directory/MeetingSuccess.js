import { Link } from 'react-router-dom';
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import checkicon from '../../../assets/images/checkicon.png';
import sent1 from '../../../assets/images/sent1.png';
import ApiRequest from "../../../Services/ApiRequest";
import MainFooter from '../../../Components/Layouts/MainFooter';
import React from 'react';


class RequestMeetingSuccess extends React.Component {


  state = {
    adviseeMeetingsRemaining: '' 
  }

  componentDidMount(){
    this.getAdviseeMeetingsRemaining();
  }

  getAdviseeMeetingsRemaining = async () => {
    let requestResponse = await ApiRequest.getRequest('/api/advisees-get-profile-data');
    var responseData = requestResponse.data.Data;

    this.setState({
      adviseeMeetingsRemaining: responseData.advisees.monthly_requests_remaining
    })
  }

  

  render() {
    return (
      <>
        <Header />
        <section class="request-meeting">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="request-meeting-success">
                  <h2>
                    <img src={checkicon} class="img-fluid" alt="" />
                    Success!
                  </h2>
                  <div class="border-div"></div>
                  <p>
                    Your meeting request has been sent. You’ll receive their
                    response via email within the next few days.
                  </p>
                  <p>
                    You have <strong>{this.state.adviseeMeetingsRemaining} request(s) remaining</strong> this month.
                    Click the link below to book another Advisor!
                    
                    {/* or{' '}
                    <a href="#">refer your friends </a> to earn more requests! */}
                  </p>
                  <div class="sent-img">
                    <img src={sent1} class="img-fluid" alt="" />
                  </div>
                  <div class="border-div"></div>
                  <div class="request-meeting-btn">
                    <Link to="/advisee/dashboard" class="btn btn-info btn-border">
                      Back to Home
                    </Link>
                    <Link to="/advisee/advisor-directory" class="btn btn-info">
                      Back to Advisor Directory
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <MainFooter />
      </>
    );
  }
}

export default RequestMeetingSuccess;