const boardSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--boardSize'));
let numberOfCards = 30;

let countries;
let codes;

const backColor = [
    "CadetBlue",
    "BurlyWood",
    "DarkKhaki",
    "DarkSalmon",
    "DarkSeaGreen",
    "LightCoral",
    "LightSalmon",
    "LightSlateGray",
    "MediumSeaGreen",
    "Peru",
    "Plum",
    "RosyBrown",
    "Salmon",
  ];

// const randomizedCards = (cards) => {
    
//      let cards = countries.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]).slice(0, numberOfCards/2);
//      return cards.concat(cards).map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
              
// }

const shuffleCodes = (codes) => {
    
    // return codes.concat(codes).map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    return codes.concat(codes);

             
}
const firework = () => {
    const minSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minSide'));
    const maxSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--maxSide'));
    let cardNumbers = Array.from({length: numberOfCards}, (_, i) => i).map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);

    let big12 = 0;
    let doubles = [];
    let bigCard;


        
    console.log("WIN!!!")
    document.querySelectorAll(".flip-container").forEach((card) => {
        card.style.opacity = 0;
        card.classList.toggle("flip");
        // card.removeAttribute("style");
        card.style.transition = "";

    });
    document.querySelector(`#big2`).style.display = "flex";
    document.querySelector(`#big1`).style.display = "flex";

    let i = 0;
    zooming();
    let  zoomingInterval = setInterval(zooming, 1100);
    function zooming(){
        if (i == codes.length){
            clearInterval(zoomingInterval);
            console.log("Stop animation");
            setTimeout(() => {
                document.querySelector('#big1').style.display = "none";
                document.querySelector('#big2').style.display = "none";
                document.querySelector('#big1').classList.remove("zoom");
                document.querySelector('#big2').classList.remove("zoom");
                init();}, 1000);
        } else {

            window.innerHeight > window.innerWidth ? offsetLeft = (cardNumbers[i] + minSide) % minSide : offsetLeft = (cardNumbers[i] + maxSide) % maxSide;
            window.innerHeight > window.innerWidth ? offsetTop = Math.floor(cardNumbers[i] / minSide) : offsetTop = Math.floor(cardNumbers[i] / maxSide);

            console.log("offsetLeft: ", offsetLeft);
            console.log("offsetTop: ", offsetTop);
            console.log("i: ", i);

            document.documentElement.style.setProperty('--offsetLeft', offsetLeft);
            document.documentElement.style.setProperty('--offsetTop', offsetTop);

            // document.querySelector(`#big${1 - big12}`).classList.remove("zoom");
            console.log("Zooming!")
            bigCard = document.querySelector(`#big${big12 + 1} img`);
            bigCard.src = `/images/flags/${codes[cardNumbers[i]]}.png`;
            name  = countries.find(x => x.code === codes[cardNumbers[i]]).name;
            bigCard.nextElementSibling.querySelector('p').innerHTML = name;
            document.querySelector(`#big${big12 + 1}`).classList.add("zoom");
            doubles.push(codes[cardNumbers[i]]); 
            do {
                i++;
            } while (doubles.includes(codes[cardNumbers[i]]) && i < codes.length);
            big12 = 1 - big12;

            setTimeout(() => {document.querySelector(`#big${big12 + 1}`).classList.remove("zoom");}, 2000);
        }
    }
}

