// import { codes2 } from 'codes.js';
// import { backColors } from 'colors.js';

const boardSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--boardSize'));
let numberOfCards;
let countries = [];
let codes = [];

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

    // console.log("WIN!!!")
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
            // console.log("Stop animation");
            setTimeout(() => {
                document.querySelectorAll("#big1, #big2").forEach((card) => {
                    card.style.display = "none";
                    card.classList.remove("zoom");
                });
                // document.querySelector('#big1').style.display = "none";
                // document.querySelector('#big2').style.display = "none";
                // document.querySelector('#big1').classList.remove("zoom");
                // document.querySelector('#big2').classList.remove("zoom");
                init();}, 1000);
        } else {

            window.innerHeight > window.innerWidth ? offsetLeft = (cardNumbers[i] + minSide) % minSide : offsetLeft = (cardNumbers[i] + maxSide) % maxSide;
            window.innerHeight > window.innerWidth ? offsetTop = Math.floor(cardNumbers[i] / minSide) : offsetTop = Math.floor(cardNumbers[i] / maxSide);

            // console.log("offsetLeft: ", offsetLeft);
            // console.log("offsetTop: ", offsetTop);
            // console.log("i: ", i);

            document.documentElement.style.setProperty('--offsetLeft', offsetLeft);
            document.documentElement.style.setProperty('--offsetTop', offsetTop);

            // document.querySelector(`#big${1 - big12}`).classList.remove("zoom");
            // console.log("Zooming!")
            bigCard = document.querySelector(`#big${big12 + 1} img`);
            bigCard.src = `./images/flags/${codes[cardNumbers[i]]}.png`;
            name  = countries.find(x => x.code === codes[cardNumbers[i]].toUpperCase()).name;
            bigCard.nextElementSibling.querySelector('p').innerHTML = name;
            bigCard.nextElementSibling.querySelector('p').style.fontSize = "";
            let fontSizeBig = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fontSizeBig'));
            while (parseFloat(getComputedStyle(bigCard.nextElementSibling).getPropertyValue("width")) < parseFloat(getComputedStyle(bigCard.nextElementSibling.querySelector('p')).getPropertyValue("width"))) {
                fontSizeBig -= 0.1;
                bigCard.nextElementSibling.querySelector('p').style.fontSize = fontSizeBig + "vmin";

                console.log(fontSizeBig);
            }



            // bigCard.nextElementSibling.querySelector('p').innerHTML = "Democratic Republic of the Congo";
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

    // alert(`P height: ${getComputedStyle(e.currentTarget.querySelector("p")).getPropertyValue("height")} \nDiv height: ${getComputedStyle(e.currentTarget.querySelector(".country")).getPropertyValue("height")} \nLength: ${e.currentTarget.querySelector("p").innerHTML.length} \nFont: ${parseFloat(getComputedStyle(e.currentTarget.querySelector("p")).getPropertyValue("font-size")) * 100 / window.innerWidth}`);

    // alert(`P width: ${getComputedStyle(e.currentTarget.querySelector("p")).getPropertyValue("width")} \nDiv width: ${getComputedStyle(e.currentTarget.querySelector(".country")).getPropertyValue("width")} \nLength: ${e.currentTarget.querySelector("p").innerHTML.length} \nFont: ${parseFloat(getComputedStyle(e.currentTarget.querySelector("p")).getPropertyValue("font-size")) * 100 / window.innerWidth}`);
    // alert(`Height: ${window.screen.height - window.innerHeight} \nWidth: ${window.screen.width - window.innerWidth}`);
    // alert(`ScreenHeight: ${window.screen.height} \nScreenWidth: ${window.screen.width} \nOuterHeight: ${window.outerHeight} \nOuterWidth: ${window.outerWidth} \nInnerHeight: ${window.innerHeight} \nInnerWidth: ${window.innerWidth} \nAvailHeight: ${window.screen.availHeight} \nAvailWidth: ${window.screen.availWidth}`);
    // alert(window.navigator.standalone);


    if( typeof flipCard.numberOfTurnedCards == 'undefined' ) {
        flipCard.numberOfTurnedCards = 0;
    }

    if( typeof flipCard.winPairs == 'undefined' ) {
        flipCard.winPairs = 0;
    }

    if( typeof flipCard.turnedCards == 'undefined' ) {
        flipCard.turnedCards = [];
    }

    // console.log("Opacity: ", e.currentTarget.style.opacity);
    // console.log("Opacity: ", getComputedStyle(e.currentTarget).getPropertyValue("opacity"));
    if (getComputedStyle(e.currentTarget).getPropertyValue("opacity") == 0) return;


    // if( typeof flipCard.turnedCards == 'undefined' ) {
    //     flipCard.guessedCards = [];
    // }

    if (flipCard.numberOfTurnedCards == 1 && e.currentTarget.id == flipCard.turnedCards[0].id) {return;}

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
    // console.log("numberOfTurnedCards", flipCard.numberOfTurnedCards);
  
    if (flipCard.numberOfTurnedCards == 2){

        if (flipCard.turnedCards[0].querySelector("p").innerHTML == flipCard.turnedCards[1].querySelector("p").innerHTML){
            flipCard.numberOfTurnedCards = 0;
            // console.log("Match!");
            document.querySelectorAll(`#${flipCard.turnedCards[0].id}, #${flipCard.turnedCards[1].id}`).forEach((card) => {
                if (matchMedia('(hover: none)').matches){
                    card.removeEventListener("touchstart", flipCard);
                } else {
                    card.removeEventListener("click", flipCard);
                }
                card.style.transition = 'opacity 2s linear';
                card.style.opacity = 0;
            });
            // flipCard.guessedCards[flipCard.winPairs] = 
            flipCard.winPairs++;
            // console.log("winPairs " + flipCard.winPairs);
            if (flipCard.winPairs == numberOfCards/2) {
                flipCard.winPairs = 0;
                // localStorage.codes = JSON.stringify(JSON.parse(localStorage.codes).slice(numberOfCards/2));
                setTimeout(() => {firework();}, 2000);

            }
        } else {
            autoTurn  = setTimeout(() => {document.querySelectorAll(`#${flipCard.turnedCards[0].id},#${flipCard.turnedCards[1].id}`).forEach((card) => {
                card.classList.toggle("flip"); });
                flipCard.numberOfTurnedCards = 0;}, 700);
        }
    }
}

