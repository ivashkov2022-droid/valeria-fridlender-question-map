"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useMemo, useState } from "react";

type Sphere = {
  id: string;
  symbol: string;
  title: string;
  note: string;
  intro: string;
  questions: string[];
};

const spheres: Sphere[] = [
  { id: "relationships", symbol: "♀", title: "Отношения и любовь", note: "близость · совместимость", intro: "Когда важно понять не только другого человека, но и то, что происходит между вами.", questions: ["Что происходит между нами сейчас?", "Как устроена наша совместимость?", "Почему сценарий отношений повторяется?"] },
  { id: "career", symbol: "♃", title: "Карьера и работа", note: "роль · реализация", intro: "Когда прежняя роль стала тесной, а следующий профессиональный шаг ещё неочевиден.", questions: ["В каком деле раскрываются мои сильные стороны?", "Подходящий ли сейчас момент для перемен?", "Почему я не чувствую себя на своём месте?"] },
  { id: "business", symbol: "♄", title: "Бизнес и деньги", note: "ресурсы · партнёрство", intro: "Когда решение затрагивает ресурсы, партнёров и будущее проекта.", questions: ["Почему рост остановился именно сейчас?", "Подходим ли мы друг другу как партнёры?", "Какой период выбрать для нового запуска?"] },
  { id: "change", symbol: "☊", title: "Переезд и перемены", note: "маршрут · новый этап", intro: "Когда меняется город, работа или привычный уклад — и хочется увидеть маршрут целиком.", questions: ["Что я на самом деле ищу в переменах?", "Как подготовиться к новому этапу?", "Что сейчас мешает мне решиться?"] },
  { id: "family", symbol: "☽", title: "Семья и дети", note: "понимание · поколения", intro: "Когда важно лучше понимать близких и выйти из повторяющегося семейного сценария.", questions: ["Почему дома повторяется один конфликт?", "Как лучше понимать потребности ребёнка?", "Что создаёт напряжение между поколениями?"] },
  { id: "self", symbol: "☉", title: "О себе и развитии", note: "выбор · внутренняя опора", intro: "Когда главный вопрос не о событии, а о собственных желаниях, ритме и внутренней опоре.", questions: ["Чего я хочу на самом деле?", "Почему мне сложно сделать выбор?", "На что я могу опереться сейчас?"] },
];

const formats = [
  { code: "01", symbol: "✦", title: "Один вопрос", text: "Точечный персональный разбор ситуации, которая требует ясности сейчас." },
  { code: "02", symbol: "☌", title: "Совместимость", text: "Отношения, сексуальная совместимость или деловое партнёрство двух людей." },
  { code: "03", symbol: "◷", title: "Важная дата", text: "Период, запуск, переезд или событие, для которого важно выбрать верный момент." },
  { code: "04", symbol: "◎", title: "Большой разбор", text: "Целостная карта личности, повторяющихся сценариев и точек развития." },
];

const fontPairs = [
  { id: "prata", name: "Prata × Manrope", note: "Строго и редакционно" },
  { id: "cormorant", name: "Cormorant × Manrope", note: "Мягко и атмосферно" },
  { id: "forum", name: "Forum × Onest", note: "Тонко и свободно" },
  { id: "tenor", name: "Tenor Sans × Manrope", note: "Современно и спокойно" },
] as const;

const zodiacSigns = [
  ["♈", "Овен", "21.03 — 20.04"], ["♉", "Телец", "21.04 — 21.05"],
  ["♊", "Близнецы", "22.05 — 21.06"], ["♋", "Рак", "22.06 — 22.07"],
  ["♌", "Лев", "23.07 — 23.08"], ["♍", "Дева", "24.08 — 22.09"],
  ["♎", "Весы", "23.09 — 23.10"], ["♏", "Скорпион", "24.10 — 22.11"],
  ["♐", "Стрелец", "23.11 — 21.12"], ["♑", "Козерог", "22.12 — 20.01"],
  ["♒", "Водолей", "21.01 — 18.02"], ["♓", "Рыбы", "19.02 — 20.03"],
] as const;

