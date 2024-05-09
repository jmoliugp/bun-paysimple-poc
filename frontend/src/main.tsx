import React from "react";
import ReactDOM from "react-dom/client";
import { PaymentForm } from "./PaymentForm.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PaymentForm />
  </React.StrictMode>
);
