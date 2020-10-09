// codes1 = ["ad.svg","ae.svg","af.svg","ag.svg","al.svg","am.svg","ao.svg","aq.svg","ar.svg","at.svg","au.svg","az.svg","ba.svg","bb.svg","bd.svg","be.svg","bf.svg","bg.svg","bh.svg","bi.svg","bj.svg","bn.svg","bo.svg","br.svg","bs.svg","bt.svg","bv.svg","bw.svg","by.svg","bz.svg","ca.svg","cd.svg","cf.svg","cg.svg","ch.svg","ci.svg","cl.svg","cm.svg","cn.svg","co.svg","cr.svg","cu.svg","cv.svg","cy.svg","cz.svg","de.svg","dj.svg","dk.svg","dm.svg","do.svg","dz.svg","ec.svg","ee.svg","eg.svg","er.svg","es-ca.svg","es-ga.svg","es.svg","et.svg","eu.svg","fi.svg","fj.svg","fm.svg","fr.svg","ga.svg","gb.svg","gd.svg","ge.svg","gh.svg","gm.svg","gn.svg","gq.svg","gr.svg","gt.svg","gw.svg","gy.svg","hm.svg","hn.svg","hr.svg","ht.svg","hu.svg","id.svg","ie.svg","il.svg","in.svg","iq.svg","ir.svg","is.svg","it.svg","jm.svg","jo.svg","jp.svg","ke.svg","kg.svg","kh.svg","ki.svg","km.svg","kn.svg","kp.svg","kr.svg","kw.svg","kz.svg","la.svg","lb.svg","lc.svg","li.svg","lk.svg","lr.svg","ls.svg","lt.svg","lu.svg","lv.svg","ly.svg","ma.svg","mc.svg","md.svg","me.svg","mg.svg","mh.svg","mk.svg","ml.svg","mm.svg","mn.svg","mr.svg","mt.svg","mu.svg","mv.svg","mw.svg","mx.svg","my.svg","mz.svg","na.svg","ne.svg","ng.svg","ni.svg","nl.svg","no.svg","np.svg","nr.svg","nz.svg","om.svg","pa.svg","pe.svg","pg.svg","ph.svg","pk.svg","pl.svg","ps.svg","pt.svg","pw.svg","py.svg","qa.svg","ro.svg","rs.svg","ru.svg","rw.svg","sa.svg","sb.svg","sc.svg","sd.svg","se.svg","sg.svg","si.svg","sk.svg","sl.svg","sm.svg","sn.svg","so.svg","sr.svg","ss.svg","st.svg","sv.svg","sy.svg","sz.svg","td.svg","tg.svg","th.svg","tj.svg","tl.svg","tm.svg","tn.svg","to.svg","tr.svg","tt.svg","tv.svg","tz.svg","ua.svg","ug.svg","un.svg","us.svg","uy.svg","uz.svg","va.svg","vc.svg","ve.svg","vn.svg","vu.svg","ws.svg","ye.svg","za.svg","zm.svg","zw.svg"];


// let ex = ['ai.svg', 'aq.svg', 'as.svg', 'ax.svg', 'aw.svg', 'bl.svg', 'bm.svg', 'bq.svg', 'bv.svg', 'cc.svg', 'ck.svg', 'cw.svg', 'cx.svg', 'eh.svg', 'es-ca.svg', 'es-ga.svg', 'eu.svg', 'fk.svg', 'fo.svg', 'gb-eng.svg', 'gb-nir.svg', 'gb-sct.svg', 'gb-wls.svg', 'gf.svg', 'gg.svg', 'gi.svg', 'gl.svg', 'gp.svg', 'gs.svg', 'gu.svg', 'hk.svg', 'hm.svg', 'im.svg', 'io.svg', 'je.svg', 'ky.svg', 'mf.svg', 'mo.svg', 'mp.svg', 'mq.svg', 'ms.svg', 'nc.svg', 'nf.svg', 'nu.svg', 'pf.svg', 'pm.svg', 'pn.svg', 'pr.svg', 're.svg', 'sh.svg', 'sj.svg', 'sx.svg', 'tc.svg', 'tf.svg', 'tk.svg', 'tw.svg', 'um.svg', 'un.svg', 'vg.svg', 'vi.svg', 'wf.svg', 'xk.svg', 'yt.svg'];

// fetch('https://www.iban.com/country-codes').then(function (response) {
// 	// The API call was successful!
// 	return response.text();
// }).then(function (html) {

// 	// Convert the HTML string into a document object
// 	let parser = new DOMParser();
//     let doc = parser.parseFromString(html, 'text/html');
//     // let codes = [];

//     // Get the image file
//     countries_en = JSON.parse(en);
//     countries_ru = JSON.parse(ru);






    // let i = 0;
    // name = "";
    // doc.querySelectorAll("td").forEach((dt) => {
    //         // code = country.querySelector(".alpha-2").innerHTML.toLowerCase() + ".svg";
    //         // if (!ex.includes(code)) {
    //         //     codes.push(code);
    //         //     // console.log(i + 1, " - ", code, " - ", country.getAttribute("title"));
    //         //     i++;
    //         // }
    //         if (!(i % 4)) {
    //             name = dt.innerHTML;
    //         }
    //         if (!((i - 1) % 4)) {
    //             code = dt.innerHTML;
    //             name2  = countries.find(x => x.code === code).name;
    //             if(name != name2) {
    //                 // console.log(code, " - ", name, " - ", name2);
    //             }
    //         }

    //         i++
            
    //     }
    //  );
    //  console.log(JSON.parse(en2));
    //  codes.sort();
    //  console.log(codes);
    //  console.log(codes1);

    //  codes1.forEach((code) => {
    //      if (!codes.includes(code)){
    //          console.log(code);
    //      }


    //  });
    
// }).catch(function (err) {
// 	// There was an error
// 	console.warn('Something went wrong.', err);
// });



    countries_en = JSON.parse(en);
    countries_ru = JSON.parse(ru);

    console.log("countries_en", countries_en);
    console.log("countries_ru", countries_ru);
    console.log("codes2", codes2);

    for (code of codes2) {
        // console.log("code", codes);

        name_en  = countries_en.find(x => x.code === code.toUpperCase()).name;
        name_ru = countries_ru.find(x => x.code === code.toUpperCase()).name;
        console.log(code, " - ", name_en, " - ", name_ru);



    }
