(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const store = {
    get(key) {
      try { return localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
    },
  };

  const IG_DM = 'https://ig.me/m/centurycutsbarbershop';

  /* ---------------- i18n (EN / ES) ---------------- */
  const ES = {
    skip: 'Saltar al contenido',
    'nav.services': 'Servicios',
    'nav.work': 'Trabajos',
    'nav.reviews': 'Reseñas',
    'nav.visit': 'Visítanos',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'cta.book': 'Reservar',
    'cta.bookOnline': 'Reserva en línea',
    'cta.dm': 'Escríbenos por Instagram',
    'cta.seeBooksy': 'Ver todos los servicios en Booksy',
    'hero.kicker': 'Un siglo en cada corte · Garden Grove, CA',
    'hero.title': 'Cortes frescos.<br />Líneas limpias.<br />Buena vibra.',
    'hero.lead': 'Fades, tapers, diseños y afeitadas con toalla caliente en Century Blvd — con paciencia y atención al detalle en cada visita.',
    'hero.reviews': '322 reseñas en Google',
    'badge.walkins': 'Sin cita bienvenidos · Prioridad con cita',
    'badge.latino': 'Negocio latino',
    'badge.lgbtq': 'LGBTQ+ friendly',
    'services.eyebrow': 'El menú',
    'services.title': 'Servicios y precios',
    'services.lead': 'Entra fresco, sal más fino. Escoge tu servicio y aparta tu silla en Booksy.',
    'svc.haircut': 'Corte de cabello',
    'svc.haircut.d': 'Fades, tapers, tijera — terminado con line-up limpio y toalla caliente.',
    'svc.popular': 'El más pedido',
    'svc.combo': 'Corte + Barba',
    'svc.combo.d': 'El paquete completo: tu corte más barba perfilada, delineada y acondicionada.',
    'svc.kids': 'Niños (13 o menos)',
    'svc.kids.d': 'Cortes con paciencia para los más pequeños — diseños bienvenidos.',
    'svc.senior': 'Adulto mayor / Corte regular',
    'svc.senior.d': 'Un corte clásico y cómodo para nuestros mayores y clientes de siempre.',
    'svc.shave': 'Cabeza rapada · Afeitado con toalla caliente · Barba',
    'svc.shave.d': 'Acabado suave con navaja y espuma caliente, o un arreglo rápido de barba.',
    'svc.house': 'Servicio a domicilio',
    'svc.house.d': 'Vamos a ti — eventos, bodas o cuando no puedes venir.',
    'services.note': 'Los cortes son solo en efectivo. Los precios pueden cambiar — el menú actualizado siempre está en Booksy.',
    'work.eyebrow': 'Recién salidos de la silla',
    'work.title': 'Nuestro trabajo',
    'work.lead': 'Low fades, burst fades, tapers y diseños a mano alzada. Cada línea con intención.',
    'work.c1': 'Low fade + diseño de cruz',
    'work.c2': 'Burst fade · mullet rizado',
    'work.c3': 'Taper + diseño a mano alzada',
    'work.more': 'Más cortes en Instagram',
    'about.eyebrow': 'Desde 2021',
    'about.title': 'Más que un corte',
    'about.p1': 'Century Cuts es una barbería de dueños latinos en Century Blvd, Garden Grove, dirigida por el dueño y master barber <strong>Chris “Century” Gonzalez</strong>. Bajo las luces hexagonales encontrarás barberos que se toman su tiempo, escuchan lo que quieres y cuidan cada detalle — desde un skin fade limpio hasta un diseño completo a mano alzada. Los detalles hacen la diferencia.',
    'about.p2': 'Aquí todos son bienvenidos — también sin cita, aunque las citas tienen prioridad. Relájate, mira el partido, tira unos tiros a la canasta y sal luciendo lo mejor.',
    'about.k1': 'Obsesionados con el detalle',
    'about.v1': 'Degradados limpios y line-ups precisos, siempre.',
    'about.k2': 'Acogedores',
    'about.v2': 'LGBTQ+ friendly. Familiar. La comunidad primero.',
    'about.k3': 'Reserva fácil',
    'about.v3': 'Elige a tu barbero y tu hora en línea en segundos.',
    'reviews.eyebrow': 'Lo que dicen los clientes',
    'reviews.lead': 'Basado en 322 reseñas de Google — y más de 110 reseñas de 5 estrellas en Yelp.',
    'rev1': '“Esta fue mi tercera vez aquí y, sinceramente, el servicio mejora en cada visita. Desde que entré, el ambiente fue acogedor y profesional. Mi barbero realmente se toma su tiempo y pone atención a los detalles.”',
    'rev2': '“¡Wow, Devin es increíble! Después de visitar salones y barberías por todo el país, tengo que decir que Devin está entre los mejores. Súper detallista, paciente y comprensivo — se tomó su tiempo e hizo mucho más de lo esperado.”',
    'rev.google': 'Reseña de Google',
    'rev.guide': 'Local Guide de Google',
    'reviews.ctaText': '¿Ya te sentaste en la silla? Nos encantaría saber tu opinión.',
    'reviews.cta': 'Reseñas en Google',
    'reviews.yelp': 'Reseñas en Yelp',
    'visit.eyebrow': 'Ven a vernos',
    'visit.title': 'Visita la barbería',
    'visit.directions': 'Cómo llegar',
    'visit.hours': 'Horario',
    'visit.peak': 'Tip: las mañanas entre semana suelen ser las más tranquilas.',
    'day.0': 'Domingo', 'day.1': 'Lunes', 'day.2': 'Martes', 'day.3': 'Miércoles',
    'day.4': 'Jueves', 'day.5': 'Viernes', 'day.6': 'Sábado',
    'contact.eyebrow': 'Contáctanos',
    'contact.title': 'Sin llamadas',
    'contact.lead': 'Reserva tu silla en línea, mándanos un DM o déjanos un mensaje aquí mismo.',
    'ch.booksy': 'Reserva en Booksy',
    'ch.ig': 'DM por Instagram',
    'form.name': 'Nombre',
    'form.email': 'Correo electrónico',
    'form.service': 'Servicio (opcional)',
    'form.pick': 'Elige un servicio',
    'form.other': 'Otra cosa',
    'form.message': 'Mensaje',
    'form.send': 'Enviar mensaje',
  };

  const MSG = {
    en: {
      openNow: (t) => `Open now · Closes ${t}`,
      closedToday: (t) => `Closed · Opens today at ${t}`,
      closedTomorrow: (t) => `Closed · Opens tomorrow at ${t}`,
      closedDay: (d, t) => `Closed · Opens ${d} at ${t}`,
      today: 'Today',
      sending: 'Sending…',
      sent: 'Thanks! Your message was sent — we’ll get back to you soon.',
      fallback: 'Online messages are taking a break. Your message was copied — <a href="' + IG_DM + '" target="_blank" rel="noopener">paste it in our Instagram DM</a>.',
      fallbackNoCopy: 'Online messages are taking a break — please <a href="' + IG_DM + '" target="_blank" rel="noopener">send us an Instagram DM</a>.',
      fix: 'Please check the highlighted fields.',
      err: { name: 'Please tell us your name.', email: 'Please enter a valid email so we can reply.', message: 'Please write a short message.' },
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      toggle: 'ES', toggleLabel: 'Cambiar a español',
    },
    es: {
      openNow: (t) => `Abierto ahora · Cierra a las ${t}`,
      closedToday: (t) => `Cerrado · Abre hoy a las ${t}`,
      closedTomorrow: (t) => `Cerrado · Abre mañana a las ${t}`,
      closedDay: (d, t) => `Cerrado · Abre el ${d} a las ${t}`,
      today: 'Hoy',
      sending: 'Enviando…',
      sent: '¡Gracias! Tu mensaje fue enviado — te responderemos pronto.',
      fallback: 'Los mensajes en línea están en pausa. Copiamos tu mensaje — <a href="' + IG_DM + '" target="_blank" rel="noopener">pégalo en nuestro DM de Instagram</a>.',
      fallbackNoCopy: 'Los mensajes en línea están en pausa — <a href="' + IG_DM + '" target="_blank" rel="noopener">escríbenos por Instagram</a>.',
      fix: 'Revisa los campos marcados.',
      err: { name: 'Dinos tu nombre.', email: 'Escribe un correo válido para poder responderte.', message: 'Escribe un mensaje corto.' },
      days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      toggle: 'EN', toggleLabel: 'Switch to English',
    },
  };

  // Snapshot the English copy already in the HTML so we can switch back.
  const EN = {};
  $$('[data-i18n]').forEach((el) => { EN[el.dataset.i18n] = el.innerHTML; });

  let lang = store.get('cc-lang') === 'es' ? 'es' : 'en';
  let lastStatus = null;

  function applyLang() {
    const dict = lang === 'es' ? ES : EN;
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value; // trusted, static strings only
    });
    const toggle = $('[data-lang-toggle]');
    toggle.textContent = MSG[lang].toggle;
    toggle.setAttribute('aria-label', MSG[lang].toggleLabel);
    $$('.hours th').forEach((th) => th.setAttribute('data-today-label', MSG[lang].today));
    if (lastStatus) renderStatus(lastStatus);
  }

  $('[data-lang-toggle]').addEventListener('click', () => {
    lang = lang === 'en' ? 'es' : 'en';
    store.set('cc-lang', lang);
    applyLang();
  });

  /* ---------------- Header / nav ---------------- */
  const header = $('[data-header]');
  const mobileBook = $('.mobile-book');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);
    mobileBook.classList.toggle('is-visible', y > window.innerHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const nav = $('[data-nav]');
  const menuBtn = $('[data-menu-toggle]');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Highlight the nav link for the section in view.
  const links = new Map($$('.nav a').map((a) => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        links.get(entry.target.id)?.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

    const revealer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach((el) => revealer.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  /* ---------------- Open / closed status ---------------- */
  // Fallback copy of the hours in api/_lib/shop.js, used if the API is unreachable.
  const HOURS = [['10:00', '14:00'], ['10:00', '19:00'], ['10:00', '19:00'], ['10:00', '19:00'], ['10:00', '19:00'], ['10:00', '19:00'], ['10:00', '17:00']];
  const to12h = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''} ${h >= 12 ? 'PM' : 'AM'}`;
  };

  function localStatus() {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date()).map((p) => [p.type, p.value]));
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
    const mins = Number(parts.hour) * 60 + Number(parts.minute);
    const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    const [o, c] = HOURS[day];
    if (mins >= toMin(o) && mins < toMin(c)) return { open: true, day, closesAt: to12h(c) };
    if (mins < toMin(o)) return { open: false, day, opensAt: to12h(o), opensWhen: 'today', opensDay: day };
    const next = (day + 1) % 7;
    return { open: false, day, opensAt: to12h(HOURS[next][0]), opensWhen: 'tomorrow', opensDay: next };
  }

  function renderStatus(s) {
    lastStatus = s;
    const m = MSG[lang];
    const pill = $('[data-status]');
    let text;
    if (s.open) text = m.openNow(s.closesAt);
    else if (s.opensWhen === 'today') text = m.closedToday(s.opensAt);
    else if (s.opensWhen === 'tomorrow') text = m.closedTomorrow(s.opensAt);
    else text = m.closedDay(m.days[s.opensDay], s.opensAt);
    $('[data-status-text]').textContent = text;
    pill.classList.toggle('is-open', !!s.open);
    pill.hidden = false;

    $$('.hours tr').forEach((tr) => tr.classList.toggle('is-today', Number(tr.dataset.day) === s.day));
  }

  fetch('/api/status', { headers: { Accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(renderStatus)
    .catch(() => renderStatus(localStatus()));

  /* ---------------- Lightbox ---------------- */
  const dialog = $('[data-lightbox-dialog]');
  if (dialog && typeof dialog.showModal === 'function') {
    const img = $('img', dialog);
    $$('[data-lightbox]').forEach((btn) => btn.addEventListener('click', () => {
      const thumb = $('img', btn);
      img.src = btn.dataset.lightbox;
      img.alt = thumb.alt;
      dialog.showModal();
    }));
    $('[data-lightbox-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  }

  /* ---------------- Contact form ---------------- */
  const form = $('[data-contact-form]');
  const statusEl = $('[data-form-status]');
  const submitBtn = $('button[type="submit"]', form);
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showErrors(errors) {
    ['name', 'email', 'message'].forEach((field) => {
      const msgEl = $(`[data-error-for="${field}"]`, form);
      const has = Boolean(errors[field]);
      msgEl.textContent = has ? MSG[lang].err[field] : '';
      msgEl.closest('.field').classList.toggle('has-error', has);
      form.elements[field].setAttribute('aria-invalid', String(has));
    });
  }

  function validate(data) {
    const errors = {};
    if (data.name.trim().length < 2) errors.name = true;
    if (!EMAIL_RE.test(data.email.trim())) errors.email = true;
    if (data.message.trim().length < 5) errors.message = true;
    return errors;
  }

  const setStatus = (html, kind) => {
    statusEl.innerHTML = html;
    statusEl.className = 'form-status' + (kind ? ` is-${kind}` : '');
  };

  async function fallbackToInstagram(data) {
    const text = `Hi! I'm ${data.name}${data.service ? ` — interested in: ${data.service}` : ''}.\n${data.message}\n(${data.email})`;
    try {
      await navigator.clipboard.writeText(text);
      setStatus(MSG[lang].fallback, 'warn');
    } catch {
      setStatus(MSG[lang].fallbackNoCopy, 'warn');
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const errors = validate(data);
    showErrors(errors);
    if (Object.keys(errors).length) {
      setStatus(MSG[lang].fix);
      form.elements[Object.keys(errors)[0]].focus();
      return;
    }

    submitBtn.disabled = true;
    const label = submitBtn.innerHTML;
    submitBtn.textContent = MSG[lang].sending;
    setStatus('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setStatus(MSG[lang].sent, 'ok');
      } else if (res.status === 422) {
        const body = await res.json().catch(() => ({}));
        showErrors(body.errors || {});
        setStatus(MSG[lang].fix);
      } else {
        await fallbackToInstagram(data);
      }
    } catch {
      await fallbackToInstagram(data);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = label;
    }
  });

  /* ---------------- Misc ---------------- */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  applyLang();
})();
