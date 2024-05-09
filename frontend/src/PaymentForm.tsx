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
    <div>
      <input
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="Card Number"
      />
      <input
        value={expiryMonth}
        onChange={(e) => setExpiryMonth(e.target.value)}
        placeholder="Expiry Month (MM)"
      />
      <input
        value={expiryYear}
        onChange={(e) => setExpiryYear(e.target.value)}
        placeholder="Expiry Year (YYYY)"
      />
      <input
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        placeholder="CVV"
      />
      <button onClick={handleSubmit}>Pay Now</button>
    </div>
  );
};
