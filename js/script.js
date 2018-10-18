const heroesEndpoint = 'http://hotsapi.net/api/v1/heroes'
let heroes = [];

fetch(heroesEndpoint)
    .then(res => res.json())
    .then(data => heroes = data); 

function findMatches(wordToMatch, heroes){
    return heroes.filter(hero => {
        const regex = new RegExp(wordToMatch, 'gi');
        return hero.name.match(regex);
        
    })
}
function displayMatches(){
    const matchArray = findMatches(this.value, heroes);
    const html = matchArray.map(hero =>{
        return `
            <li class="listItem">
                <span class="clickMe">${hero.name}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
    if(search.value === ''){
        suggestions.innerHTML = '';
    }
}
const search = document.querySelector('.searchHero')
const suggestions = document.querySelector('.suggestions')


search.addEventListener('keyup', displayMatches);

suggestions.addEventListener('click', (e) => {
    if(e.target.className === 'listItem' || e.target.className === 'clickMe'){
        search.value = e.target.innerText;
        suggestions.innerHTML = '';
    }
})

const button = document.querySelector('.button')
const grid1 = document.querySelector('.selectHero')
const grid2 = document.querySelector('.heroInfo')
const tipList = document.querySelector('.tipList')
button.addEventListener('click', showData);


const tipsEndpoint = '/js/hero.json'

let character = [];
function findData(wordToMatch, character){
    return character.filter(chara => {
        const regex = new RegExp(wordToMatch, 'gi');
        return chara.name.match(regex);

    })
}

function showData(){
    const heroMatchArray = findMatches(search.value, character);
    grid1.classList.add("displayNone");
    grid2.classList.remove("displayNone");
    const tips = heroMatchArray.map(chara =>{
        return `
            <li>${chara.tip1}</li>
            <li>${chara.tip2}</li>
            <li>${chara.tip3}</li>
        `;
    }).join('');
    tipList.innerHTML = tips;

}
window.onload = function fetchData(){
    fetch(tipsEndpoint)
    .then(res => res.json())
    .then(data => character = data); 
}




