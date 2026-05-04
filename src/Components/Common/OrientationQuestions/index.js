import React from 'react';
import * as PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toasterAlert } from '../../../Helpers/Functions';

const Questions = ({
  questions = [],
  options = [],
  register,
  formState,
  answers,
  readOnly = false,
  watch,
}) => {
  const { errors, isSubmitted, isValid } = formState;
  return (
    <>
      <h2>Your Turn!</h2>
      {questions !== undefined
        ? questions.map((item, index) => {
          const checkboxAnswers =
            questions?.[index]?.display_type === 'checkbox' &&
            JSON.parse(answers[index]);
          return (
            <div className="form-group" key={item.id}>
              <label>{item.question}</label>
              <ul className="employment-type">
                {options[index] !== undefined
                  ? options[index].map((op) => {
                    return (
                      <li>
                        <div className="radio-d">
                          <label
                            className="form-check-label"
                            {...register(`optradio${index}`, {
                              required:
                                readOnly || 'This field is Required',
                            })}
                          >
                            <input
                              // disabled={readOnly}
                              type={
                                questions?.[index]?.display_type || 'radio'
                              }
                              className="form-check-input"
                              value={op[1]}
                              name={`optradio${index}`}
                            />
                            {op[1]}
                          </label>
                        </div>
                      </li>
                    );
                  })
                  : ''}
                {errors[`optradio${index}`] && (
                  <small className="text-danger">
                    {errors[`optradio${index}`].message}
                  </small>
                )}
              </ul>
              {questions?.[index]?.display_type === 'radio' ? (
                <>
                  {isSubmitted && isValid ? (
                    watch(`optradio${index}`) === answers[index] ? (
                      <div className="result-div">Correct!</div>
                    ) : (
                      <div className="result-div wrong-div">
                        Wrong Answer!
                      </div>
                    )
                  ) : (
                    ''
                  )}
                </>
              ) : (
                <>
                  {isSubmitted && isValid ? (
                    watch(`optradio${index}`)?.every((selectedAnswer) =>
                      checkboxAnswers?.includes(selectedAnswer)
                    ) ? (
                      <div className="result-div">Correct!</div>
                    ) : (
                      <div className="result-div wrong-div">
                        Wrong Answer!
                      </div>
                    )
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
          );
        })
        : ''}
    </>
  );
};

function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const QuestionsCard = ({
  pageQuestions = [],
  pageOptions = [],
  updateNextStep = null,
  updateBackStep = null,
  step,
  answers,
  userResponse = [],
}) => {
  const [readOnly, setReadOnly] = useState(false);
  const { register, handleSubmit, watch, formState } = useForm({
    mode: 'all',
    reValidateMode: 'onSubmit',
  });
  const onSubmit = (data) => {
    const userAnswers = Object.values(data);
    const selectedAnswers = userAnswers
      ?.map((answer) => (typeof answer !== 'string' ? answer?.flat() : answer))
      ?.flat();
    const serverAnswers = answers
      ?.map((answer) => (typeof answer !== 'string' ? answer?.flat() : answer))
      ?.flat();

    // (isJSON(answer) ? JSON.parse(answer)?.flat() : answer))
    // ?.flat();
    if (
      serverAnswers.length === selectedAnswers.length &&
      serverAnswers?.every((answer, index) => answer === selectedAnswers[index])
    ) {
      userResponse?.push(
        Object.values(data)?.map((answer, index) => {
          return {
            quiz_id: pageQuestions[index]?.id,
            response: answer,
          };
        })
      );
      setReadOnly(true);
      if (formState.isSubmitted) {
        if (updateNextStep && step !== 5) {
          updateNextStep();
        }
      }
    } else {
      toasterAlert('error', 'Select All Correct Answers!');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Questions
          questions={pageQuestions}
          options={pageOptions}
          register={register}
          formState={formState}
          answers={answers}
          readOnly={readOnly}
          watch={watch}
        />
        <div className="btndiv">
          <button
            className="action back btn btn-info"
            style={{
              display: step > 1 ? 'block' : 'none',
            }}
            type="button"
            onClick={() => updateBackStep()}
          >
            Back
          </button>
          <button
            className="action next btn btn-info"
            style={{
              display: step !== 5 ? 'block' : 'none',
            }}
            type={readOnly ? 'button' : 'submit'}
            onClick={() => {
              if (readOnly) updateNextStep();
            }}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

QuestionsCard.propTypes = {
  pageQuestions: PropTypes.array,
  pageOptions: PropTypes.array,
  updateNextStep: PropTypes.func,
  updateBackStep: PropTypes.func,
  step: PropTypes.number,
  answers: PropTypes.array,
};

Questions.propTypes = {
  questions: PropTypes.array,
  options: PropTypes.array,
  register: PropTypes.func,
  formState: PropTypes.object,
  answers: PropTypes.array,
  watch: PropTypes.func,
};

export default QuestionsCard;