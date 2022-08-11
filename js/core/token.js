const token = () => {
  const session = localStorage["session"];

  try {
    return session ? JSON.parse(session) : false;
  } catch (e) {
    localStorage.removeItem("session");
    return false;
  }
};

export default token;
