

const boardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100;

console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);

if (window.innerHeight > window.innerWidth) {
    document.documentElement.style.setProperty('--boardSize', 100/window.innerWidth * Math.ceil(window.innerWidth*boardSize/4)*4 + 'vmin');
} else {
    document.documentElement.style.setProperty('--boardSize', 100/window.innerHeight * Math.ceil(window.innerHeight*boardSize/4)*4 + 'vmin');
}
console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);

console.log(navigator.language);

window.onload = function() {
    document.fonts.ready.then(function() {

        // function preventDefault(e){
        //     e.preventDefault();
        // }
        
        // document.body.addEventListener('touchmove', preventDefault, { passive: false });
        // document.querySelector("body").style.transition = 'opacity 2s ease';
    });
    
};

