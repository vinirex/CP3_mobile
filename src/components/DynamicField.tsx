import React from 'react';
import { FormField, FormDataValue } from '../types/form';
import { FormTextInput } from './FormTextInput';
import { FormRadioInput } from './FormRadioInput';
import { FormSelectInput } from './FormSelectInput';
import { FormCheckboxInput } from './FormCheckboxInput';
import { FormSwitchInput } from './FormSwitchInput';
import { FormDatePicker } from './FormDatePicker';

interface DynamicFieldProps {
  field: FormField;
  value: FormDataValue;
  error?: string;
  onChange: (id: string, value: FormDataValue) => void;
}

export const DynamicField: React.FC<DynamicFieldProps> = ({ field, value, error, onChange }) => {
  const handleValueChange = (val: FormDataValue) => {
    onChange(field.id, val);
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'multiline':
      return (
        <FormTextInput
          field={field}
          value={typeof value === 'string' ? value : ''}
          error={error}
          onChange={handleValueChange}
        />
      );

    case 'radio':
      return (
        <FormRadioInput
          field={field}
          value={typeof value === 'string' ? value : ''}
          error={error}
          onChange={handleValueChange}
        />
      );

    case 'select':
      return (
        <FormSelectInput
          field={field}
          value={typeof value === 'string' ? value : ''}
          error={error}
          onChange={handleValueChange}
        />
      );

    case 'checkbox':
      return (
        <FormCheckboxInput
          field={field}
          value={typeof value === 'boolean' ? value : false}
          error={error}
          onChange={handleValueChange}
        />
      );

    case 'switch':
      return (
        <FormSwitchInput
          field={field}
          value={typeof value === 'boolean' ? value : false}
          error={error}
          onChange={handleValueChange}
        />
      );

    case 'date':
      return (
        <FormDatePicker
          field={field}
          value={typeof value === 'string' ? value : ''}
          error={error}
          onChange={handleValueChange}
        />
      );

    default:
      return null;
  }
};
