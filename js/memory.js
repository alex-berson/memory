let numberOfCards;
let countries = [];
let codes = [];
const boardSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--boardSize'));

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(reg => {
          console.log('Service worker registered!', reg);
        })
        .catch(err => {
          console.log('Service worker registration failed: ', err);
        });
    });
}

const shuffleCodes = () => {
    return codes.concat(codes).map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    // return codes.concat(codes)
}

const firework = () => {
    const minSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minSide'));
    const maxSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--maxSide'));

    let cardNumbers = Array.from({length: numberOfCards}, (_, i) => i).map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);

    let big12 = 0;
    let doubles = [];
    let bigCard;

    document.querySelectorAll(".flip-container").forEach((card) => {
        card.style.opacity = 0;
        card.classList.toggle("flip");
        card.style.transition = "";
    });

    document.querySelector(`#big2`).style.display = "flex";
    document.querySelector(`#big1`).style.display = "flex";

    let i = 0;
    const zooming = () => {
        if (i == codes.length){
            clearInterval(zoomingInterval);
            setTimeout(() => {
                document.querySelectorAll("#big1, #big2").forEach((card) => {
                    card.style.display = "none";
                    if (iPhoneXApp()) {
                        card.classList.remove("zoomX");
                    } else {
                        card.classList.remove("zoom");
                    }
                });
                init();}, 1000);
        } else {
            let offsetLeft, offsetTop;

            window.innerHeight > window.innerWidth ? offsetLeft = (cardNumbers[i] + minSide) % minSide : offsetLeft = (cardNumbers[i] + maxSide) % maxSide;
            window.innerHeight > window.innerWidth ? offsetTop = Math.floor(cardNumbers[i] / minSide) : offsetTop = Math.floor(cardNumbers[i] / maxSide);

            document.documentElement.style.setProperty('--offsetLeft', offsetLeft);
            document.documentElement.style.setProperty('--offsetTop', offsetTop);

            bigCard = document.querySelector(`#big${big12 + 1} img`);
            bigCard.src = `./images/flags/${codes[cardNumbers[i]]}.png`;
            name  = countries.find(x => x.code === codes[cardNumbers[i]].toUpperCase()).name;
            bigCard.nextElementSibling.querySelector('p').innerHTML = name;
            bigCard.nextElementSibling.querySelector('p').style.fontSize = "";
            let fontSizeBig = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fontSizeBig'));
            while (parseFloat(getComputedStyle(bigCard.nextElementSibling).getPropertyValue("width")) < parseFloat(getComputedStyle(bigCard.nextElementSibling.querySelector('p')).getPropertyValue("width"))) {
                fontSizeBig -= 0.1;
                bigCard.nextElementSibling.querySelector('p').style.fontSize = fontSizeBig + "vmin";
            }

            if (iPhoneXApp()) {
                document.querySelector(`#big${big12 + 1}`).classList.add("zoomX");
            } else {
                document.querySelector(`#big${big12 + 1}`).classList.add("zoom");
            }

            doubles.push(codes[cardNumbers[i]]); 

            do {
                i++;
            } while (doubles.includes(codes[cardNumbers[i]]) && i < codes.length);
            big12 = 1 - big12;

            if (iPhoneXApp()) {
                setTimeout(() => {document.querySelector(`#big${big12 + 1}`).classList.remove("zoomX");}, 2000);
            } else {
                setTimeout(() => {document.querySelector(`#big${big12 + 1}`).classList.remove("zoom");}, 2000);
            }
        }
    }
    zooming();
    let  zoomingInterval = setInterval(zooming, 1100);
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

    if (getComputedStyle(e.currentTarget).getPropertyValue("opacity") == 0) return;

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
  
    if (flipCard.numberOfTurnedCards == 2){
        if (flipCard.turnedCards[0].querySelector("p").innerHTML == flipCard.turnedCards[1].querySelector("p").innerHTML){

            flipCard.numberOfTurnedCards = 0;

            document.querySelectorAll(`#${flipCard.turnedCards[0].id}, #${flipCard.turnedCards[1].id}`).forEach((card) => {
                if (matchMedia('(hover: none)').matches){
                    card.removeEventListener("touchstart", flipCard);
                } else {
                    card.removeEventListener("click", flipCard);
                }
                card.style.transition = 'opacity 2s linear';
            });

            document.querySelectorAll(`#${flipCard.turnedCards[0].id}, #${flipCard.turnedCards[1].id}`).forEach((card) => {
                card.style.opacity = 0;
            });

            flipCard.winPairs++;

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
    
    if(screen.width < 460 || screen.height < 460){
        if (screen.width/screen.height > 0.5 && screen.height/screen.width < 2){
            if (window.navigator.standalone || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1)) {
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
            if (window.navigator.standalone || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1)) {
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

const iPhoneXApp = () => {
    if ((document.URL.indexOf('http://') == -1 && document.URL.indexOf('https://') == -1) && 
        (screen.width < 460 || screen.height < 460) && 
        (screen.width/screen.height < 0.5 && screen.height/screen.width > 2)) {
            return true;
    } 
    return false;
}

const setTheBoard = () => {

    const minSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minSide'));

    if (window.innerHeight > window.innerWidth) {
        document.documentElement.style.setProperty('--boardSize', Math.ceil(window.innerWidth * boardSize / (minSide)) * minSide + 'px');
    } else {
        document.documentElement.style.setProperty('--boardSize', Math.ceil(window.innerHeight * boardSize / (minSide)) * minSide + 'px');
    }

    if (iPhoneXApp()) {

            document.querySelector(".board").style.marginBottom = "-15px";
    } 
}

const getDataFromJSON = () => {

    let data;

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
                default: data = zh_cn; break;
            }
            break;

        case "sr": navigator.language.slice(3, 5) == "rs" ? data = sr_rs : data = sr_latn; break;
        case "bs": navigator.language.slice(3, 5) == "ba" ? data = bs_ba : data = bs_cyrl; break;

        default: data = en; break;
    }
    return JSON.parse(data);
}

const setBackColor = () => {

    if (typeof(localStorage.colors) == "undefined") {
        localStorage.colors = JSON.stringify(backColors);
    } else {
        backColors = JSON.parse(localStorage.colors);
        backColors.push(backColors.shift());
        localStorage.colors = JSON.stringify(backColors);
    }
    
    document.documentElement.style.setProperty('--backColor', backColors[0]);
}

const setCards = () => {

    let name;

    setBackColor();

    document.querySelectorAll('.card img').forEach((image, i) => {
        if (i < numberOfCards) {

            name  = countries.find(x => x.code === codes[i].toUpperCase()).name;

            image.src = `./images/flags/${codes[i]}.png`;
            image.nextElementSibling.querySelector('p').style.fontSize = "";
            image.nextElementSibling.querySelector('p').innerHTML = name;

            let fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fontSize'));

            while (parseFloat(getComputedStyle(image.nextElementSibling).getPropertyValue("height")) < parseFloat(getComputedStyle(image.nextElementSibling.firstElementChild).getPropertyValue("height"))) {
                fontSize -= 0.1;
                image.nextElementSibling.firstElementChild.style.fontSize = fontSize + "vmin";
            }
            if (fontSize < parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fontSize'))){
                fontSize -= 0.1;
                image.nextElementSibling.firstElementChild.style.fontSize = fontSize + "vmin";
            }

            while (parseFloat(getComputedStyle(image.nextElementSibling).getPropertyValue("width")) < parseFloat(getComputedStyle(image.nextElementSibling.firstElementChild).getPropertyValue("width"))) {
                fontSize -= 0.1;
                image.nextElementSibling.firstElementChild.style.fontSize = fontSize + "vmin";
            }
        }
    });
}

const localStorageCodes = () => {

    let randomizedCodes;
    
    if (typeof(localStorage.codes) == "undefined") {
        codes = allCodes;
     
        randomizedCodes = codes.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);

        localStorage.codes = JSON.stringify(randomizedCodes);
    } 
 
    codes = JSON.parse(localStorage.codes).slice(0, numberOfCards/2);

    if (codes.length < numberOfCards/2){
        do{
            randomizedCodes = allCodes.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
        } while(randomizedCodes.slice(0, codes.length).some(r => codes.includes(r)));

        randomizedCodes = codes.concat(randomizedCodes);
        localStorage.codes = JSON.stringify(randomizedCodes);
        
        codes = JSON.parse(localStorage.codes).slice(0, numberOfCards/2);
    }

    codes = shuffleCodes(); 

    return codes;
}

const showUp = () => {

    let delays = Array.from({length: numberOfCards}, (_, i) => i/7);
    delays = delays.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    document.querySelectorAll(".flip-container").forEach((card, i) => {
        if (i < numberOfCards){
            card.style.transition = `opacity 0s linear ${delays[i]}s`; 
            card.style.opacity = 1;
        }
    });               
}

const init = () => {

    setEventListeners();

    setNumberOfCards();

    setTheBoard();
   
    countries = getDataFromJSON();
    
    codes = localStorageCodes(); 

    setCards();
    
    showUp();
}

window.onload = () => {
    document.fonts.ready.then(() => {

        const preventDefault = (e) => {
            e.preventDefault();
        }
        
        document.body.addEventListener('touchmove', preventDefault, { passive: false });
        
        init();
 
    });
}

