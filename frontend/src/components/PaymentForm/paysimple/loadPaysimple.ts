import { getCheckoutToken } from "../../../networking/getCheckoutToken";
import { AccountInfo, sendPayment } from "../../../networking/sendPayment";
import { styles } from "./styles";

declare global {
  interface Window {
    paysimpleJs: (config: unknown) => PaysimpleSdk;
  }
}

export type PaysimpleSdk = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  on: (event: string, callback: Function) => void;
  send: {
    retrieveAccount: (customer: {
      firstName: string;
      lastName: string;
      email: string;
    }) => void;
    setMode: (mode: string) => void;
  };
};

export enum Mode {
  CreditCard = "cc-key-enter",
  ACH = "ach-key-enter",
}

async function loadPaysimpleSdk(mode = Mode.CreditCard) {
  const token = await getCheckoutToken();

  // Initialize the PaySimpleJS SDK with the checkout token and styles
  // where auth = { token: <Checkout Token from your server> }
  const paysimplejs = window.paysimpleJs({
    // Element that will contain the iframe
    container: document.querySelector("#psjs"),
    auth: { token },
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

export let paysimpleSdk: PaysimpleSdk;
loadPaysimpleSdk().then((sdk) => {
  paysimpleSdk = sdk;
});
