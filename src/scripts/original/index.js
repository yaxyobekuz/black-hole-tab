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
