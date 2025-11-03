const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");

// Caută și cu Enter
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") fetchBooks();
});

searchButton.addEventListener("click", fetchBooks);

async function fetchBooks() {
  const keyword = searchInput.value.trim();
  if (!keyword) {
    alert("Introdu un cuvânt cheie!");
    return;
  }

  resultsContainer.innerHTML = "<p>⏳ Căutăm cărțile...</p>";

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(keyword)}`
    );
    const data = await response.json();

    if (!data.docs.length) {
      resultsContainer.innerHTML = "<p>❌ Nicio carte găsită.</p>";
      return;
    }

    displayBooks(data.docs.slice(0, 15));
  } catch (error) {
    resultsContainer.innerHTML = "<p>⚠️ Eroare de rețea! Încearcă din nou.</p>";
  }
}

function displayBooks(books) {
  resultsContainer.innerHTML = "";

  books.forEach(book => {
    const title = book.title ?? "Titlu necunoscut";
    const author = book.author_name ? book.author_name[0] : "Autor necunoscut";

    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://via.placeholder.com/200x300?text=No+Cover";

    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <img src="${cover}" alt="Coperta cărții">
      <div class="book-title">${title}</div>
      <div class="author">${author}</div>
    `;

    resultsContainer.appendChild(card);
  });
}
