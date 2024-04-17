const logout = () => {
  localStorage.removeItem("token");
  history.push("/pos"); 
};

export default logout;
