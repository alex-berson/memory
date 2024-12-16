let nCards;
let codes = [];
let countries = [];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const shuffle = (array) => {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.trunc(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array;
}

const setBoardSize = () => {

    let minSide = 5;
    let maxSide = 6;
    let minSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

    if (screen.width < 460 || screen.height < 460) {

        minSide = 4;
        maxSide = (screen.width / screen.height > 0.5) ? 6 : 7;

        if (window.navigator.standalone ||
            document.URL.indexOf('http://') == -1 &&
            document.URL.indexOf('https://') == -1) {
                maxSide += 1;
        }
    }

    let boardSize = Math.ceil(minSize * 0.92 / minSide) * minSide;
    
    nCards = minSide * maxSide;

    document.documentElement.style.setProperty('--min-side', minSide);
    document.documentElement.style.setProperty('--max-side', maxSide);
    document.documentElement.style.setProperty('--board-size', `${boardSize}px`);
}

const createCards = () => {

    let board = document.querySelector('.board');
    let cardWrap = document.querySelector('.bigcards-wrap');
    let templateSmall = document.querySelector('.card-template');
    let templateBig = document.querySelector('.bigcard-template');

    for (let i = 0; i < nCards; i++) {

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
    countries = getCountryData();
    codes = getCountryCodes(); 

    if (storageColors.length == 0) localStorage.colors = JSON.stringify(colors);

    let color = JSON.parse(localStorage.colors)[0];
    
    document.documentElement.style.setProperty('--back-color', color);

    for (let i = 0; i < nCards; i++) {

        let image = cards[i].querySelector('img');
        let name = countries.find(x => x.code == codes[i].toUpperCase()).name;
        let country = image.nextElementSibling;
        let text = country.firstElementChild;

        text.innerText = name;
        text.removeAttribute('style');
        delete cards[i].dataset.n;
        image.src = `./images/flags/${codes[i]}.png`;

        let fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size'));

        while (parseFloat(getComputedStyle(country).getPropertyValue('height')) < parseFloat(getComputedStyle(text).getPropertyValue('height'))) {
            fontSize -= 0.1;
            text.style.fontSize = `${fontSize}vmin`;
        }

        if (fontSize < parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size'))) {
            fontSize -= 0.1;
            text.style.fontSize = `${fontSize}vmin`;
        }

        while (parseFloat(getComputedStyle(country).getPropertyValue('width')) < parseFloat(getComputedStyle(text).getPropertyValue('width'))) {
            fontSize -= 0.1;
            text.style.fontSize = `${fontSize}vmin`;
        }
    }
}

const getCountryCodes = () => {
    
    if (localStorage.getItem('codes') == null) localStorage.codes = JSON.stringify(shuffle(alpha2));
 
    codes = JSON.parse(localStorage.codes).slice(0, nCards/2);

    if (codes.length < nCards / 2) {

        do {
            shuffle(alpha2);
        } while (alpha2.slice(0, nCards / 2 - codes.length).some(code => codes.includes(code)));

        localStorage.codes = JSON.stringify(codes.concat(alpha2));
        codes = JSON.parse(localStorage.codes).slice(0, nCards / 2);
    }

    return shuffle(codes.concat(codes));
}

const getCountryData = () => {

    let lang = navigator.language.slice(0, 2).toLowerCase();

    let langs = {
        af, am, ar, as, az, be, bg, bn, br, ca, ce, cs, cy, da, de,
        dz, el, en, es, et, eu, fa, fi, fo, fr, ga, gd, gl, gu, ha,
        he, hi, hr, hu, hy, id, is, it, ja, jv, ka, kk, km, kn, ko,
        ks, ky, lb, lo, lt, lv, mk, ml, mn, mr, ms, mt, my, nb, ne,
        nl, nn, or, pa, pl, pt, ro, ru, sd, si, sk, sl, sq, sv, sw,
        ta, te, tg, th, ti, tk, tr, tt, ug, uk, ur, uz, vi
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

const showCards = async () => {

    let cards = shuffle([...document.querySelectorAll('.card-wrap')]);

    for (let card of cards) {

        card.classList.add('visible');

        await sleep(150);
    }
}

const flipCard = (e) => {

    let card = e.currentTarget;
    let flippedCards = [...document.querySelectorAll('.flip.visible:not(.disappear)')];
    let numFlipped = flippedCards.length;

    if (!card.classList.contains('visible')) return;

    if (numFlipped == 1 && card.classList.contains('flip')) return;

    if (numFlipped == 2) {

        clearTimeout(flipCard.autoTurn);
        flippedCards.forEach(card => card.classList.remove('flip'));

        numFlipped = 0;
    }

    card.classList.add('flip');

    if (numFlipped == 0) return; 

    flippedCards.push(card);

    let [card1, card2] = flippedCards; 

    if (card1.querySelector('p').innerText != card2.querySelector('p').innerText) {

        flipCard.autoTurn = setTimeout(() => flippedCards.forEach(card => card.classList.remove('flip')), 700);

        return;
    }

    let n = document.querySelectorAll('.flip').length / 2;

    flippedCards[Math.round(Math.random())].dataset.n = n;

    flippedCards.forEach(card => {
        disableCard(card);
        card.classList.add('disappear');
    });

    card2.addEventListener('transitionend', () => {

        flippedCards.forEach(card => card.classList.remove('visible'));

        if (document.querySelectorAll('.visible').length == 0) endGame(card2);

    }, {once: true});
}

const endGame = (card) => {

    let cards = document.querySelectorAll('.card-wrap');

    localStorage.colors = JSON.stringify(JSON.parse(localStorage.colors).slice(1));
    localStorage.codes = JSON.stringify(JSON.parse(localStorage.codes).slice(nCards/2));
    
    card.addEventListener('transitionend', async () => {

        cards.forEach(card => {
            card.classList.remove('flip', 'disappear');
            card.querySelector('p').removeAttribute('style');
        });
        
        await sleep(300);
        showFirework();

    }, {once: true});
}

const showFirework = () => {

    let n = 0;
    let designed = document.querySelector('.designed');
    let cardWrap = document.querySelector('.bigcards-wrap');
    let cards = [...document.querySelectorAll('.card-wrap')];
    let bigCards = [...document.querySelectorAll('.bigcard')];
    let minSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--min-side'));
    let maxSide = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--max-side'));
    let fontSizeOriginal = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size-big'));
    
    cardWrap.classList.add('display');

    const zoomCard = () => {

        let i = nCards / 2 - bigCards.length;
        let bigCard = bigCards.shift();
        let card = document.querySelector(`[data-n='${i + 1}']`);
        let index = cards.indexOf(card);
        let [numR, numC] = window.innerHeight > window.innerWidth ? [maxSide, minSide] : [minSide, maxSide];
        let [r, c] = [Math.trunc(index / numC), index % numC];
        let [r0, c0] = [numR / 2, numC / 2];
        let offX = Number.isInteger(c0) ? 75 + (c - c0) * 50 : 50 + (c - Math.trunc(c0)) * 50;
        let offY = Number.isInteger(r0) ? 75 + (r - r0) * 50 : 50 + (r - Math.trunc(r0)) * 50;
        let fontSize = fontSizeOriginal;

        if (nCards / 2 - i == 6) designed.classList.add('visible');
        if (nCards / 2 - i == 3) designed.classList.remove('visible');
        
        bigCard.style.transformOrigin = `${offX}% ${offY}%`;
        bigCard.querySelector('img').src = card.querySelector('img').src;
        bigCard.querySelector('p').innerText = card.querySelector('p').innerText;

        while (parseFloat(getComputedStyle(bigCard.querySelector('.country')).getPropertyValue('width')) <
               parseFloat(getComputedStyle(bigCard.querySelector('p')).getPropertyValue('width'))) {
                    fontSize -= 0.1;
                    bigCard.querySelector('p').style.fontSize = `${fontSize}vmin`;
        }

        bigCard.classList.add('zoom-in');

        bigCard.addEventListener('animationend', () => {

            bigCard.classList.replace('zoom-in', 'zoom-out');

            bigCard.addEventListener('animationend', () => {

                n++;

                bigCard.removeAttribute('style');
                bigCard.classList.remove('zoom-out');
                bigCard.querySelector('p').removeAttribute('style');

                if (n >= nCards / 2) {
                    cardWrap.classList.remove('display');
                    resetGame();
                }

            }, {once: true});

            if (bigCards.length > 0) zoomCard();

        }, {once: true});
    }

    zoomCard();
}

const resetGame = async () => {

    setCards();
    enableCards();
    await sleep(300);
    showCards();
}

const enableCards = () => {

    let cards = document.querySelectorAll('.card-wrap');

    cards.forEach(card => {
        card.addEventListener('touchstart', flipCard);
        card.addEventListener('mousedown', flipCard);
    });

    window.addEventListener('resize', setBoardSize);
}

const disableCard = (card) => {

    card.removeEventListener('touchstart', flipCard);
    card.removeEventListener('mousedown', flipCard);
}

const disableScreen = () => {

    const preventDefault = (e) => e.preventDefault();

    document.addEventListener('touchstart', preventDefault, {passive: false});
    document.addEventListener('mousedown', preventDefault, {passive: false});
}

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
}

const init = () => {
    
    registerServiceWorker();
    disableScreen();
    setBoardSize();
    createCards();
    setCards();
    showCards();
    enableCards();
}

window.onload = () => document.fonts.ready.then(init);