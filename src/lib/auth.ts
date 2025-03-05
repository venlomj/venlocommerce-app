export const getAuthToken = () => {
  return localStorage.getItem("jwt");
};

export const authHeader = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
