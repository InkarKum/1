document.addEventListener("DOMContentLoaded", () => {
    loadHeroes();
    document.getElementById("next-hero").addEventListener("click", showNextHero);
});

let allHeroes = [];
let heroIndex = 0;
const heroesURL = "https://akabab.github.io/superhero-api/api/all.json";

async function loadHeroes() { 
    try { 
        const response = await fetch(heroesURL); 
        const data = await response.json(); 
        allHeroes = data.slice(0, 10); // Сохраняем только первые 10 героев для примера
        displayHero(allHeroes[heroIndex]);
    } catch (error) { 
        console.error(`Ошибка при загрузке данных: ${error}`); 
        document.getElementById("hero-title").innerText = "Ошибка при загрузке данных о героях!";
    } 
}

function displayHero(hero) {
    const imgElement = document.getElementById("hero-avatar");
    // Обновляем изображение с уникальным параметром, чтобы избежать кеширования
    imgElement.src = `${hero.images.md}?t=${new Date().getTime()}`;

    document.getElementById("hero-title").innerText = hero.name;
    document.getElementById("hero-description").innerText = "First Appearance: " + hero.biography.firstAppearance;
    document.getElementById("hero-gender").innerText = "Gender: " + hero.appearance.gender;
    document.getElementById("hero-race").innerText = "Race: " + hero.appearance.race;
    document.getElementById("hero-height").innerText = "Height: " + hero.appearance.height.join(", ");
    document.getElementById("hero-weight").innerText = "Weight: " + hero.appearance.weight.join(", ");
    document.getElementById("hero-eye-color").innerText = "Eye Color: " + hero.appearance.eyeColor;
    document.getElementById("hero-hair-color").innerText = "Hair Color: " + hero.appearance.hairColor;
    document.getElementById("hero-intelligence").innerText = "Intelligence: " + hero.powerstats.intelligence;
    document.getElementById("hero-strength").innerText = "Strength: " + hero.powerstats.strength;
    document.getElementById("hero-speed").innerText = "Speed: " + hero.powerstats.speed;
    document.getElementById("hero-durability").innerText = "Durability: " + hero.powerstats.durability;
}

function showNextHero() {
    heroIndex = (heroIndex + 1) % allHeroes.length; // Цикличное переключение индекса
    displayHero(allHeroes[heroIndex]);
}
