const participants = [
  "Suman",
  "Luca",
  "Celik",
  "Giuseppe",
  "Barbara",
  "Violca",
  "Cigdem",
  "Severin",
  "Torsten",
  "Miquel",
  "Umit",
  "Nesrin"
];

const participantProfiles = {
  Suman: {
    nationality: "Nepal",
    flag: "🇳🇵",
    flagImage: "https://flagsapi.com/NP/flat/64.png",
    photo: "https://raw.githubusercontent.com/rimalsuman-cyber/pizza-order/main/sumanrimal50X50.jpg",
    colors: ["#c6422f", "#2f5fbc"]
  },
  Luca: { nationality: "Italy", flag: "🇮🇹", flagImage: "https://flagsapi.com/IT/flat/64.png", colors: ["#2f7657", "#c6422f"] },
  Celik: { nationality: "Türkiye", flag: "🇹🇷", flagImage: "https://flagsapi.com/TR/flat/64.png", colors: ["#c6422f", "#8f1d1d"] },
  Giuseppe: { nationality: "Italy", flag: "🇮🇹", flagImage: "https://flagsapi.com/IT/flat/64.png", colors: ["#2f7657", "#c6422f"] },
  Barbara: { nationality: "Italy", flag: "🇮🇹", flagImage: "https://flagsapi.com/IT/flat/64.png", colors: ["#2f7657", "#c6422f"] },
  Violca: { nationality: "Albania", flag: "🇦🇱", flagImage: "https://flagsapi.com/AL/flat/64.png", colors: ["#c6422f", "#2d3134"] },
  Cigdem: { nationality: "Türkiye", flag: "🇹🇷", flagImage: "https://flagsapi.com/TR/flat/64.png", colors: ["#c6422f", "#8f1d1d"] },
  Severin: { nationality: "Switzerland", flag: "🇨🇭", flagImage: "https://flagsapi.com/CH/flat/64.png", colors: ["#c6422f", "#ffffff"] },
  Torsten: { nationality: "Germany", flag: "🇩🇪", flagImage: "https://flagsapi.com/DE/flat/64.png", colors: ["#2d3134", "#e5a935"] },
  Miquel: { nationality: "Albania", flag: "🇦🇱", flagImage: "https://flagsapi.com/AL/flat/64.png", colors: ["#c6422f", "#2f5fbc"] },
  Umit: { nationality: "Türkiye", flag: "🇹🇷", flagImage: "https://flagsapi.com/TR/flat/64.png", colors: ["#c6422f", "#8f1d1d"] },
  Nesrin: { nationality: "Türkiye", flag: "🇹🇷", flagImage: "https://flagsapi.com/TR/flat/64.png", colors: ["#c6422f", "#8f1d1d"] }
};

participantProfiles.Luca.photo = "Luca.JPG";
participantProfiles.Celik.photo = "Celik.JPG";
participantProfiles.Giuseppe.photo = "Giuseppe.JPG";
participantProfiles.Barbara.photo = "Barbara.JPG";
participantProfiles.Violca.photo = "Violca.JPG";
participantProfiles.Cigdem.photo = "Cigdem.JPG";
participantProfiles.Severin.photo = "Severin.JPG";
participantProfiles.Miquel.photo = "Miquel.JPG";

const dinnerItems = [
  "No order",
  "Margherita pizza",
  "Salami pizza",
  "Funghi pizza",
  "Vegetarian pizza",
  "Kebab",
  "Pullet pepito"
];

const restaurants = [
  "No restaurant",
  "Futurefoods",
  "Allmend Pizza Kebab",
  "PePe FOOD",
  "Tom's Diner Restaurant"
];

const restaurantPhones = {
  Futurefoods: "+41417503737",
  "Allmend Pizza Kebab": "+41566119944",
  "PePe FOOD": "+41787051973",
  "Tom's Diner Restaurant": "+41565257503"
};

const restaurantEmails = {
  Futurefoods: "Kontact@futurefoods.ch",
  "Allmend Pizza Kebab": "Kontact@allmendpizzakebab.ch",
  "PePe FOOD": "Kontact@pepefood.ch",
  "Tom's Diner Restaurant": "Kontact@tomsdiner.ch"
};

const drinks = [
  "No drink",
  "Water",
  "Cola",
  "Fanta",
  "Ice tea",
  "Ayran"
];

