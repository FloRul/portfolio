/* ============================================================
   FLORIAN RUMIEL: PORTFOLIO
   1. Language switch (EN/FR content lives side by side in the HTML)
   2. Strip map enhancements (pictograms, tech logos)
   3. Network map: drawn from the strip map's data attributes
   4. Station cards and upstream-path tracing
   ============================================================ */
(function () {
  'use strict';

  var SVGNS = 'http://www.w3.org/2000/svg';
  var root = document.documentElement;
  var DESKTOP = window.matchMedia('(min-width: 1024px)');
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

  var META = {
    en: {
      title: 'Florian Rumiel | AI Architect: Governed RAG & GraphRAG',
      desc: 'Florian Rumiel - AI Architect designing governed RAG and GraphRAG systems for regulated enterprises. Background in .NET development and DevOps. Haystack, AWS, Terraform.',
      map: 'Capability map. A Foundation line splits into a Governance line and a Knowledge line, which meet at the governed RAG platform and continue toward the current focus: Lead Architect. Each station opens its evidence.',
      close: 'Close',
      open: 'Show details'
    },
    fr: {
      title: 'Florian Rumiel | Architecte IA : RAG et GraphRAG gouvernés',
      desc: 'Florian Rumiel, architecte IA : je conçois des systèmes RAG et GraphRAG gouvernés pour les entreprises réglementées. Parcours en développement .NET et en DevOps. Haystack, AWS, Terraform.',
      map: 'Carte des compétences. Une ligne Fondation se divise en une ligne Gouvernance et une ligne Connaissances, qui se rejoignent à la plateforme RAG gouvernée puis continuent vers l\'objectif actuel : architecte principal. Chaque station présente ses preuves.',
      close: 'Fermer',
      open: 'Voir les détails'
    }
  };

  function lang() { return root.lang === 'fr' ? 'fr' : 'en'; }

  /* Text of a node in the active language: drops the inactive language's spans */
  function textIn(node, l) {
    if (!node) return '';
    var c = node.cloneNode(true);
    var drop = c.querySelectorAll('[data-l]:not([data-l="' + l + '"])');
    for (var i = 0; i < drop.length; i++) drop[i].parentNode.removeChild(drop[i]);
    return c.textContent.replace(/\s+/g, ' ').trim();
  }

  function useIcon(name, cls) {
    var s = document.createElementNS(SVGNS, 'svg');
    s.setAttribute('class', cls || 'ic');
    s.setAttribute('aria-hidden', 'true');
    var u = document.createElementNS(SVGNS, 'use');
    u.setAttribute('href', '#i-' + name);
    s.appendChild(u);
    return s;
  }

  /* ---------------------------------------------------------- 1. Language */
  function applyLang(l, persist) {
    root.lang = l;
    var btns = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', String(btns[i].getAttribute('data-set-lang') === l));
    }
    document.title = META[l].title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', META[l].desc);
    if (persist) {
      try { localStorage.setItem('lang', l); } catch (e) { /* private mode */ }
    }
    if (network.built) network.build(false);
    if (railRows.length) layoutRails();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-lang]');
    if (b) applyLang(b.getAttribute('data-set-lang'), true);
  });

  /* ---------------------------------------------------------- 2. Strip map */
  var stopEls = Array.prototype.slice.call(document.querySelectorAll('[data-strip] .stop'));
  var eraEls = Array.prototype.slice.call(document.querySelectorAll('[data-strip] .era'));

  stopEls.forEach(function (stop) {
    var summary = stop.querySelector('summary');
    summary.insertBefore(useIcon(stop.getAttribute('data-icon'), 'ic stop-ic'), summary.firstChild);
    var logos = stop.getAttribute('data-logos');
    if (logos) {
      var row = document.createElement('div');
      row.className = 'stop-logos';
      logos.split(' ').forEach(function (name) {
        var img = document.createElement('img');
        img.src = 'assets/images/tech-icons/' + name + '.svg';
        img.alt = name.replace('-mark', '').replace(/^\w/, function (c) { return c.toUpperCase(); });
        img.width = 24; img.height = 24; img.loading = 'lazy';
        row.appendChild(img);
      });
      stop.querySelector('.stop-body').appendChild(row);
    }
  });

  // Rails: walk the strip top to bottom and give every row the exact track pieces
  // the network has there (a line starts at its first station, branches off
  // Foundation with an elbow, and ends at its last station).
  var RAILS = {
    f: { start: 'R', end: '6' },
    g: { elbowAt: '3', end: 'CAP' },
    k: { elbowAt: '6', end: 'CAP' },
    x: { start: 'CAP', end: 'F2' }
  };
  var railRows = [];

  function buildRails() {
    var active = {};
    var rows = document.querySelectorAll('[data-strip] .era-title, [data-strip] .stop');
    Array.prototype.forEach.call(rows, function (row) {
      var rail = document.createElement('span');
      rail.className = 'rail';
      rail.setAttribute('aria-hidden', 'true');
      var id = row.classList.contains('stop') ? row.getAttribute('data-id') : null;
      Object.keys(RAILS).forEach(function (key) {
        var def = RAILS[key], piece = null, extra = null;
        if (active[key]) {
          piece = id === def.end ? 'end' : 'through';
          if (id === def.end) active[key] = false;
        } else if (id && id === def.start) {
          piece = 'start'; active[key] = true;
        } else if (id && id === def.elbowAt) {
          piece = 'start'; extra = 'elbow'; active[key] = true;
        }
        [piece, extra].forEach(function (p) {
          if (!p) return;
          var i = document.createElement('i');
          i.className = key + ' ' + p;
          rail.appendChild(i);
        });
      });
      row.insertBefore(rail, row.firstChild);
      if (id) railRows.push(row);
    });
  }

  // The dot sits at the middle of the station's summary row
  function layoutRails() {
    railRows.forEach(function (row) {
      row.style.setProperty('--dy', (row.querySelector('summary').offsetHeight / 2) + 'px');
    });
  }

  buildRails();
  layoutRails();
  window.addEventListener('resize', layoutRails);

  /* ---------------------------------------------------------- 3. Network map */
  // Line structure: stations in travel order (content and positions come from the HTML)
  var LINES = {
    f: ['R', '1', '3', '6'],
    k: ['6', '7', '15a', '15', '19', 'CAP'],
    g: ['3', '5', '12b', '16', '17', '18', 'CAP']
  };
  var EXTENSIONS = [['CAP', 'F1'], ['CAP', 'F2']];
  var STROKE = { f: '#E8791E', g: '#0057B8', k: '#00875A', x: '#1A1A1A' };
  var ROUNDEL = { f: '#B4520A', g: '#0057B8', k: '#007A52' };
  var ICON_INK = { f: '#B35A0C', g: '#0057B8', k: '#007A52' };
  // Roundels sit on the middle of one segment of their line
  var ROUNDEL_ON = { f: ['R', '1'], g: ['12b', '16'], k: ['6', '7'] };

  var W = 1296, COLS = 8, COL_W = W / COLS, Y0 = 118, PITCH = 100, H = 584;
  var WRAP = 150;

  var container = document.querySelector('[data-network]');

  // Model: stations keyed by id, edges, parents for tracing
  var stations = {};
  stopEls.forEach(function (el) {
    stations[el.getAttribute('data-id')] = {
      el: el,
      id: el.getAttribute('data-id'),
      col: parseFloat(el.getAttribute('data-col')),
      row: parseFloat(el.getAttribute('data-row')),
      place: el.getAttribute('data-place'),
      icon: el.getAttribute('data-icon'),
      line: el.getAttribute('data-line').split(' ')[0],
      conns: el.querySelectorAll('.conns > li').length
    };
  });

  var edges = [];
  Object.keys(LINES).forEach(function (key) {
    var ids = LINES[key];
    for (var i = 0; i < ids.length - 1; i++) edges.push({ a: ids[i], b: ids[i + 1], line: key, order: i });
  });
  EXTENSIONS.forEach(function (e, i) { edges.push({ a: e[0], b: e[1], line: 'x', order: i }); });

  var parents = {};
  edges.forEach(function (e) { (parents[e.b] = parents[e.b] || []).push(e.a); });

  function ancestors(id, acc) {
    acc = acc || {};
    acc[id] = true;
    (parents[id] || []).forEach(function (p) { if (!acc[p]) ancestors(p, acc); });
    return acc;
  }

  function P(st) { return [COL_W * st.col + COL_W / 2, Y0 + st.row * PITCH]; }

  // Transit geometry: straight runs, then a 45° bend into the target
  function segPath(a, b) {
    var p = P(stations[a]), q = P(stations[b]);
    var d = 'M' + p[0] + ',' + p[1] + ' ';
    var dy = Math.abs(q[1] - p[1]);
    if (Math.abs(q[0] - p[0]) < 1 || dy < 1 || dy >= q[0] - p[0]) return d + 'L' + q[0] + ',' + q[1];
    return d + 'L' + (q[0] - dy) + ',' + p[1] + ' L' + q[0] + ',' + q[1];
  }

  function el(name, attrs, parent) {
    var n = document.createElementNS(SVGNS, name);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function iconAt(parent, name, x, y, color, size) {
    size = size || 22;
    el('use', { href: '#i-' + name, x: x - size / 2, y: y - size / 2, width: size, height: size, style: 'color:' + color }, parent);
  }

  // Wrap a label into at most two lines when it is wider than WRAP
  function setLines(text, words, x, anchor) {
    while (text.firstChild) text.removeChild(text.firstChild);
    var t = el('tspan', { x: x }, text);
    t.textContent = words;
    var w = text.getComputedTextLength();
    if (w <= WRAP || words.indexOf(' ') < 0) return [w];
    var parts = words.split(' '), best = 1, bestDiff = Infinity;
    for (var i = 1; i < parts.length; i++) {
      var diff = Math.abs(parts.slice(0, i).join(' ').length - parts.slice(i).join(' ').length);
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    }
    t.textContent = parts.slice(0, best).join(' ');
    var w1 = t.getComputedTextLength();
    var t2 = el('tspan', { x: x, dy: 17 }, text);
    t2.textContent = parts.slice(best).join(' ');
    var w2 = t2.getComputedTextLength();
    text.setAttribute('text-anchor', anchor);
    return [w1, w2];
  }

  var network = {
    built: false,
    svg: null,
    openId: null,

    build: function (animate) {
      var l = lang();
      closeCard(false);
      container.innerHTML = '';
      var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': META[l].map });
      container.appendChild(svg);
      this.svg = svg;

      // Era zones and labels
      eraEls.forEach(function (era, i) {
        var x = COL_W * i;
        if (i % 2 === 0) el('rect', { x: x, y: 0, width: COL_W, height: H, fill: '#F4F5F6' }, svg);
        var year = el('text', { x: x + COL_W / 2, y: 34, 'text-anchor': 'middle', 'class': 'era-year' }, svg);
        year.textContent = era.getAttribute('data-year-' + l);
        var titleClone = era.querySelector('.era-title').cloneNode(true);
        var yr = titleClone.querySelector('.era-year');
        if (yr) yr.parentNode.removeChild(yr);
        var name = el('text', { x: x + COL_W / 2, y: 54, 'text-anchor': 'middle', 'class': 'era-name' }, svg);
        name.textContent = textIn(titleClone, l);
      });

      // Segments: one path per edge so a traced path can light up piece by piece
      var segs = el('g', { 'class': 'segs' }, svg);
      var drawOrder = [];
      ['f', 'k', 'g', 'x'].forEach(function (key) {
        edges.filter(function (e) { return e.line === key; }).forEach(function (e) {
          var isExt = key === 'x';
          var path = el('path', {
            d: segPath(e.a, e.b), fill: 'none', stroke: STROKE[key],
            'stroke-width': isExt ? 6 : 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
            'class': 'seg', 'data-a': e.a, 'data-b': e.b
          }, segs);
          if (isExt) path.setAttribute('stroke-dasharray', '1 12');
          drawOrder.push({ path: path, edge: e });
        });
      });

      // Roundels on their lines
      Object.keys(ROUNDEL_ON).forEach(function (key) {
        var p = P(stations[ROUNDEL_ON[key][0]]), q = P(stations[ROUNDEL_ON[key][1]]);
        var g = el('g', { 'class': 'rd-on-line', 'aria-hidden': 'true' }, svg);
        var cx = (p[0] + q[0]) / 2, cy = (p[1] + q[1]) / 2;
        el('circle', { cx: cx, cy: cy, r: 15, fill: ROUNDEL[key], stroke: '#fff', 'stroke-width': 3 }, g);
        var t = el('text', { x: cx, y: cy + 5.5, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 800, fill: '#fff' }, g);
        t.textContent = key.toUpperCase();
      });

      // Stations
      Object.keys(stations).forEach(function (id) { drawStation(svg, stations[id], l); });

      // Automated browsers (screenshots, audits) get the settled map
      if (animate && !REDUCED.matches && !navigator.webdriver) drawIn(drawOrder);
      this.built = true;
    }
  };

  function drawStation(svg, st, l) {
    var p = P(st), x = p[0], y = p[1];
    var name = textIn(st.el.querySelector('.stop-name'), l);
    var when = textIn(st.el.querySelector('.stop-when'), l);
    var g = el('g', {
      'class': 'st', 'data-id': st.id, tabindex: 0, role: 'button',
      'aria-label': name + ', ' + when + '. ' + META[l].open,
      'aria-haspopup': 'dialog', 'aria-expanded': 'false'
    }, svg);

    var isCap = st.place === 'cap', isFocus = st.place.indexOf('focus') === 0;
    el('circle', { 'class': 'st-ring', cx: x, cy: y, r: isCap ? 31 : 17, fill: 'none', stroke: '#0057B8', 'stroke-width': 3 }, g);
    el('circle', { cx: x, cy: y, r: isCap ? 30 : 24, fill: 'transparent' }, g); // generous hit area
    if (isCap) {
      el('circle', { 'class': 'st-dot', cx: x, cy: y, r: 22, fill: '#fff', stroke: '#1A1A1A', 'stroke-width': 6 }, g);
      iconAt(g, st.icon, x, y, '#1A1A1A', 22);
    } else {
      var dot = el('circle', { 'class': 'st-dot', cx: x, cy: y, r: 9, fill: '#fff', stroke: '#1A1A1A', 'stroke-width': 4 }, g);
      if (isFocus) dot.setAttribute('stroke-dasharray', '3 3');
    }

    // Transfer dots: one per connection, placed where no line runs
    for (var k = 0; k < st.conns; k++) {
      var tx, ty;
      if (st.place === 'above') { tx = x + 18 + k * 8; ty = y; }
      else if (st.place === 'left') { tx = x - 18 - (st.conns - 1 - k) * 8; ty = y + 20; }
      else if (isCap) { tx = x + 32 + k * 8; ty = y + 26; }
      else { tx = x - (st.conns - 1) * 4 + k * 8; ty = y + 18; }
      el('circle', { cx: tx, cy: ty, r: 2.4, fill: '#6B7078' }, g);
    }

    // Label + pictogram
    var ink = ICON_INK[st.line] || '#1A1A1A';
    var cls = isCap ? 'st-label cap' : isFocus ? 'st-label focus' : 'st-label';
    var text = el('text', { 'class': cls }, g);
    var place = st.place, ws, wmax, n, i, tsp;

    if (place === 'above' || place === 'below') {
      text.setAttribute('text-anchor', 'middle');
      ws = setLines(text, name, x + 13, 'middle');
      wmax = Math.max.apply(null, ws); n = ws.length;
      var base = place === 'above' ? y - 20 - (n - 1) * 17 : y + (st.conns ? 44 : 34);
      text.setAttribute('y', base);
      iconAt(g, st.icon, x + 13 - wmax / 2 - 15, base - 5 + (n - 1) * 8.5, ink);
    } else if (place === 'above-start') {
      ws = setLines(text, name, x + 24, 'start');
      n = ws.length;
      text.setAttribute('y', y - 20 - (n - 1) * 17);
      iconAt(g, st.icon, x + 8, y - 25 - (n - 1) * 8.5, ink);
    } else if (place === 'right' || place === 'left') {
      var anchor = place === 'right' ? 'start' : 'end';
      var tx0 = place === 'right' ? x + 46 : x - 18;
      text.setAttribute('text-anchor', anchor);
      ws = setLines(text, name, tx0, anchor);
      wmax = Math.max.apply(null, ws); n = ws.length;
      text.setAttribute('y', y + 5 - (n - 1) * 8.5);
      iconAt(g, st.icon, place === 'right' ? x + 30 : x - 18 - wmax - 16, y, ink);
    } else if (isCap) {
      text.setAttribute('text-anchor', 'middle');
      setLines(text, name, x, 'middle');
      text.setAttribute('y', y + 78); // clear of the lines arriving at the interchange
    } else if (isFocus) {
      text.setAttribute('text-anchor', 'middle');
      ws = setLines(text, name, x, 'middle');
      n = ws.length;
      var cap = el('text', { 'class': 'st-caption', 'text-anchor': 'middle', x: x }, g);
      cap.textContent = when;
      if (place === 'focus-up') {
        var top = y - 40 - (n - 1) * 17;
        text.setAttribute('y', top);
        cap.setAttribute('y', y - 22);
        iconAt(g, st.icon, x, top - 34, '#1A1A1A', 26);
      } else {
        text.setAttribute('y', y + 36);
        cap.setAttribute('y', y + 54 + (n - 1) * 17);
        iconAt(g, st.icon, x, y + 82 + (n - 1) * 17, '#1A1A1A', 26);
      }
    }

    g.addEventListener('pointerenter', function () { trace(st.id); });
    g.addEventListener('pointerleave', function () { trace(network.openId); });
    g.addEventListener('focus', function () { trace(st.id); });
    g.addEventListener('blur', function () { trace(network.openId); });
    g.addEventListener('click', function (e) { e.stopPropagation(); toggleCard(st.id, false); });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCard(st.id, true); }
    });
  }

  // The one authored motion: lines draw once, Foundation first, then the two lines, then the extensions
  function drawIn(items) {
    if (!items[0].path.animate) return;
    items.forEach(function (it) {
      var e = it.edge, path = it.path;
      var delay = e.line === 'f' ? e.order * 110 : e.line === 'x' ? 1180 : 340 + e.order * 120;
      if (e.line === 'x') {
        path.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: delay, easing: 'ease-out', fill: 'backwards' });
        return;
      }
      var len = path.getTotalLength();
      path.setAttribute('stroke-dasharray', len + ' ' + len);
      path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: 520, delay: delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
    });
  }

  /* ---------------------------------------------------------- 4. Tracing and cards */
  function trace(id) {
    var svg = network.svg;
    if (!svg) return;
    if (!id) { container.classList.remove('tracing'); return; }
    var on = ancestors(id);
    container.classList.add('tracing');
    var sts = svg.querySelectorAll('.st');
    for (var i = 0; i < sts.length; i++) sts[i].classList.toggle('on', !!on[sts[i].getAttribute('data-id')]);
    var segs = svg.querySelectorAll('.seg');
    for (var j = 0; j < segs.length; j++) {
      segs[j].classList.toggle('on', !!(on[segs[j].getAttribute('data-a')] && on[segs[j].getAttribute('data-b')]));
    }
  }

  var card = null, cardOpener = null;

  function closeCard(restoreFocus) {
    if (!card) return;
    card.parentNode.removeChild(card);
    card = null;
    var opener = network.svg && network.svg.querySelector('.st[data-id="' + network.openId + '"]');
    if (opener) opener.setAttribute('aria-expanded', 'false');
    network.openId = null;
    trace(null);
    if (restoreFocus && cardOpener) cardOpener.focus();
    cardOpener = null;
  }

  function toggleCard(id, viaKeyboard) {
    if (network.openId === id) { closeCard(viaKeyboard); return; }
    closeCard(false);
    var st = stations[id], l = lang();
    var opener = network.svg.querySelector('.st[data-id="' + id + '"]');

    card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'false');
    card.setAttribute('aria-labelledby', 'card-title');
    card.tabIndex = -1;

    var head = document.createElement('div');
    head.className = 'card-head';
    var ic = useIcon(st.icon, 'ic');
    ic.style.color = ICON_INK[st.line] || '#1A1A1A';
    head.appendChild(ic);
    var h = document.createElement('h3');
    h.id = 'card-title';
    h.textContent = textIn(st.el.querySelector('.stop-name'), l);
    head.appendChild(h);
    var when = document.createElement('span');
    when.className = 'card-when';
    when.textContent = textIn(st.el.querySelector('.stop-when'), l);
    head.appendChild(when);
    card.appendChild(head);
    card.appendChild(st.el.querySelector('.stop-body').cloneNode(true));

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'card-close';
    close.setAttribute('aria-label', META[l].close);
    close.appendChild(useIcon('close', 'ic'));
    close.addEventListener('click', function () { closeCard(true); });
    card.appendChild(close);

    container.appendChild(card);
    network.openId = id;
    cardOpener = opener;
    opener.setAttribute('aria-expanded', 'true');
    trace(id);
    positionCard(st);
    if (viaKeyboard) card.focus();
  }

  function positionCard(st) {
    var rect = container.getBoundingClientRect();
    var scale = rect.width / W;
    var p = P(st), sx = p[0] * scale, sy = p[1] * scale;
    var cw = card.offsetWidth, ch = card.offsetHeight;
    var gap = st.place === 'cap' ? 40 : 26;
    var above = sy - gap - ch > 0;
    var left = Math.min(Math.max(sx - cw / 2, 0), rect.width - cw);
    card.style.left = left + 'px';
    card.style.top = (above ? sy - gap - ch : sy + gap) + 'px';
    card.classList.add(above ? 'above' : 'below');
    card.style.setProperty('--ax', (sx - left) + 'px');
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && card) closeCard(true);
  });
  document.addEventListener('click', function (e) {
    if (card && !card.contains(e.target)) closeCard(false);
  });
  window.addEventListener('resize', function () { if (card) closeCard(false); });

  /* ---------------------------------------------------------- Init */
  function ensureNetwork() {
    if (!DESKTOP.matches || network.built || !container) return;
    container.hidden = false;
    root.classList.add('js-network');
    network.build(true);
  }

  applyLang(lang(), false);
  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fontsReady.then(ensureNetwork);
  if (DESKTOP.addEventListener) DESKTOP.addEventListener('change', ensureNetwork);
})();
