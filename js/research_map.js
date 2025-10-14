
document.addEventListener('DOMContentLoaded', function() {
  var map = L.map('research-map').setView([43.716, 10.401], 1);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map);
  // Add pins for each publication location
  var locations = [
    {
      coords: [43.9172, 10.6486],
      title: 'Collodi, Italy',
      desc: 'Hometown — Where my journey began.'
    },
    {
      coords: [43.716, 10.401],
      title: 'Pisa, Italy',
        desc: 'My academic hometown — Bachelor’s, Master’s, and PhD at the University of Pisa. Research Associate at CNR (National Research Council of Italy).'
    },
    {
      coords: [47.3769, 8.5417],
      title: 'Zürich, Switzerland',
      desc: 'Disney Research | Studios — Research Intern, 2025'
    },
    {
      coords: [44.6471, 10.9252],
      title: 'Modena, Italy',
      desc: 'ELLIS Summer School 2024.'
    },
    {
      coords: [21.3069, -157.8583],
      title: 'Hawaii, USA',
      desc: 'ICCV 2025 — Paper Presentation.'
    },
    {
      coords: [47.6062, -122.3321],
      title: 'Seattle, USA',
      desc: 'CVPR 2024 — Highlight Paper Presentation.'
    },
    {
      coords: [64.1466, -21.9426],
      title: 'Reykjavik, Iceland',
      desc: 'CBMI 2024 — Best Paper Award.'
    },
    {
      coords: [36.7306, 14.9333],
      title: 'Punta Sampieri, Italy',
      desc: 'ICVSS 2025 — International Computer Vision Summer School.'
    },
    {
      coords: [43.7696, 11.2558],
      title: 'Florence, Italy',
      desc: 'IEEE-CH 2025 — Best Paper Award.'
    },

  ];
  locations.forEach(function(loc) {
    L.marker(loc.coords)
      .addTo(map)
      .bindPopup('<strong>' + loc.title + '</strong><br>' + loc.desc);
  });
});