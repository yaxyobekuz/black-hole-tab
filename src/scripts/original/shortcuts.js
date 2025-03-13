const getShortcutsFromStorage = () => {
  return JSON.parse(localStorage.getItem("shortcuts")) || [];
};

const saveShortcutsToStorage = (shortcuts) => {
  localStorage.setItem("shortcuts", JSON.stringify(shortcuts.slice(0, 400)));
};

const initialShortcuts = [
  {
    name: "Google",
    url: "https://google.com",
    icon: "https://www.google.com/s2/favicons?sz=64&domain=google.com",
  },
  {
    name: "Youtube",
    url: "https://youtube.com",
    icon: "https://www.google.com/s2/favicons?sz=64&domain=youtube.com",
  },
];

let shortcuts = getShortcutsFromStorage();
if (!shortcuts.length) {
  shortcuts = initialShortcuts;
  saveShortcutsToStorage(shortcuts);
}

export const addShortcutToStorage = (name = "", url = "") => {
  const hostname = new URL(url).hostname;

  const shortcut = {
    url,
    name,
    icon: `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`,
  };

  shortcuts = [shortcut, ...shortcuts].slice(0, 4);
  saveShortcutsToStorage(shortcuts);
};

export default shortcuts;
