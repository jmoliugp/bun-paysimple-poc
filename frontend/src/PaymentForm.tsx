import React, { useState, ChangeEvent } from "react";

type PaymentFormFields = {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  zipCode: string;
};

export const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormFields>({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    zipCode: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const paymentData = {
      cardNumber: formData.cardNumber,
      expirationDate: `${formData.expiryMonth}/${formData.expiryYear}`,
      cvv: formData.cvv,
      zipCode: formData.zipCode,
    };

    window.PaySimple.createToken(paymentData, (result) => {
      if (result.error) {
        alert("Error: " + result.error.message);
      } else {
        console.log("Token:", result.token);
        // Send this token to your server for processing.
      }
    });
  };

  return (
    <div className="h-screen flex flex-col space-y-4 p-8">
      <h1 className="text-2xl font-bold">Payment Form</h1>
      <input
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleInputChange}
        placeholder="Card Number"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="expiryMonth"
        value={formData.expiryMonth}
        onChange={handleInputChange}
        placeholder="Expiry Month (MM)"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="expiryYear"
        value={formData.expiryYear}
        onChange={handleInputChange}
        placeholder="Expiry Year (YYYY)"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="cvv"
        value={formData.cvv}
        onChange={handleInputChange}
        placeholder="CVV"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="zipCode"
        value={formData.zipCode}
        onChange={handleInputChange}
        placeholder="Zip Code"
        className="p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Pay Now
      </button>
    </div>
  );
};
