import React, { ChangeEvent, useState } from "react";
import { FormField } from "./FormField";
import { paysimpleSdk } from "./paysimple/loadPaysimple";
import {
  CustomerFormState,
  CustomerStateFieldErrors,
  customerFormSchemaInitialValues,
} from "./schemas";

export const PaymentForm: React.FC = () => {
  const [customerFormData, setCustomerFormData] = useState<CustomerFormState>(
    customerFormSchemaInitialValues
  );
  const [customerFormErrors, setCustomerFormErrors] =
    useState<CustomerStateFieldErrors>({});

  const handleCustomerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCustomerFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setCustomerFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // Prevent the default submit behavior of the form.
    event.preventDefault();

    // const customerFormErrors = validateCustomerFormData(customerFormData);
    // setCustomerFormErrors(customerFormErrors);
    // if (Object.keys(customerFormErrors).length > 0) return;

    const customer = {
      firstName: customerFormData.firstName,
      lastName: customerFormData.lastName,
      email: customerFormData.email,
    };

    // Request the PaySimpleJS SDK to exchange the card data for a
    // payment token; pass in the customer info captured on the
    // customer form.
    paysimpleSdk.send.retrieveAccount(customer);
  }

  return (
    <div className="flex flex-col h-screen p-8 space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Customer Checkout Page</h1>
        {Object.keys(customerFormData).map((field) => (
          <FormField
            key={field}
            errors={customerFormErrors}
            field={field as keyof CustomerFormState}
            formfields={customerFormData}
            handleInputChange={handleCustomerInputChange}
          />
        ))}
      </div>
      <div className="h-[1px] w-full bg-white mb-8" />
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">PaysimpleJS Payment Form</h1>
        <div id="psjs"></div>
        <button
          type="submit"
          onClick={onSubmit}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};
