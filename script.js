// Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Variables for history
let exchangeHistory = JSON.parse(localStorage.getItem("exchangeHistory") || "[]");

// Load history into the dropdown
function loadHistory() {
  const historyDropdown = document.getElementById("historyDropdown");
  historyDropdown.innerHTML = exchangeHistory.length
    ? exchangeHistory
        .map((ex) => `<option>${ex.amount} ${ex.fromCurrency} -> ${ex.result} ${ex.toCurrency}</option>`)
        .join("")
    : `<option>No history available</option>`;
}

// Update history with a new exchange
function updateHistory(amount, fromCurrency, toCurrency, result) {
  if (exchangeHistory.length >= 10) exchangeHistory.shift(); // Keep only the last 10 exchanges
  exchangeHistory.push({ amount, fromCurrency, toCurrency, result });
  localStorage.setItem("exchangeHistory", JSON.stringify(exchangeHistory));
  loadHistory();
}

// Login functionality
document.getElementById("loginButton").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("username", username);
    document.getElementById("greeting").textContent = `Welcome, ${username}!`;
    document.getElementById("greeting").style.display = "block";
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("exchangeForm").style.display = "block";
    document.getElementById("logoutButton").style.display = "inline-block";
    document.getElementById("switchUserButton").style.display = "inline-block";
    loadHistory();
  } else {
    alert("Please enter a username.");
  }
});

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", () => {
  localStorage.removeItem("username");
  document.getElementById("greeting").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("exchangeForm").style.display = "none";
  document.getElementById("logoutButton").style.display = "none";
  document.getElementById("switchUserButton").style.display = "none";
});

// Switch user functionality
document.getElementById("switchUserButton").addEventListener("click", () => {
  document.getElementById("username").value = "";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("exchangeForm").style.display = "none";
  document.getElementById("logoutButton").style.display = "none";
  document.getElementById("switchUserButton").style.display = "none";
});

// Save favorite currencies
document.getElementById("saveFavorite").addEventListener("click", () => {
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  favorites.push({ from, to });
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
});

// Load favorites
function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favoritesSelect = document.getElementById("favorites");
  favoritesSelect.innerHTML = `<option value="">No favorites saved</option>`;
  favorites.forEach(fav => {
    const option = document.createElement("option");
    option.textContent = `${fav.from} -> ${fav.to}`;
    favoritesSelect.appendChild(option);
  });
}

// Preload currencies
const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];
document.getElementById("fromCurrency").innerHTML = currencies.map(cur => `<option>${cur}</option>`).join("");
document.getElementById("toCurrency").innerHTML = currencies.map(cur => `<option>${cur}</option>`).join("");

// Calculate exchange
function calculateExchange(event) {
  event.preventDefault();
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const result = (amount * 1.12).toFixed(2); // Dummy exchange rate for testing
  if (!isNaN(amount)) {
    document.getElementById("convertedBox").style.display = "block";
    document.getElementById("result").textContent = `${result} ${toCurrency}`;
    updateHistory(amount, fromCurrency, toCurrency, result);
  } else {
    document.getElementById("result").textContent = "Invalid amount.";
  }
}

// Initialize history on load
window.addEventListener("load", () => {
  loadHistory();
  if (localStorage.getItem("username")) {
    const username = localStorage.getItem("username");
    document.getElementById("greeting").textContent = `Welcome, ${username}!`;
    document.getElementById("greeting").style.display = "block";
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("exchangeForm").style.display = "block";
    document.getElementById("logoutButton").style.display = "inline-block";
    document.getElementById("switchUserButton").style.display = "inline-block";
  }
});
