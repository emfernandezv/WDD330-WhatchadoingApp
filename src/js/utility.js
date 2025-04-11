// utility.js

export function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
  
  export function getSavedPlans(userEmail) {
    if (!userEmail) return [];
    try {
      return JSON.parse(localStorage.getItem(`plans_${userEmail}`)) || [];
    } catch (e) {
      console.error("Error loading saved plans:", e);
      return [];
    }
  }
  
  export function savePlans(userEmail, plansArray) {
    if (!userEmail || !Array.isArray(plansArray)) return;
    try {
      localStorage.setItem(`plans_${userEmail}`, JSON.stringify(plansArray));
    } catch (e) {
      console.error("Error saving plans:", e);
    }
  }
  
  export function getLoggedUser() {
    try {
      return JSON.parse(localStorage.getItem("loggedUser"));
    } catch (e) {
      console.error("Error reading logged user:", e);
      return null;
    }
  }
  
  export function logoutUser() {
    try {
      localStorage.removeItem("loggedUser");
      showToast("You have been logged out.", "success");
      setTimeout(() => window.location.href = "/index.html", 1000);
    } catch (e) {
      console.error("Error during logout:", e);
    }
  }
  