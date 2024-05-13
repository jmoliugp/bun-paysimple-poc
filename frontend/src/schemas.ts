import { z } from "zod";

export const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be at least 16 digits long"),
  expiryMonth: z.string().length(2, "Expiry month must be 2 digits"),
  expiryYear: z.string().length(4, "Expiry year must be 4 digits"),
  cvv: z.string().length(3, "CVV must be 3 digits"),
  zipCode: z.string().min(5, "Zip code must be at least 5 digits long"),
});

export const paymentFormSchemaInitialValues = {
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  zipCode: "",
};

export type PaymentFormState = z.infer<typeof paymentFormSchema>;
export type PaymentFieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export const merchantFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  amount: z.number().min(0.01, "Amount must be at least $0.01"),
});

export const merchantFormSchemaInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  amount: 0,
};

export type MerchantFormState = z.infer<typeof merchantFormSchema>;
export type MerchantStateFieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};