const testimonials = [
  { quote: "Я пришла с одним вопросом об отношениях, а увидела всю систему — почему выбираю именно таких людей и где могу поступить иначе.", name: "Мария", theme: "Отношения" },
  { quote: "После разбора стало понятно, почему прежняя работа больше не подходит и какой следующий шаг действительно мой.", name: "Анна", theme: "Карьера" },
  { quote: "Это был не прогноз ради прогноза. Я получила ясную картину партнёрства и смогла спокойно принять решение.", name: "Елена", theme: "Бизнес" },
];

const articles = [
  { number: "01", sign: "♀ × ♂", meta: "Отношения · 7 минут", title: "Совместимость — больше, чем ответ «подходим ли мы друг другу»" },
  { number: "02", sign: "?", meta: "Практика · 5 минут", title: "Как сформулировать вопрос, чтобы получить полезный разбор" },
  { number: "03", sign: "♃", meta: "Бизнес · 9 минут", title: "Что стоит увидеть до начала нового партнёрства" },
];

export default function Home() {
  const assetBase = import.meta.env.BASE_URL ?? "/";
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalId, setModalId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState(spheres[0].id);
  const [question, setQuestion] = useState(spheres[0].questions[0]);
  const [sent, setSent] = useState(false);
  const [compatibilityReady, setCompatibilityReady] = useState(false);
  const [dateOne, setDateOne] = useState("");
  const [dateTwo, setDateTwo] = useState("");
  const [compatibilityFocus, setCompatibilityFocus] = useState("Отношения");
  const [fontPair, setFontPair] = useState("prata");
  const [fontPanelOpen, setFontPanelOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const modalSphere = useMemo(() => spheres.find((item) => item.id === modalId) ?? null, [modalId]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 800);
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalSphere || mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalSphere, mobileOpen]);

  function goToQuestion(value: string, sphereId?: string) {
    if (sphereId) setActiveId(sphereId);
    setQuestion(value);
    setModalId(null);
    window.setTimeout(() => document.querySelector("#ask")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function submitGuide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    goToQuestion(String(data.get("guideQuestion") ?? ""));
  }

  function prepareCompatibility(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCompatibilityReady(true);
  }

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const nav = (
    <>
      <a href="#directions" onClick={() => setMobileOpen(false)}>Темы</a>
      <a href="#formats" onClick={() => setMobileOpen(false)}>Разборы</a>
      <a href="#compatibility" onClick={() => setMobileOpen(false)}>Совместимость</a>
      <a href="#about" onClick={() => setMobileOpen(false)}>О Валерии</a>
    </>
  );

  return (
    <main id="top" data-font={fontPair} className={`astralla-page ${loaded ? "is-loaded" : ""}`}>
      <div className={`astralla-preloader ${loaded ? "is-hidden" : ""}`} aria-hidden="true"><i>✦</i><i>✧</i><i>✦</i></div>

      <div className={`font-lab ${fontPanelOpen ? "is-open" : ""}`}>
        <button className="font-lab-toggle" type="button" aria-expanded={fontPanelOpen} onClick={() => setFontPanelOpen((value) => !value)}><span>Aa</span><small>Шрифты</small></button>
        <aside aria-label="Конструктор шрифтов">
          <div className="font-lab-heading"><span>Примерить типографику</span><button type="button" aria-label="Закрыть конструктор" onClick={() => setFontPanelOpen(false)}>×</button></div>
          <p>Выберите пару — весь сайт изменится сразу.</p>
          {fontPairs.map((pair) => <button className={fontPair === pair.id ? "is-active" : ""} type="button" key={pair.id} onClick={() => setFontPair(pair.id)}><b>{pair.name}</b><small>{pair.note}</small></button>)}
        </aside>
      </div>

      <header className={`astralla-header ${scrolled ? "is-sticky" : ""}`}>
        <a className="astralla-wordmark" href="#top" aria-label="Валерия Фридлендер — главная"><strong>VALERIA</strong><small>ФРИДЛЕНДЕР</small></a>
        <nav aria-label="Основная навигация"><a className="is-current" href="#top">Главная</a>{nav}</nav>
        <a className="astralla-appointment" href="#ask"><span>Записаться</span></a>
        <button className="constellation-menu" type="button" aria-label="Открыть меню" aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}><i /><i /><i /><i /></button>
        <div className={`mobile-navigation ${mobileOpen ? "is-open" : ""}`}><a href="#top" onClick={() => setMobileOpen(false)}>Главная</a>{nav}<a href="#ask" onClick={() => setMobileOpen(false)}>Задать вопрос</a></div>
      </header>

      <section className="astralla-hero" aria-labelledby="hero-title" style={{ backgroundImage: `url(${assetBase}images/valeria-direct-gaze-hero-v2.png)` }}>
        <span className="hero-star hero-star-one" aria-hidden="true">✦</span><span className="hero-star hero-star-two" aria-hidden="true">✧</span><span className="hero-star hero-star-three" aria-hidden="true">✦</span>
        <div className="astralla-hero-copy">
          <p>Астрология · Нумерология · Цифровая психология</p>
          <h1 id="hero-title">Ответ на ваш<br />жизненный вопрос</h1>
          <p className="astralla-hero-lead">Индивидуальный разбор отношений, карьеры, денег, переезда или семьи — по дате рождения и контексту вашей ситуации.</p>
          <a className="astralla-button" href="#ask"><span>Задать вопрос</span></a>
        </div>
        <div className="astralla-hero-meta"><span>Валерия Фридлендер</span><span>Санкт-Петербург · онлайн по всему миру</span></div>
      </section>

      <section className="guide-section" aria-labelledby="guide-title">
        <div className="guide-orbit" aria-hidden="true"><i /><i /><i /><span>☉</span></div>
        <div className="guide-copy"><p className="eyebrow">Начните с главного</p><h2 id="guide-title">Какой вопрос<br /><em>не даёт вам покоя?</em></h2><p>Не нужно выбирать готовый гороскоп. Опишите ситуацию своими словами — вопрос станет центром персонального разбора.</p></div>
        <form className="guide-form" onSubmit={submitGuide}><label><span>Ваш вопрос</span><textarea name="guideQuestion" rows={3} placeholder="Например: почему отношения повторяются по одному сценарию?" required /></label><div className="guide-form-row"><label><span>Дата рождения</span><input name="birthDate" type="date" required /></label><button type="submit"><span>Продолжить</span></button></div><small>Ответ готовит Валерия лично — это не автоматическая расшифровка.</small></form>
      </section>

      <section className="life-flow" aria-labelledby="life-flow-title">
        <div className="life-flow-intro"><p className="eyebrow">Сферы жизни</p><h2 id="life-flow-title">Вопрос редко живёт<br /><em>только в одной точке</em></h2><p>Работа влияет на отношения, отношения — на выбор, выбор — на ощущение своего пути. Поэтому мы смотрим на ситуацию целиком.</p></div>
        <div className="life-flow-list">{spheres.slice(0, 4).map((sphere, index) => <button type="button" key={sphere.id} onClick={() => setModalId(sphere.id)}><span className="life-flow-sign" aria-hidden="true"><i /><b>{sphere.symbol}</b></span><small>0{index + 1}</small><span className="life-flow-copy"><strong>{sphere.title}</strong><em>{sphere.note}</em></span><span className="life-flow-arrow">↗</span></button>)}</div>
      </section>

      <section className="formats" id="formats" aria-labelledby="formats-title">
        <div className="section-heading centered"><p className="eyebrow">Персональный формат</p><h2 id="formats-title">Один путь к ясности.<br /><em>Разные точки входа.</em></h2></div>
        <div className="format-river">{formats.map((item, index) => <article key={item.code}><div className="format-river-art" aria-hidden="true"><i /><i /><span>{item.symbol}</span></div><small>{item.code} / разбор</small><div><h3>{item.title}</h3><p>{item.text}</p></div><a href="#ask" aria-label={`Узнать формат: ${item.title}`}><span>узнать</span><b>↗</b></a><em aria-hidden="true">0{index + 1}</em></article>)}</div>
      </section>

      <section className="path-banner" aria-label="Персональный подход"><div className="path-stars" aria-hidden="true"><i>✦</i><i>✧</i><i>✦</i></div><p>Ваш путь не обязан быть понятен всем</p><h2>Главное —<br />чтобы он был вашим</h2><a className="astralla-button" href="#ask"><span>Обсудить ситуацию</span></a></section>

      <section className="zodiac-atlas" aria-labelledby="zodiac-title">
        <div className="zodiac-mist zodiac-mist-one" aria-hidden="true" /><div className="zodiac-mist zodiac-mist-two" aria-hidden="true" />
        <div className="zodiac-heading"><p className="eyebrow">Зодиакальный атлас</p><h2 id="zodiac-title">Двенадцать знаков.<br /><em>Один неповторимый человек.</em></h2><p>Знак — не готовый ответ и не ярлык. Это только одна линия в более сложной персональной карте.</p></div>
        <div className="zodiac-orbit" aria-label="Двенадцать знаков зодиака">{zodiacSigns.map(([symbol, title, dates], index) => <button type="button" key={title} onClick={() => goToQuestion(`Хочу узнать, как знак ${title} проявляется в моей персональной карте.`)}><span className="zodiac-drawing" aria-hidden="true"><i /><i /><i /><b>{symbol}</b></span><strong>{title}</strong><small>{dates}</small><em>0{index + 1}</em></button>)}</div>
      </section>

      <section className="directions" id="directions" aria-labelledby="directions-title">
        <div className="section-heading"><div><p className="eyebrow">Карта вопросов</p><h2 id="directions-title">Найдите свою<br /><em>сферу жизни</em></h2></div><p>Выберите тему. Внутри — примеры вопросов, с которыми можно прийти на персональный разбор.</p></div>
        <div className="sphere-flow">{spheres.map((sphere, index) => <button type="button" key={sphere.id} onClick={() => setModalId(sphere.id)}><span className="sphere-flow-number">0{index + 1}</span><span className="sphere-flow-art" aria-hidden="true"><i /><i /><b>{sphere.symbol}</b></span><span className="sphere-flow-copy"><h3>{sphere.title}</h3><p>{sphere.note}</p></span><span className="sphere-flow-arrow">→</span></button>)}</div>
      </section>

      <section className="compatibility" id="compatibility" aria-labelledby="compatibility-title">
        <div className="compatibility-aura" aria-hidden="true"><span>♀</span><i /><b>♂</b></div>
        <div className="compatibility-copy"><p className="eyebrow light">Быстрый сценарий</p><h2 id="compatibility-title">Совместимость<br /><em>двух людей</em></h2><p>Форма собирает исходные данные для личного разбора — без случайного процента и универсальных формулировок.</p><ul><li><span>A</span> точки притяжения</li><li><span>B</span> зоны напряжения</li><li><span>C</span> сценарии взаимодействия</li></ul></div>
        <div className="compatibility-tool"><div className="tool-header"><span>VF / COMPATIBILITY</span><span>INPUT 02</span></div>{compatibilityReady ? <div className="compatibility-result" role="status"><p>Данные для запроса собраны</p><h3>{dateOne}<span> × </span>{dateTwo}</h3><dl><div><dt>Фокус</dt><dd>{compatibilityFocus}</dd></div><div><dt>Формат</dt><dd>Персональный разбор Валерии</dd></div></dl><button type="button" onClick={() => goToQuestion(`Хочу разобрать совместимость. Фокус: ${compatibilityFocus}. Даты: ${dateOne} и ${dateTwo}.`, "relationships")}>Продолжить с этим вопросом <span>→</span></button><button className="tool-reset" type="button" onClick={() => setCompatibilityReady(false)}>Изменить данные</button></div> : <form className="compatibility-form" onSubmit={prepareCompatibility}><label><span>Дата рождения · человек 01</span><input type="date" value={dateOne} onChange={(event) => setDateOne(event.target.value)} required /></label><div className="match-line"><span>01</span><i /><b>×</b><i /><span>02</span></div><label><span>Дата рождения · человек 02</span><input type="date" value={dateTwo} onChange={(event) => setDateTwo(event.target.value)} required /></label><label><span>Что важно понять</span><select value={compatibilityFocus} onChange={(event) => setCompatibilityFocus(event.target.value)}><option>Отношения</option><option>Сексуальная совместимость</option><option>Деловое партнёрство</option></select></label><button type="submit"><span>Собрать запрос</span></button><small>Результат не генерируется автоматически. Валерия изучает обе даты и контекст вашей ситуации.</small></form>}</div>
      </section>

      <section className="testimonials" aria-labelledby="testimonials-title"><div className="section-heading centered"><p className="eyebrow">После разбора</p><h2 id="testimonials-title">Когда связи становятся<br /><em>видимыми</em></h2></div><div className="testimonial-slider"><button type="button" aria-label="Предыдущий отзыв" onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)}>←</button><figure key={testimonialIndex}><span aria-hidden="true">“</span><blockquote>{testimonials[testimonialIndex].quote}</blockquote><figcaption><b>{testimonials[testimonialIndex].name}</b><small>0{testimonialIndex + 1} · {testimonials[testimonialIndex].theme}</small></figcaption></figure><button type="button" aria-label="Следующий отзыв" onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}>→</button></div><div className="testimonial-dots" aria-label="Выбрать отзыв">{testimonials.map((item,index) => <button type="button" className={testimonialIndex === index ? "is-active" : ""} aria-label={`Отзыв ${index + 1}: ${item.name}`} key={item.name} onClick={() => setTestimonialIndex(index)} />)}</div></section>

      <section className="about about-immersive" id="about" aria-labelledby="about-title"><div className="about-portrait"><img className="about-portrait-primary" src={`${assetBase}images/valeria-about-close-original-v3.jpg`} alt="Валерия Фридлендер" /><img className="about-portrait-secondary" src={`${assetBase}images/valeria-about-hover-original-v3.jpg`} alt="" aria-hidden="true" /><div className="about-photo-sign"><span>Валерия Фридлендер</span><small>Астрология · Нумерология · Цифровая психология</small></div></div><div className="about-copy"><p className="eyebrow">О Валерии</p><h2 id="about-title">Расчёт — только начало.<br /><em>В центре всегда человек.</em></h2><p className="about-lead">Валерия соединяет астрологию, нумерологию и цифровую психологию. Поэтому разговор начинается не с абстрактного описания характера, а с ситуации, которая требует решения сейчас.</p><blockquote>«Моя задача — не решить за вас, а показать связи, которые трудно заметить изнутри ситуации».</blockquote><dl><div><dt>01</dt><dd><b>Лично</b><span>Каждый запрос Валерия изучает сама.</span></dd></div><div><dt>02</dt><dd><b>Предметно</b><span>В центре — конкретный вопрос, а не набор характеристик.</span></dd></div><div><dt>03</dt><dd><b>Понятно</b><span>Выводы переводятся в ясный человеческий язык.</span></dd></div></dl><a className="text-link" href="#ask">Обсудить свою ситуацию</a></div></section>

      <section className="journal" id="journal" aria-labelledby="journal-title"><div className="section-heading"><div><p className="eyebrow">Материалы</p><h2 id="journal-title">Жизненные вопросы.<br /><em>Без мистического тумана.</em></h2></div><p>Конкретные темы помогают заранее понять подход Валерии и точнее сформулировать собственный запрос.</p></div><div className="article-grid">{articles.map((article) => <a href="#ask" key={article.number}><span>{article.number}</span><i aria-hidden="true">{article.sign}</i><small>{article.meta}</small><h3>{article.title}</h3><b>Читать материал →</b></a>)}</div></section>

      <section className="ask" id="ask" aria-labelledby="ask-title"><div className="ask-copy"><p className="eyebrow light">Персональный запрос</p><h2 id="ask-title">Задайте вопрос<br /><em>Валерии</em></h2><p>Опишите ситуацию своими словами. Валерия посмотрит запрос лично и предложит подходящий формат разбора.</p><div><span>CONFIDENTIAL</span><small>Данные используются только для ответа на ваш запрос.</small></div></div>{sent ? <div className="sent-state" role="status"><span>✓</span><p>Вопрос принят</p><h3>Спасибо.<br />Начало положено.</h3><small>В рабочей версии здесь появится отправка заявки и информация о следующем шаге.</small><button type="button" onClick={() => setSent(false)}>Задать другой вопрос</button></div> : <form className="ask-form" onSubmit={submitQuestion}><label><span>Как к вам обращаться?</span><input name="name" placeholder="Ваше имя" required /></label><label><span>Сфера вопроса</span><select value={activeId} onChange={(event) => setActiveId(event.target.value)}>{spheres.map((sphere) => <option key={sphere.id} value={sphere.id}>{sphere.title}</option>)}</select></label><label className="full"><span>Что вы хотите понять?</span><textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Опишите ситуацию так, как чувствуете" rows={4} required /></label><label className="full"><span>Как с вами связаться?</span><input name="contact" placeholder="Telegram, WhatsApp или e-mail" required /></label><label className="consent full"><input type="checkbox" required /><span>Я согласен(на) на обработку данных для ответа на мой запрос</span></label><button className="form-button full" type="submit">Передать вопрос Валерии <span>→</span></button><small className="prototype-note full">Прототип: форма показывает сценарий и пока не передаёт данные.</small></form>}</section>

      <footer className="site-footer"><div className="footer-intro"><a className="footer-wordmark" href="#top">VALERIA</a><p>Ваш вопрос заслуживает не общего прогноза, а внимательного персонального разбора.</p></div><div className="footer-columns"><div><h3>Темы</h3><a href="#directions">Отношения</a><a href="#directions">Карьера</a><a href="#directions">Бизнес и деньги</a><a href="#directions">Семья и дети</a></div><div><h3>Информация</h3><a href="#about">О Валерии</a><a href="#formats">Форматы разбора</a><a href="#journal">Материалы</a><a href="#ask">Задать вопрос</a></div><div><h3>Контакты</h3><a href="tel:+79111284444">+7 911 128-44-44</a><a href="mailto:valeryafridlender@gmail.com">E-mail</a><a href="https://t.me/Valeria_Fridlender" target="_blank" rel="noreferrer">Telegram ↗</a><a href="https://wa.me/79111284444" target="_blank" rel="noreferrer">WhatsApp ↗</a></div><div><h3>Подписка</h3><p>Получайте новые материалы Валерии.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Email*" aria-label="Email" /><button type="submit">Подписаться</button></form></div></div><div className="footer-nav"><span>© 2026 Валерия Фридлендер</span><div><a href="https://ivashkov2022-droid.github.io/valerya-fridlender-redesign-preview/privacy-policy">Политика конфиденциальности</a><a href="https://ivashkov2022-droid.github.io/valerya-fridlender-redesign-preview/personal-data-consent">Согласие на обработку данных</a></div><a href="#top">Наверх ↑</a></div></footer>

      {modalSphere && <div className="sphere-modal" role="dialog" aria-modal="true" aria-labelledby="sphere-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalId(null); }}><div className="sphere-modal-card"><button className="modal-close" type="button" aria-label="Закрыть" onClick={() => setModalId(null)}>×</button><div className="modal-sign"><span aria-hidden="true">{modalSphere.symbol}</span><h3>{modalSphere.title}</h3><p>{modalSphere.note}</p><button type="button" onClick={() => goToQuestion("", modalSphere.id)}>Задать свой вопрос</button></div><div className="modal-content"><p className="eyebrow">Возможно, ваш вопрос звучит так</p><h2 id="sphere-modal-title">{modalSphere.intro}</h2>{modalSphere.questions.map((item) => <button type="button" key={item} onClick={() => goToQuestion(item, modalSphere.id)}><span>{item}</span><i>→</i></button>)}</div></div></div>}
    </main>
  );
}
