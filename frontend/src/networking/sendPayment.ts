import { Endpoints, axios } from "./axios";

export interface AccountInfo {
  account: {
    id: number;
  };
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  paymentToken: string;
  amount?: number;
}

interface PaymentDetails {
  AccountId: number;
  ActualSettledDate: string | null;
  Amount: number;
  CVV: string | null;
  CanVoidUntil: string;
  CreatedOn: string;
  CustomerCompany: string | null;
  CustomerFirstName: string;
  CustomerId: number;
  CustomerLastName: string;
  Description: string | null;
  EncryptedCvv: string | null;
  EstimatedDepositDate: string;
  EstimatedSettleDate: string;
  FailureData: string | null;
  FailureReceiptOptions: string | null;
  Id: number;
  InvoiceId: string | null;
  InvoiceNumber: string | null;
  IsDebit: boolean;
  KeyId: string | null;
  LastModified: string;
  Latitude: string | null;
  Longitude: string | null;
  OrderId: string | null;
  PaymentDate: string;
  PaymentHasRecaptchaValidation: boolean;
  PaymentSubType: string;
  PaymentType: string;
  ProviderAuthCode: string;
  PurchaseOrderNumber: string | null;
  RecurringScheduleId: number;
  ReferenceId: number;
  RequiresReceipt: boolean;
  ReturnDate: string | null;
  Status: string;
  SuccessReceiptOptions: string | null;
  TraceNumber: string;
}
type Response = { data: PaymentDetails };

export const sendPayment = async (accountInfo: AccountInfo) => {
  try {
    const response = await axios.post<AccountInfo, Response>(
      Endpoints.Payment,
      accountInfo
    );

    alert(
      "Successfully created Payment:\nTrace #: " + response.data.TraceNumber
    );
  } catch (error) {
    console.log("~ sendPayment ~ error: ", JSON.stringify(error));
    alert(`Failed to process payment`);
  }
};
