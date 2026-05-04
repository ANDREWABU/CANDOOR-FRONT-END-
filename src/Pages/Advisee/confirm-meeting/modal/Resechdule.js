import moment from 'moment';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import ModalWrapper from '../../../../Components/Common/ModalWrapper';
import { TextareaWithCount } from '../../../../Components/Common/TextareaWithCount';
import { toasterAlert } from '../../../../Helpers/Functions';
import ApiRequest from '../../../../Services/ApiRequest';
import add from '../../../../assets/images/add.png';
import { useHistory } from 'react-router-dom';
import deleteee from '../../../../assets/images/delete.png';


async function sendPostRequest(formData) {

  try {
    const response = await ApiRequest.postRequest(
      '/api/propose-alternative-time-advisee',
      formData
    );
    if (
      response !== undefined &&
      response.status === 200 &&
      response.status !== 422
    ) {
      toasterAlert('success', 'Request has been processed!');
      document.getElementById('closeBtnAdviseeRes')?.click();
    } else if (response !== undefined && response.status === 422) {
      toasterAlert('error', response.data.errors[0]);
    } else {
      toasterAlert('error', 'Something went wrong please try again!');
    }
  } catch (error) {
    console.error(error);
  }
}

function Resechdule({
  type = 'Reschedule',
  ModalId = 'myModal9',
  id = null,
  service = null,
  meeting_data,
  advisee_timezone
}) {


  let history = useHistory();
  const { control, watch, setValue, register, handleSubmit } = useForm({
    defaultValues: {
      intervals: [
        {
          date: '',
          from: '',
          to: '',
        },
        {
          date: '',
          from: '',
          to: '',
        },
        {
          date: '',
          from: '',
          to: '',
        },
      ],
      note: '',
    },
  });

  const [submitButtonText, setsubmitButtonText ] = useState('Propose these times');

  const { mutate: postData } = useMutation(sendPostRequest, {
    onSuccess: () => {
      document.getElementById('closeBtnAdviseeRes')?.click();
      history.push('/advisee/dashboard');
// HACKY WAY TO REMOVE MODAL BACKDROP - JMS 1/12/2024
		 const modalstuff = document.querySelectorAll('.modal-backdrop');
			for (const node of modalstuff) {
			  node.remove();
			}     

    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'intervals',
  });

  function onSubmit(data) {
    setsubmitButtonText('Loading ...')
    const formData = new FormData();
    // To Intervals convert intervals array
    let modifiedData = {};
    data.intervals.forEach((interval, index) => {
      modifiedData[`interval_${index + 1}_date`] = interval.date;
      modifiedData[`interval_${index + 1}_from`] = interval.from;
      modifiedData[`interval_${index + 1}_to`] = interval.to;
    });
    modifiedData['note'] = data.note;

    let count = 1;
    for (const [key, value] of Object.entries(modifiedData)) {
      if (value) {
        if (key === `interval_${count}_from`) {
          formData.append(key, moment(value, 'hh:mm a').format('hh:mm a'));
        } else if (key === `interval_${count}_to`) {
          formData.append(key, moment(value, 'hh:mm a').format('hh:mm a'));
          count = count + 1;
        } else {
          formData.append(key, value);
        }
      }
    }
    formData.append('meeting_id', id);
    formData.append('proposed_timezone', advisee_timezone);
    formData.append('rescheduling', true);

    postData(formData);
  }
  return (
    <>
      <ModalWrapper className="modal-dnew" id={ModalId} title={type}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input name="meeting_id" value={id} type="hidden"/>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Your Availability <span className='timezone-bright-red'>({advisee_timezone})</span></label>
                <p>
                  Provide at least 3 dates and time intervals that you are
                  available. The more time intervals you
                  provide, the more likely the other party will be able to accept.
                </p>
                <div class="row proposetoprow">
                  <div class="col-md-3">
                    <label></label>
                  </div>
                  <div class="col-md-3">
                    <label>Date</label>
                  </div>
                  <div class="col-md-3">
                    <label>From</label>
                  </div>
                  <div class="col-md-3">
                    <label>To</label>
                  </div>
                </div>
                <div class="propose-add-box">
                  {fields.map((field, index) => (
                    <Intervals
                      serviceTimeDifference={service?.time}
                      register={register}
                      field={field}
                      index={index}
                      watch={watch}
                      setValue={setValue}
                      remove={remove}
                    />
                  ))}

                  {/* <div class="row">
                    <div class="col-md-12">
                      <div class="add-interval">
                        <a
                          href="#"
                          onClick={() =>
                            append({
                              date: '',
                              from: '',
                              to: '',
                            })
                          }
                        >
                          <img src={add} className="img-fluid" alt="" />
                          Add Interval
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-0">
                <label>Add a Note (Optional)</label>
                <TextareaWithCount
                  rows="4"
                  careerlabel="Briefly explain why an alternate time is needed."
                  {...register('note')}
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-footer-btn">
              <div class="row">
                <div class="col-md-6">
                  <button
                    type="button"
                    class="btn btn-info btn-cancel"
                    data-dismiss="modal"
                    id="closeBtnAdviseeRes"
                  >
                    Cancel
                  </button>
                </div>
                <div class="col-md-6">
                  <button type="submit" class="btn btn-info">
                    {submitButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};
function Intervals({
  watch,
  setValue,
  register,
  field,
  index,
  serviceTimeDifference,
  remove,
}) {
  const getFromTime = watch(`intervals.${index}.from`);

  // useEffect(() => {
  //   setValue(
  //     `intervals.${index}.to`,
  //     moment(getFromTime, 'hh:mm')
  //       .add(serviceTimeDifference, 'minutes')
  //       .format('HH:mm')
  //   );
  // }, [getFromTime, index, serviceTimeDifference, setValue]);

  return (
    <>
      <div class="row" key={field.id}>
        <div class="col-md-3">
          <label>Interval #{index + 1}:</label>
        </div>
        <div class="col-md-3">
          <label class="propose-mobile">Date</label>
          <div class="input-group">
            <input
              required
              type="date"
              class="form-control"
              placeholder="Jan 12"
              {...register(`intervals.${index}.date`)}
            />
          </div>
        </div>
        <div class="col-md-3">
          <label class="propose-mobile">From</label>
          <div class="input-group">
            <input
              required
              type="time"
              class="form-control"
              placeholder="2:00 PM"
              {...register(`intervals.${index}.from`)}
            />
          </div>
        </div>
        <div class="col-md-3">
          <label class="propose-mobile">To</label>
          <div class="input-group">
            <input
              required
              type="time"
              class="form-control"
              placeholder="5:00 PM"
              {...register(`intervals.${index}.to`)}
            />
          </div>
        </div>
        {index >= 3 && (
          <div class="col-md-3">
            <div className="col-md-1">
              <div className="delete-icon">
                <img
                  src={deleteee}
                  onClick={() =>
                    remove({
                      date: '',
                      from: '',
                      to: '',
                    })
                  }
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Resechdule;
