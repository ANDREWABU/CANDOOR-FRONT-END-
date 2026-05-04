import { Button } from 'react-bootstrap';
import ModalWrapper from '../../../../Components/Common/ModalWrapper';
import Resechdule from './Resechdule';

const ResechduleWarning = ({ advisor_timezone, meeting_data, image = null, id, service }) => {
  return (
    <>
      <ModalWrapper
        id="myModal4"
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
                  <button type="button" class="btn btn-info grayb-btn" data-dismiss="modal">
                    No
                  </button>
                </div>
                <div class="col-md-6">
                  <Button
                    class="btn btn-info redbtn"
                    data-toggle="modal"
                    // href="#myModal5"
                    data-dismiss="modal"
                    data-target="#myModal5"
                  >
                    Yes, reschedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModalWrapper>
      <Resechdule ModalId="myModal5" advisor_timezone={advisor_timezone} meeting_data={meeting_data} id={id} service={service} />
    </>
  );
};

export default ResechduleWarning;
