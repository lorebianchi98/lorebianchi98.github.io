async function loadPublications() {
  const roots = Array.from(document.querySelectorAll("[data-publications-layout]"));
  if (roots.length === 0) {
    return;
  }

  try {
    const response = await fetch("data/publications.json");
    if (!response.ok) {
      throw new Error(`Unable to load publications data (${response.status})`);
    }

    const data = await response.json();
    roots.forEach((root) => {
      const layout = root.dataset.publicationsLayout;
      root.innerHTML = data.sections
        .map((section) => renderSection(section, layout))
        .join("");
    });
  } catch (error) {
    roots.forEach((root) => {
      root.innerHTML = `<p class="publications-error">Unable to load publications right now.</p>`;
    });
    console.error(error);
  }
}

function renderSection(section, layout) {
  const items = section.items.map((item) => renderPublication(item, layout)).join("");
  if (layout === "preview") {
    return items;
  }

  return `
    <section class="publication-group">
      <h2>${section.title}</h2>
      <div class="publication-list">
        ${items}
      </div>
    </section>
  `;
}

function renderPublication(publication, layout) {
  if (layout === "preview") {
    return renderPreviewPublication(publication);
  }

  const links = publication.links
    .map((link) => `<a href="${link.href}" target="_blank" rel="noopener noreferrer"><i class="${link.icon}"></i> ${link.label}</a>`)
    .join(" | ");

  const description = publication.description
    .map((paragraph) => `<p class="description">${paragraph}</p>`)
    .join("");

  return `
    <article class="publication card-hover">
      <img src="${publication.image}" alt="${publication.alt}" class="pub-image">
      <div class="pub-details">
        <h3>${publication.title}</h3>
        <p class="authors">${publication.authors}</p>
        <p class="venue">${publication.venue}</p>
        <p class="pub-links">${links}</p>
        ${description}
      </div>
    </article>
  `;
}

function renderPreviewPublication(publication) {
  const primaryLink = publication.links.find((link) => link.href && link.href !== "#") || publication.links[0];
  const href = primaryLink ? primaryLink.href : "#";

  return `
    <a href="${href}" target="_blank" rel="noopener noreferrer" class="pub-preview card-hover">
      <div class="pub-info">
        <h3>${publication.title}</h3>
        <p class="authors">${publication.authors}</p>
        <p class="venue">${publication.venue}</p>
      </div>
    </a>
  `;
}

document.addEventListener("DOMContentLoaded", loadPublications);
