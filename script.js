let chapters = [];
const chapterListDiv = document.getElementById("chapter-list");
const readerDiv = document.getElementById("reader");
const comicPage = document.getElementById("comic-page");
const backBtn = document.getElementById("back");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");

let currentChapter = null;
let currentPage = 0;
let zoom = 1;

// Load chapters from JSON
fetch('chapters.json')
  .then(res => res.json())
  .then(data => {
    chapters = data;
    showChapterList();
  })
  .catch(err => console.error("Error loading chapters.json:", err));

// Show list of chapters
function showChapterList() {
  readerDiv.style.display = "none";
  chapterListDiv.style.display = "block";
  chapterListDiv.innerHTML = "<h1>Chapters</h1><ul>" +
    chapters.map((ch, i) => `<li onclick="openChapter(${i})">${ch.title}</li>`).join("") +
    "</ul>";
}

// Open a chapter
function openChapter(index) {
  currentChapter = chapters[index];
  currentPage = parseInt(localStorage.getItem(currentChapter.title)) || 0;
  chapterListDiv.style.display = "none";
  readerDiv.style.display = "block";
  zoom = 1;
  showPage();
}

// Show current page
function showPage() {
  if (!currentChapter || currentPage < 0 || currentPage >= currentChapter.pages.length) return;
  comicPage.src = currentChapter.pages[currentPage];
  comicPage.style.transform = `scale(${zoom})`;
  localStorage.setItem(currentChapter.title, currentPage);
}

// Controls
prevBtn.onclick = () => { if (currentPage > 0) { currentPage--; showPage(); } };
nextBtn.onclick = () => { if (currentPage < currentChapter.pages.length - 1) { currentPage++; showPage(); } };
zoomInBtn.onclick = () => { zoom += 0.1; showPage(); };
zoomOutBtn.onclick = () => { zoom = Math.max(0.5, zoom - 0.1); showPage(); };
backBtn.onclick = showChapterList;
