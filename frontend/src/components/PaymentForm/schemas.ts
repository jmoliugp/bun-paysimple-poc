import { z } from "zod";

export const customerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  amount: z.number().min(0.01, "Amount must be at least $0.01"),
});

export const customerFormSchemaInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  amount: 0,
};

export type CustomerFormState = z.infer<typeof customerFormSchema>;
export type CustomerStateFieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export const validateCustomerFormData = (
  data: CustomerFormState
): CustomerStateFieldErrors => {
  const result = customerFormSchema.safeParse(data);

  if (result.success) return {};

  return result.error.errors.reduce<CustomerStateFieldErrors>((acc, error) => {
    const fieldName = error.path[0];

    if (fieldName) {
      acc[fieldName] = [error.message];
    }
    return acc;
  }, {});
};