const sauces = [
  "No sauce",
  "Garlic sauce",
  "Spicy sauce",
  "Yogurt sauce",
  "Cocktail sauce",
  "BBQ sauce",
  "Ketchup"
];

const orders = Object.fromEntries(
  participants.map((name) => [
    name,
    {
      item: "No order",
      restaurant: "No restaurant",
      quantity: 0,
      drink: "No drink",
      sauce: "No sauce",
      note: "",
      time: "",
      paid: false
    }
  ])
);

let activeParticipant = participants[0];

const tabsEl = document.getElementById("participantTabs");
const activeNameEl = document.getElementById("activeName");
const activePhotoEl = document.getElementById("activePhoto");
const activeFlagEl = document.getElementById("activeFlag");
const activeNationalityEl = document.getElementById("activeNationality");
const activeStatusEl = document.getElementById("activeStatus");
const itemSelect = document.getElementById("itemSelect");
const restaurantSelect = document.getElementById("restaurantSelect");
const callButton = document.getElementById("callButton");
const emailButton = document.getElementById("emailButton");
const smsButton = document.getElementById("smsButton");
const drinkSelect = document.getElementById("drinkSelect");
const sauceSelect = document.getElementById("sauceSelect");
const quantityInput = document.getElementById("quantityInput");
const timeInput = document.getElementById("timeInput");
const paidInput = document.getElementById("paidInput");
const noteInput = document.getElementById("noteInput");
const quickItemsEl = document.getElementById("quickItems");
const summaryListEl = document.getElementById("summaryList");
const orderedCountEl = document.getElementById("orderedCount");
const totalParticipantsEl = document.getElementById("totalParticipants");
const totalItemsEl = document.getElementById("totalItems");
const scrollParticipantsLeft = document.getElementById("scrollParticipantsLeft");
const scrollParticipantsRight = document.getElementById("scrollParticipantsRight");

function fillSelect(select, options) {
  select.innerHTML = "";
  options.forEach((option) => {
    const optionEl = document.createElement("option");
    optionEl.value = option;
    optionEl.textContent = option;
    select.appendChild(optionEl);
  });
}

function isOrdered(order) {
  return order.quantity > 0 && order.item !== "No order";
}

function getProfilePhoto(name) {
  const profile = participantProfiles[name] || { colors: ["#756b62", "#f3eee8"] };
  if (profile.photo) {
    return profile.photo;
  }
  const initials = name.slice(0, 2).toUpperCase();
  const [primary, secondary] = profile.colors;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${primary}"/>
          <stop offset="1" stop-color="${secondary}"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" fill="url(#bg)"/>
      <circle cx="40" cy="30" r="15" fill="#fffaf3" opacity="0.92"/>
      <path d="M16 72c4-18 16-28 24-28s20 10 24 28" fill="#fffaf3" opacity="0.92"/>
      <text x="40" y="70" text-anchor="middle" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="#221d18">${initials}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderActiveProfile() {
  const profile = participantProfiles[activeParticipant] || {
    nationality: "Unknown",
    flag: "🏳️",
    colors: ["#756b62", "#f3eee8"]
  };
  activePhotoEl.src = getProfilePhoto(activeParticipant);
  activePhotoEl.alt = `${activeParticipant} photo`;
  activeFlagEl.innerHTML = "";
  if (profile.flagImage) {
    const flagImg = document.createElement("img");
    flagImg.src = profile.flagImage;
    flagImg.alt = `${profile.nationality} flag`;
    activeFlagEl.appendChild(flagImg);
  } else {
    activeFlagEl.textContent = profile.flag;
  }
  activeNationalityEl.textContent = profile.nationality;
}

function formatOrderDetails(order) {
  return [
    order.item,
    order.drink !== "No drink" ? order.drink : "",
    order.sauce && order.sauce !== "No sauce" ? order.sauce : "",
    order.time ? `Time ${order.time}` : "",
    order.note.trim()
  ].filter(Boolean).join(" · ");
}

function renderTabs() {
  const previousScroll = tabsEl.scrollLeft;
  tabsEl.innerHTML = "";
  participants.forEach((name) => {
    const button = document.createElement("button");
    const ordered = isOrdered(orders[name]);
    button.type = "button";
    button.textContent = name;
    button.className = [
      name === activeParticipant ? "active" : "",
      ordered ? "done" : ""
    ].filter(Boolean).join(" ");
    button.addEventListener("click", () => {
      saveActiveOrder();
      activeParticipant = name;
      render();
    });
    tabsEl.appendChild(button);
  });
  requestAnimationFrame(() => {
    tabsEl.scrollLeft = previousScroll;
    updateParticipantArrows();
  });
}

function updateParticipantArrows() {
  const maxScroll = tabsEl.scrollWidth - tabsEl.clientWidth;
  scrollParticipantsLeft.disabled = tabsEl.scrollLeft <= 2;
  scrollParticipantsRight.disabled = tabsEl.scrollLeft >= maxScroll - 2;
}

function scrollParticipants(direction) {
  tabsEl.scrollBy({
    left: direction * Math.max(170, tabsEl.clientWidth * 0.72),
    behavior: "smooth"
  });
  setTimeout(updateParticipantArrows, 260);
}

function renderQuickItems() {
  quickItemsEl.innerHTML = "";
  dinnerItems.filter((item) => item !== "No order").forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.replace(" pizza", "");
    button.className = orders[activeParticipant].item === item ? "selected" : "";
    button.addEventListener("click", () => {
      itemSelect.value = item;
      if (Number(quantityInput.value) === 0) {
        quantityInput.value = "1";
      }
      saveActiveOrder();
      render();
    });
    quickItemsEl.appendChild(button);
  });
}

