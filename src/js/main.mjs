import { loginUser, logoutUser } from './auth.mjs';
import { searchEvents, showWeather } from './dashboard.mjs';
import { confirmSaveEvent, loadUserPlans } from './plans-handler.mjs';

// Get current page path and logged-in user
const page = window.location.pathname;
const user = JSON.parse(localStorage.getItem("loggedUser"));

// Bind login button handler on login page
if (page.includes("login.html")) {
  document.getElementById("login-btn")?.addEventListener("click", loginUser);
}

// Bind search and expose event-related functions on dashboard
if (page.includes("index.html") || page === "/") {
  document.getElementById("search-btn")?.addEventListener("click", searchEvents);
  window.searchEvents = searchEvents;
  window.showWeather = showWeather;
  window.confirmSaveEvent = confirmSaveEvent;
}

// Load saved plans on plans page
if (page.includes("plans.html")) {
  loadUserPlans();
}

// Set up logout button behavior if it exists
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  if (user) {
    // Show logout button and append user email info
    logoutBtn.addEventListener("click", logoutUser);
    logoutBtn.style.display = "inline-block";

    const userInfo = document.createElement("span");
    userInfo.textContent = `Logged in as ${user.email}`;
    userInfo.style.marginLeft = "1rem";
    logoutBtn.insertAdjacentElement("afterend", userInfo);
  } else {
    // Hide logout button if no user
    logoutBtn.style.display = "none";
  }
}
