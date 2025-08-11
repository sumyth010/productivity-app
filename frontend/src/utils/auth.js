// src/utils/auth.js
export function logout(navigate) {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  navigate("/login");
}
