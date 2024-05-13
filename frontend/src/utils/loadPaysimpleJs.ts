// TODO: Type it.
type CheckoutToken = {};

export function loadPaysimpleJs(auth: CheckoutToken) {
  // Initialize the PaySimpleJS SDK with the checkout token and styles
  // where auth = { token: <Checkout Token from your server> }
  const paysimplejs = window.paysimpleJs({
    // Element that will contain the iframe
    container: document.querySelector("#psjs"),
    auth: auth,
    // Allows entry of international postal codes if true
    bypassPostalCodeValidation: false,
    // Attempts to prevent browsers from using autocompletion to pre-populate
    // or suggest input previously stored by the user. Turn on for point of
    // sale or kiosk type applications where many different customers
    // will be using the same browser to enter payment information.
    preventAutocomplete: false,
    styles: {
      body: {
        backgroundColor: "#f9f9f9",
      },
    },
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
  paysimplejs.send.setMode("cc-key-enter");
  // Add an event listener to your submit button
  document.querySelector("#sample-form").addEventListener("submit", onSubmit);

  // Called when the PaySimpleJS SDK retrieves the account info
  function onAccountRetrieved(accountInfo) {
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

    // Send the accountInfo to your server to collect a payment
    // for an existing customer
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/payment");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function (e) {
      if (xhr.status < 300) {
        const data = JSON.parse(this.response);
        alert("Successfully created Payment:\nTrace #: " + data.TraceNumber);
      } else {
        alert(
          "Failed to create Payment: (" + xhr.status + ") " + xhr.responseText
        );
      }
    };
    xhr.send(JSON.stringify(accountInfo));
  }
  // Submit button event listener -- triggered when the user clicks
  // the submit button.
  // Sumbits the merchant form data to the PaySimpleJS SDK

  function onSubmit(event) {
    // Prevent the default submit behavior of the form
    event.preventDefault();
    // Extract the customer info (first name, last name, email)
    // from the form. These fields are required, and should be
    // validated prior to calling 'retrieveAccount'
    const customer = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      email: document.querySelector("#email").value,
    };
    // Request the PaySimpleJS SDK to exchange the card data for a
    // payment token; pass in the customer info captured on the
    // merchant form
    paysimplejs.send.retrieveAccount(customer);
  }
}

// Obtain a Checkout Token from your server
function getAuth(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/token");
  xhr.onload = function (e) {
    if (xhr.status < 300) {
      const data = JSON.parse(this.response);
      callback.call(null, {
        token: data.JwtToken,
      });
      return;
    }
    alert(
      "Failed to get Checkout Token: (" + xhr.status + ") " + xhr.responseText
    );
  };
  xhr.send();
}
getAuth(loadPaysimpleJs);