function saveActiveOrder() {
  orders[activeParticipant] = {
    item: itemSelect.value,
    restaurant: restaurantSelect.value,
    quantity: Math.max(0, Math.min(9, Number(quantityInput.value) || 0)),
    drink: drinkSelect.value,
    sauce: sauceSelect.value,
    note: noteInput.value,
    time: timeInput.value,
    paid: paidInput.checked
  };
}

function loadActiveOrder() {
  const order = orders[activeParticipant];
  activeNameEl.textContent = activeParticipant;
  renderActiveProfile();
  itemSelect.value = order.item;
  restaurantSelect.value = order.restaurant || "No restaurant";
  drinkSelect.value = order.drink;
  sauceSelect.value = order.sauce || "No sauce";
  quantityInput.value = String(order.quantity);
  timeInput.value = order.time || "";
  paidInput.checked = Boolean(order.paid);
  noteInput.value = order.note;

  const ordered = isOrdered(order);
  activeStatusEl.textContent = ordered ? (order.paid ? "Paid" : "Ordered") : "Not ordered";
  activeStatusEl.classList.toggle("done", ordered);
  updateRestaurantActions();
}

function getRestaurantPhone(restaurant) {
  return restaurantPhones[restaurant] || "";
}

function updateRestaurantActions() {
  const restaurant = restaurantSelect.value;
  const phone = getRestaurantPhone(restaurantSelect.value);
  callButton.hidden = !phone;
  smsButton.hidden = !phone;
  if (!phone) {
    callButton.removeAttribute("href");
    callButton.removeAttribute("aria-label");
    smsButton.removeAttribute("href");
    smsButton.removeAttribute("aria-label");
  } else {
    callButton.href = `tel:${phone}`;
    callButton.setAttribute("aria-label", `Call ${restaurant}`);
    smsButton.href = `sms:${phone}`;
    smsButton.setAttribute("aria-label", `SMS ${restaurant}`);
  }

  const email = restaurantEmails[restaurant] || "";
  emailButton.hidden = restaurant === "No restaurant";
  emailButton.classList.toggle("disabled", !email);
  if (!email) {
    emailButton.removeAttribute("href");
    emailButton.setAttribute("aria-disabled", "true");
    emailButton.setAttribute("title", "Email address will be added later");
    return;
  }

  const subject = encodeURIComponent("Dinner order");
  const body = encodeURIComponent(getEmailBody());
  emailButton.href = `mailto:${email}?subject=${subject}&body=${body}`;
  emailButton.removeAttribute("aria-disabled");
  emailButton.setAttribute("aria-label", `Email ${restaurant}`);
  emailButton.removeAttribute("title");
}