const setEventListeners = () => {
    document.querySelectorAll('.flip-container').forEach((card) => {
            if (matchMedia('(hover: none)').matches){

                card.addEventListener("touchstart", flipCard);
            } else {
                card.addEventListener("click", flipCard);
            }
    });
    window.addEventListener("resize", setTheBoard);
} 

const setNumberOfCards = () => {

    // console.log(screen.width/screen.height);
    
    if(screen.width < 460 || screen.height < 460){
        if (screen.width/screen.height > 0.5 && screen.width/screen.height < 2){
            if (window.navigator.standalone) {
                numberOfCards = 28;
                document.documentElement.style.setProperty('--minSide', 4);
                document.documentElement.style.setProperty('--maxSide', 7);
                document.querySelectorAll("#card29, #card30, #card31, #card32").forEach((card) => {
                card.style.display = "none";
                });


            } else {
                numberOfCards = 24;
                document.documentElement.style.setProperty('--minSide', 4);
                document.documentElement.style.setProperty('--maxSide', 6);
                document.querySelectorAll("#card25, #card26, #card27, #card28, #card29, #card30, #card31, #card32").forEach((card) => {
                card.style.display = "none";
            
                });
            }


        } else {
            if (window.navigator.standalone) {
                numberOfCards = 32;
                document.documentElement.style.setProperty('--minSide', 4);
                document.documentElement.style.setProperty('--maxSide', 8);
            } else {
                numberOfCards = 28;
                document.documentElement.style.setProperty('--minSide', 4);
                document.documentElement.style.setProperty('--maxSide', 7);
                document.querySelectorAll("#card29, #card30, #card31, #card32").forEach((card) => {
                    card.style.display = "none";
                });
            }    
        }
    } else {
         numberOfCards = 30;
         document.querySelectorAll("#card31, #card32").forEach((card) => {
            card.style.display = "none";
        });
    }
}

