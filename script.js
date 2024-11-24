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

// Login functionality
document.getElementById("loginButton").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("username", username);
    document.getElementById("greeting").textContent = `Welcome, ${username}!`;
    document.getElementById("greeting").style.display = "block";
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("exchangeForm").style.display = "block";
    loadFavorites();
  } else {
    alert("Please enter a username.");
  }
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
  const resultEl = document.getElementById("result");
  if (!isNaN(amount)) {
    const rate = 1.12; // Dummy exchange rate for testing
    resultEl.textContent = `Converted Amount: ${(amount * rate).toFixed(2)}`;
  } else {
    resultEl.textContent = "Invalid amount.";
  }
}
