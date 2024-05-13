import React, { ChangeEvent, useState } from 'react';
import { FormField } from './components/FormField';
import { Separator } from './components/Separator';
import { getCheckoutToken } from './networking/getCheckoutToken';
import {
  MerchantFormState,
  MerchantStateFieldErrors,
  merchantFormSchemaInitialValues,
} from './schemas';
import { loadPaysimpleJs } from './utils/loadPaysimpleJs';

// TODO: Fix this type
let paysimplejs: {
  send: {
    retrieveAccount: (arg0: {
      firstName: string;
      lastName: string;
      email: string;
    }) => void;
  };
};
getCheckoutToken().then((token) => {
  paysimplejs = loadPaysimpleJs({ token });
});

export const PaymentForm: React.FC = () => {
  const [merchantFormData, setMerchantFormData] = useState<MerchantFormState>(
    merchantFormSchemaInitialValues
  );
  const [merchantFormErrors, setMerchantPaymentFormErrors] =
    useState<MerchantStateFieldErrors>({});

  const handleMerchantInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMerchantFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setMerchantPaymentFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // Prevent the default submit behavior of the form
    event.preventDefault();
    // Extract the customer info (first name, last name, email)
    // from the form. These fields are required, and should be
    // validated prior to calling 'retrieveAccount'
    const customer = {
      firstName: merchantFormData.firstName,
      lastName: merchantFormData.lastName,
      email: merchantFormData.email,
    };
    // Request the PaySimpleJS SDK to exchange the card data for a
    // payment token; pass in the customer info captured on the
    // merchant form
    paysimplejs.send.retrieveAccount(customer);
  }

  return (
    <div className="h-screen flex flex-col space-y-8 p-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Merchant Checkout Page</h1>
        {Object.keys(merchantFormData).map((field) => (
          <FormField
            key={field}
            errors={merchantFormErrors}
            field={field as keyof MerchantFormState}
            formfields={merchantFormData}
            handleInputChange={handleMerchantInputChange}
          />
        ))}
      </div>
      <Separator />
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">PaysimpleJS Payment Form</h1>
        <div id="psjs"></div>
        <button
          type="submit"
          onClick={onSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};
