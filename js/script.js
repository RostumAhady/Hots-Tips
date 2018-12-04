const button = document.querySelector('.button')
const grid1 = document.querySelector('.selectHero')
const grid2 = document.querySelector('.heroInfo')
const tipList = document.querySelector('.tipList')
const heroImg = document.querySelector('.character')
const alignTop = document.querySelector('.align-top')
const alignLeft = document.querySelector('.align-left')
const alignRight = document.querySelector('.align-right')
const alignBottom = document.querySelector('.align-bottom')
const search = document.querySelector('.searchHero')
const suggestions = document.querySelector('.suggestions')
const returnArrow = document.querySelector('.fa-arrow-left')
const error = document.querySelector('.error')
const userSearch = document.querySelector('.userSearch')



// API hotsapi.net and adding into empty array variable
const heroesEndpoint = 'http://hotsapi.net/api/v1/heroes';
let heroes = [];

// added async-await 
const getHero = async () => {
    const response = await fetch(heroesEndpoint)
    if (response.status === 200){
        const data = await response.json()
        return data
    }  else {
        throw new Error('Unable to get hero')
    }
}
window.onload = getHero().then((data) => {
    heroes = data
}).catch((err) => {
    console.log(`Error: ${err}`)
})
// fetch(heroesEndpoint)
//     .then(res => res.json())
//     .then(data => heroes = data); 

// to match the user input text to the names of all heroes in API
function findMatches(wordToMatch, heroes){
    return heroes.filter(hero => {
        const regex = new RegExp(wordToMatch, 'gi'); 
        return hero.name.match(regex);
        
    })
}


// display the matches that are found in API and display them as a list
search.addEventListener('keyup', displayMatches);
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
let found = false;
//uses findMatches again to compare user search to local json. if matched, will display hero info.
button.addEventListener('click', showHeroInfo);
function showHeroInfo(){
    if(search.value === ""){
        return
    }
    const matchArray = findMatches(search.value, character);

    for(var j = 0; j < matchArray.length; j++) {
    if (matchArray[j].name == search.value) {
        found = true;
     }
    }

    if(matchArray === undefined || matchArray.length == 0 || found == false){
        userSearch.innerHTML = search.value;
        if(error.classList.contains("active")){
        return
        } else{
        error.classList.add("active")
        setTimeout(() => {

            error.classList.remove("active")
                
            }, 2000);
        }
        return
    }
    
    grid1.classList.add("displayNone");
    grid2.classList.remove("displayNone");
    const tips = matchArray.map(chara =>{
        heroImg.src = `${chara.img}`;
        return `
            <li class="tipsItem">${chara.tip1}</li>
            <li class="tipsItem">${chara.tip2}</li>
            <li class="tipsItem">${chara.tip3}</li>
            <li class="tipsItem">${chara.tip4}</li>
            <li class="tipsItem">${chara.tip5}</li>
        `;
    }).join('');
    tipList.innerHTML = tips;
    found = false;
    const heroArray = findMatches(search.value, heroes);
    // console.log(heroArray);
    
    // alignTop.innerHTML = abilities;
    setTimeout(() => {
        alignLeft.classList.add("active");
        alignRight.classList.add("active");
        alignTop.classList.add("active");
        alignBottom.classList.add("active");
    }, 100);    
}
//add hover link to ability name

// function isAbility(){
//     if(tipsItem.innerHTML.includes(heroes.abilities.title))
// }



// use enter to submit
search.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        e.preventDefault();
        const selected = document.querySelector('.selected');
        const doesSelectedExist = document.getElementsByClassName('selected');
        if(doesSelectedExist.length > 0){
            search.value = selected.innerText;
            return
        }
        showHeroInfo();
        
    }
})

let x = -1;
search.addEventListener('keyup', (e) =>{
    const listItems = document.querySelectorAll('.listItem');
    if(e.keyCode == 38){
        x--
        if (x < 0){
            x = listItems.length - 1
        }
        listItems[x].classList.add('selected');
        
    }
    if(e.keyCode == 40){
        x++
        if (x > listItems.length - 1){
            x = 0
        }
        listItems[x].classList.add('selected');
        
        
    }
})

// return to search hero page
returnArrow.addEventListener('click', () => {
    grid2.classList.add("displayNone");
    grid1.classList.remove("displayNone");
    alignTop.classList.remove("active");
    alignLeft.classList.remove("active");
    alignRight.classList.remove("active");
    alignBottom.classList.remove("active");
    clearFields()
})
// clear search field and suggestions
function clearFields(){
    search.value = '';
    suggestions.innerHTML = '';
    x = -1;
}







//todays date
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
let todayDate = yyyy + '-' + mm + '-' + dd;

//date 7 days ago
let days = 7;
let last = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));
let day =last.getDate();
let month=last.getMonth()+1;
let year=last.getFullYear();
let lastWeek = year + '-' + month + '-' + day;
console.log(todayDate, lastWeek)






// function getData(i){
//     let ;
//     let apiPromises = [];
//     for(i = 1; i < 150; i++){
//         fetch(`https://hotsapi.net/api/v1/replays/paged?page=${i}&start_date=${lastWeek}&end_date=${todayDate}&with_players=true`)
//         .then(res => res.json())
//         .then(data => apiPromises = data); 
    
//         console.log(apiPromises);
//     }

// }

// function fetchMetaData(){
//     let pagesRequired = 20;
//     fetch('https://hotsapi.net/api/v1/replays/paged?page=20')
//     .then(resp => {
//         let apiPromises = [];
//         pagesRequired = resp.data.pagesRequired;
//         for (let i=pagesRequired; i>0;i--) {
//             apiPromises.push(fetch(`https://hotsapi.net/api/v1/replays/paged?page=${i}&start_date=${lastWeek}&end_date=${todayDate}&with_players=true`));
//         }
//         Promise.all(apiPromises)
//         .then(responses => {
//             let processedResponses = [];
//             responses.map(response => {
//                 processedResponses.push(response);
//             })

//             console.log(processedResponses)

//         })

//     })
// }

function fetchMetaData(){
    let i;
    let apiData = [];
    for (i = 20; i>0; i--) {
        apiData.push(fetch(`https://hotsapi.net/api/v1/replays/paged?page=${i}&start_date=${lastWeek}&end_date=${todayDate}&with_players=true`));
    }
    Promise.all(apiData)
        .then(responses => {
            let processedResponses = [];
            responses.map(response => {
                processedResponses.push(response);
            })
         
            // not sure what to do now

        })
       
}