const flipCard = (e) => {

    if( typeof flipCard.numberOfTurnedCards == 'undefined' ) {
        flipCard.numberOfTurnedCards = 0;
    }
    if( typeof flipCard.winPairs == 'undefined' ) {
        flipCard.winPairs = 0;
    }

    if( typeof flipCard.turnedCards == 'undefined' ) {
        flipCard.turnedCards = [];
    }




    if (flipCard.numberOfTurnedCards == 1 && e.currentTarget.id == flipCard.turnedCards[0].id) {console.log("return"); return;}

    if (flipCard.numberOfTurnedCards == 2){
        clearTimeout(autoTurn);
        flipCard.numberOfTurnedCards = 0;
            document.querySelectorAll(`#${flipCard.turnedCards[0].id},#${flipCard.turnedCards[1].id}`).forEach((card) => {
                card.classList.toggle("flip");
            });
    }

    flipCard.turnedCards[flipCard.numberOfTurnedCards] = e.currentTarget;

    e.currentTarget.classList.toggle("flip");

    flipCard.numberOfTurnedCards++;
    console.log("numberOfTurnedCards", flipCard.numberOfTurnedCards);
  
    if (flipCard.numberOfTurnedCards == 2){

        if (flipCard.turnedCards[0].querySelector("p").innerHTML == flipCard.turnedCards[1].querySelector("p").innerHTML){
            flipCard.numberOfTurnedCards = 0;
            console.log("Match!");
            document.querySelectorAll(`#${flipCard.turnedCards[0].id}, #${flipCard.turnedCards[1].id}`).forEach((card) => {
                if (matchMedia('(hover: none)').matches){
                    card.removeEventListener("touchstart", flipCard);
                } else {
                    card.removeEventListener("click", flipCard);
                }
                card.style.transition = 'opacity 2s linear';
                card.style.opacity = 0;
            });
            flipCard.winPairs++;
            console.log("winPairs " + flipCard.winPairs);
            if (flipCard.winPairs == numberOfCards/2) {
                flipCard.winPairs = 0;
                localStorage.codes = JSON.stringify(JSON.parse(localStorage.codes).slice(numberOfCards/2));
                setTimeout(() => {firework();}, 2000);

            }
        } else {
            autoTurn  = setTimeout(() => {document.querySelectorAll(`#${flipCard.turnedCards[0].id},#${flipCard.turnedCards[1].id}`).forEach((card) => {
                card.classList.toggle("flip"); });
                flipCard.numberOfTurnedCards = 0;}, 700);
        }
    }
    // numberOfTurns++;
}

const setEventListeners = () => {
    document.querySelectorAll('.flip-container').forEach((card) => {
        // if (firstInitialization) {
            if (matchMedia('(hover: none)').matches){

                card.addEventListener("touchstart", flipCard);
            } else {
                card.addEventListener("click", flipCard);
            }
        // }
    });
    window.addEventListener("resize", setTheBoard);

} 

const setNumberOfCards = () => {

    console.log(screen.width/screen.height);
    
    if(screen.width < 460 || screen.height < 460){
        if (screen.width/screen.height > 0.5 && screen.width/screen.height < 2){
            numberOfCards = 24;
            document.documentElement.style.setProperty('--minSide', 4);
            document.documentElement.style.setProperty('--maxSide', 6);
            document.querySelector("#card25").style.display = "none";
            document.querySelector('#card26').style.display = "none";
            document.querySelector('#card27').style.display = "none";
            document.querySelector('#card28').style.display = "none";
            document.querySelector('#card29').style.display = "none";
            document.querySelector('#card30').style.display = "none";
        } else {
            numberOfCards = 28;
            document.documentElement.style.setProperty('--minSide', 4);
            document.documentElement.style.setProperty('--maxSide', 7);
            document.querySelector('#card29').style.display = "none";
            document.querySelector('#card30').style.display = "none";
        }
    }
}

const setTheBoard = () => {
    // const boardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100;
    const minSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minSide'));

    // console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);
    console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);


    // if (window.innerHeight > window.innerWidth) {
    //     document.documentElement.style.setProperty('--boardSize', 100/window.innerWidth * Math.ceil(window.innerWidth*boardSize/minSide)*minSide + 'vmin');
    // } else {
    //     document.documentElement.style.setProperty('--boardSize', 100/window.innerHeight * Math.ceil(window.innerHeight*boardSize/minSide)*minSide + 'vmin');
    // }

    if (window.innerHeight > window.innerWidth) {
        document.documentElement.style.setProperty('--boardSize', Math.ceil(window.innerWidth * boardSize / (minSide)) * minSide + 'px');
    } else {
        document.documentElement.style.setProperty('--boardSize', Math.ceil(window.innerHeight * boardSize / (minSide)) * minSide + 'px');
    }
    // console.log(100/window.innerWidth * Math.ceil(window.innerWidth*boardSize/minSide)*minSide);

    console.log(innerHeight);
    console.log(innerWidth);
    console.log(getComputedStyle(document.documentElement).getPropertyValue('--boardSize'));


    // console.log(Math.ceil(window.innerWidth * 0.95 / 4) * 4);
    // console.log(minSide);
    // console.log(Math.ceil(window.innerWidth * 0.95 / (minSide * 100)) * minSide * 100);
    console.log(getComputedStyle(document.documentElement).getPropertyValue('--minSide'));
    console.log(getComputedStyle(document.documentElement).getPropertyValue('--maxSide'));


    // console.log(screen.height);
    // console.log(screen.width);

    // document.documentElement.style.setProperty('--boardSize', '96vmin');
    // console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);
    

    // document.querySelector("#country1").innerHTML = outerHeight;
    // document.querySelector("#country2").innerHTML = innerHeight;
}

