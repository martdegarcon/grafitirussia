(function () {
  document.body.classList.remove('no-js');

  /* ---------- Работы для слайдера (фото с graffitirussia.com) ---------- */
  var U = 'https://graffitirussia.com/wp-content/uploads/';
  var P = 'https://graffitirussia.com/portfolio/';
  var works = [
  [
    "Граффити 10 000 м² на крыше OZON",
    "2026/09/dji_0536-e1788266049936.jpg",
    "graffiti-10-000-m-na-kryshe-ozon"
  ],
  [
    "Победитель фестиваля YAM(ural)AL 2025",
    "2025/12/nadym-e1765182846789.jpg",
    "pobeditel-festivalja-yam-ural-al-2025"
  ],
  [
    "Первый мурал в Узбекистане. Девушка с гранатами",
    "2026/03/e9c6ba11-efe7-40c3-9a30-8538e59d33f2-e1772532026824.jpg",
    "pervyj-mural-v-uzbekistane-devushka-s-granatami"
  ],
  [
    "Реклама на крыше для Авиасейлс",
    "2024/03/photo_5291760701129477998_y-e1764678374536.jpg",
    "reklama-na-kryshe-dlya-aviasejls"
  ],
  [
    "Роспись радиозавода в Челябинске",
    "2026/06/dji_0478-e1782823085912.jpg",
    "rospis-radiozavoda-v-cheljabinske"
  ],
  [
    "23 фасада арт‑фестиваля «M’Art» в Мариуполе",
    "2025/03/oblozhka.jpg",
    "23-fasada-i-vserossijskogo-art-festivalja-m-art-v-mariupole"
  ],
  [
    "Венера Милосская — «Культурный код 2020»",
    "2026/09/td7zoqkznobqye6634eiz6pawwdizco60dvaqrmbquxzfq0xb3qms50qbv4fy8tg-6j6q6qxjj4c8pkso14aubue-1-e1788337324398.jpg",
    "venera-milosskaja-avtorskij-mural-na-festivale-kulturnyj-kod-2020"
  ],
  [
    "Лукойл × Graffiti Russia",
    "2025/07/photo_38_2025-07-17_12-15-01-e1753780000684.jpg",
    "lukojl-h-graffiti-russia"
  ],
  [
    "Арт‑объект цистерна в Салехарде",
    "2025/05/mve_0630.jpg",
    "art-obekt-cisterna-varene-olenina-i-med-v-saleharde"
  ],
  [
    "Роспись завода ПК ЧТЗ",
    "2025/11/traktornyj-zavod-cheljabinsk-4-e1762755661522.jpg",
    "rospis-zavoda-pk-chtz"
  ],
  [
    "Олимпийский мишка на фасаде",
    "2025/07/dji_0093-e1753701334755.jpg",
    "olimpijskij-mishka-na-fasade"
  ],
  [
    "Роспись завода Akkermann 19 828 м²",
    "2024/03/na-glavnuju.jpg",
    "rospis-zavoda-akkermann-9-000-m2-2"
  ],
  [
    "Крупнейшее 3D‑граффити",
    "2025/02/fkqinkw3d7blfoefnmgnhfpojdew2w1s4tu_5sffm5ied3w7eg2v31zzahpyrs6ynvf04zabwmvs3urjkzubqqc6elqw1orzqu7n4yq898or8npumzhi4midpdwhecnq-e1740468744696.jpg",
    "krupnejshee-3d-graffiti"
  ],
  [
    "Скейт‑парк в Москве для МЕГАМАРКЕТ",
    "2024/07/megamarket-2.jpg",
    "rospis-skejt-parka-v-moskve-ot-megamarket"
  ],
  [
    "Первая роспись Греции",
    "2026/06/5271796456190844253-e1782112646486.jpg",
    "pervaja-rospis-grecii"
  ],
  [
    "Наш MURAL 2024 в Озерске",
    "2024/09/img_9625.jpg",
    "nash-mural-2024-v-ozerske"
  ]
];

  var track = document.getElementById('works-track');
  function addSet(hidden) {
    works.forEach(function (w) {
      var a = document.createElement('a');
      a.className = 'work';
      a.href = P + w[2];
      if (hidden) { a.setAttribute('aria-hidden', 'true'); a.tabIndex = -1; }
      var img = document.createElement('img');
      img.src = U + w[1];
      img.alt = hidden ? '' : w[0];
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 570; img.height = 380;
      var t = document.createElement('span');
      t.className = 'work-title';
      t.textContent = w[0];
      a.appendChild(img); a.appendChild(t);
      track.appendChild(a);
    });
  }
  addSet(false);
  addSet(true); // копия для бесшовной прокрутки

  /* ---------- Логотип: уменьшение при скролле ---------- */
  var slot = document.querySelector('.logo-slot');
  var logo = document.querySelector('.logo');
  var header = document.querySelector('.site-header');
  var heroNav = document.querySelector('.hero-nav');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var base = null, ticking = false;

  function measure() {
    var y = window.scrollY;
    var r = slot.getBoundingClientRect();
    base = { left: r.left, top: r.top + y, w: r.width, h: r.height };
    logo.style.left = base.left + 'px';
    logo.style.top = base.top + 'px';
    logo.style.width = base.w + 'px';
    update();
  }

  function update() {
    ticking = false;
    if (!base) return;
    var headerH = header.offsetHeight;
    var targetW = window.innerWidth < 720 ? 120 : (window.innerWidth < 1440 ? 160 : 200);
    var range = Math.max(1, base.top + base.h + 40);
    var p = Math.min(1, Math.max(0, window.scrollY / range));
    if (reduce) p = p > 0.3 ? 1 : 0;
    var eased = 1 - Math.pow(1 - p, 3);
    var s = 1 + (targetW / base.w - 1) * eased;
    var smallH = base.h * (targetW / base.w);
    var dy = ((headerH - smallH) / 2 - base.top) * eased;
    var dx = (window.innerWidth / 2 - (base.left + base.w / 2)) * eased;
    logo.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
    heroNav.style.opacity = String(Math.max(0, 1 - p * 3));
    header.classList.toggle('is-visible', p > 0.85);
    if (p <= 0.85 && dds) { closeAll(); if (burger) setMenu(false); }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', function () {
    logo.style.transform = 'none';
    var y = window.scrollY;
    window.scrollTo(0, y);
    measure();
  });
  window.addEventListener('load', measure);

  /* ---------- Выпадающие меню ---------- */
  var dds = Array.prototype.slice.call(document.querySelectorAll('.dd'));
  function closeAll(except) {
    dds.forEach(function (d) {
      if (d !== except) {
        d.classList.remove('open');
        d.querySelector('.dd-btn').setAttribute('aria-expanded', 'false');
      }
    });
  }
  dds.forEach(function (d) {
    var btn = d.querySelector('.dd-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !d.classList.contains('open');
      closeAll(d);
      d.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dd')) closeAll();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeAll(); setMenu(false); }
  });

  /* ---------- Мобильное меню ---------- */
  var burger = document.querySelector('.burger');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }
  burger.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('menu-open'));
  });
  document.querySelectorAll('.mobile-menu a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  /* ---------- Команда ---------- */
  var team = [
    ['Павел Щеклеин', 'Основатель Graffiti Russia', '2024/02/pavel.jpg'],
    ['ВИС', 'Художник (граффити)', '2024/02/vis.jpg'],
    ['Жанна Нуждина', 'Куратор объектов', '2024/02/zhanna.jpg'],
    ['Даниил SEON', 'Художник, преподаватель', '2024/02/seon.jpg'],
    ['Юлия Щеклеина', 'Дизайнер', '2024/02/yulya-shh.jpg'],
    ['Николай Касаткин', 'Художник, альпинист', '2024/02/kasatkin.jpg'],
    ['Евгений Gang', 'Художник, альпинист', '2024/02/gang.jpg'],
    ['Михаил FlopiC', 'Художник, альпинист', '2024/02/flopik.jpg'],
    ['Юлия Сухорукова', 'Дизайнер, художник', '2024/02/suhorukova.jpg'],
    ['Ольга Конева‑Щеклеина', 'Пресс‑секретарь', '2024/02/olya.jpg'],
    ['Кристина Савинова', 'SMM‑специалист', '2024/02/kr.jpg']
  ];
  var teamTrack = document.getElementById('team-track');
  team.forEach(function (m, i) {
    var f = document.createElement('figure');
    f.className = 'member'; f.setAttribute('data-reveal', ''); f.style.setProperty('--d', (Math.min(i, 3) * 0.1) + 's');
    var ph = document.createElement('div'); ph.className = 'ph';
    var img = document.createElement('img');
    img.src = U + m[2]; img.alt = m[0]; img.loading = 'lazy'; img.decoding = 'async';
    ph.appendChild(img);
    var c = document.createElement('figcaption');
    var b = document.createElement('b'); b.textContent = m[0];
    var r = document.createElement('span'); r.textContent = m[1];
    c.appendChild(b); c.appendChild(r);
    f.appendChild(ph); f.appendChild(c);
    teamTrack.appendChild(f);
  });
  var teamCount = document.getElementById('team-count');
  function teamCounter() {
    var first = teamTrack.querySelector('.member'); if (!first) return;
    var step = teamStep(), vis = Math.max(1, Math.round((teamTrack.clientWidth + 1) / step));
    var start = Math.min(team.length - vis, Math.round(teamTrack.scrollLeft / step)) + 1;
    var end = Math.min(team.length, start + Math.floor(vis) - 1);
    teamCount.textContent = (start === end ? start : start + '–' + end) + ' / ' + team.length;
  }
  teamTrack.addEventListener('scroll', function () { requestAnimationFrame(teamCounter); }, { passive: true });
  window.addEventListener('resize', teamCounter);
  function teamStep() {
    var first = teamTrack.querySelector('.member');
    return first ? first.getBoundingClientRect().width + (parseFloat(getComputedStyle(teamTrack).columnGap) || 24) : 0;
  }
  function teamGo(dir) {
    var max = teamTrack.scrollWidth - teamTrack.clientWidth - 2;
    if (dir > 0 && teamTrack.scrollLeft >= max) { teamTrack.scrollTo({ left: 0 }); return; }
    if (dir < 0 && teamTrack.scrollLeft <= 2) { teamTrack.scrollTo({ left: max + 2 }); return; }
    teamTrack.scrollBy({ left: dir * teamStep() });
  }
  teamCounter();
  document.querySelector('.team-arrow--prev').addEventListener('click', function () { teamGo(-1); });
  document.querySelector('.team-arrow--next').addEventListener('click', function () { teamGo(1); });
  teamTrack.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); teamGo(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); teamGo(-1); }
  });

  /* ================= АНИМАЦИИ ================= */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) document.documentElement.classList.add('reduce');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // разбиваем заголовки на слова
  function splitWords(el) {
    var nodes = Array.prototype.slice.call(el.childNodes), i = 0;
    el.textContent = '';
    nodes.forEach(function (n) {
      if (n.nodeType !== 3) { el.appendChild(n); return; }
      n.textContent.split(/( +)/).forEach(function (part) {
        if (!part) return;
        if (/^ +$/.test(part)) { el.appendChild(document.createTextNode(' ')); return; }
        var w = document.createElement('span'); w.className = 'w';
        var inner = document.createElement('span'); inner.textContent = part;
        inner.style.transitionDelay = (i++ * 0.07) + 's';
        w.appendChild(inner); el.appendChild(w);
      });
    });
  }
  var heroH1 = document.querySelector('.hero-text h1');
  splitWords(heroH1);
  document.querySelectorAll('.h2').forEach(function (h) { h.setAttribute('data-reveal', ''); });

  // старт первого экрана
  var heroP = document.querySelector('.hero-text p');
  heroP.setAttribute('data-reveal', ''); heroP.style.setProperty('--d', '.6s');
  var heroNavLinks = document.querySelectorAll('.hero-nav a');
  heroNavLinks.forEach(function (a, i) { a.setAttribute('data-reveal', ''); a.style.setProperty('--d', (0.5 + i * 0.08) + 's'); });
  requestAnimationFrame(function () {
    setTimeout(function () {
      document.querySelector('.hero').classList.add('is-loaded');
      heroH1.classList.add('is-in');
      heroP.classList.add('is-in');
      heroNavLinks.forEach(function (a) { a.classList.add('is-in'); });
    }, 350);
  });

  // появление блоков при скролле
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    if (!el.closest('.hero')) io.observe(el);
  });

  if (finePointer && !reduceMotion) {
    // 3D‑наклон карточек работ
    track.addEventListener('mousemove', function (e) {
      var card = e.target.closest('.work'); if (!card) return;
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(900px) rotateY(' + px * 10 + 'deg) rotateX(' + (-py * 10) + 'deg) translateZ(0)';
    });
    track.addEventListener('mouseout', function (e) {
      var card = e.target.closest('.work');
      if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
    });

    // баллончик: курсор рисует по первому экрану
    var hero = document.querySelector('.hero');
    var cv = document.querySelector('.spray'), ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2), lastMove = 0, running = false, px0 = null, py0 = null;
    function sizeSpray() {
      var r = hero.getBoundingClientRect();
      cv.width = r.width * dpr; cv.height = r.height * dpr;
      cv.style.width = r.width + 'px'; cv.style.height = r.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    sizeSpray(); window.addEventListener('resize', sizeSpray);
    function sprayLoop() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.035)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.globalCompositeOperation = 'source-over';
      if (performance.now() - lastMove < 5000) requestAnimationFrame(sprayLoop);
      else { ctx.clearRect(0, 0, cv.width, cv.height); running = false; }
    }
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      var sp = px0 === null ? 0 : Math.hypot(x - px0, y - py0);
      px0 = x; py0 = y;
      var rad = 8 + Math.min(sp, 80) * 0.45, n = 10 + Math.min(sp, 80) * 0.4;
      for (var i = 0; i < n; i++) {
        var a = Math.random() * Math.PI * 2, d = rad * Math.sqrt(Math.random()) * (Math.random() < .15 ? 1.6 : 1);
        ctx.beginPath();
        ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, Math.random() * 1.6 + 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,' + (0.2 + Math.random() * 0.55) + ')';
        ctx.fill();
      }
      lastMove = performance.now();
      if (!running) { running = true; requestAnimationFrame(sprayLoop); }
    });
    hero.addEventListener('mouseleave', function () { px0 = null; });
  }

  /* ================= ЧАТ‑АССИСТЕНТ (сценарий‑демо) ================= */
  var chatEl = document.getElementById('chat'), body = document.getElementById('chat-body');
  var form = document.getElementById('chat-form'), input = document.getElementById('chat-input');
  var launch = document.querySelector('.chat-launch'), teaser = document.getElementById('chat-teaser');
  var step = 0, answers = [], started = false, busy = false, done = false;
  var flow = [
    { q: 'Здравствуйте! Я помогу прикинуть стоимость росписи. Что нужно расписать?',
      chips: ['Стену в квартире', 'Офис, кафе или магазин', 'Фасад здания', 'Промышленный объект'] },
    { q: 'Отлично! Какая примерно площадь рисунка?', chips: ['до 10 м²', '10–30 м²', '30–50 м²', 'больше 50 м²'] },
    { q: 'Есть эскиз или референс?', chips: ['Есть эскиз', 'Есть только идея', 'Нужна помощь с идеей'] }
  ];
  function scrollDown() { body.scrollTop = body.scrollHeight; }
  function addMsg(text, who, html) {
    var m = document.createElement('div');
    m.className = 'msg msg--' + who;
    if (html) m.innerHTML = text; else m.textContent = text;
    body.appendChild(m); scrollDown(); return m;
  }
  function removeChips() { body.querySelectorAll('.chips').forEach(function (c) { c.remove(); }); }
  function addChips(list) {
    var wrap = document.createElement('div'); wrap.className = 'chips';
    list.forEach(function (t) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = t;
      b.addEventListener('click', function () { userSays(t); });
      wrap.appendChild(b);
    });
    body.appendChild(wrap); scrollDown();
  }
  function botSays(texts, after) {
    busy = true;
    var list = [].concat(texts), i = 0;
    (function next() {
      var t = document.createElement('div'); t.className = 'typing'; t.innerHTML = '<i></i><i></i><i></i>';
      body.appendChild(t); scrollDown();
      setTimeout(function () {
        t.remove();
        var item = list[i++];
        addMsg(item.html || item, 'bot', !!item.html);
        if (i < list.length) setTimeout(next, 250);
        else { busy = false; if (after) after(); }
      }, reduceMotion ? 0 : 700 + Math.min(String(item0(list[i])).length * 12, 900));
    })();
  }
  function item0(x) { return x && x.html ? x.html : x; }
  function ask() {
    var f = flow[step];
    botSays(f.q, function () { addChips(f.chips); input.focus(); });
  }
  function askPhone() {
    var a = answers;
    botSays([
      'Записал: ' + a[0].toLowerCase() + ', ' + a[1] + ', ' + a[2].toLowerCase() + '.',
      'Цена зависит от площади, техники (кисти, аэрография или баллоны) и детализации рисунка. Эскиз сделаем бесплатно, а точный расчёт подготовит менеджер.',
      'Оставьте номер телефона — перезвоним с расчётом и вариантами эскиза.'
    ], function () {
      input.type = 'tel'; input.placeholder = '+7 (___) ___-__-__'; input.focus();
    });
  }
  function userSays(text) {
    if (busy || done) return;
    text = String(text).trim(); if (!text) return;
    removeChips();
    addMsg(text, 'me');
    if (step < flow.length) {
      answers[step] = text; step++;
      if (step < flow.length) ask(); else askPhone();
      return;
    }
    var digits = text.replace(/\D/g, '');
    if (digits.length < 10) {
      botSays('Похоже, это не номер. Напишите, пожалуйста, в формате +7 900 000‑00‑00.');
      return;
    }
    done = true;
    // TODO: отправить заявку на сервер / в CRM: { object: answers[0], area: answers[1], sketch: answers[2], phone: text }
    botSays([
      'Спасибо! Менеджер свяжется с вами по номеру ' + text + '.',
      { html: 'А пока можно посмотреть наши работы: <a href="https://graffitirussia.com/portfolio" target="_blank" rel="noopener">портфолио →</a>' }
    ], function () { input.disabled = true; form.querySelector('button').disabled = true; input.placeholder = 'Заявка отправлена'; });
  }
  form.addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; userSays(v); });
  function openChat() {
    document.body.classList.add('chat-open');
    launch.setAttribute('aria-expanded', 'true');
    teaser.classList.remove('is-on');
    if (!started) { started = true; ask(); }
    setTimeout(function () { input.focus(); }, 300);
  }
  function closeChat() {
    document.body.classList.remove('chat-open');
    launch.setAttribute('aria-expanded', 'false');
    launch.focus();
  }
  launch.addEventListener('click', openChat);
  chatEl.querySelector('.chat-close').addEventListener('click', closeChat);
  teaser.addEventListener('click', function (e) {
    if (e.target.closest('button')) { teaser.classList.remove('is-on'); e.stopPropagation(); return; }
    openChat();
  });
  teaser.addEventListener('keydown', function (e) { if (e.key === 'Enter') openChat(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('chat-open')) closeChat(); });
  setTimeout(function () { if (!started) teaser.classList.add('is-on'); }, 6000);

  measure();
})();
