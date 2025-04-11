// plans-handler.mjs
import { showToast, getSavedPlans, savePlans, getLoggedUser } from "./utility.js";

// Confirm event save; redirect to login if not authenticated
export function confirmSaveEvent(eventData, btnRef) {
  const user = getLoggedUser();
  if (!user) {
    showToast("You need to log in to save events.", "error");
    localStorage.setItem("pendingEvent", JSON.stringify(eventData));
    window.location.href = "/login.html";
    return;
  }

  const saved = getSavedPlans(user.email);
  const alreadySaved = saved.some(plan => plan.name === (eventData.title || eventData.name) && plan.date === eventData.date);
  if (alreadySaved) {
    showToast("This event is already in your plans.", "info");
    if (btnRef) {
      btnRef.disabled = true;
      btnRef.textContent = "SAVED";
    }
    return;
  }

  saveEvent(eventData, btnRef);
}

// Save event data into localStorage plan list
export function saveEvent(eventData, btnRef) {
  const user = getLoggedUser();
  if (!user) return;

  let saved = getSavedPlans(user.email);
  saved.push({
    id: Date.now(),
    name: eventData.title || eventData.name || "Untitled",
    date: eventData.date || new Date().toISOString(),
    address: eventData.address || "Unknown location"
  });

  savePlans(user.email, saved);
  showToast("Event saved to your plans!", "success");

  if (btnRef) {
    btnRef.disabled = true;
    btnRef.textContent = "SAVED";
  }

  setTimeout(() => {
    window.location.href = "/plans.html";
  }, 2500);
}

// Remove a saved plan by ID
export function removePlan(id) {
  const user = getLoggedUser();
  if (!user) return;

  if (!confirm("Are you sure you want to remove this plan?")) return;

  let saved = getSavedPlans(user.email);
  saved = saved.filter(plan => plan.id !== id);
  savePlans(user.email, saved);
  loadUserPlans();

  showToast("Plan removed successfully.", "success");
}

// Load and display all user plans
export function loadUserPlans() {
  const user = getLoggedUser();
  const plansSection = document.getElementById("plans");
  if (!user || !plansSection) return;

  const saved = getSavedPlans(user.email);
  if (saved.length === 0) {
    plansSection.innerHTML = "No saved plans.";
    return;
  }

  let html = `<h2>My Plans</h2>`;
  saved.forEach(plan => {
    html += `<div class='plan'>
      <h4>${plan.name}</h4>
      <p>${plan.address}</p>
      <p>${plan.date} ${getDateBadge(plan.date)}</p>
      <button onclick="removePlan(${plan.id})">Remove</button>
    </div>`;
  });

  plansSection.innerHTML = html;
}

// Display a badge for today or upcoming events
function getDateBadge(dateStr) {
  const today = new Date().toISOString().split("T")[0];
  if (dateStr.includes(today)) {
    return `<span class='badge today'>Today</span>`;
  }
  const eventDate = new Date(dateStr);
  if (!isNaN(eventDate)) {
    const daysDiff = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 0 && daysDiff <= 3) {
      return `<span class='badge upcoming'>Upcoming</span>`;
    }
  }
  return "";
}

// Allow plan removal via global scope (used in inline HTML handlers)
window.removePlan = removePlan;