const getDataFromJSON = () => {
    let data;
    console.log(navigator.language.slice(0, 2));

    switch(navigator.language.slice(0, 2)){
        case "en": data = en; break;
        case "ru": data = ru; break;
        default: data = en; break;
    }
    // let data = list;
    return JSON.parse(data);
}

const setBackColor = () => {
    if (typeof(localStorage.color) == "undefined") {
        localStorage.color = 0;
    } else {
        localStorage.color = parseInt(localStorage.color) + 1;
    }
    console.log(localStorage.color);

    // localStorage.clear();
    document.documentElement.style.setProperty('--backColor', backColor[parseInt(localStorage.color)]);
    // console.log(back[0]);
    if (backColor.length == parseInt(localStorage.color) + 1) localStorage.removeItem("color");
}

const setCards = (codes) => {

    let i = 0
    let name;

    setBackColor();


    document.querySelectorAll('.card img').forEach((image) => {
        if (i < numberOfCards) {
            name  = countries.find(x => x.code === codes[i]).name;
            image.src = `/images/flags/${codes[i]}.png`;
            image.nextElementSibling.querySelector('p').innerHTML = name;
            
            // console.log((cards[i].ru).split(" ").length);
            if ((name).split(" ").length > 2 && (name).length > 24){
                if(screen.width > 460 && screen.height > 460){
                    image.nextElementSibling.querySelector('p').style.fontSize = "2.2vmin";
                } else {
                    image.nextElementSibling.querySelector('p').style.fontSize = "2.8vmin";
                }
            }
        }
        i++;
    });


}

const localStorageCodes = () => {

    let codes;
    let randomizedCodes;
    
    if (typeof(localStorage.codes) == "undefined") {
        codes = countries.map(a => a.code);
        // console.log(codes);
        randomizedCodes = codes.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
        // console.log(randomizedCodes);
        localStorage.codes = JSON.stringify(randomizedCodes);
        console.log("undefined");
        console.log(localStorage.codes);
    } 
 
    codes = JSON.parse(localStorage.codes).slice(0, numberOfCards/2);

    if (codes.length < numberOfCards/2){
        // randomizedCodes = codes.concat(countries.map(a => a.code).map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]));
        do{
            randomizedCodes = countries.map(a => a.code).map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
        } while(randomizedCodes.slice(0, codes.length).some(r => codes.includes(r)));

        randomizedCodes = codes.concat(randomizedCodes);
        localStorage.codes = JSON.stringify(randomizedCodes);
        codes = JSON.parse(localStorage.codes).slice(0, numberOfCards/2);

    }


    console.log("from storage");
    console.log(codes);

    // localStorage.codes = JSON.stringify(JSON.parse(localStorage.codes).slice(numberOfCards/2));

    codes = shuffleCodes(codes);


    console.log(codes);

    return codes;


    // localStorage.clear();

    // console.log(localStorage.color);

    // console.log(countries[20].name);
}

const init = () => {

    console.log("init");

    // let data;
    // winPairs = 0;

    setEventListeners();

    // firstInitialization = false;    

    setNumberOfCards();

    setTheBoard();

    // console.log(list);

    // function jsonEscape(str)  {

    //     console.log(str);
    //     return str.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    // }
   
    countries = getDataFromJSON();
    // let codes;
    
    codes = localStorageCodes(); 

    setCards(codes);


    // document.querySelectorAll('.card .country p').forEach(function(text){
    //     text.innerHTML = "Демократическая Республика Конго";
    //     text.style.fontSize = "3.0vmin";
    // });

    // document.querySelector("#myCard").classList.toggle("flip")

    // document.querySelector("body").style.opacity = 1;

    // document.querySelector("body").style.transition = 'opacity 2s linear';
    // document.querySelector("body").style.opacity = 1;

    let i = 0;
    let delays = Array.from({length: numberOfCards}, (_, i) => i/7);
    delays = delays.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    console.log(delays);
    document.querySelectorAll(".flip-container").forEach((card) => {
        if (i < numberOfCards){
            card.style.transition = `opacity 0s linear ${delays[i]}s`;
            card.style.opacity = 1;
            i++;
        }
     });

    // setTimeout(function() {document.querySelector('#card1').classList.toggle("hover");
    // console.log("timeout");
    // }, 5000);

}


window.onload = () => {
    document.fonts.ready.then(() => {

        // init();

        // function preventDefault(e){
        //     e.preventDefault();
        // }
        
        // document.body.addEventListener('touchmove', preventDefault, { passive: false });
        // document.querySelector("body").style.transition = 'opacity 2s ease';

    
        init();
        // setTimeout(1000, init);
    });
    
};

