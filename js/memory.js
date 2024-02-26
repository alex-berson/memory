let numCards;
let countries = [];
let codes = [];

const shuffle = (array) => {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.trunc(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array;
}

const firework = () => {

    let n = 0;
    let bigCards = [...document.querySelectorAll('.bigcard')];
    let cards = [...document.querySelectorAll('.card-wrap')];
    let designed = document.querySelector('.designed');
    let minSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--min-side'));
    let maxSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--max-side'));
    let fontSizeOrig = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size-big'));
    let cardWrap = document.querySelector('.bigcards-wrap');
    
    cardWrap.classList.add('display');

    cards.forEach(card => {
        card.classList.remove('flip');
        card.querySelector('p').removeAttribute('style');
    });

    const zoom = () => {

        let i = numCards / 2 - bigCards.length;
        let bigCard = bigCards.shift();
        let card = document.querySelector(`[data-n="${i + 1}"]`);
        let index = cards.indexOf(card);
        let [numR, numC] = window.innerHeight > window.innerWidth ? [maxSide, minSide] : [minSide, maxSide];
        let [r, c] = [Math.trunc(index / numC), index % numC];
        let [r0, c0] = [numR / 2, numC / 2];
        let offX = Number.isInteger(c0) ? 75 + (c - c0) * 50 : 50 + (c - Math.trunc(c0)) * 50;
        let offY = Number.isInteger(r0) ? 75 + (r - r0) * 50 : 50 + (r - Math.trunc(r0)) * 50;
        let fontSize = fontSizeOrig;

        if (numCards / 2 - i == 6) designed.classList.add('show-designed');
        if (numCards / 2 - i == 3) designed.classList.remove('show-designed');
        
        bigCard.style.transformOrigin = `${offX}% ${offY}%`;
        bigCard.querySelector('img').src = card.querySelector('img').src;
        bigCard.querySelector('p').innerText = card.querySelector('p').innerText;

        while (parseFloat(getComputedStyle(bigCard.querySelector('.country')).getPropertyValue('width')) < parseFloat(getComputedStyle(bigCard.querySelector('p')).getPropertyValue('width'))) {
            fontSize -= 0.1;
            bigCard.querySelector('p').style.fontSize = fontSize + 'vmin';
        }

        bigCard.classList.add('zoom-in');

        bigCard.addEventListener('animationend', (e) => {

            let card = e.currentTarget;

            card.classList.remove('zoom-in');
            card.classList.add('zoom-out');

            card.addEventListener('animationend', (e) => {

                let card = e.currentTarget;

                n++;

                card.removeAttribute('style');
                card.classList.remove('zoom-out');
                card.querySelector('p').removeAttribute('style');

                if (n >= numCards / 2) {
                    cardWrap.classList.remove('display');
                    newGame();
                }

            }, {once: true});

            if (bigCards.length > 0) zoom();

        }, {once: true});
    }

    zoom();
}

const newGame = () => {

    setCards();
    enableCards();    
    setTimeout(showCards, 500);
}

const flipCard = (e) => {

    let card = e.currentTarget;
    let turned = [...document.querySelectorAll('.flip.visible')];
    let numTurned = turned.length;

    if (getComputedStyle(card).getPropertyValue('opacity') == 0) return;
    if (numTurned == 1 && card.classList.contains('flip')) return;

    if (numTurned == 2) {

        clearTimeout(flipCard.autoTurn);
        turned.forEach(card => card.classList.remove('flip'));

        numTurned = 0;
    }

    card.classList.add('flip');

    if (numTurned == 0) return; 

    turned.push(card);

    if (turned[0].querySelector('p').innerText != turned[1].querySelector('p').innerText) {

        flipCard.autoTurn = setTimeout(() => turned.forEach(card => card.classList.remove('flip')), 700);

        return;
    }

    let n = document.querySelectorAll('.flip').length / 2;

    turned[Math.round(Math.random())].dataset.n = n;

    turned.forEach(card => {
        disableCard(card);
        card.style.transition = 'opacity 2s linear 0.6s';
        card.classList.remove('visible');    
    });

    if (document.querySelectorAll('.visible').length == 0) {

        localStorage.codes = JSON.stringify(JSON.parse(localStorage.codes).slice(numCards/2));
        localStorage.colors = JSON.stringify(JSON.parse(localStorage.colors).slice(1));
        
        turned[1].addEventListener('transitionend', e => {

            let card = e.currentTarget;

            card.addEventListener('transitionend', () => setTimeout(firework, 300), {once: true});
                        
        }, {once: true});
    }
}

const setBoardSize = () => {

    let boardSize = 0.92;
    let minSide = 5;
    let maxSide = 6;
    let minSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

    if (screen.width < 460 || screen.height < 460) {

        minSide = 4;
        maxSide = (screen.width / screen.height > 0.5) ? 6 : 7;

        if (window.navigator.standalone || document.URL.indexOf('http://') == -1 && document.URL.indexOf('https://') == -1) {
            maxSide += 1;
        }
    }
    
    numCards = minSide * maxSide;

    document.documentElement.style.setProperty('--min-side', minSide);
    document.documentElement.style.setProperty('--max-side', maxSide);
    document.documentElement.style.setProperty('--board-size', Math.ceil(minSize * boardSize / minSide) * minSide + 'px');
}

const countryData = () => {

    let lang = navigator.language.slice(0, 2).toLowerCase();
    let langs = {
        en, ru, de, fr, es, it, pt, nl, sv, da, nb, fi, ca, el, hr, cs, 
        he, ar, hi, hu, id, ja, ko, ms, pl, ro, sk, th, tr, uk, vi, be, 
        lv, lt, et, bg, sl, hy, ka, az, kk, uz, ky, tg, tk, tt, af, sq, 
        is, am, as, eu, bn, br, my, ce, dz, fo, gl, gu, ha, ga, jv, kn, 
        ks, km, lb, lo, mk, ml, mt, mr, mn, ne, nn, or, pa, fa, sd, gd, 
        si, sw, ta, te, ti, ug, ur, cy
    };
        
    if (lang == 'zh') {

        let regions = {cn: zh_cn, hk: zh_hk, mo: zh_mo, tw: zh_tw};
        let data = regions[navigator.language.slice(3, 5).toLowerCase()] || zh_cn;

        return JSON.parse(data);
    }

    if (lang == 'sr') {

        let regions = {rs: sr_rs, la: sr_latn};
        let data = regions[navigator.language.slice(3, 5).toLowerCase()] || sr_rs;

        return JSON.parse(data);
    }

    if (lang == 'bs') {

        let regions = {ba: bs_ba, cy: bs_cyrl};
        let data = regions[navigator.language.slice(3, 5).toLowerCase()] || bs_ba;

        return JSON.parse(data);
    }

    let data = langs[lang] || en;
   
    return JSON.parse(data);
}

const createCards = () => {

    let board = document.querySelector('.board');
    let cardWrap = document.querySelector('.bigcards-wrap');
    let templateSmall = document.querySelector('.card-template');
    let templateBig = document.querySelector('.bigcard-template');

    for (let i = 0; i < numCards; i++) {

        let cardClone = templateSmall.content.cloneNode(true);
        
        board.prepend(cardClone);

        if (i % 2 == 0) continue;

        cardClone = templateBig.content.cloneNode(true);
        
        cardWrap.prepend(cardClone);
    }
}

const setCards = () => {

    let cards = document.querySelectorAll('.card-wrap');
    let storageColors = JSON.parse(localStorage.getItem('colors') || '[]');
    countries = countryData();
    codes = countryCodes(); 

    if (storageColors.length == 0) localStorage.colors = JSON.stringify(colors);

    let color = JSON.parse(localStorage.colors)[0];
    
    document.documentElement.style.setProperty('--back-color', color);

    for (let i = 0; i < numCards; i++) {

        let image = cards[i].querySelector('img');
        let name  = countries.find(x => x.code === codes[i].toUpperCase()).name;
        let country = image.nextElementSibling;
        let text = country.firstElementChild;

        delete cards[i].dataset.n
        image.src = `./images/flags/${codes[i]}.png`;
        text.removeAttribute('style');
        text.innerHTML = name;

        let fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size'));

        while (parseFloat(getComputedStyle(country).getPropertyValue('height')) < parseFloat(getComputedStyle(text).getPropertyValue('height'))) {
            fontSize -= 0.1;
            text.style.fontSize = fontSize + 'vmin';
        }

        if (fontSize < parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size'))) {
            fontSize -= 0.1;
            text.style.fontSize = fontSize + 'vmin';
        }

        while (parseFloat(getComputedStyle(country).getPropertyValue('width')) < parseFloat(getComputedStyle(text).getPropertyValue('width'))) {
            fontSize -= 0.1;
            text.style.fontSize = fontSize + 'vmin';
        }
    }
}

const countryCodes = () => {
    
    if (localStorage.getItem('codes') == null) localStorage.codes = JSON.stringify(shuffle(alpha2));
 
    codes = JSON.parse(localStorage.codes).slice(0, numCards/2);

    if (codes.length < numCards / 2) {

        do {
            shuffle(alpha2);
        } while (alpha2.slice(0, numCards / 2 - codes.length).some(r => codes.includes(r)));

        localStorage.codes = JSON.stringify(codes.concat(alpha2));
        codes = JSON.parse(localStorage.codes).slice(0, numCards / 2);
    }

    return shuffle(codes.concat(codes)); 
}

const showCards = () => {

    let delays = Array.from({length: numCards}, (_, i) => i/7);
    let cards = document.querySelectorAll('.card-wrap');

    shuffle(delays);

    for (let i = 0; i < numCards; i++) {

        cards[i].style.transition = `opacity 0s linear ${delays[i]}s`; 
        cards[i].classList.add('visible');
    }     
}

const enableCards = () => {

    let cards = document.querySelectorAll('.card-wrap');

    cards.forEach(card => {
        card.addEventListener('touchstart', flipCard)
        card.addEventListener('mousedown', flipCard)    
    });

    window.addEventListener('resize', setBoardSize);
} 

const disableCard = (card) => {

    card.removeEventListener('touchstart', flipCard);
    card.removeEventListener('mousedown', flipCard);
}

const disableTapZoom = () => {

    const preventDefault = (e) => e.preventDefault();

    document.addEventListener('touchstart', preventDefault, {passive: false});
    document.addEventListener('mousedown', preventDefault, {passive: false});
}

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
}

const init = () => {
    registerServiceWorker();
    disableTapZoom();
    setBoardSize();
    createCards();
    setCards();
    showCards();
    enableCards();
}

window.onload = () => document.fonts.ready.then(init);