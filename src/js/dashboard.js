document.addEventListener("DOMContentLoaded", () => {
  // Create and insert navigation bar
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <a href='/index.html'>Dashboard</a> |
    <a href='/plans.html'>My Plans</a> |
    <a id='login-btn' href='/login.html'>Login</a>
  `;
  document.body.insertBefore(nav, document.body.firstChild);

  const page = window.location.pathname;

  // Load plans if on the plans page
  if (page.includes("plans.html") || page.endsWith("/plans")) {
    if (typeof loadUserPlans === "function") loadUserPlans();
  }

  // Setup search input behavior on dashboard
  if (page.includes("index.html") || page === "/") {
    const searchInput = document.getElementById("location");
    if (searchInput) {
      searchInput.focus();
      searchInput.setAttribute("autocomplete", "on");
    }
  }

  // Hide login button if user is already logged in
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    const user = localStorage.getItem("loggedUser");
    if (user) loginBtn.style.display = "none";
  }
});
