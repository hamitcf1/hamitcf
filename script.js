// Toggle dark mode
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load theme on page load
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  populateCurrencies();
  loadExchangeHistory();
});

// Login functionality
document.getElementById("loginButton").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("username", username);
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("exchangeSection").style.display = "block";
    document.getElementById("logoutButton").style.display = "inline-block";
  } else {
    alert("Please enter your username.");
  }
});

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", () => {
  localStorage.removeItem("username");
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("exchangeSection").style.display = "none";
  document.getElementById("logoutButton").style.display = "none";
});

// Populate currency dropdowns
function populateCurrencies() {
  const currencies = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" }
  ];

  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");

  currencies.forEach(currency => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency.code;
    optionFrom.textContent = `${currency.code} - ${currency.name}`;
    fromSelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency.code;
    optionTo.textContent = `${currency.code} - ${currency.name}`;
    toSelect.appendChild(optionTo);
  });
}

// Calculate exchange
function calculateExchange(event) {
  event.preventDefault();
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (amount && fromCurrency && toCurrency) {
    const result = (amount * 1.12).toFixed(2); // Dummy rate
    document.getElementById("result").textContent = `${result} ${toCurrency}`;
    saveHistory(amount, fromCurrency, toCurrency, result);
  }
}

// Save exchange history
function saveHistory(amount, from, to, result) {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  history.unshift(`${amount} ${from} = ${result} ${to}`);
  if (history.length > 10) history.pop();
  localStorage.setItem("history", JSON.stringify(history));
  loadExchangeHistory();
}

// Load exchange history
function loadExchangeHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const dropdown = document.getElementById("historyDropdown");
  dropdown.innerHTML = history.map(item => `<option>${item}</option>`).join("");
}

// Muhasebe rates calculation
function calculateMuhasebe(event) {
  event.preventDefault();
  const amount = parseFloat(document.getElementById("muhasebeAmount").value);
  const currency = document.getElementById("muhasebeCurrency").value;

  if (amount && currency) {
    const rate = 1.1; // Dummy rate
    document.getElementById("muhasebeResult").textContent = `${(amount * rate).toFixed(2)} ${currency}`;
  }
}
