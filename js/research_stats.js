function getNextPageUrl(response) {
  const linkHeader = response.headers.get("link");
  const nextMatch = linkHeader && linkHeader.match(/<([^>]+)>;\s*rel="next"/);
  return nextMatch ? nextMatch[1] : null;
}

async function fetchTotalGitHubStars(username, isOrg = false) {
  let total = 0;
  const entityType = isOrg ? "orgs" : "users";
  let url = `https://api.github.com/${entityType}/${encodeURIComponent(username)}/repos?per_page=100&type=public`;

  while (url) {
    const response = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    total += repos.reduce(
      (stars, repo) => stars + (repo.fork ? 0 : repo.stargazers_count || 0),
      0
    );
    url = getNextPageUrl(response);
  }

  return total;
}

async function fetchTotalDownloads(author) {
  let total = 0;
  let url = `https://huggingface.co/api/models?author=${encodeURIComponent(author)}&expand[]=downloadsAllTime`;

  while (url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const models = await response.json();
    total += models.reduce(
      (downloads, model) => downloads + (model.downloadsAllTime || 0),
      0
    );
    url = getNextPageUrl(response);
  }

  return total;
}

async function loadScholarCitations() {
  const response = await fetch(`stats.json?t=${Date.now()}`);
  if (!response.ok) {
    throw new Error(`Could not load stats.json: ${response.status}`);
  }

  const data = await response.json();
  return data.citations;
}

function setStatValue(id, value) {
  document.getElementById(id).textContent = value.toLocaleString();
}

function setStatError(id) {
  document.getElementById(id).textContent = "—";
}

Promise.allSettled([
  fetchTotalGitHubStars("lorebianchi98"),
  loadScholarCitations(),
  fetchTotalDownloads("lorebianchi98")
]).then(([github, scholar, huggingFace]) => {
  const results = [
    [github, "gh-stars"],
    [scholar, "scholar-citations"],
    [huggingFace, "hf-downloads"]
  ];

  results.forEach(([result, id]) => {
    if (result.status === "fulfilled") {
      setStatValue(id, result.value);
    } else {
      console.error(`Could not load ${id}`, result.reason);
      setStatError(id);
    }
  });
});
