import React from 'react';
import Header from '../../../Components/Layouts/AdvisorLayout/Header';
import MainFooter from '../../../Components/Layouts/MainFooter';

const AdvisorFeedback = () => {
  return (
    <>
      <Header />
      <section class="share-feedback-sec">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="share-feedback-left">
                <h2>Share Feedback</h2>
                <p>
                  Your feedback is important to us. Use this form to report a
                  bug, request a new feature, or suggest Advisors you'd like to
                  see.
                </p>
                <p>
                  For all other inquiries (including partnership opportunities,
                  investor relations, and press/media), drop us a line at
                  hello@candoor.io.
                </p>
                <img
                  src="assets/images/share-feed.png"
                  class="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="share-feedback-form">
                <h3>Feedback Form</h3>
                <form action="/action_page.php">
                  <div class="form-group">
                    <label>Subject</label>
                    <select class="form-control control-d" id="sel1">
                      <option>Select a subject</option>
                      <option>Report a Bug</option>
                      <option>Request a New Feature</option>
                      <option>Suggest Advisors</option>
                      <option>Suggest Resources</option>
                      <option>Technical Support</option>
                      <option>File a Complaint</option>
                      <option>Send Fan Mail</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Message</label>
                    <textarea
                      class="form-control control-d"
                      rows="5"
                      id="comment"
                      placeholder="Start typing..."
                    ></textarea>
                  </div>
                  <div class="form-group inputDnD">
                    <div class="drag-sec">
                      <div class="dragdiv">
                        <input
                          type="file"
                          class="form-control-file text-primary font-weight-bold"
                          id="inputFile"
                          accept="image/*"
                          onchange="readUrl(this)"
                          data-title="Drag &amp; Drop here"
                        />
                        <img
                          src="assets/images/upload.png"
                          class="img-fluid"
                          alt=""
                        />
                        <h4>
                          <a href="#">Click to attach file</a> (Optional){' '}
                          <span>maximum 10 MB</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-info">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MainFooter />
    </>
  );
};

export default AdvisorFeedback;