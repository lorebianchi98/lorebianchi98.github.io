// === Research Journey Map (carousel-aware) ===
let leafletMap = null;
let mapInitialized = false;

function tryInitMap() {
  // Find the map div in the currently visible carousel item
  const currentItem = allItems[currentIndex];
  const mapDiv = currentItem && currentItem.querySelector('#research-map');
  if (mapDiv) {
    if (!mapInitialized) {
      leafletMap = L.map("research-map").setView([20, 0], 2); // world view
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(leafletMap);
      // --- Add research journey markers ---
      const locations = [
        { coords: [43.716, 10.403], title: "Pisa, Italy", desc: "PhD in Vision-Language AI at CNR & University of Pisa" },
        { coords: [47.3769, 8.5417], title: "Zürich, Switzerland", desc: "Research Intern at Disney Research Studios" },
        { coords: [47.484, -122.300], title: "Seattle, USA", desc: "CVPR 2024 – Highlight Paper Presentation" },
      ];
      locations.forEach(loc => {
        L.marker(loc.coords)
          .addTo(leafletMap)
          .bindPopup(`<strong>${loc.title}</strong><br>${loc.desc}`);
      });
      mapInitialized = true;
    }
    // Always invalidate size when the map item is active and visible
    setTimeout(() => {
      leafletMap && leafletMap.invalidateSize();
    }, 10);
  }
}
// Load shared header and footer
Promise.all([
  fetch("partials/header.html").then(r => r.text()),
  fetch("partials/footer.html").then(r => r.text())
]).then(([header, footer]) => {
  document.getElementById("site-header").innerHTML = header;
  document.getElementById("site-footer").innerHTML = footer;

  // Initialize modal behavior after header/footer load
  initModalViewer();
});

// ✅ Define modal viewer function
function initModalViewer() {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");

  // Use event delegation so it also works for dynamically loaded images
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("pub-image") || e.target.classList.contains("award-image")) {
      modal.style.display = "flex";
      modalImg.src = e.target.src;
    }
    if (e.target === closeBtn || e.target === modal) {
      modal.style.display = "none";
    }
  });
}

