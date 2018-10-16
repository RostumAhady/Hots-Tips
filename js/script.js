// grabbing the elements

const git2 = document.getElementById("git2");
const git3 = document.getElementById("git3");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const p3 = document.querySelector(".p3");
const body =document.querySelector("body");
const greet = document.querySelector('.greet');

// fire when screen size is above 813px
    //SECOND PROJECT BUTTON
    git2.addEventListener("mouseenter", function() {        
        p1.classList.add('codeBackground');
    }, false);
    git2.addEventListener("mouseleave", function(){
        p1.classList.remove('codeBackground');   
    })
    
    //THIRD PROJECT BUTTON
    git3.addEventListener("mouseenter", function() {   
        p2.classList.add('codeBackground');
        
    }, false);
    git3.addEventListener("mouseleave", function(){
        p2.classList.remove('codeBackground');   
    })

//preloader

window.addEventListener("load", function(){
    body.style.opacity = '1';
    changeMessage();
})

// Greeting message change based on time of day
time = new Date().getHours();
function changeMessage(){
    if(time < 7 ){
        greet.innerHTML = 'Oh, Hello Early Bird!'
    } else if (time >=7 && time < 12){
        greet.innerHTML = 'Oh, Good Morning!'
    } else if (time >= 12 && time < 18){
        greet.innerHTML = 'Oh, Good Afternoon!'
    } else if(time >= 18){
        greet.innerHTML = 'Oh, Good Evening!'
    }
}





// fade up animation
// let slider = document.querySelector('.slider');
// let processCont = document.querySelector('.process');

// window.addEventListener('scroll', function(e){
//   if (isScrolledIntoView(slider)){
//     classRemove(slider);
//   }
//   if (isScrolledIntoView(processCont)){
//     classRemove(processCont);
//   }
// },false);

// function classRemove(element){
//   setTimeout(() => {
//     element.classList.remove('fade-up');
//   }, 400);
// }


// function isScrolledIntoView(el) {
//   var rect = el.getBoundingClientRect();
//   var elemTop = rect.top;
//   var elemBottom = rect.bottom;

//   // Only completely visible elements return true:
//   // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
//   // Partially visible elements return true:
//   let isVisible = elemTop < window.innerHeight && elemBottom >= 0;
//   return isVisible;
// }




//collapses navbar when clicking on one of it's links

// $('.navbar-nav>li>a').on('click', function(){
//     $('.navbar-collapse').collapse('hide');
// });