const setTheBoard = () => {
    // const boardSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--boardSize'));

    // const boardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100;
    const minSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minSide'));

    // console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);
    // console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);


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

    // console.log(innerHeight);
    // console.log(innerWidth);
    // console.log(getComputedStyle(document.documentElement).getPropertyValue('--boardSize'));


    // console.log(Math.ceil(window.innerWidth * 0.95 / 4) * 4);
    // console.log(minSide);
    // console.log(Math.ceil(window.innerWidth * 0.95 / (minSide * 100)) * minSide * 100);
    // console.log(getComputedStyle(document.documentElement).getPropertyValue('--minSide'));
    // console.log(getComputedStyle(document.documentElement).getPropertyValue('--maxSide'));


    // console.log(screen.height);
    // console.log(screen.width);

    // document.documentElement.style.setProperty('--boardSize', '96vmin');
    // console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize').replace(/[^0-9]/g,''))/100);
    

    // document.querySelector("#country1").innerHTML = outerHeight;
    // document.querySelector("#country2").innerHTML = innerHeight;
}

const getDataFromJSON = () => {
    let data;
    // console.log(navigator.languages);
    // console.log(navigator.language.slice(0, 2));

    switch(navigator.language.slice(0, 2)){
        case "en": data = en; break;        
        case "ru": data = ru; break;
        case "de": data = de; break;
        case "fr": data = fr; break;
        case "es": data = es; break;
        case "it": data = it; break;
        case "pt": data = pt; break;
        case "nl": data = nl; break;
        case "sv": data = sv; break;
        case "da": data = da; break;
        case "nb": data = nb; break;
        case "fi": data = fi; break;
        case "ca": data = ca; break;
        case "el": data = el; break;
        case "hr": data = hr; break;
        case "cs": data = cs; break;
        case "he": data = he; break;
        case "ar": data = ar; break;
        case "hi": data = hi; break;
        case "hu": data = hu; break;
        case "id": data = id; break;
        case "ja": data = ja; break;
        case "ko": data = ko; break;
        case "ms": data = ms; break;
        case "pl": data = pl; break;
        case "ro": data = ro; break;
        case "sk": data = sk; break;
        case "th": data = th; break;
        case "tr": data = tr; break;
        case "uk": data = uk; break;
        case "vi": data = vi; break;

        case "be": data = be; break;
        case "lv": data = lv; break;
        case "lt": data = lt; break;
        case "et": data = et; break;
        case "bg": data = bg; break;
        case "sl": data = sl; break;
        case "sr": navigator.language.slice(3, 5) == "rs" ? data = sr_rs : data = sr_latn; break;
        // case "sr_rs": data = sr_rs; break;
        // case "sr_latn": data = sr_latn; break;

        case "hy": data = hy; break;
        case "ka": data = ka; break;
        case "az": data = az; break;
        case "kk": data = kk; break;
        case "uz": data = uz; break;
        case "ky": data = ky; break;
        case "tg": data = tg; break;
        case "tk": data = tk; break;
        case "tt": data = tt; break;
        case "af": data = af; break;
        case "sq": data = sq; break;

        case "bs": navigator.language.slice(3, 5) == "ba" ? data = bs_ba : data = bs_cyrl; break;
        // case "bs_ba": data = bs_ba; break;
        // case "bs_cyrl": data = bs_cyrl; break;

        case "is": data = is; break;
        case "am": data = am; break;
        case "as": data = as; break;
        case "eu": data = eu; break;
        case "bn": data = bn; break;
        case "br": data = br; break;
        case "my": data = my; break;
        case "ce": data = ce; break;
        case "dz": data = dz; break;
        case "fo": data = fo; break;
        case "gl": data = gl; break;
        case "gu": data = gu; break;
        case "ha": data = ha; break;
        case "ga": data = ga; break;
        case "jv": data = jv; break;
        case "kn": data = kn; break;
        case "ks": data = ks; break;
        case "km": data = km; break;
        case "lb": data = lb; break;
        case "lo": data = lo; break;
        case "mk": data = mk; break;
        case "ml": data = ml; break;
        case "mt": data = mt; break;
        case "mr": data = mr; break;
        case "mn": data = mn; break;
        case "ne": data = ne; break;
        case "nn": data = nn; break;
        case "no": data = nb; break;
        case "or": data = or; break;
        case "pa": data = pa; break;
        case "fa": data = fa; break;
        case "sd": data = sd; break;
        case "gd": data = gd; break;
        case "si": data = si; break;
        case "sw": data = sw; break;
        case "ta": data = ta; break;
        case "te": data = te; break;
        case "ti": data = ti; break;
        case "ug": data = ug; break;
        case "ur": data = ur; break;
        case "cy": data = cy; break;

        case "zh": 
            switch(navigator.language.slice(3, 5)){
                case "cn": data = zh_cn; break;
                case "hk": data = zh_hk; break;
                case "mo": data = zh_mo; break;
                case "tw": data = zh_tw; break;
            }
            break;

        // case "zh_cn": data = zh_cn; break;
        // case "zh_hk": data = zh_hk; break;
        // case "zh_mo": data = zh_mo; break;
        // case "zh_tw": data = zh_tw; break;

       
        default: data = en; break;
    }
    // let data = list;
    return JSON.parse(data);
    // return data;
}

