import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerTransactionList } from "../../stateManagment/action";
import { CustomerEarnPoints } from "./customerEarnPoints";
import { LOADING } from "../../stateManagment/constant/customerContant";

export const CustomerSpentInfo = () => {
  const transation = useSelector((s) => s?.customers?.transaction);
  const transationError = useSelector((s) => s?.customers?.error);
  const loading = useSelector((s) => s?.customers?.loading);

  const noResultFound = useMemo(
    () => transation && transation.length === 0,
    [transation]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOADING, payload: true });
    dispatch(getCustomerTransactionList());
  }, []);

  return (
    <>
      <h1 data_testid="customer_info">Customer Info</h1>
      {loading && <span data_testid="loading">Loading....</span>}
      {!noResultFound && !transationError && !loading && transation && (
        <CustomerEarnPoints cutomerData={transation} />
      )}
      {noResultFound && transationError && (
        <span className="error" data_testid="error">
          {transationError}
        </span>
      )}
    </>
  );
};
