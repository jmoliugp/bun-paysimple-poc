import { AccountInfo, sendPayment } from "../networking/sendPayment";

declare global {
  interface Window {
    paysimpleJs: (config: unknown) => {
      // eslint-disable-next-line @typescript-eslint/ban-types
      on: (event: string, callback: Function) => void;
      send: {
        setMode: (mode: string) => void;
      };
    };
  }
}

type CheckoutToken = {
  token: string;
};

export enum Mode {
  CreditCard = "cc-key-enter",
  ACH = "ach-key-enter",
}

export function loadPaysimpleJs(auth: CheckoutToken, mode = Mode.CreditCard) {
  // Initialize the PaySimpleJS SDK with the checkout token and styles
  // where auth = { token: <Checkout Token from your server> }
  const paysimplejs = window.paysimpleJs({
    // Element that will contain the iframe
    container: document.querySelector("#psjs"),
    auth,
    // Allows entry of international postal codes if true
    bypassPostalCodeValidation: false,
    // Attempts to prevent browsers from using autocompletion to pre-populate
    // or suggest input previously stored by the user. Turn on for point of
    // sale or kiosk type applications where many different customers
    // will be using the same browser to enter payment information.
    preventAutocomplete: false,
    styles,
  });

  // Configure a callback to complete the checkout after the
  // PaySimpleJS SDK retrieves the account
  paysimplejs.on("accountRetrieved", onAccountRetrieved);

  // Listen to the 'formValidityChanged' event to enable
  // your submit button
  // where body = { validity: <'true' | 'false'> }
  paysimplejs.on("formValidityChanged", function (body) {
    // Add handling to enable your submit button
  });

  // Listen to the 'httpError' event
  // where error = {
  // errorKey: <'timeout' | 'bad_request' | 'server_error'
  // | 'unauthorized' | 'unknown'>,
  // errors: <array of { field: <string>, message: <string> }>,
  // status: <number - http status code returned>
  // }
  paysimplejs.on("httpError", function (error) {
    // Add your error handling
  });

  // Load the credit card key enter form
  paysimplejs.send.setMode(mode);

  // Add an event listener to your submit button
  // document.querySelector('#sample-form').addEventListener('submit', onSubmit);
  // Called when the PaySimpleJS SDK retrieves the account info
  function onAccountRetrieved(accountInfo: AccountInfo) {
    /* Example accountInfo:
     * {
     * "account": {
     * "id": 7313702
     * },
     * "customer": {
     * "id": 8041997,
     * "firstName": "John",
     * "lastName": "Snow",
     * "email": "john@snow.com"
     * },
     * "paymentToken": "e1f1bb19-9fe4-4c96-a35e-cd921298d8e6"
     * }
     */

    console.log("Account Info: ", accountInfo);
    const amountElement = document.querySelector("#amount") as HTMLInputElement;
    const amount = amountElement && parseFloat(amountElement.value);

    // Send the accountInfo to your server to collect a payment
    // for an existing customer
    sendPayment({ ...accountInfo, amount });
  }
  // Submit button event listener -- triggered when the user clicks
  // the submit button.
  // Sumbits the merchant form data to the PaySimpleJS SDK

  return paysimplejs;
}

