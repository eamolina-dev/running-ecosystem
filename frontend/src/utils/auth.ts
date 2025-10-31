export const saveAuth = (token: string, user: any) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
