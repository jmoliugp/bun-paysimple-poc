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

const container: ContainerStyles = {
  focus: {
    borderColor: "#3b82f6",
  },
  hover: {
    borderColor: "#2563eb",
  },
};

const label: LabelStyles = {
  color: "#D1D5DB",
  focus: {
    color: "#3b82f6",
  },
  hover: {
    color: "#2563eb",
  },
};

const field: FieldStyles = {
  focus: {
    borderColor: "#3b82f6",
  },
  hover: {
    borderColor: "#2563eb",
  },
  placeholder: {
    color: "#9ca3af",
  },
};

const validation: ValidationStyles = {
  focus: {
    color: "#dc2626",
  },
  hover: {
    color: "#b91c1c",
  },
};

export const styles: Styles = {
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
  "container.cardNumber": container,
  "container.expiration": container,
  "container.cvv": container,
  "container.postalCode": container,
  "container.routingNumber": container,
  "container.accountNumber": container,
  "container.accountType": container,
  "container.bankName": container,
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
  "label.cardNumber": label,
  "label.expiration": label,
  "label.cvv": label,
  "label.postalCode": label,
  "label.routingNumber": label,
  "label.accountNumber": label,
  "label.accountType": label,
  "label.bankName": label,
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
  "field.cardNumber": field,
  "field.expiration": field,
  "field.cvv": field,
  "field.postalCode": field,
  "field.routingNumber": field,
  "field.accountNumber": field,
  "field.accountType": field,
  "field.bankName": field,
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
  "validation.cardNumber": validation,
  "validation.expiration": validation,
  "validation.cvv": validation,
  "validation.postalCode": validation,
  "validation.routingNumber": validation,
  "validation.accountNumber": validation,
  "validation.accountType": validation,
  "validation.bankName": validation,
};
