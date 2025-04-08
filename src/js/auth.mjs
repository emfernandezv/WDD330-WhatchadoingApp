// auth.mjs
export async function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginStatus = document.getElementById("login-status");
  
    try {
      const res = await fetch("/data/users.json");
      const data = await res.json();
      const user = data.users.find(u => u.email === username && u.password === password);
  
      if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = "/index.html";
      } else {
        loginStatus.textContent = "Login failed. Check your credentials.";
      }
    } catch (error) {
      loginStatus.textContent = "Error loading user data.";
      console.error("Login error:", error);
    }
  }
  
  export function logoutUser() {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login.html";
  }