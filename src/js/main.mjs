// Main app logic (imports and setup)// main.mjs
import { loginUser, logoutUser } from '/js/auth.mjs';
import { searchEvents, showWeather } from '/js/dashboard.mjs';
import { confirmSaveEvent, loadUserPlans } from '/js/plans-handler.mjs';

const page = window.location.pathname;
const user = JSON.parse(localStorage.getItem("loggedUser"));

if (page.includes("login.html")) {
  document.getElementById("login-btn")?.addEventListener("click", loginUser);
}

if (page.includes("index.html") || page === "/") {
  document.getElementById("search-btn")?.addEventListener("click", searchEvents);
  window.searchEvents = searchEvents;
  window.showWeather = showWeather;
  window.confirmSaveEvent = confirmSaveEvent;
}

if (page.includes("plans.html")) {
  loadUserPlans();
}

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  if (user) {
    logoutBtn.addEventListener("click", logoutUser);
    logoutBtn.style.display = "inline-block";

    const userInfo = document.createElement("span");
    userInfo.textContent = `Logged in as ${user.email}`;
    userInfo.style.marginLeft = "1rem";
    logoutBtn.insertAdjacentElement("afterend", userInfo);
  } else {
    logoutBtn.style.display = "none";
  }
}