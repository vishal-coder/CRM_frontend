export async function getContacts(values, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/contact/getAll`,
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
