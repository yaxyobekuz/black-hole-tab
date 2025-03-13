import { addShortcutToStorage } from "./shortcuts.js";

// Shortcuts
const elShortcuts = document.getElementById("shortcuts");

const createShortcutComponent = ({ icon, url, name }) => {
  const li = document.createElement("li");
  li.classList.add("shortcut-item");

  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.classList.add("shortcut-item-inner");

  const span = document.createElement("span");
  span.classList.add("shortcut-icon-wrapper");

  const img = document.createElement("img");
  img.classList.add("shortcut-icon");
  img.setAttribute("width", "32");
  img.setAttribute("height", "32");
  img.setAttribute("alt", name);
  img.setAttribute("src", icon);

  const h3 = document.createElement("h3");
  h3.classList.add("shortcut-name");
  h3.textContent = name;

  span.appendChild(img);
  a.appendChild(span);
  a.appendChild(h3);
  li.appendChild(a);

  return li;
};

const renderShortcuts = () => {
  elShortcuts.innerHTML = "";
  const shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];
  shortcuts.forEach((shortcut) => {
    elShortcuts.appendChild(createShortcutComponent(shortcut));
  });
};

renderShortcuts();

// Searchbox
const elSearchbox = document.querySelector("#searchbox");
elSearchbox.addEventListener("submit", (e) => {
  e.preventDefault();

  const elSearchInput = e.target.querySelector("#search-input");
  const query = elSearchInput?.value?.trim();

  if (query?.length > 0) {
    const formattedQuery = encodeURIComponent(query);
    window.location.href = `https://www.google.com/search?q=${formattedQuery}`;
  }
});

// Modal
const elModal = document.getElementById("modal");
const elUrlInput = document.getElementById("url-input");
const elNameInput = document.getElementById("name-input");
const elCancelBtn = document.getElementById("cancel-btn");
const elModalForm = document.getElementById("modal-form");
const elAddShortcutBtn = document.getElementById("add-shortcut-btn");

const closeModal = () => elModal.classList.add("hidden");

elCancelBtn.addEventListener("click", closeModal);
elAddShortcutBtn.addEventListener("click", () => {
  elModal.classList.remove("hidden");
});

elModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const url = elUrlInput.value.trim();
  const name = elNameInput.value.trim().slice(0, 14);

  if (!url || !name) {
    alert("Iltimos, barcha maydonlarni to'ldiring!");
    return;
  }

  addShortcutToStorage(name, url);
  renderShortcuts();

  elUrlInput.value = "";
  elNameInput.value = "";
  closeModal();
});
