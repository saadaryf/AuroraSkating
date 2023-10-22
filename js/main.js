//dev contact button 
const devBtn = document.getElementById('developer')
devBtn.addEventListener('click', devInfo);

function devInfo() {
    const githubLink = 'https://github.com/saadaryf';
    const message = 'Name: Saad Arif\nEmail: saadaryf@gmail.com\nGitHub: ' + githubLink + '\n\nNote: This site is just for fun and may not be fully responsive. For the best experience, consider opening it on a PC or larger screen.';
    alert(message);
}




// falling snow
// script.js
document.getElementById("startSnowfall").addEventListener("click", () => {
    createSnowflakes();
});
document.getElementById("rain").addEventListener("click", () => {
    createRain();
});
function createRain() {
    const snowfallContainer = document.getElementById("snowfall");
    for (let i = 0; i < 50; i++) {
        const raindrop = document.createElement("div");
        raindrop.className = "raindrop";
        raindrop.style.left = `${Math.random() * window.innerWidth}px`;
        raindrop.style.animationDuration = `${Math.random() * 0.1 + 1}s`;
        raindrop.style.animationDelay = `${Math.random() * 2}s`;
        snowfallContainer.appendChild(raindrop);
    }

    setTimeout(() => {
        // Clear the rain after a certain time
        snowfallContainer.innerHTML = "";
    }, 20000);
}
function createSnowflakes() {
    const snowfallContainer = document.getElementById("snowfall");

    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        snowflake.style.left = `${Math.random() * window.innerWidth}px`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.animationDelay = `${Math.random() * 2}s`;
        snowfallContainer.appendChild(snowflake);
    }

    setTimeout(() => {
        // Clear the snowflakes after a certain time
        snowfallContainer.innerHTML = "";
    }, 20000);
}

