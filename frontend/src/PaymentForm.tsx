import React, { useState } from "react";

export const PaymentForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = () => {
    const paymentData = {
      cardNumber,
      expirationDate: `${expiryMonth}/${expiryYear}`,
      cvv,
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
    <div className="   h-screen flex flex-col space-y-4 p-8">
      <h1 className="text-2xl font-bold">Payment form</h1>
      <input
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="Card Number"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        value={expiryMonth}
        onChange={(e) => setExpiryMonth(e.target.value)}
        placeholder="Expiry Month (MM)"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        value={expiryYear}
        onChange={(e) => setExpiryYear(e.target.value)}
        placeholder="Expiry Year (YYYY)"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        placeholder="CVV"
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
