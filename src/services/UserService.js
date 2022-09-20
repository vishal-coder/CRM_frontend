export async function getAllUsers(values, token) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/auth/allUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Please try again later" };
  }
}
