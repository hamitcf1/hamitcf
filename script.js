const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

const CURRENCY_NAMES = {
  USD: "United States Dollar",
  EUR: "Euro",
  TRY: "Turkish Lira",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  // Add more currencies as needed
};

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Login functionality
window.onload = () => {
  const username = getCookie('username');
  if (username) {
    showLoggedInState(username);
  } else {
    document.getElementById('loginContainer').style.display = 'block';
  }

  populateCurrencies();
};

document.getElementById('loginButton').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  if (username) {
    setCookie('username', username, 30);
    showLoggedInState(username);
  } else {
    alert('Please enter a valid username.');
  }
});

function showLoggedInState(username) {
  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('exchangeForm').style.display = 'block';
  document.getElementById('favoriteContainer').style.display = 'block';
  document.getElementById('greeting').innerText = `Welcome back, ${username}!`;
  document.getElementById('greeting').style.display = 'block';

  loadFavorites();
}

// Currency population
async function populateCurrencies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    currencies.forEach(currency => {
      const currencyName = `${currency} - ${CURRENCY_NAMES[currency] || "Unknown Currency"}`;
      const optionFrom = document.createElement('option');
      const optionTo = document.createElement('option');
      optionFrom.value = currency;
      optionTo.value = currency;
      optionFrom.textContent = currencyName;
      optionTo.textContent = currencyName;

      fromCurrencySelect.appendChild(optionFrom);
      toCurrencySelect.appendChild(optionTo);
    });

    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';
  } catch (error) {
    console.error('Error loading currencies:', error);
  }
}

// Save favorites
document.getElementById('saveFavorite').addEventListener('click', () => {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  if (fromCurrency && toCurrency) {
    const favorite = `${fromCurrency}-${toCurrency}`;
    let favorites = getCookie('favorites') || '';
    favorites = favorites ? favorites.split(',') : [];
    if (!favorites.includes(favorite)) {
      favorites.push(favorite);
      setCookie('favorites', favorites.join(','), 30);
      alert('Favorite saved!');
      loadFavorites();
    } else {
      alert('This currency pair is already in your favorites.');
    }
  }
});

function loadFavorites() {
  const favoritesDropdown = document.getElementById('favorites');
  favoritesDropdown.innerHTML = '';

  const favorites = getCookie('favorites');
  if (favorites) {
    const options = favorites.split(',').map(fav => {
      const [from, to] = fav.split('-');
      const fromName = CURRENCY_NAMES[from] || from;
      const toName = CURRENCY_NAMES[to] || to;
      return `<option value="${fav}">${from} - ${fromName} → ${to} - ${toName}</option>`;
    }).join('');
    favoritesDropdown.innerHTML = options;
  } else {
    favoritesDropdown.innerHTML = '<option value="">No favorites saved</option>';
  }
}

// Conversion calculation
async function calculateExchange(event) {
  event.preventDefault();

  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  if (isNaN(amount) || amount <= 0) {
    document.getElementById('result').innerText = 'Please enter a valid amount.';
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];

    if (!rate) {
      document.getElementById('result').innerText = `Exchange rate not available for ${toCurrency}.`;
      return;
    }

    const convertedAmount = (amount * rate).toFixed(2);
    document.getElementById('result').innerText = `${convertedAmount} ${toCurrency}`;
  } catch (error) {
    document.getElementById('result').innerText = `Error: ${error.message}`;
  }
}

// Cookie Helpers
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return value;
    }
  }
  return '';
}
