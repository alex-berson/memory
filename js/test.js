countries_en = JSON.parse(en);
// countries_de = JSON.parse(de);

codes_test = countries_en.map(a => a.code);

// console.log("codes_test", codes_test);
// console.log("codes2", codes2);

for (code of codes_test) {
    if (!codes2.includes(code.toLowerCase())) {
        // console.log("!code: ", code);
    }
}



// console.log("countries_de", countries_de);


// console.log("codes2", codes2);

// for (code of codes2) {
//     // console.log("code", codes);

//     name_en  = countries_en.find(x => x.code === code.toUpperCase()).name;
//     name_de = countries_de.find(x => x.code === code.toUpperCase()).name;
//     console.log(code, " - ", name_en, " - ", name_de);
//}
