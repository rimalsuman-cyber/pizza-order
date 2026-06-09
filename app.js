const participants = [
  "Suman",
  "Luca",
  "Celik",
  "Barbara",
  "Violca",
  "Cigdem",
  "Severin",
  "Torsten",
  "Miguel",
  "Umit",
  "Nesrin"
];

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
  "Futurefoods Tel.: +41417503737",
  "Allmend Pizza Kebab Tel.: +41566119944",
  "PePe FOOD Tel.: +41787051973",
  "Tom's Diner Restaurant Tel.: +41565257503"
];

const restaurantEmails = {
  "Futurefoods Tel.: +41417503737": "Kontact@futurefoods.ch",
  "Allmend Pizza Kebab Tel.: +41566119944": "Kontact@allmendpizzakebab.ch",
  "PePe FOOD Tel.: +41787051973": "Kontact@pepefood.ch",
  "Tom's Diner Restaurant Tel.: +41565257503": "Kontact@tomsdiner.ch"
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
    { item: "No order", restaurant: "No restaurant", quantity: 0, drink: "No drink", sauce: "No sauce", note: "" }
  ])
);

let activeParticipant = participants[0];

const tabsEl = document.getElementById("participantTabs");
const activeNameEl = document.getElementById("activeName");
const activeStatusEl = document.getElementById("activeStatus");
const itemSelect = document.getElementById("itemSelect");
const restaurantSelect = document.getElementById("restaurantSelect");
const callButton = document.getElementById("callButton");
const emailButton = document.getElementById("emailButton");
const smsButton = document.getElementById("smsButton");
const drinkSelect = document.getElementById("drinkSelect");
const sauceSelect = document.getElementById("sauceSelect");
const quantityInput = document.getElementById("quantityInput");
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

function formatOrderDetails(order) {
  return [
    order.item,
    order.drink !== "No drink" ? order.drink : "",
    order.sauce && order.sauce !== "No sauce" ? order.sauce : "",
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
    note: noteInput.value
  };
}

function loadActiveOrder() {
  const order = orders[activeParticipant];
  activeNameEl.textContent = activeParticipant;
  itemSelect.value = order.item;
  restaurantSelect.value = order.restaurant || "No restaurant";
  drinkSelect.value = order.drink;
  sauceSelect.value = order.sauce || "No sauce";
  quantityInput.value = String(order.quantity);
  noteInput.value = order.note;

  const ordered = isOrdered(order);
  activeStatusEl.textContent = ordered ? "Ordered" : "Not ordered";
  activeStatusEl.classList.toggle("done", ordered);
  updateRestaurantActions();
}

function getRestaurantPhone(restaurant) {
  const match = restaurant.match(/Tel\.:\s*([+\d\s]+)/);
  return match ? match[1].replace(/\s/g, "") : "";
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
      <strong>x${order.quantity}</strong>
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
      const noteText = order.note.trim();
      const note = noteText ? ` (${noteText})` : "";
      return `${name}: ${order.quantity} x ${order.item}${drink}${sauce}${note}`;
    });
  return lines.length ? lines.join("\n") : "No dinner choices yet.";
}

fillSelect(itemSelect, dinnerItems);
fillSelect(restaurantSelect, restaurants);
fillSelect(drinkSelect, drinks);
fillSelect(sauceSelect, sauces);

[itemSelect, restaurantSelect, drinkSelect, sauceSelect, quantityInput, noteInput].forEach((input) => {
  input.addEventListener("input", () => {
    saveActiveOrder();
    render();
  });
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
      note: ""
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
