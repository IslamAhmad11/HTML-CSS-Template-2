let slidingImgs = document.querySelectorAll(".slider-container img");
let prev = document.querySelector(".slider-controlers .prev");
let next = document.querySelector(".slider-controlers .next");
let indicators = document.querySelector(".indicators");
let bullets = Array.from(document.querySelectorAll(".sliding-bullets li"));
let lis = document.querySelectorAll(".shuffle li");
let boxes = document.querySelectorAll(".imgs-container .box");
let stats = document.querySelector(".stats");
let statsNums = document.querySelectorAll(".stats .number")
let currentSlide = 0;
let started = false; // function not yet started

// set default values
function theChecker(){
    removeActiveClass();
    slidingImgs[currentSlide].classList.add("active");
    bullets[currentSlide].classList.add("active");
    
    // remove active on prev button
    if(currentSlide == 0){
        prev.classList.add("disabled");
    }else{
        prev.classList.remove("disabled");
    }

    // remove active on next button
    if(currentSlide == slidingImgs.length - 1){
        next.classList.add("disabled");
    }else{
        next.classList.remove("disabled");
    }

}

theChecker();

function removeActiveClass(){
    // remove active class on imgs
    slidingImgs.forEach((img) => {
        img.classList.remove("active");
    })
    // remove active class on bullets
    bullets.forEach((li) => {
        li.classList.remove("active");
    })
}

// Generate Prev Button
prev.onclick = () => {
    if(prev.classList.contains("disabled")){
        return false;
    }else{
        currentSlide--;
        theChecker();
    }
}

// Generate Prev Button
next.onclick = () => {
    if(next.classList.contains("disabled")){
        return false;
    }else{
        currentSlide++;
        theChecker();
    }
}

// Generate Next Button
bullets.forEach((li) => {
    li.onclick = () => {
        currentSlide = bullets.indexOf(li);
        theChecker();
    }
})

lis.forEach((li)=>{
    li.addEventListener("click", removeActive)
})

function removeActive() {
    lis.forEach((li) => {
        li.classList.remove("active");
        this.classList.add("active");
    })
    boxes.forEach((box) => {
        box.style.display = "none";
    })
    let matchedboxes = document.querySelectorAll(this.dataset.box);
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    // loop on matched boxes
    for(let i=0; i < matchedboxes.length; i++){
        // Check if the media query is true
        if (mediaQuery.matches) {
            matchedboxes[i].style.display="block";
        }
        // check the length of matched boxes
        if(matchedboxes.length == 2){
            matchedboxes[i].style.cssText = "left:25%";
        }else{
            matchedboxes[i].style.cssText = "left:0%";
        }
    }
}

// Animate width on scrolling
window.onscroll = () => {
    if(window.scrollY >= stats.offsetTop -300 && !started){
        // progressBars.forEach((bar) => {
        //     bar.style.width = bar.dataset.width;
        // });
            // Increase Numbers On Scrolling
            statsNums.forEach((num) => {startCount(num)})
            started = true
    }
};

// Increase Numbers On Scrolling
function startCount (num) {
    let goal = num.dataset.goal;
    let count = setInterval(() => {
        num.textContent++;
        if(num.textContent == goal){
            clearInterval(count);
        }
    },1000 / goal)
}