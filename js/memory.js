

const boardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100;

console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);

if (window.innerHeight > window.innerWidth) {
    document.documentElement.style.setProperty('--boardSize', 100/window.innerWidth * Math.ceil(window.innerWidth*boardSize/4)*4 + 'vmin');
} else {
    document.documentElement.style.setProperty('--boardSize', 100/window.innerHeight * Math.ceil(window.innerHeight*boardSize/4)*4 + 'vmin');
}
console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);


console.log(navigator.language);
console.log(screen.width/screen.height);
console.log(outerHeight);
console.log(innerHeight);


window.onload = function() {
    document.fonts.ready.then(function() {

        if (screen.width/screen.height > 0.5 && screen.width/screen.height < 2){
            document.documentElement.style.setProperty('--maxSide', 6);
            document.querySelector("#tile25").style.display = "none";
            document.querySelector('#tile26').style.display = "none";
            document.querySelector('#tile27').style.display = "none";
            document.querySelector('#tile28').style.display = "none";
        }
            document.querySelector("#country1").innerHTML = outerHeight;
            document.querySelector("#country2").innerHTML = innerHeight;
        // function preventDefault(e){
        //     e.preventDefault();
        // }
        
        // document.body.addEventListener('touchmove', preventDefault, { passive: false });
        // document.querySelector("body").style.transition = 'opacity 2s ease';
    });
    
};

