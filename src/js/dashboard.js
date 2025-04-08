// dashboard.js (non-module)
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.createElement("nav");
    nav.innerHTML = `
      <a href='/index.html'>Dashboard</a> |
      <a href='/plans.html'>My Plans</a> |
      <a href='/login.html'>Login</a>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
  
    const page = window.location.pathname;
    if (page.includes("plans.html") || page.endsWith("/plans")) {
      if (typeof loadUserPlans === "function") loadUserPlans();
    }
  
    if (page.includes("index.html") || page === "/") {
      const searchInput = document.getElementById("location");
      if (searchInput) {
        searchInput.focus();
        searchInput.setAttribute("autocomplete", "on");
      }
    }
  });