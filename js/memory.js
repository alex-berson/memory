
let firstInitialization = true;

console.log(navigator.language);
console.log(screen.width/screen.height);
console.log(outerHeight);
console.log(innerHeight);

console.log(screen.height);
console.log(screen.width);



const init = () => {

    document.querySelectorAll('.flip-container').forEach(function(card){
        if (firstInitialization) {
            if (matchMedia('(hover: none)').matches){
                card.addEventListener("touchstart", function() {this.classList.toggle('hover');});
            } else {
                card.addEventListener("click", function() {this.classList.toggle('hover');
                this.classList.toggle('active');});
            }
        }
    });

    firstInitialization = false;

    
    if(screen.width < 460 || screen.height < 460){
        if (screen.width/screen.height > 0.5 && screen.width/screen.height < 2){
            document.documentElement.style.setProperty('--minSide', 4);
            document.documentElement.style.setProperty('--maxSide', 6);
            document.querySelector("#card25").style.display = "none";
            document.querySelector('#card26').style.display = "none";
            document.querySelector('#card27').style.display = "none";
            document.querySelector('#card28').style.display = "none";
            document.querySelector('#card29').style.display = "none";
            document.querySelector('#card30').style.display = "none";
        } else {
            document.documentElement.style.setProperty('--minSide', 4);
            document.documentElement.style.setProperty('--maxSide', 7);
            document.querySelector('#card29').style.display = "none";
            document.querySelector('#card30').style.display = "none";
        }
    }

    const boardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100;
    const minSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minSide').replace(/[^0-9]/g,''))/100;

    console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);

    // if (window.innerHeight > window.innerWidth) {
    //     document.documentElement.style.setProperty('--boardSize', 100/window.innerWidth * Math.ceil(window.innerWidth*boardSize/minSide)*minSide + 'vmin');
    // } else {
    //     document.documentElement.style.setProperty('--boardSize', 100/window.innerHeight * Math.ceil(window.innerHeight*boardSize/minSide)*minSide + 'vmin');
    // }
    console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);
    

    // document.querySelector("#country1").innerHTML = outerHeight;
    // document.querySelector("#country2").innerHTML = innerHeight;

    // console.log(list);

    // function jsonEscape(str)  {

    //     console.log(str);
    //     return str.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    // }

    let countries = JSON.parse(list);
    console.log(countries[20].ru); 

    let i = 0
    document.querySelectorAll('.card img').forEach(function(image){
        image.src = `/images/flags/${countries[i].code}.png`;
        image.nextElementSibling.querySelector('p').innerHTML = countries[i].ru;
        // console.log((countries[i].ru).split(" ").length);
        if ((countries[i].ru).split(" ").length > 2 && (countries[i].ru).length > 24){
            if(screen.width > 460 && screen.height > 460){
                image.nextElementSibling.querySelector('p').style.fontSize = "2.1vmin";
            } else {
                image.nextElementSibling.querySelector('p').style.fontSize = "2.8vmin";
            }
        }
        i++;
    });

    // document.querySelectorAll('.card .country p').forEach(function(text){
    //     text.innerHTML = "Демократическая Республика Конго";
    //     text.style.fontSize = "3.0vmin";
    // });

    // document.querySelector("#myCard").classList.toggle("flip")

    document.querySelector("body").style.opacity = 1;
    // setTimeout(function() {document.querySelector('#card1').classList.toggle("hover");
    // console.log("timeout");
    // }, 5000);

}


window.onload = function() {
    document.fonts.ready.then(function() {

        init();

        // function preventDefault(e){
        //     e.preventDefault();
        // }
        
        // document.body.addEventListener('touchmove', preventDefault, { passive: false });
        // document.querySelector("body").style.transition = 'opacity 2s ease';
    });
    
};

