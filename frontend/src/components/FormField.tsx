import clsx from 'clsx';
import React, { ChangeEvent } from 'react';
import { MerchantFormState, MerchantStateFieldErrors } from '../schemas';
import { camelCaseToTitleCase } from '../utils/camelCaseToTitleCase';

type Props<Form, FormErrors> = {
  errors: FormErrors;
  field: keyof Form;
  formfields: Form;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const FormField: React.FC<
  Props<MerchantFormState, MerchantStateFieldErrors>
> = ({ errors, field, formfields, handleInputChange }) => {
  const isInvalid = errors[field];

  return (
    <div key={field}>
      <input
        name={field}
        id={field}
        value={formfields[field as keyof MerchantFormState]}
        onChange={handleInputChange}
        placeholder={camelCaseToTitleCase(field)}
        className={clsx('p-2 border border-gray-300', {
          'border-red-500': isInvalid,
        })}
      />
      {errors[field] && <div className="text-red-500 text-xs">{isInvalid}</div>}
    </div>
  );
};
