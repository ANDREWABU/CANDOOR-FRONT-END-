import React from 'react';

// import './onboarding.css';

import Header from '../../../Components/Layouts/AdviseeLayout/Header';

import book from '../../../assets/images/book.png';
import ApiRequest from '../../../Services/ApiRequest';

import advantage1 from '../../../assets/images/advantage1.png';
import advantage2 from '../../../assets/images/advantage2.png';
import advantage3 from '../../../assets/images/advantage3.png';
import mission1 from '../../../assets/images/mission1.png';
import mission2 from '../../../assets/images/mission2.png';
import mission3 from '../../../assets/images/mission3.png';
import mission4 from '../../../assets/images/mission4.png';
import mission5 from '../../../assets/images/mission5.png';
import mission6 from '../../../assets/images/mission6.png';

import howitwork1 from '../../../assets/images/howitwork1.png';
import howitwork5 from '../../../assets/images/howitwork5.png';
import howitwork6 from '../../../assets/images/howitwork6.png';
import howitwork7 from '../../../assets/images/howitwork7.png';
import howitwork8 from '../../../assets/images/howitwork8.png';
import howitwork9 from '../../../assets/images/howitwork9.png';

import expectations1 from '../../../assets/images/expectations1.png';
import expectations2 from '../../../assets/images/expectations2.png';
import expectations3 from '../../../assets/images/expectations3.png';
import expectations4 from '../../../assets/images/expectations4.png';
import expectations5 from '../../../assets/images/expectations5.png';
import expectations6 from '../../../assets/images/expectations6.png';
import expectations7 from '../../../assets/images/expectations7.png';
import expectations8 from '../../../assets/images/expectations8.png';
import expectations9 from '../../../assets/images/expectations9.png';
import expectations10 from '../../../assets/images/expectations10.png';
import expectations11 from '../../../assets/images/expectations11.png';
import expectations12 from '../../../assets/images/expectations12.png';

import doimg from '../../../assets/images/do.png';
import don from '../../../assets/images/don.png';

//Custom Components 👇
import QuestionsCard from '../../../Components/Common/OrientationQuestions';
import SurveyCard from '../../../Components/Common/SurveyCard';

