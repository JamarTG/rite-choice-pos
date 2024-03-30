const logout = () => {
  localStorage.removeItem("token");
  history.push("/auth"); 
};

export default logout;
