// Searches for events in a given location using SerpAPI
// Displays skeletons during load and renders event results
export async function searchEvents() {
  const location = document.getElementById("location").value;
  const eventsContainer = document.getElementById("events");
  eventsContainer.innerHTML = `<h2>Searching for events in ${location}...</h2>`;

  // Show 3 skeleton cards as placeholders
  for (let i = 0; i < 3; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "event-item skeleton";
    skeleton.innerHTML = `
      <h3 style="background:#eee;height:1.2em;width:70%;margin:0.3em 0;"></h3>
      <p style="background:#eee;height:1em;width:50%;margin:0.3em 0;"></p>
      <p style="background:#eee;height:1em;width:60%;margin:0.3em 0;"></p>
      <div style="height:2em;background:#f0f0f0;width:40%;margin:0.5em 0;border-radius:6px;"></div>
    `;
    eventsContainer.appendChild(skeleton);
  }

  // Fetch events from SerpAPI
  const apiKey = import.meta.env.VITE_SERAPI_TOKEN;
  //const url = `/serpapi/search.json?engine=google_events&q=events+in+${encodeURIComponent(location)}&api_key=${apiKey}`;
  const url = 'https://api.allorigins.win/get?url=' + encodeURIComponent(`https://serpapi.com/search.json?engine=google_events&q=events+in+${encodeURIComponent(location)}&api_key=${apiKey}`);

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (!data.events_results || data.events_results.length === 0) {
      eventsContainer.innerHTML = "<p>No events found.</p>";
      return;
    }

    // Render found events
    eventsContainer.innerHTML = "<h2>Events Found:</h2>";
    data.events_results.forEach((event, index) => {
      const eventEl = document.createElement("div");
      eventEl.className = "event-item";

      const { title, address, date } = event;
      const locationName = address[1];
      const dateTime = date?.when || "";
      const weatherId = `weather-${index}`;

      // Build event HTML with buttons
      eventEl.innerHTML = `
        <h3>${title}</h3>
        <p>${locationName}</p>
        <p>${dateTime}</p>
        <button onclick="showWeather('${locationName}', '${dateTime}', '${weatherId}', this)">Check Weather</button>
        <button onclick='confirmSaveEvent(${JSON.stringify({ title, address: locationName, date: dateTime })})'>Save Event</button>
        <div id="${weatherId}" class="weather-card"></div>
      `;
      eventsContainer.appendChild(eventEl);
    });
  } catch (err) {
    eventsContainer.innerHTML = "<p>Error fetching events.</p>";
    console.error("SerpAPI error:", err);
  }
}

// Fetches and displays weather info for a given location and date
// Shows or hides weather data in a collapsible card
export async function showWeather(eventLocation, eventDate, containerId, btnRef) {
  const allCards = document.querySelectorAll(".weather-card");
  const allButtons = document.querySelectorAll("button");

  // Collapse any previously expanded forecast cards
  allCards.forEach(card => {
    if (card.id !== containerId) {
      card.classList.remove("active");
      card.innerHTML = "";
    }
  });
  allButtons.forEach(button => {
    if (button !== btnRef && button.textContent === "Hide Weather") {
      button.textContent = "Check Weather";
    }
  });

  const container = document.getElementById(containerId);
  if (!container) return;

  // Toggle visibility of weather card
  if (container.classList.contains("active")) {
    container.classList.remove("active");
    container.innerHTML = "";
    btnRef.textContent = "Check Weather";
    return;
  }

  btnRef.textContent = "Hide Weather";
  container.classList.add("active");
  container.innerHTML = `<p>Loading weather for ${eventLocation} on ${eventDate}...</p>`;

  const apiKey = import.meta.env.VITE_OPENWEATHER_TOKEN;
  const cleanLocation = eventLocation.split(",")[0].trim();
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cleanLocation)}&limit=1&appid=${apiKey}`;

  try {
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();
    if (!geoData || geoData.length === 0) {
      container.innerHTML = "<p>No forecast available for this location.</p>";
      return;
    }

    const { lat, lon } = geoData[0];
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const res = await fetch(weatherUrl);
    const data = await res.json();

    if (!data || !data.weather || !data.weather.length) {
      container.innerHTML = "<p>No forecast available.</p>";
      return;
    }

    // Render weather details
    container.innerHTML = `
      <h4>Weather Forecast</h4>
      <p><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" style="vertical-align:middle;"> ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Location: ${data.name}</p>
    `;
  } catch (err) {
    container.innerHTML = "<p>Error loading weather data.</p>";
    console.error("Weather error:", err);
  }
}
