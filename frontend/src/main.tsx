import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PaymentForm } from "./components/PaymentForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PaymentForm />
  </React.StrictMode>
);
