// select .overview div in intro section
const overview = document.querySelector(".overview");
// select .repos section
const repoSection = document.querySelector(".repos");
// select .repo-list ul in repos section
const repoList = document.querySelector(".repo-list");
// select .repo-data section
const repoData = document.querySelector(".repo-data");
// select .view-repos "Back to Repo Gallery" button
const backToGalleryButton = document.querySelector(".view-repos");
// select .filter-repos "Search by name" input field
const filterInput = document.querySelector(".filter-repos");
// Github username
const username = "madelinekreiff";

// async function to fetch GitHub profile info using the GitHub API
const getProfileInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayProfileInfo(data);
};

// function to display profile info
const displayProfileInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML =
        `<figure>
            <img src=${data.avatar_url} alt="user avatar" />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
    overview.append(div);
};

getProfileInfo();

// async function to fetch GitHub repos
const getRepos = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await res.json();
    displayRepos(repos);
};

// function to display repo names
const displayRepos = function (repos) {
    for (let repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

getRepos();

// event listener for clicking on different repos in repoList
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

// async function to fetch GitHub repo info
const getRepoInfo = async function (repoName) {
    const fetchRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepo.json();
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
    }
    displayRepoInfo(repoInfo, languages);
};

// function to display repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML =
        `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backToGalleryButton.remove("hide");
};

// event listener for clicking the "Back to Repo Galler" button
backToGalleryButton.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backToGalleryButton.add("hide");
});