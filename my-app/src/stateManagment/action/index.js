import { GET_TRANSACTION_LIST } from "../constant/customerContant";
import transaction from "../_mockData/transactionData.json";

export function getCustomerTransactionList() {
  return {
    type: GET_TRANSACTION_LIST,
    payload: transaction,
  };
}
