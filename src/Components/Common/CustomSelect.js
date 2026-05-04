import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { createFilter, components } from 'react-select';
import WindowedSelect from 'react-windowed-select';

const CustomSelect = ({ control, name, optionsArr = [], placeholder = `Search or type your ${name}....` }) => {
  const options = useMemo(
    () => selectOptions(optionsArr?.map((option) => option['name']?.trim())),
    [optionsArr]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <WindowedSelect
            filterOption={createFilter({ ignoreAccents: false })}
            isMulti
            placeholder={placeholder}
            classNamePrefix="react-select-custom"
            options={options}
            components={{ Option: CustomOption }}
            {...field}
          />
        </>
      )}
    />
  );
};

const CustomOption = ({ children, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return <components.Option {...newProps}>{children}</components.Option>;
};

const selectOptions = (list) => {
  let options = [];
  list?.map((listItem) => {
    let arr = {
      value: listItem,
      label: listItem,
    };
    options.push(arr);
  });
  return options;
};

export default CustomSelect;