const styles: Styles = {
  // Styles the body of the iframe's page
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#252525",
  },
  // Provides styles that will apply to all containers (can be overridden/extended for a specific field name - see below)
  // The container wraps each field & label
  // (i.e. each field has a label associated with it - the container wraps both of these)
  // container: {
  //   padding: "0.5rem",
  //   borderRadius: "0.375rem",
  //   border: "1px solid #d1d5db",
  //   marginBottom: "1rem",
  //   // Styles the focus state
  //   focus: {
  //     borderColor: "#3b82f6",
  //     boxShadow: "0 0 0 1px #3b82f6",
  //   },
  //   // Styles the hover state
  //   hover: {
  //     borderColor: "#2563eb",
  //   },
  // },
  // Styles a container for a specific field name
  "container.cardNumber": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
  },
  "container.expiration": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
  },
  "container.cvv": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
  },
  "container.postalCode": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
  },
  "container.routingNumber": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
  },
  "container.accountNumber": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
  },
  "container.accountType": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
  },
  "container.bankName": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
  },
  // Provides styles that will apply to all labels (can be overridden/extended for a specific field name - see below)
  label: {
    fontWeight: "bold",
    marginBottom: "0.25rem",
    display: "block",
    // Styles the focus state
    focus: {
      color: "#3b82f6",
    },
    // Styles the hover state
    hover: {
      color: "#2563eb",
    },
  },
  // Styles a label for a specific field name
  "label.cardNumber": {
    color: "#D1D5DB",
    focus: {
      color: "#3b82f6",
    },
    hover: {
      color: "#2563eb",
    },
  },
  "label.expiration": {
    color: "#D1D5DB",
    focus: {
      color: "#3b82f6",
    },
    hover: {
      color: "#2563eb",
    },
  },
  "label.cvv": {
    color: "#D1D5DB",
    focus: {
      color: "#3b82f6",
    },
    hover: {
      color: "#2563eb",
    },
  },
  "label.postalCode": {
    color: "#D1D5DB",
    focus: {
      color: "#3b82f6",
    },
    hover: {
      color: "#2563eb",
    },
  },
  "label.routingNumber": {
    color: "#D1D5DB",
    focus: {
      color: "#3b82f6",
    },
    hover: {
      color: "#2563eb",
    },
  },
  "label.accountNumber": {
    color: "#D1D5DB",
    focus: {
      color: "#3b82f6",
    },
    hover: {
      color: "#2563eb",
    },
  },
  "label.accountType": {
    color: "#D1D5DB",
    focus: {
      color: "#3b82f6",
    },
    hover: {
      color: "#2563eb",
    },
  },
  "label.bankName": {
    color: "#D1D5DB",
    focus: {
      color: "#3b82f6",
    },
    hover: {
      color: "#2563eb",
    },
  },
  // Provides styles that will apply to all inputs (can be overridden/extended for a specific field name - see below)
  field: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    // Styles the focus state
    focus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 1px #3b82f6",
    },
    // Styles the hover state
    hover: {
      borderColor: "#2563eb",
    },
    // Styles the placeholder
    placeholder: {
      color: "#9ca3af",
    },
  },
  // Styles an input for a specific field name
  "field.cardNumber": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
    placeholder: {
      color: "#9ca3af",
    },
  },
  "field.expiration": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
    placeholder: {
      color: "#9ca3af",
    },
  },
  "field.cvv": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
    placeholder: {
      color: "#9ca3af",
    },
  },
  "field.postalCode": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
    placeholder: {
      color: "#9ca3af",
    },
  },
  "field.routingNumber": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
    placeholder: {
      color: "#9ca3af",
    },
  },
  "field.accountNumber": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
    placeholder: {
      color: "#9ca3af",
    },
  },
  "field.accountType": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
    placeholder: {
      color: "#9ca3af",
    },
  },
  "field.bankName": {
    focus: {
      borderColor: "#3b82f6",
    },
    hover: {
      borderColor: "#2563eb",
    },
    placeholder: {
      color: "#9ca3af",
    },
  },
  // Provides styles that will apply to all validation messages (can be overridden/extended for a specific field name - see below)
  validation: {
    color: "#ef4444",
    fontSize: "0.75rem",
    marginTop: "0.375rem",
    // Styles the focus state
    focus: {
      color: "#dc2626",
    },
    // Styles the hover state
    hover: {
      color: "#b91c1c",
    },
  },
  // Styles a validation message for a specific field name
  "validation.cardNumber": {
    focus: {
      color: "#dc2626",
    },
    hover: {
      color: "#b91c1c",
    },
  },
  "validation.expiration": {
    focus: {
      color: "#dc2626",
    },
    hover: {
      color: "#b91c1c",
    },
  },
  "validation.cvv": {
    focus: {
      color: "#dc2626",
    },
    hover: {
      color: "#b91c1c",
    },
  },
  "validation.postalCode": {
    focus: {
      color: "#dc2626",
    },
    hover: {
      color: "#b91c1c",
    },
  },
  "validation.routingNumber": {
    focus: {
      color: "#dc2626",
    },
    hover: {
      color: "#b91c1c",
    },
  },
  "validation.accountNumber": {
    focus: {
      color: "#dc2626",
    },
    hover: {
      color: "#b91c1c",
    },
  },
  "validation.accountType": {
    focus: {
      color: "#dc2626",
    },
    hover: {
      color: "#b91c1c",
    },
  },
  "validation.bankName": {
    focus: {
      color: "#dc2626",
    },
    hover: {
      color: "#b91c1c",
    },
  },
};

import { CSSProperties as ReactCSSProperties } from "react";

type FieldStateStyles = {
  focus?: ReactCSSProperties;
  hover?: ReactCSSProperties;
  placeholder?: ReactCSSProperties;
};

type ContainerStyles = ReactCSSProperties & FieldStateStyles;
type LabelStyles = ReactCSSProperties & FieldStateStyles;
type FieldStyles = ReactCSSProperties & FieldStateStyles;
type ValidationStyles = ReactCSSProperties & FieldStateStyles;

interface Styles {
  body?: ReactCSSProperties;
  container?: ContainerStyles;
  "container.cardNumber"?: ContainerStyles;
  "container.expiration"?: ContainerStyles;
  "container.cvv"?: ContainerStyles;
  "container.postalCode"?: ContainerStyles;
  "container.routingNumber"?: ContainerStyles;
  "container.accountNumber"?: ContainerStyles;
  "container.accountType"?: ContainerStyles;
  "container.bankName"?: ContainerStyles;
  label?: LabelStyles;
  "label.cardNumber"?: LabelStyles;
  "label.expiration"?: LabelStyles;
  "label.cvv"?: LabelStyles;
  "label.postalCode"?: LabelStyles;
  "label.routingNumber"?: LabelStyles;
  "label.accountNumber"?: LabelStyles;
  "label.accountType"?: LabelStyles;
  "label.bankName"?: LabelStyles;
  field?: FieldStyles;
  "field.cardNumber"?: FieldStyles;
  "field.expiration"?: FieldStyles;
  "field.cvv"?: FieldStyles;
  "field.postalCode"?: FieldStyles;
  "field.routingNumber"?: FieldStyles;
  "field.accountNumber"?: FieldStyles;
  "field.accountType"?: FieldStyles;
  "field.bankName"?: FieldStyles;
  validation?: ValidationStyles;
  "validation.cardNumber"?: ValidationStyles;
  "validation.expiration"?: ValidationStyles;
  "validation.cvv"?: ValidationStyles;
  "validation.postalCode"?: ValidationStyles;
  "validation.routingNumber"?: ValidationStyles;
  "validation.accountNumber"?: ValidationStyles;
  "validation.accountType"?: ValidationStyles;
  "validation.bankName"?: ValidationStyles;
}
