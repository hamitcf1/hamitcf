// Dark mode toggle functionality
document.getElementById("darkModeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const currentMode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", currentMode);  // Save theme preference
});

// Load previously saved theme
window.addEventListener("load", function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// User login functionality
document.getElementById("loginButton").addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("username", username); // Save username to localStorage
    document.getElementById("greeting").textContent = `Welcome, ${username}`;
    document.getElementById("greeting").style.display = "block";
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("exchangeForm").style.display = "block";
    updateFavorites();
  } else {
    alert("Please enter a username!");
  }
});

// Save favorite currencies functionality
document.getElementById("saveFavorite").addEventListener("click", function () {
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (fromCurrency && toCurrency) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push({ from: fromCurrency, to: toCurrency });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavorites();
  } else {
    alert("Please select both from and to currencies.");
  }
});

// Update the favorites dropdown
function updateFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesSelect = document.getElementById("favorites");
  favoritesSelect.innerHTML = "";

  if (favorites.length === 0) {
    favoritesSelect.innerHTML = "<option value=''>No favorites saved</option>";
  } else {
    favorites.forEach(fav => {
      const option = document.createElement("option");
      option.textContent = `${fav.from} - ${fav.to}`;
      favoritesSelect.appendChild(option);
    });
  }
}

// Example function for currency conversion (not functional)
function calculateExchange(event) {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (amount && fromCurrency && toCurrency) {
    // Add your currency conversion logic here
    document.getElementById("result").textContent = `Converted Amount: ${amount} ${fromCurrency} to ${toCurrency}`;
  }
}

// Prepopulate currencies (this could be done dynamically via an API)
const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"];
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");

currencies.forEach(currency => {
  const fromOption = document.createElement("option");
  fromOption.value = currency;
  fromOption.textContent = currency;
  fromCurrencySelect.appendChild(fromOption);

  const toOption = document.createElement("option");
  toOption.value = currency;
  toOption.textContent = currency;
  toCurrencySelect.appendChild(toOption);
});
