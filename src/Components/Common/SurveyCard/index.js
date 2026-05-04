import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Project imports 👇
import gift from '../../../assets/images/gift.png';
import { TextareaWithCount } from '../TextareaWithCount';
import { useMutation, useQueryClient } from 'react-query';
import ApiRequest from '../../../Services/ApiRequest';
import { toasterAlert } from '../../../Helpers/Functions';

const preparedOptions = [
  { value: '1 - Very unprepared' },
  { value: '2 - Unprepared' },
  { value: '3 - Neither prepared nor unprepared' },
  { value: '4 - Prepared' },
  { value: '5 - Very Prepared' },
  { value: 'Prefer not to answer' },
];

const SurveyCard = ({
  step,
  updateBackStep = null,
  userResponse = [],
  user = 'advisee',
}) => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const data = queryClient.getQueryData(['UserBasicInfo', user]);
  const { register, handleSubmit } = useForm();

  const postData = async (data) => {
    const formData = new FormData();
    formData.append('response', JSON.stringify(userResponse?.flat()));
    formData.append(
      'scale',
      JSON.stringify({
        rating: data?.optradio32,
        Expectations: data?.commit,
        Experience: data?.suggestion,
      })
    );

    try {
      const response = await ApiRequest.postRequest(
        '/api/save-response-quiz',
        formData
      );
      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        toasterAlert('success', 'Request has been processed!');
        history.goBack();
      } else if (response !== undefined && response.status === 422) {
        toasterAlert('error', response.data.errors[0]);
      } else {
        toasterAlert('error', 'Something went wrong please try again!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { mutateAsync: onSubmit } = useMutation(postData);

  return (
    <div className='stepinner-div'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>
          Congrats, {data?.data?.basicInfo?.firstname}!{' '}
          <img src={gift} className='img-fluid' alt='' />
        </h3>
        <div className='modalnot'>
          Thank you for completing orientation. Please help us answer these last
          few questions:
        </div>
        <div className='form-group'>
          <label htmlFor='optradio32'>
          On a scale of 1 to 5, how prepared do you feel to network on Candoor?
          </label>
          <ul className='employment-type'>
            {preparedOptions.map((option) => (
              <li key={option.value}>
                <div className='radio-d'>
                  <label className='form-check-label'>
                    <input
                      type='radio'
                      required
                      className='form-check-input'
                      {...register('optradio32')}
                      value={option.value}
                    />
                    {option.value}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='form-group '>
          <div className='checkbox-design'>
            <label className='form-check-label'>
              <input
                required
                className='form-check-input'
                type='checkbox'
                {...register('commit')}
              />{' '}
              I commit to following Candoor’s Expectations and{' '}
              <Link target="_blank" to='/codeOfConduct'>Code of Conduct.</Link>
            </label>
          </div>
        </div>
        <div className='form-group'>
          <TextareaWithCount
            label='How can Candoor improve the Advisee onboarding experience?
            (Optional)'
            required={false}
            rows={4}
            placeholder='Type your answer...'
            {...register('suggestion')}

          />
        </div>
        {step === 5 ? (
          <div className='btndiv'>
            <button
              className='action back btn btn-info'
              style={{
                display: step === 5 ? 'block' : 'none',
              }}
              type='button'
              onClick={() => updateBackStep()}
            >
              Back
            </button>
            <button
              className='action submit btn btn-success btn btn-info'
              style={{
                display: step === 5 ? 'block' : 'none',
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

export default SurveyCard;
