export async function generatePaymentLink(values, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/payment/createLink`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Please try again later" };
  }
}

export async function verifyPayment(values) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/payment/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Please try again later" };
  }
}
