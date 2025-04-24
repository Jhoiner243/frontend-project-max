export const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return headers;
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};