function getEmailBody() {
  return [
    "Hallo grüezi,",
    "",
    "Bitte machen Sie alles parat bis 17:55 dass ich komme zu holen.",
    "",
    getOrderText(),
    "",
    "Danke",
    "Grüsse",
    "Suman",
    "OerlikonMetco AG",
    "0764678511"
  ].join("\n");
}

function renderSummary() {
  const orderedEntries = participants
    .map((name) => [name, orders[name]])
    .filter(([, order]) => isOrdered(order));

  orderedCountEl.textContent = String(orderedEntries.length);
  totalParticipantsEl.textContent = String(participants.length);
  totalItemsEl.textContent = String(orderedEntries.reduce((sum, [, order]) => sum + order.quantity, 0));

  summaryListEl.innerHTML = "";
  if (orderedEntries.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No dinner choices yet.";
    summaryListEl.appendChild(empty);
    return;
  }

  orderedEntries.forEach(([name, order]) => {
    const item = document.createElement("article");
    item.className = "summary-item";
    item.innerHTML = `
      <div>
        <strong>${name}</strong>
        <small>${formatOrderDetails(order)}</small>
      </div>
      <div class="summary-meta">
        <span class="paid-badge ${order.paid ? "done" : ""}">${order.paid ? "Paid" : "Unpaid"}</span>
        <strong>x${order.quantity}</strong>
      </div>
    `;
    summaryListEl.appendChild(item);
  });
}

function render() {
  renderTabs();
  loadActiveOrder();
  renderQuickItems();
  renderSummary();
}

function getOrderText() {
  const lines = participants
    .map((name) => [name, orders[name]])
    .filter(([, order]) => isOrdered(order))
    .map(([name, order]) => {
      const drink = order.drink !== "No drink" ? `, ${order.drink}` : "";
      const sauce = order.sauce && order.sauce !== "No sauce" ? `, ${order.sauce}` : "";
      const time = order.time ? `, time ${order.time}` : "";
      const paid = order.paid ? ", paid" : ", unpaid";
      const noteText = order.note.trim();
      const note = noteText ? ` (${noteText})` : "";
      return `${name}: ${order.quantity} x ${order.item}${drink}${sauce}${time}${paid}${note}`;
    });
  return lines.length ? lines.join("\n") : "No dinner choices yet.";
}

fillSelect(itemSelect, dinnerItems);
fillSelect(restaurantSelect, restaurants);
fillSelect(drinkSelect, drinks);
fillSelect(sauceSelect, sauces);

[itemSelect, restaurantSelect, drinkSelect, sauceSelect, quantityInput, timeInput, paidInput, noteInput].forEach((input) => {
  input.addEventListener("input", () => {
    saveActiveOrder();
    render();
  });
});

paidInput.addEventListener("change", () => {
  saveActiveOrder();
  render();
});

document.getElementById("decreaseQty").addEventListener("click", () => {
  quantityInput.value = String(Math.max(0, Number(quantityInput.value) - 1));
  if (Number(quantityInput.value) === 0) {
    itemSelect.value = "No order";
  }
  saveActiveOrder();
  render();
});

document.getElementById("increaseQty").addEventListener("click", () => {
  quantityInput.value = String(Math.min(9, Number(quantityInput.value) + 1));
  if (itemSelect.value === "No order") {
    itemSelect.value = "Margherita pizza";
  }
  saveActiveOrder();
  render();
});

document.getElementById("resetButton").addEventListener("click", () => {
  participants.forEach((name) => {
    orders[name] = {
      item: "No order",
      restaurant: "No restaurant",
      quantity: 0,
      drink: "No drink",
      sauce: "No sauce",
      note: "",
      time: "",
      paid: false
    };
  });
  render();
});

scrollParticipantsLeft.addEventListener("click", () => {
  scrollParticipants(-1);
});

scrollParticipantsRight.addEventListener("click", () => {
  scrollParticipants(1);
});

tabsEl.addEventListener("scroll", updateParticipantArrows);
window.addEventListener("resize", updateParticipantArrows);

document.getElementById("copyButton").addEventListener("click", async () => {
  const text = getOrderText();
  try {
    await navigator.clipboard.writeText(text);
    document.getElementById("copyButton").textContent = "Copied";
    setTimeout(() => {
      document.getElementById("copyButton").textContent = "Copy list";
    }, 1200);
  } catch {
    window.prompt("Copy order list", text);
  }
});

render();
