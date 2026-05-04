import React, { useState, useEffect } from 'react';
// import './onboarding.css';
import gift from '../../../assets/images/gift.png';
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
import howitwork2 from '../../../assets/images/howitwork2.png';
import howitwork3 from '../../../assets/images/howitwork3.png';
import howitwork4 from '../../../assets/images/howitwork4.png';

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
import { Link } from 'react-router-dom';
import Header from '../../../Components/Layouts/AdvisorLayout/Header';
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
    let response = await ApiRequest.getRequest('/api/get-quiz');

    let count = 1;
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
      if (count > 2 && count <= 4) {
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
      if (count > 4 && count <= 7) {
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
      if (count > 7 && count <= 10) {
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

        <section className='topbg steptopbar'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div
                  className='topbg-left'
                  style={{ display: this.state.step <= 4 ? 'flex' : 'none' }}
                >
                  <h2>
                    Advisor Orientation{' '}
                    <img src={book} className='img-fluid' alt='' /> (Part{' '}
                    {this.state.step}/4)
                  </h2>
                  <p>Expected Time to Completion: 5 min.</p>
                </div>
                <div
                  className='topbg-left'
                  style={{ display: this.state.step === 5 ? 'flex' : 'none' }}
                >
                  <h2>
                    Advisor Orientation
                    <img src={book} className='img-fluid' alt='' />
                  </h2>
                  <p>Exit Survey</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='step-sec'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='step-sec-all'>
                  <div
                    className='step well'
                    style={{
                      display: this.state.step === 1 ? 'block' : 'none',
                    }}
                  >
                    <div className='stepinner-div'>
                      <div className='stepinner-text'>
                        <h2>The Network Gap</h2>
                        <p>
                          Think about how you got your first (or most recent)
                          job. Did someone refer you, chat with you about the
                          company or help you prep? If so, you probably know how
                          important your professional network can be.
                        </p>
                        <p>
                          When it comes to landing your dream job, “who you
                          know” matters. According to LinkedIn, 70% of people
                          get hired at companies where they already have a
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
                        <div className='advantage-ul'>
                          <h6>
                            <span>Network strength contributors</span>
                          </h6>
                          <ul>
                            <li>
                              <img
                                src={advantage1}
                                className='img-fluid'
                                alt=''
                              />
                              <strong>HOME</strong>
                              <span>3x advantage</span>
                            </li>
                            <li>
                              <img
                                src={advantage2}
                                className='img-fluid'
                                alt=''
                              />
                              <strong>SCHOOL</strong>
                              <span>2x advantage</span>
                            </li>
                            <li>
                              <img
                                src={advantage3}
                                className='img-fluid'
                                alt=''
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
                          Through these conversations, you’ll help Advisees
                          explore career paths, build their professional
                          networks and gain the knowledge and know-how to thrive
                          in their careers. From career advice to resume reviews
                          and mock interviews, your insights and feedback can
                          mean the world to a talented college student or young
                          professional taking the next step in their career.
                        </p>
                        <div className='ourmission-ul'>
                          <ul>
                            <li>
                              <div className='ourmission-img'>
                                <img
                                  src={mission1}
                                  className='img-fluid'
                                  alt=''
                                />
                              </div>
                              <span>Career Advice</span>
                            </li>
                            <li>
                              <div className='ourmission-img'>
                                <img
                                  src={mission2}
                                  className='img-fluid'
                                  alt=''
                                />
                              </div>
                              <span>Networking Strategies</span>
                            </li>
                            <li>
                              <div className='ourmission-img'>
                                <img
                                  src={mission3}
                                  className='img-fluid'
                                  alt=''
                                />
                              </div>
                              <span>Job Search Strategies</span>
                            </li>
                            <li>
                              <div className='ourmission-img'>
                                <img
                                  src={mission4}
                                  className='img-fluid'
                                  alt=''
                                />
                              </div>
                              <span>Resume Reviews</span>
                            </li>
                            <li>
                              <div className='ourmission-img'>
                                <img
                                  src={mission5}
                                  className='img-fluid'
                                  alt=''
                                />
                              </div>
                              <span>Interview Prep & Mock Interviews</span>
                            </li>
                            <li>
                              <div className='ourmission-img'>
                                <img
                                  src={mission6}
                                  className='img-fluid'
                                  alt=''
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
                    className='step well'
                    style={{
                      display: this.state.step === 2 ? 'block' : 'none',
                    }}
                  >
                    <div className='stepinner-div'>
                      <h2>How it Works</h2>
                      <div className='howitwork'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='howitwork-left'>
                              <p>
                                After you complete your onboarding tasks,
                                Advisees will be able to search for you in our
                                Advisor Directory and request to book a meeting
                                with you.
                              </p>
                              <p>
                                The more info you provide in your profile, the
                                more likely Advisees will reach out to you and
                                the more relevant your conversations will be.
                              </p>
                              <p>
                                Once you’ve reached your monthly meeting
                                capacity, Advisees won’t be able to request time
                                with you until the 1st of the following month.
                              </p>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='howitwork-right'>
                              <img
                                src={howitwork1}
                                className='img-fluid'
                                alt=''
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='howitwork-right'>
                              <img
                                src={howitwork2}
                                className='img-fluid'
                                alt=''
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='howitwork-left'>
                              <p>
                                When an Advisee requests time with you, you’ll
                                receive an email notification. Click the link in
                                the email to confirm a time or propose alternate
                                times.
                              </p>
                              <p>
                                Once a meeting time is confirmed, you'll both
                                automatically receive a calendar invite with a
                                Zoom link.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='howitwork-left'>
                              <p>
                                If you need to reschedule your meeting, you can
                                do so by clicking on the meeting via your
                                Homepage or at the link in the calendar invite.
                                Please do so at least 12 hours in advance to be
                                respectful of the Advisee’s time.{' '}
                              </p>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='howitwork-right'>
                              <img
                                src={howitwork3}
                                className='img-fluid'
                                alt=''
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-4'>
                            <div className='howitwork-right'>
                              <img
                                src={howitwork4}
                                className='img-fluid'
                                alt=''
                              />
                            </div>
                          </div>
                          <div className='col-md-8'>
                            <div className='howitwork-left'>
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
                    className='step well'
                    style={{
                      display: this.state.step === 3 ? 'block' : 'none',
                    }}
                  >
                    <div className='stepinner-div'>
                      <h2>Advisor Expectations</h2>
                      <div className='advisor-expectations'>
                        <p>
                          To ensure a positive experience for all users on our
                          platform, we ask that all Advisors commit to the
                          following expectations:
                        </p>
                        <ul>
                          <li>
                            <img
                              src={expectations1}
                              className='img-fluid'
                              alt=''
                            />
                            Be available for at least one Advisee conversation
                            per month
                          </li>
                          <li>
                            <img
                              src={expectations2}
                              className='img-fluid'
                              alt=''
                            />
                            Respond to meeting requests within 2 business days
                          </li>
                          <li>
                            <img
                              src={expectations3}
                              className='img-fluid'
                              alt=''
                            />
                            Actively listen and identify ways you can help
                            Advisees achieve their goals. Just because an
                            Advisee went to a "good school" doesn't mean they
                            don't need your help!
                          </li>
                          <li>
                            <img
                              src={expectations4}
                              className='img-fluid'
                              alt=''
                            />
                            Meet Advisees “where they are” — recognize that
                            Advisees have different comfort levels with
                            networking and are at different points in their
                            careers
                          </li>
                          <li>
                            <img
                              src={expectations5}
                              className='img-fluid'
                              alt=''
                            />
                            Follow through on any commitments you make during
                            your conversations (e.g. intros, resume feedback)
                          </li>
                          <li>
                            <img
                              src={expectations6}
                              className='img-fluid'
                              alt=''
                            />
                            Respect the meeting time allotted and minimize any
                            rescheduling, late starts, late ends, or last-minute
                            cancellations. According to our 3-strike policy,
                            Advisors who don’t show up, reschedule or cancel
                            last-minute (within 12 hours of meeting start) 3
                            times will be removed from the platform.
                          </li>
                          <li>
                            <img
                              src={expectations7}
                              className='img-fluid'
                              alt=''
                            />
                            <img
                              src={expectations8}
                              className='img-fluid'
                              alt=''
                            />
                            <img
                              src={expectations9}
                              className='img-fluid'
                              alt=''
                            />
                            Create a safe, empathetic, and empowering space for
                            Advisees
                          </li>
                          <li>
                            <img
                              src={expectations10}
                              className='img-fluid'
                              alt=''
                            />
                            Fill out the feedback form after every interaction
                            so we can continue to make this platform better for
                            everyone!
                          </li>
                        </ul>
                        <p>
                          While every conversation will be different, you can
                          expect that Advisees will:
                        </p>
                        <ul>
                          <li>
                            <img
                              src={expectations10}
                              className='img-fluid'
                              alt=''
                            />
                            Come prepared and on-time to meetings
                          </li>
                          <li>
                            <img
                              src={expectations11}
                              className='img-fluid'
                              alt=''
                            />
                            Have reflected about their goals and be eager to
                            advance in their careers
                          </li>
                          <li>
                            <img
                              src={expectations12}
                              className='img-fluid'
                              alt=''
                            />
                            Respect the meeting time allotted and minimize
                            rescheduling or last-minute cancellations
                          </li>
                        </ul>
                        <p>
                          As an Advisor, you are welcome (but not required) to:
                        </p>
                        <ul>
                          <li>
                            Make intros to connect Advisees with other helpful
                            peers in your network
                          </li>
                          <li>
                            Stay in touch with Advisees on a longer-term basis
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
                    className='step well'
                    style={{
                      display: this.state.step === 4 ? 'block' : 'none',
                    }}
                  >
                    <div className='stepinner-div'>
                      <div className='best-practices'>
                        <div className='table-responsive'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>
                                  <img
                                    src={doimg}
                                    className='img-fluid'
                                    alt=''
                                  />
                                  <span>DO’s</span>
                                  <img
                                    src={doimg}
                                    className='img-fluid'
                                    alt=''
                                  />
                                </th>
                                <th>
                                  <img src={don} className='img-fluid' alt='' />
                                  <span>DON’Ts</span>
                                  <img src={don} className='img-fluid' alt='' />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Actively listen to Advisees and provide
                                      practical help based on their specific
                                      asks and any additional needs you uncover
                                    </li>
                                    <li>
                                      Stay committed to a time, remain present
                                      in conversations and eager to support your
                                      Advisee
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Be distracted, multitask or portray apathy
                                      during conversations
                                    </li>
                                    <li>
                                      Provide recommendations that aren’t
                                      specific or actionable
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Be constructive and positive with feedback
                                    </li>
                                    <li>
                                      Ask open questions that encourage Advisees
                                      to share their perspective, e.g. “What
                                      kind of work excites you?” instead of “Did
                                      you like working in X role?”
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Point out issues without offering
                                      potential solutions
                                    </li>
                                    <li>
                                      Give feedback that you yourself wouldn’t
                                      follow
                                    </li>
                                    <li>
                                      Ask belittling or demeaning questions
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Speak to your own experience, while
                                      acknowledging that everyone’s journey is
                                      different
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Generalize your experience as
                                      representative of others’
                                    </li>
                                    <li>
                                      Assume that what worked for you will
                                      worked for others
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Be responsive and transparent with
                                      Advisees about what you are able and
                                      willing to do (e.g. help them prep for
                                      interviews, connect them with a colleague)
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Offer help you don’t intend to follow up
                                      on
                                    </li>
                                    <li>
                                      Drop the ball on commitments you made
                                      during your conversation
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Be willing to teach things that may seem
                                      trivial to you (e.g. how to write a cold
                                      email)
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Assume Advisees already know career best
                                      practices (on the flip side, don’t be
                                      patronizing and assume they know nothing.
                                      When in doubt, just ask!)
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Encourage Advisees to retain their own
                                      voice in emails, cover letters, interview
                                      responses, etc.
                                    </li>
                                    <li>
                                      Help them build their personal brand and
                                      thrive as their authentic selves
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Write emails, cover letters, resume
                                      bullets, etc. for Advisees (provide
                                      guidance, but encourage them to do the
                                      work themselves)
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Acknowledge there may be differences in
                                      backgrounds and seek out opportunities for
                                      your own growth
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Avoid difficult topics because you may not
                                      be able to directly relate to them
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Acknowledge that these conversations may
                                      be nerve-wracking and reaffirm to the
                                      Advisee that they are in a safe space
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Create an air of formality that
                                      intimidates Advisees
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Respond to meeting requests promptly
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <ul>
                                    <li>
                                      Leave Advisees hanging with open meeting
                                      requests (no one likes getting ghosted!)
                                    </li>
                                    <li>
                                      Reschedule or cancel meetings last-minute
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
                    class='step well congrats-step'
                    style={{
                      display: this.state.step === 5 ? 'block' : 'none',
                    }}
                  >
                    <SurveyCard
                      step={this.state.step}
                      updateBackStep={() => this.updateBackStep()}
                      userResponse={this.state.userResponse}
                      user='advisor'
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