const setBackColor = () => {


    if (typeof(localStorage.colors) == "undefined") {
        localStorage.colors = JSON.stringify(backColors);
    } else {
        backColors = JSON.parse(localStorage.colors);
        backColors.push(backColors.shift());
        localStorage.colors = JSON.stringify(backColors);
    }
    // console.log(localStorage.colors);

    document.documentElement.style.setProperty('--backColor', backColors[0]);

    // console.log(back[0]);
    // if (backColors.length == parseInt(localStorage.color) + 1) localStorage.removeItem("color");

    // if (typeof(localStorage.color) == "undefined") {
    //     localStorage.color = 0;
    // } else {
    //     localStorage.color = parseInt(localStorage.color) + 1;
    // }
    // console.log(localStorage.color);

    // // localStorage.clear();
    // document.documentElement.style.setProperty('--backColor', backColor[parseInt(localStorage.color)]);
    // // console.log(back[0]);
    // if (backColor.length == parseInt(localStorage.color) + 1) localStorage.removeItem("color");
}

const setCards = (codes) => {

    let name;

    setBackColor();

    document.querySelectorAll('.card img').forEach((image, i) => {
        if (i < numberOfCards) {

            name  = countries.find(x => x.code === codes[i].toUpperCase()).name;

            image.src = `./images/flags/${codes[i]}.png`;
            image.nextElementSibling.querySelector('p').style.fontSize = "";
            image.nextElementSibling.querySelector('p').innerHTML = name;
            // console.log("fontsize: ", parseFloat(getComputedStyle(image.nextElementSibling.firstElementChild).getPropertyValue("font-size")) * 100 / window.innerWidth);
            // console.log(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fontSize')));

            // console.log("div height:", getComputedStyle(image.nextElementSibling).getPropertyValue("height"));
            // console.log("p height:", getComputedStyle(image.nextElementSibling.firstElementChild).getPropertyValue("height"));

            let fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fontSize'));

            while (parseFloat(getComputedStyle(image.nextElementSibling).getPropertyValue("height")) < parseFloat(getComputedStyle(image.nextElementSibling.firstElementChild).getPropertyValue("height"))) {
                fontSize -= 0.1;
                image.nextElementSibling.firstElementChild.style.fontSize = fontSize + "vmin";

                // console.log(fontSize);
            }
            if (fontSize < parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fontSize'))){
                fontSize -= 0.1;
                image.nextElementSibling.firstElementChild.style.fontSize = fontSize + "vmin";
            }

            while (parseFloat(getComputedStyle(image.nextElementSibling).getPropertyValue("width")) < parseFloat(getComputedStyle(image.nextElementSibling.firstElementChild).getPropertyValue("width"))) {
                fontSize -= 0.1;
                image.nextElementSibling.firstElementChild.style.fontSize = fontSize + "vmin";

                // console.log(fontSize);
            }
                    

            // if ((name).split(/-| /).length > 2 && (name).length > 24){
            //     // image.nextElementSibling.querySelector('p').style.lineHeight = 0.9;
            //     if(screen.width > 460 && screen.height > 460){
            //         image.nextElementSibling.querySelector('p').style.fontSize = "2.1vmin";

            //     } else {
            //         image.nextElementSibling.querySelector('p').style.fontSize = "2.8vmin";
            //     }
            // }
        }
    });
}

