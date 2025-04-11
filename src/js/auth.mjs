// auth.mjs
import { logoutUser, showToast } from "./utility.js";

export async function loginUser() {
  const email = document.getElementById("username")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    showToast("Please enter both email and password.", "error");
    return;
  }

  try {
    const res = await fetch("/data/users.json");
    const data = await res.json();
    const user = data.users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      showToast("Login successful!", "success");
      setTimeout(() => window.location.href = "/index.html", 1000);
    } else {
      showToast("Invalid email or password", "error");
    }
  } catch (err) {
    console.error("Login error:", err);
    showToast("Login system error.", "error");
  }
}


export function registerUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.some(u => u.email === email);

  if (exists) {
    showToast("Email already registered.", "error");
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedUser", JSON.stringify(newUser));
  showToast("Registration successful!", "success");
  setTimeout(() => window.location.href = "/index.html", 1000);
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  const user = localStorage.getItem("loggedUser");
  if (!user) logoutBtn.style.display = "none";
  else {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
      setTimeout(() => window.location.href = "/index.html", 1000);
    });
  }
}


const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
  const user = localStorage.getItem("loggedUser");
  if (user) loginBtn.style.display = "none";
  else loginBtn.addEventListener("click", loginUser);
}


export { logoutUser };
