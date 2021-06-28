// variable for .overview div in intro section
const overview = document.querySelector(".overview");
// variable for .repo-list ul in repos section
const repoList = document.querySelector(".repo-list");
// Github username
const username = "madelinekreiff";

// async function to fetch GitHub profile information using the GitHub API
const getProfileInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayProfileInfo(data);
};

// function to display profile information
const displayProfileInfo = function (data) {
    let div = document.createElement("div");
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
    const data = await res.json();
    displayRepos(data);

    // console.log(data);
};

// function to display repo information
const displayRepos = function (repos) {
    for (let repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

getRepos();