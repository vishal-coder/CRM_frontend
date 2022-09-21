import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyPayment } from "../services/PaymentService";

function PaymentPage() {
  const query = new URLSearchParams(window.location.search);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const razorpay_payment_id = query.get("razorpay_payment_id");

  useEffect(() => {
    handleVerifyPayment();
  }, []);

  const handleVerifyPayment = async () => {
    const razorpay_payment_id = query.get("razorpay_payment_id");
    const razorpay_payment_link_id = query.get("razorpay_payment_link_id");
    const razorpay_payment_link_reference_id = query.get(
      "razorpay_payment_link_reference_id"
    );
    const razorpay_payment_link_status = query.get(
      "razorpay_payment_link_status"
    );
    const razorpay_signature = query.get("razorpay_signature");
    const data = {
      razorpay_payment_id: razorpay_payment_id,
      razorpay_payment_link_id: razorpay_payment_link_id,
      razorpay_payment_link_reference_id: razorpay_payment_link_reference_id,
      razorpay_payment_link_status: razorpay_payment_link_status,
      razorpay_signature: razorpay_signature,
    };

    const response = await verifyPayment(data);
    console.log("payment verification resonse is", response);
    setLoading(false);
    if (response.success) {
      setStatus(true);
    }
  };
  return (
    <>
      {loading ? (
        <>
          <p>Please wait..Verifying your Payment.</p>
        </>
      ) : (
        <>
          <div className={status ? "successResponse" : "errorResponse"}>
            {status ? (
              <h2>Payment received Successfully</h2>
            ) : (
              <h2>Payment Failed</h2>
            )}
            <div></div>
            <h5>Payment Id : `${razorpay_payment_id}`</h5>
          </div>
        </>
      )}
    </>
  );
}

export default PaymentPage;