const localStorageCodes = () => {

    let codes;
    let randomizedCodes;
    
    if (typeof(localStorage.codes) == "undefined") {
        // codes = countries.map(a => a.code);
        codes = codes2;
     
        randomizedCodes = codes.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
        // randomizedCodes = codes2; // test


        localStorage.codes = JSON.stringify(randomizedCodes);
        // console.log("undefined");
        // console.log(localStorage.codes);
    } 
 
    codes = JSON.parse(localStorage.codes).slice(0, numberOfCards/2);
    // codes = JSON.parse(localStorage.codes).slice(0, numberOfCards); //test

    if (codes.length < numberOfCards/2){
        // if (codes.length < numberOfCards){   //test
    
        // randomizedCodes = codes.concat(countries.map(a => a.code).map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]));
        // console.log("codes2: ", codes2);
        do{
            randomizedCodes = codes2.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
            // console.log("randomizedCodes: ", randomizedCodes);
        } while(randomizedCodes.slice(0, codes.length).some(r => codes.includes(r)));



        randomizedCodes = codes.concat(randomizedCodes);
        localStorage.codes = JSON.stringify(randomizedCodes);
        
        codes = JSON.parse(localStorage.codes).slice(0, numberOfCards/2);
        // codes = JSON.parse(localStorage.codes).slice(0, numberOfCards);  //test
    }

    // console.log("from storage");
    // console.log(codes);

    localStorage.codes = JSON.stringify(JSON.parse(localStorage.codes).slice(numberOfCards/2));
    // localStorage.codes = JSON.stringify(JSON.parse(localStorage.codes).slice(numberOfCards));  //test



    codes = shuffleCodes(codes);  //no test

    // console.log(codes);

    return codes;


    // localStorage.clear();

    // console.log(localStorage.color);

    // console.log(countries[20].name);
}

const showUp = () => {

    let delays = Array.from({length: numberOfCards}, (_, i) => i/7);
    delays = delays.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    // console.log(delays);
    document.querySelectorAll(".flip-container").forEach((card, i) => {
        if (i < numberOfCards){
            card.style.transition = `opacity 0s linear ${delays[i]}s`; //notest
            card.style.opacity = 1;
            // card.style.opacity = 0; //test


            // card.classList.toggle("flip");

        }
    });

    // let bigCard = document.querySelector("#big2");
    // bigCard.style.opacity = 1;
    // bigCard.style.display = "flex";
    // bigCard.querySelector("img").src = "/images/flags/am.png";
    // bigCard.querySelector("p").innerHTML = countries.find(x => x.code === "cf".toUpperCase()).name;
    // bigCard.querySelector('p').style.fontSize = "";
    // let fontSizeBig = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fontSizeBig'));
    // while (parseFloat(getComputedStyle(bigCard.querySelector('.country')).getPropertyValue("width")) < parseFloat(getComputedStyle(bigCard.querySelector('p')).getPropertyValue("width"))) {
    //     fontSizeBig -= 0.1;
    //     bigCard.querySelector('p').style.fontSize= fontSizeBig + "vmin";

    //     console.log(fontSizeBig);
    // }
    
            
}

const init = () => {

    // console.log("init");

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

    // console.log("countries", countries);
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

    // let i = 0;
    
    showUp();
    // setTimeout(function() {document.querySelector('#card1').classList.toggle("hover");
    // console.log("timeout");
    // }, 5000);

}


window.onload = () => {
    document.fonts.ready.then(() => {

        function preventDefault(e){
            e.preventDefault();
        }
        
        document.body.addEventListener('touchmove', preventDefault, { passive: false });
        
        init();
        // setTimeout(1000, init);
    });
    
};

