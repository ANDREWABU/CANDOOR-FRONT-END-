import ModalWrapper from '../../../../Components/Common/ModalWrapper';
import Resechdule from './Resechdule';

const ResechduleWarning = ({ image = null, id, service,advisee_timezone,  meeting_data }) => {
  return (
    <>
      <ModalWrapper
        id="myModal1"
        title="Warning: Last-Minute Reschedule"
        className="modal-dnew mwidth-five"
        image={image ? image : null}
      >
        <form>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <p style={{ color: '#D62755' }}>
                  Your meeting is less than 12 hours away!
                </p>
                <p>
                  While we understand that life happens, rescheduling
                  last-minute can make the other person feel like their time
                  isn’t valued.
                </p>
                <p>
                  As a reminder, users who reschedule or cancel less than 12
                  hours in advance of their meeting will be removed from our
                  platform after 3 incidents.
                </p>
                <p>Are you sure you want to reschedule?</p>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-footer-btn">
              <div class="row">
                <div class="col-md-6">
                  <button
                    type="button"
                    data-dismiss="modal"
                    class="btn btn-info grayb-btn"
                    data-toggle="modal"
                  >
                    No
                  </button>
                </div>
                <div class="col-md-6">
                  <button
                    type="button"
                    class="btn btn-info redbtn"
                    data-toggle="modal"
                    data-target="#myModal6"
                    data-dismiss="modal"
                  >
                    Yes, reschedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModalWrapper>
      <Resechdule ModalId="myModal6" advisee_timezone={advisee_timezone} meeting_data={meeting_data} id={id} service={service} />    </>
  );
};

export default ResechduleWarning;
