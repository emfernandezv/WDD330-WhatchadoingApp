// plans-handler.mjs
export function confirmSaveEvent(eventData) {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
      alert("You need to log in to save events.");
      localStorage.setItem("pendingEvent", JSON.stringify(eventData));
      window.location.href = "/login.html";
      return;
    }
    saveEvent(eventData);
  }
  
  export function saveEvent(eventData) {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) return;
  
    let saved = JSON.parse(localStorage.getItem(`plans_${user.email}`)) || [];
    saved.push({
      id: Date.now(),
      name: eventData.name.text,
      date: eventData.start.local,
      address: eventData.venue.address.localized_address_display
    });
    localStorage.setItem(`plans_${user.email}`, JSON.stringify(saved));
    alert("Event saved to your plans!");
  }
  
  export function removePlan(id) {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) return;
  
    let saved = JSON.parse(localStorage.getItem(`plans_${user.email}`)) || [];
    saved = saved.filter(plan => plan.id !== id);
    localStorage.setItem(`plans_${user.email}`, JSON.stringify(saved));
    loadUserPlans();
  }
  
  export function loadUserPlans() {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const plansSection = document.getElementById("plans");
    if (!user || !plansSection) return;
  
    const saved = JSON.parse(localStorage.getItem(`plans_${user.email}`)) || [];
    if (saved.length === 0) {
      plansSection.innerHTML = "<h3>No saved plans.</h3>";
      return;
    }
  
    let html = `<h2>My Plans</h2>`;
    saved.forEach(plan => {
      html += `<div class='plan'>
        <h4>${plan.name}</h4>
        <p>${plan.address}</p>
        <p>${new Date(plan.date).toLocaleString()}</p>
        <button onclick="removePlan(${plan.id})">Remove</button>
      </div>`;
    });
  
    plansSection.innerHTML = html;
  }