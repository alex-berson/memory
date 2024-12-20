const cacheName = 'cache-v4';
const files = [
  '/memory/',
  'index.html',
  'css/style.css',
  'js/memory.js',
  'js/data.js',
  'json/af.json',
  'json/am.json',
  'json/ar.json',
  'json/as.json',
  'json/az.json',
  'json/be.json',
  'json/bg.json',
  'json/bn.json',
  'json/br.json',
  'json/bs-ba.json',
  'json/bs-cyrl.json',
  'json/ca.json',
  'json/ce.json',
  'json/cs.json',
  'json/cy.json',
  'json/da.json',
  'json/de.json',
  'json/dz.json',
  'json/el.json',
  'json/en.json',
  'json/es.json',
  'json/et.json',
  'json/eu.json',
  'json/fa.json',
  'json/fi.json',
  'json/fo.json',
  'json/fr.json',
  'json/ga.json',
  'json/gd.json',
  'json/gl.json',
  'json/gu.json',
  'json/ha.json',
  'json/he.json',
  'json/hi.json',
  'json/hr.json',
  'json/hu.json',
  'json/hy.json',
  'json/id.json',
  'json/is.json',
  'json/it.json',
  'json/ja.json',
  'json/jv.json',
  'json/ka.json',
  'json/kk.json',
  'json/km.json',
  'json/kn.json',
  'json/ko.json',
  'json/ks.json',
  'json/ky.json',
  'json/lb.json',
  'json/lo.json',
  'json/lt.json',
  'json/lv.json',
  'json/mk.json',
  'json/ml.json',
  'json/mn.json',
  'json/mr.json',       
  'json/ms.json',
  'json/mt.json',
  'json/my.json',
  'json/nb.json',
  'json/ne.json',
  'json/nl.json',
  'json/nn.json',
  'json/or.json',
  'json/pa.json',
  'json/pl.json',
  'json/pt.json',
  'json/ro.json',
  'json/ru.json',
  'json/sd.json',
  'json/si.json',
  'json/sk.json',
  'json/sl.json',
  'json/sq.json',
  'json/sr-latn.json',
  'json/sr-rs.json',
  'json/sv.json',
  'json/sw.json',
  'json/ta.json',
  'json/te.json',
  'json/tg.json',
  'json/th.json',
  'json/ti.json',
  'json/tk.json',
  'json/tr.json',
  'json/tt.json',
  'json/ug.json',
  'json/uk.json',
  'json/ur.json',
  'json/uz.json',
  'json/vi.json',
  'json/zh-cn.json',
  'json/zh-hk.json',
  'json/zh-mo.json',
  'json/zh-tw.json',
  'images/flags/ad.png',
  'images/flags/ae.png',
  'images/flags/af.png',
  'images/flags/ag.png',
  'images/flags/ai.png',
  'images/flags/al.png',
  'images/flags/am.png',
  'images/flags/ao.png',
  'images/flags/aq.png',
  'images/flags/ar.png',
  'images/flags/as.png',
  'images/flags/at.png',
  'images/flags/au.png',
  'images/flags/aw.png',
  'images/flags/ax.png',
  'images/flags/az.png',
  'images/flags/ba.png',
  'images/flags/bb.png',
  'images/flags/bd.png',
  'images/flags/be.png',
  'images/flags/bf.png',
  'images/flags/bg.png',
  'images/flags/bh.png',
  'images/flags/bi.png',
  'images/flags/bj.png',
  'images/flags/bl.png',
  'images/flags/bm.png',
  'images/flags/bn.png',
  'images/flags/bo.png',
  'images/flags/bq.png',
  'images/flags/br.png',
  'images/flags/bs.png',
  'images/flags/bt.png',
  'images/flags/bw.png',
  'images/flags/by.png',
  'images/flags/bz.png',
  'images/flags/ca.png',
  'images/flags/cc.png',
  'images/flags/cd.png',
  'images/flags/cf.png',
  'images/flags/cg.png',
  'images/flags/ch.png',
  'images/flags/ci.png',
  'images/flags/ck.png',
  'images/flags/cl.png',
  'images/flags/cm.png',
  'images/flags/cn.png',
  'images/flags/co.png',
  'images/flags/cr.png',
  'images/flags/cu.png',
  'images/flags/cv.png',
  'images/flags/cw.png',
  'images/flags/cx.png',
  'images/flags/cy.png',
  'images/flags/cz.png',
  'images/flags/de.png',
  'images/flags/dj.png',
  'images/flags/dk.png',
  'images/flags/dm.png',
  'images/flags/do.png',
  'images/flags/dz.png',
  'images/flags/ec.png',
  'images/flags/ee.png',
  'images/flags/eg.png',
  'images/flags/eh.png',
  'images/flags/er.png',
  'images/flags/es.png',
  'images/flags/et.png',
  'images/flags/fi.png',
  'images/flags/fj.png',
  'images/flags/fk.png',
  'images/flags/fm.png',
  'images/flags/fo.png',
  'images/flags/fr.png',
  'images/flags/ga.png',
  'images/flags/gb.png',
  'images/flags/gd.png',
  'images/flags/ge.png',
  'images/flags/gf.png',
  'images/flags/gg.png',
  'images/flags/gh.png',
  'images/flags/gi.png',
  'images/flags/gl.png',
  'images/flags/gm.png',
  'images/flags/gn.png',
  'images/flags/gp.png',
  'images/flags/gq.png',
  'images/flags/gr.png',
  'images/flags/gs.png',
  'images/flags/gt.png',
  'images/flags/gu.png',
  'images/flags/gw.png',
  'images/flags/gy.png',
  'images/flags/hk.png',
  'images/flags/hn.png',
  'images/flags/hr.png',
  'images/flags/ht.png',
  'images/flags/hu.png',
  'images/flags/id.png',
  'images/flags/ie.png',
  'images/flags/il.png',
  'images/flags/im.png',
  'images/flags/in.png',
  'images/flags/iq.png',
  'images/flags/ir.png',
  'images/flags/is.png',
  'images/flags/it.png',
  'images/flags/je.png',
  'images/flags/jm.png',
  'images/flags/jo.png',
  'images/flags/jp.png',
  'images/flags/ke.png',
  'images/flags/kg.png',
  'images/flags/kh.png',
  'images/flags/ki.png',
  'images/flags/km.png',
  'images/flags/kn.png',
  'images/flags/kp.png',
  'images/flags/kr.png',
  'images/flags/kw.png',
  'images/flags/ky.png',
  'images/flags/kz.png',
  'images/flags/la.png',
  'images/flags/lb.png',
  'images/flags/lc.png',
  'images/flags/li.png',
  'images/flags/lk.png',
  'images/flags/lr.png',
  'images/flags/ls.png',
  'images/flags/lt.png',
  'images/flags/lu.png',
  'images/flags/lv.png',
  'images/flags/ly.png',
  'images/flags/ma.png',
  'images/flags/mc.png',
  'images/flags/md.png',
  'images/flags/me.png',
  'images/flags/mg.png',
  'images/flags/mh.png',
  'images/flags/mk.png',
  'images/flags/ml.png',
  'images/flags/mm.png',
  'images/flags/mn.png',
  'images/flags/mo.png',
  'images/flags/mp.png',
  'images/flags/mq.png',
  'images/flags/mr.png',
  'images/flags/ms.png',
  'images/flags/mt.png',
  'images/flags/mu.png',
  'images/flags/mv.png',
  'images/flags/mw.png',
  'images/flags/mx.png',
  'images/flags/my.png',
  'images/flags/mz.png',
  'images/flags/na.png',
  'images/flags/nc.png',
  'images/flags/ne.png',
  'images/flags/nf.png',
  'images/flags/ng.png',
  'images/flags/ni.png',
  'images/flags/nl.png',
  'images/flags/no.png',
  'images/flags/np.png',
  'images/flags/nr.png',
  'images/flags/nu.png',
  'images/flags/nz.png',
  'images/flags/om.png',
  'images/flags/pa.png',
  'images/flags/pe.png',
  'images/flags/pf.png',
  'images/flags/pg.png',
  'images/flags/ph.png',
  'images/flags/pk.png',
  'images/flags/pl.png',
  'images/flags/pm.png',
  'images/flags/pn.png',
  'images/flags/pr.png',
  'images/flags/ps.png',
  'images/flags/pt.png',
  'images/flags/pw.png',
  'images/flags/py.png',
  'images/flags/qa.png',
  'images/flags/re.png',
  'images/flags/ro.png',
  'images/flags/rs.png',
  'images/flags/ru.png',
  'images/flags/rw.png',
  'images/flags/sa.png',
  'images/flags/sb.png',
  'images/flags/sc.png',
  'images/flags/sd.png',
  'images/flags/se.png',
  'images/flags/sg.png',
  'images/flags/sh.png',
  'images/flags/si.png',
  'images/flags/sk.png',
  'images/flags/sl.png',
  'images/flags/sm.png',
  'images/flags/sn.png',
  'images/flags/so.png',
  'images/flags/sr.png',
  'images/flags/ss.png',
  'images/flags/st.png',
  'images/flags/sv.png',
  'images/flags/sx.png',
  'images/flags/sy.png',
  'images/flags/sz.png',
  'images/flags/tc.png',
  'images/flags/td.png',
  'images/flags/tf.png',
  'images/flags/tg.png',
  'images/flags/th.png',
  'images/flags/tj.png',
  'images/flags/tk.png',
  'images/flags/tl.png',
  'images/flags/tm.png',
  'images/flags/tn.png',
  'images/flags/to.png',
  'images/flags/tr.png',
  'images/flags/tt.png',
  'images/flags/tv.png',
  'images/flags/tw.png',
  'images/flags/tz.png',
  'images/flags/ua.png',
  'images/flags/ug.png',
  'images/flags/us.png',
  'images/flags/uy.png',
  'images/flags/uz.png',
  'images/flags/va.png',
  'images/flags/vc.png',
  'images/flags/ve.png',
  'images/flags/vg.png',
  'images/flags/vi.png',
  'images/flags/vn.png',
  'images/flags/vu.png',
  'images/flags/wf.png',
  'images/flags/ws.png',
  'images/flags/xk.png',
  'images/flags/ye.png',
  'images/flags/yt.png',
  'images/flags/za.png',
  'images/flags/zm.png',
  'images/flags/zw.png',
  'fonts/LiberationSerif-Regular.ttf',
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
      cache.addAll(files);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      )
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});