class OrientationFlowStep extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      Qpage_1: [],
      answers_1: [],
      opt_1: [],
      Qpage_2: [],
      opt_2: [],
      answers_2: [],

      Qpage_3: [],
      opt_3: [],
      answers_3: [],

      Qpage_4: [],
      opt_4: [],
      answers_4: [],

      userResponse: [],
    };
  }

  getMainData = async () => {
    const response = await ApiRequest.getRequest('/api/get-quiz');
    let count = 1;
    console.log(response.data.data);
    response.data.data.map((result) => {
      if (count <= 2 && count > 0) {
        if (result) {
          this.setState({
            Qpage_1: this.state.Qpage_1.concat(result),
            answers_1: this.state.answers_1.concat(result?.answere),
          });
          this.setState({
            opt_1: [
              ...this.state.opt_1,
              Object.keys(JSON.parse(result.options)[0]).map((key) => [
                key,
                JSON.parse(result.options)[0][key],
              ]),
            ],
          });
        }
      }
      if (count > 2 && count <= 7) {
        if (result) {
          this.setState({
            Qpage_2: this.state.Qpage_2.concat(result),
            answers_2: this.state.answers_2.concat(result?.answere),
          });
          this.setState({
            opt_2: [
              ...this.state.opt_2,
              Object.keys(JSON.parse(result.options)[0]).map((key) => [
                key,
                JSON.parse(result.options)[0][key],
              ]),
            ],
          });
        }
      }
      if (count > 7 && count <= 9) {
        if (result) {
          this.setState({
            Qpage_3: this.state.Qpage_3.concat(result),
            answers_3: this.state.answers_3.concat(result?.answere),
          });
          this.setState({
            opt_3: [
              ...this.state.opt_3,
              Object.keys(JSON.parse(result.options)[0]).map((key) => [
                key,
                JSON.parse(result.options)[0][key],
              ]),
            ],
          });
        }
      }
      if (count > 9 && count <= 10) {
        if (result) {
          this.setState({
            Qpage_4: this.state.Qpage_4.concat(result),
            answers_4: this.state.answers_4.concat(result?.answere),
          });
          this.setState({
            opt_4: [
              ...this.state.opt_4,
              Object.keys(JSON.parse(result.options)[0]).map((key) => [
                key,
                JSON.parse(result.options)[0][key],
              ]),
            ],
          });
        }
      }
      count += 1;
    });
  };

  componentDidMount() {
    this.getMainData();
  }

  updateNextStep() {
    if (this.state.step <= 5) {
      this.setState({ step: this.state.step + 1 });
    }
  }

  updateBackStep() {
    if (this.state.step >= 1) {
      this.setState({ step: this.state.step - 1 });
    }
  }

  render() {
    return (
      <>
        <Header />
        <section className="topbg steptopbar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="topbg-left"
                  style={{ display: this.state.step <= 4 ? 'flex' : 'none' }}
                >
                  <h2>
                    Advisee Orientation{' '}
                    <img src={book} className="img-fluid" alt="" /> (Part{' '}
                    {this.state.step}/4)
                  </h2>
                  <p>Expected Time to Completion: 5 min.</p>
                </div>
                <div
                  className="topbg-left"
                  style={{ display: this.state.step === 5 ? 'flex' : 'none' }}
                >
                  <h2>
                    Advisee Orientation{' '}
                    <img src={book} className="img-fluid" alt="" />
                  </h2>
                  <p>Exit Survey</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="step-sec">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="step-sec-all">
                  <div
                    className="step well"
                    style={{
                      display: this.state.step === 1 ? 'block' : 'none',
                    }}
                  >
                    <div className="stepinner-div">
                      <div className="stepinner-text">
                        <h2>The Network Gap</h2>
                        <p>Have any of the below ever happened to you?</p>
                        <ul className="advisee-stepone">
                          <li>
                            Not sure what career paths exist or which one is
                            right for you
                          </li>
                          <li>
                            Feeling uncertain about how to land your next job
                          </li>
                          <li>
                            Submitting dozens of job applications online and
                            getting zero responses
                          </li>
                          <li>
                            Interviewing for your dream role and receiving zero
                            feedback after not getting an offer
                          </li>
                        </ul>
                        <p>If so, you’re not alone.</p>
                        <p>
                          When it comes to career progression, “who you know”
                          matters. According to LinkedIn, 70% of people get
                          hired at companies where they already have a
                          connection, and applicants who are referred to a job
                          by a current employee are 9 times more likely to get
                          hired.
                        </p>
                        <p>
                          Yet, not all networks are created equal. Depending on
                          where you grew up, where you went to school and where
                          you've worked, some candidates gain up to a 12x
                          advantage over others in accessing opportunity. This
                          is called the “Network Gap” – and this is precisely
                          the gap we aim to close.
                        </p>
                        <div className="advantage-ul">
                          <h6>
                            <span>Network strength contributors</span>
                          </h6>
                          <ul>
                            <li>
                              <img
                                src={advantage1}
                                className="img-fluid"
                                alt=""
                              />
                              <strong>HOME</strong>
                              <span>3x advantage</span>
                            </li>
                            <li>
                              <img
                                src={advantage2}
                                className="img-fluid"
                                alt=""
                              />
                              <strong>SCHOOL</strong>
                              <span>2x advantage</span>
                            </li>
                            <li>
                              <img
                                src={advantage3}
                                className="img-fluid"
                                alt=""
                              />
                              <strong>EMPLOYER</strong>
                              <span>2x advantage</span>
                            </li>
                          </ul>
                        </div>
                        <h2>Our Mission</h2>
                        <p>
                          Candoor’s mission is to empower the next generation of
                          diverse business leaders by democratizing access to
                          transformative careers. That’s why we’ve built a
                          platform that helps Black, Latinx, Indigenous and
                          other underserved college students and professionals
                          book free 1-on-1 conversations with Advisors in their
                          dream jobs.
                        </p>
                        <p>
                          Through these conversations, you’ll explore career
                          paths, build your professional network and gain the
                          knowledge and know-how to thrive in your career. From
                          career advice to resume reviews and mock interviews,
                          our Advisors are here to help!
                        </p>
                        <div className="ourmission-ul">
                          <ul>
                            <li>
                              <div className="ourmission-img">
                                <img
                                  src={mission1}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <span>Career Advice</span>
                            </li>
                            <li>
                              <div className="ourmission-img">
                                <img
                                  src={mission2}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <span>Networking Strategies</span>
                            </li>
                            <li>
                              <div className="ourmission-img">
                                <img
                                  src={mission3}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <span>Job Search Strategies</span>
                            </li>
                            <li>
                              <div className="ourmission-img">
                                <img
                                  src={mission4}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <span>Resume Reviews</span>
                            </li>
                            <li>
                              <div className="ourmission-img">
                                <img
                                  src={mission5}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <span>Interview Prep &amp; Mock Interviews</span>
                            </li>
                            <li>
                              <div className="ourmission-img">
                                <img
                                  src={mission6}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <span>Personalized Feedback</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <QuestionsCard
                        pageOptions={this.state.opt_1}
                        pageQuestions={this.state.Qpage_1}
                        step={this.state.step}
                        updateNextStep={() => this.updateNextStep()}
                        answers={this.state.answers_1}
                        userResponse={this.state.userResponse}
                      />
                    </div>
                  </div>

                  <div
                    className="step well"
                    style={{
                      display: this.state.step === 2 ? 'block' : 'none',
                    }}
                  >
                    <div className="stepinner-div">
                      <h2>How it Works</h2>
                      <div className="howitwork">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="howitwork-left">
                              <p>
                                After you complete your profile, you’ll be able
                                to browse our Advisor Directory. Search or
                                filter by any number of categories to find one
                                who is right for you.{' '}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="howitwork-right">
                              <img
                                src={howitwork1}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="howitwork-right">
                              <img
                                src={howitwork5}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="howitwork-left">
                              <p>
                                Unlike LinkedIn profiles, which are focused on
                                the <i>“what”</i> and <i>“when,”</i> Candoor’s
                                Advisor profiles showcase their <i>“why”</i> and{' '}
                                <i>“how.”</i>
                              </p>
                              <p>
                                Through the About Me, My Journey, How I can Help
                                and Just for Fun sections, you’ll get first-hand
                                insights on how they’ve navigated their careers,
                                what it’s like to work at their company and who
                                they are outside of work.
                              </p>
                              <p>
                                If your dream Advisor isn’t available this
                                month, you can add them to your “Favorites” list
                                so you can reach out to them later.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="howitwork-left">
                              <p>
                                Each month, you can reach out to 2 Advisors to
                                request a virtual meeting.
                              </p>
                              <p>
                                If you’ve never networked before, don’t worry!
                                Our platform will help you set a meeting goal,
                                craft an outreach message and suggest meeting
                                times. We recommend choosing as many time slots
                                as you can to help minimize back-and-forth.
                              </p>
                              <p>
                                If you’d like, you can also provide a link to a
                                job post at the Advisor’s company — or attach
                                relevant files (such as a resume or cover
                                letter). The more information you provide, the
                                more likely your Advisor will be able to help
                                you.
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="howitwork-right">
                              <img
                                src={howitwork6}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <div className="howitwork-right">
                              <img
                                src={howitwork7}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-md-9">
                            <div className="howitwork-left">
                              <p>
                                Once your request is sent, your Advisor will
                                receive an email notification and choose a time
                                that works for them. If there is a conflict,
                                they will reply via email with alternate times.
                              </p>
                              <p>
                                When a meeting time is confirmed, you'll both
                                automatically receive a calendar invite with a
                                Zoom link.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="howitwork-left">
                              <p>
                                If you need to reschedule your meeting, you can
                                do so by clicking on the meeting via your
                                Homepage or at the link in the calendar invite.
                                Please do so at least 12 hours in advance to be
                                respectful of the Advisor’s time.{' '}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="howitwork-right">
                              <img
                                src={howitwork8}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="howitwork-right">
                              <img
                                src={howitwork9}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="howitwork-left">
                              <p>
                                After your conversation, fill out a quick
                                feedback form to let us know how your
                                conversation went.
                              </p>
                              <p>
                                This helps us improve your experience and ensure
                                that every conversation is better than the last!{' '}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <QuestionsCard
                        pageOptions={this.state.opt_2}
                        pageQuestions={this.state.Qpage_2}
                        step={this.state.step}
                        updateNextStep={() => this.updateNextStep()}
                        updateBackStep={() => this.updateBackStep()}
                        answers={this.state.answers_2}
                        userResponse={this.state.userResponse}
                      />
                    </div>
                  </div>

                  <div
                    className="step well"
                    style={{
                      display: this.state.step === 3 ? 'block' : 'none',
                    }}
                  >
                    <div className="stepinner-div">
                      <h2>Advisor Expectations</h2>
                      <div className="advisor-expectations">
                        <p>
                          To ensure a positive experience for all users on our
                          platform, we ask that all Advisees commit to the
                          following expectations:
                        </p>
                        <ul>
                          <li>
                            <img
                              src={expectations10}
                              className="img-fluid"
                              alt=""
                            />
                            Come to meetings prepared. Study the Advisor’s
                            profile beforehand and prepare specific goals and
                            questions to make the most out of your conversation.
                          </li>
                          <li>
                            <img
                              src={expectations6}
                              className="img-fluid"
                              alt=""
                            />
                            Respect the allotted meeting time and only
                            reschedule or cancel in extenuating circumstances.
                            According to our 3-strike policy, Advisees who don’t
                            show up, reschedule or cancel last-minute (within 12
                            hours of meeting start) 3 times will be removed from
                            the platform.
                          </li>
                          <li>
                            <img
                              src={expectations4}
                              className="img-fluid"
                              alt=""
                            />
                            Send a thank-you note to your Advisor after every
                            conversation. Gratitude goes a long way! You can do
                            this directly in the feedback form that you’ll
                            receive via email after every meeting.
                          </li>
                          <li>
                            <img
                              src={expectations5}
                              className="img-fluid"
                              alt=""
                            />
                            Follow up with Advisors about any commitments made
                            during your conversations. Share your progress so
                            they can follow your journey and stay invested in
                            your success!
                          </li>
                        </ul>
                        <p>
                          While every conversation will be different, you can
                          expect that Advisors will:
                        </p>
                        <ul>
                          <li>
                            <img
                              src={expectations2}
                              className="img-fluid"
                              alt=""
                            />
                            Respond to your meeting request promptly
                          </li>
                          <li>
                            <img
                              src={expectations3}
                              className="img-fluid"
                              alt=""
                            />
                            Listen and identify ways they can support you in
                            your goals
                          </li>
                          <li>
                            <img
                              src={expectations5}
                              className="img-fluid"
                              alt=""
                            />
                            Follow through on commitments made during your
                            conversations
                          </li>
                          <li>
                            <img
                              src={expectations7}
                              className="img-fluid"
                              alt=""
                            />
                            <img
                              src={expectations8}
                              className="img-fluid"
                              alt=""
                            />
                            <img
                              src={expectations9}
                              className="img-fluid"
                              alt=""
                            />
                            Create a safe, empathetic, and empowering space for
                            you{' '}
                          </li>
                        </ul>
                        <h2>Rules of Conduct</h2>
                        <p>
                          At Candoor, we treat each other with respect and help
                          each other succeed. To ensure our community remains
                          safe, trustworthy and professional, we have a
                          zero-tolerance policy for hate, unwanted advances,
                          harassment, identity falsification and spam. Anyone
                          who violates these rules will be removed from the
                          platform immediately.
                        </p>
                        <ul>
                          <li>Do not be hateful</li>
                          <li>Do not engage in romantic advances</li>
                          <li>Do not harass or bully</li>
                          <li>Do not threaten, incite, or promote violence</li>
                          <li>
                            Do not create a fake profile or falsify information
                            about yourself
                          </li>
                          <li>Respect others' privacy</li>
                          <li>
                            Do not engage in unsolicited or unauthorized
                            advertising
                          </li>
                        </ul>
                        <p>
                          If you witness someone violating these Rules of
                          Conduct, send us a message via the “Share Feedback”
                          page. Thanks for keeping the Candoor community great!
                        </p>
                      </div>
                      {/* <h2>Your Turn!</h2> */}
                      <QuestionsCard
                        pageOptions={this.state.opt_3}
                        pageQuestions={this.state.Qpage_3}
                        step={this.state.step}
                        updateNextStep={() => this.updateNextStep()}
                        updateBackStep={() => this.updateBackStep()}
                        userResponse={this.state.userResponse}
                        answers={this.state.answers_3}
                      />
                    </div>
                  </div>

                  <div
                    className="step well"
                    style={{
                      display: this.state.step === 4 ? 'block' : 'none',
                    }}
                  >
                    <div className="stepinner-div">
                      <div className="best-practices">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>
                                  <img
                                    src={doimg}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <span>DO’s</span>
                                  <img
                                    src={doimg}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </th>
                                <th>
                                  <img src={don} className="img-fluid" alt="" />
                                  <span>DON’Ts</span>
                                  <img src={don} className="img-fluid" alt="" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Get to know the Advisor professionally and
                                      personally
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Ask for a job, connection or referral up
                                      front
                                    </li>
                                    <li>
                                      Approach conversations with a
                                      transactional mindset (i.e. “what’s in it
                                      for me?”)
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Have a clear agenda for your meeting and
                                      communicate it up front (e.g. 5 min.
                                      intros, 20 min. questions, 5 min. next
                                      steps)
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Expect your Advisor to drive the
                                      conversation forward
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Practice your introduction. Think about
                                      which aspects of your background would be
                                      important for an Advisor to know.
                                    </li>
                                    <li>
                                      Share your goals, progress to-date and how
                                      you think your Advisor can help
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>Share your entire life story</li>
                                    <li>Regurgitate your entire resume</li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Research your Advisor, their industry and
                                      role before your conversation
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Walk into a conversation without any
                                      preparation
                                    </li>
                                    <li>
                                      Ask questions that can easily be answered
                                      on an Advisor’s profile
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Ask thoughtful questions that are specific
                                      to your Advisor’s experience
                                    </li>
                                    <li>
                                      Ask open-ended questions instead of “yes”
                                      or “no” questions
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Ask generic questions that can be answered
                                      on Google (e.g. “What does a Product
                                      Manager do?”)
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Actively listen to your Advisor (e.g. eye
                                      contact, paraphrasing, validation)
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Be distracted or appear uninterested
                                      during conversations
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>Start and end meetings on time</li>
                                    <li>
                                      Acknowledge how valuable your Advisor’s
                                      time is
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>Show up late or end late</li>
                                    <li>Reschedule or cancel last-minute</li>
                                    <li>
                                      Expect the Advisor to watch the clock for
                                      you
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Ask for developmental feedback and be
                                      receptive to the Advisor’s suggestions
                                    </li>
                                    <li>
                                      Ask follow-up questions if something isn’t
                                      clear
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Expect your Advisor to write emails,
                                      resume bullet points or cover letters for
                                      you
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>Be your authentic self!</li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Portray yourself in a way that isn’t the
                                      “real you.” Advisors want to hear your
                                      unique voice!
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Acknowledge there may be differences in
                                      the backgrounds you’re coming from and
                                      seek opportunities for your own growth
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Avoid difficult topics and conversations
                                      because you may not be able to relate
                                      directly to them
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Thank the Advisor at the end of the call,
                                      as well as afterwards
                                    </li>
                                    <li>
                                      Follow up with your Advisor to update them
                                      on your progress and growth
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      End the conversation without expressing
                                      gratitude
                                    </li>
                                    <li>
                                      Reach out too often on Candoor or other
                                      channels — be mindful of their time and
                                      give other Advisees a chance to meet them
                                      too!
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Ask your Advisor how you can help them
                                      (e.g. sharing an article they wrote,
                                      inviting them to speak at your student
                                      organization, volunteering to be a beta
                                      tester for their startup)
                                    </li>
                                    <li>
                                      Pay it forward by sharing your insights
                                      with others in your own network
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Assume that you have nothing to give
                                      (everyone has something to offer!)
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <QuestionsCard
                        pageOptions={this.state.opt_4}
                        pageQuestions={this.state.Qpage_4}
                        step={this.state.step}
                        updateNextStep={() => this.updateNextStep()}
                        updateBackStep={() => this.updateBackStep()}
                        userResponse={this.state.userResponse}
                        answers={this.state.answers_4}
                      />
                    </div>
                  </div>

                  <div
                    className="step well congrats-step"
                    style={{
                      display: this.state.step === 5 ? 'block' : 'none',
                    }}
                  >
                    <SurveyCard
                      step={this.state.step}
                      updateBackStep={() => this.updateBackStep()}
                      userResponse={this.state.userResponse}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default OrientationFlowStep;