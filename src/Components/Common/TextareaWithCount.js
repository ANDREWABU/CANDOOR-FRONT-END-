import React, { forwardRef, useCallback, useState } from 'react';

import { useEffect } from 'react';
import useTextareaController from '../../hooks/useTextAreaController';

export const TextareaWithCount = forwardRef(
  ( 
    {
      label,
      placeholder,
      required,
      error,
      careerlabel = null,
      id,
      rows = 5,
      maxLength = 300,
      onChange,
      defaultLength = 0,
      ...props
    },
    ref
  ) => {
    const { textareaRefSetter } = useTextareaController(ref);

    const [count, setCount] = useState(0);
    useEffect(() => {
      const refElement = document.getElementById(id);
      if (refElement) {
        setCount(refElement.value.length);
      } 
      if(defaultLength) {
        setCount(defaultLength);
      }
    }, [defaultLength, id]);

    const onChangeHandler = useCallback(
      (event) => {
        setCount(event.target.value.length);
        onChange?.(event);
      },
      [setCount, onChange]
    );

    return (
      <>
        <label>
          {label} {required ? <span class='label-star'>*</span> : <span></span>}
        </label>
        {careerlabel && (
          <div class='careerlabel'>{careerlabel}</div>
        )}
        <textarea
          rows={rows}
          class='form-control'
          id={id}
          ref={textareaRefSetter}
          onChange={onChangeHandler}
          maxLength={maxLength}
          {...props}
          placeholder={placeholder}
        ></textarea>
        {error}
        <div class='textlimit'>
          {count}/{maxLength} characters
        </div>
      </>
    );
  }
);
