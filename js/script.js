// variable for .overview div in intro section
const overview = document.querySelector(".overview");
// Github username
const username = "madelinekreiff";

// async function to fetch GitHub profile information using the GitHub API
const getInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayInfo(data);
};

// function to use the data fetched from getInfo() to display profile information
const displayInfo = function (data) {
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




getInfo();