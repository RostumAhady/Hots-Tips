const button = document.querySelector('.button')
const grid1 = document.querySelector('.selectHero')
const grid2 = document.querySelector('.heroInfo')
const tipList = document.querySelector('.tipList')
const heroImg = document.querySelector('.heroImg')
const search = document.querySelector('.searchHero')
const suggestions = document.querySelector('.suggestions')
const returnArrow = document.querySelector('.fa-arrow-left')
search.addEventListener('keyup', displayMatches);
button.addEventListener('click', showHeroInfo);

// API hotsapi.net and adding into empty array variable
const heroesEndpoint = 'http://hotsapi.net/api/v1/heroes'
let heroes = [];

fetch(heroesEndpoint)
    .then(res => res.json())
    .then(data => heroes = data); 
// to match the user input text to the names of all heroes in API
function findMatches(wordToMatch, heroes){
    return heroes.filter(hero => {
        const regex = new RegExp(wordToMatch, 'gi'); 
        return hero.name.match(regex);
        
    })
}
// display the matches that are found in API and display them as a list
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
        clearFields()
    }
}

//click suggested matches and fill search field with match
suggestions.addEventListener('click', (e) => {
    if(e.target.className === 'listItem' || e.target.className === 'clickMe'){
        search.value = e.target.innerText;
        suggestions.innerHTML = '';
    }
})

// array that holds all hero.json data
const tipsEndpoint = '/js/hero.json'
let character = [];
window.onload = function fetchData(){
    fetch(tipsEndpoint)
    .then(res => res.json())
    .then(data => character = data); 
}

//uses findMatches again to compare user search to local json. if matched, will display hero info.
function showHeroInfo(){
    const matchArray = findMatches(search.value, character);
    grid1.classList.add("displayNone");
    grid2.classList.remove("displayNone");
    const tips = matchArray.map(chara =>{
        heroImg.src = `${chara.img}`;
        return `
            <li>${chara.tip1}</li>
            <li>${chara.tip2}</li>
            <li>${chara.tip3}</li>
            <li>${chara.tip4}</li>
            <li>${chara.tip5}</li>
        `;
    }).join('');
    tipList.innerHTML = tips;
}

// use enter to submit
search.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        showHeroInfo();
        e.preventDefault();
    }
})

// return to search hero page

returnArrow.addEventListener('click', () => {
    grid2.classList.add("displayNone");
    grid1.classList.remove("displayNone");
    clearFields()
})

// clear search field and suggestions
function clearFields(){
    search.value = '';
    suggestions.innerHTML = '';
}

// key down through list items

// const li = document.querySelectorAll('.listItem');
// let liSelected;
// window.addEventListener('keydown', (e) => {
//     if(e.which === 40){
//         if(liSelected){
//             liSelected.removeClass('selected');
//             next = liSelected.next();
//             if(next.length > 0){
//                 liSelected = next.addClass('selected');
//             }else{
//                 liSelected = li.eq(0).addClass('selected');
//             }
//         }else{
//             liSelected = li.eq(0).addClass('selected');
//         }
//     }else if(e.which === 38){
//         if(liSelected){
//             liSelected.removeClass('selected');
//             next = liSelected.prev();
//             if(next.length > 0){
//                 liSelected = next.addClass('selected');
//             }else{
//                 liSelected = li.last().addClass('selected');
//             }
//         }else{
//             liSelected = li.last().addClass('selected');
//         }
//     }

// });




