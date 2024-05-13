import React, { ChangeEvent, useState } from "react";
import { ZodError } from "zod";
import { FormField } from "./components/FormField";
import { Separator } from "./components/Separator";
import {
  MerchantFormState,
  MerchantStateFieldErrors,
  PaymentFieldErrors,
  PaymentFormState,
  merchantFormSchemaInitialValues,
  paymentFormSchema,
  paymentFormSchemaInitialValues,
} from "./schemas";
import { usePaysimpleScript } from "./utils/useScript";

export const PaymentForm: React.FC = () => {
  const [paymentFormData, setPaymentFormData] = useState<PaymentFormState>(
    paymentFormSchemaInitialValues
  );
  const [merchantFormData, setMerchantFormData] = useState<MerchantFormState>(
    merchantFormSchemaInitialValues
  );
  const [paymentFormErrors, setPaymentFormErrors] =
    useState<PaymentFieldErrors>({});
  const [merchantFormErrors, setMerchantPaymentFormErrors] =
    useState<MerchantStateFieldErrors>({});

  usePaysimpleScript();

  const handlePaymentInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPaymentFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setPaymentFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const handleMerchantInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMerchantFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setMerchantPaymentFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    try {
      paymentFormSchema.parse(paymentFormData);
      const paymentData = {
        cardNumber: paymentFormData.cardNumber,
        expirationDate: `${paymentFormData.expiryMonth}/${paymentFormData.expiryYear}`,
        cvv: paymentFormData.cvv,
        zipCode: paymentFormData.zipCode,
      };

      window.PaySimple.createToken(paymentData, (result) => {
        if (result.error) {
          alert("Error: " + result.error.message);
        } else {
          console.log("Token:", result.token);
          // Send this token to your server for processing.
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Convert ZodError to a more friendly format
        const newErrors = error.flatten().fieldErrors;
        setPaymentFormErrors(newErrors);
      }
    }
  };

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
        {/* {Object.keys(paymentFormData).map((field) => (
          <FormField
            key={field}
            errors={paymentFormErrors}
            field={field as keyof PaymentFormState}
            formfields={paymentFormData}
            handleInputChange={handlePaymentInputChange}
          />
        ))} */}
        <div id="psjs"></div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};
