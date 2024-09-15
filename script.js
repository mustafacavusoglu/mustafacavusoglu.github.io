// Function to get pinned GitHub projects from pinned_projects.json
async function fetchGitHubProjects() {
    const response = await fetch('pinned_projects.json');
    const data = await response.json();
    return data;
}


// Function to fetch Medium articles
async function fetchMediumArticles() {
    const username = 'mustafacavussoglu';
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`);
    const data = await response.json();
    return data.items.slice(0, 5); // Get the first 5 articles
}

// Function to create project cards
function createProjectCard(project) {
    return `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.description || 'No description available.'}</p>
            <a href="${project.url}" target="_blank">View on GitHub</a>
        </div>
    `;
}

// Function to create article cards
function createArticleCard(article) {
    return `
        <div class="article-card">
            <h3>${article.title}</h3>
            <p>${article.pubDate}</p>
            <a href="${article.link}" target="_blank">Read on Medium</a>
        </div>
    `;
}

// Function to initialize the page
async function init() {
    try {
        const projects = await fetchGitHubProjects();
        const projectsContainer = document.getElementById('github-projects');
        projectsContainer.innerHTML = projects.map(createProjectCard).join('');

        const articles = await fetchMediumArticles();
        const articlesContainer = document.getElementById('medium-articles');
        articlesContainer.innerHTML = articles.map(createArticleCard).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);