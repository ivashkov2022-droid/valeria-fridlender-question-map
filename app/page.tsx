"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useMemo, useState } from "react";

const spheres = [
  { id: "relationships", number: "01", title: "Отношения", note: "близость · совместимость", intro: "Когда важно понять не только другого человека, но и то, что происходит между вами.", questions: ["Что происходит между нами сейчас?", "Как устроена наша совместимость?", "Почему сценарий отношений повторяется?"] },
  { id: "career", number: "02", title: "Карьера", note: "работа · реализация", intro: "Когда прежняя роль стала тесной, а следующий профессиональный шаг ещё неочевиден.", questions: ["В каком деле раскрываются мои сильные стороны?", "Подходящий ли сейчас момент для перемен?", "Почему я не чувствую себя на своём месте?"] },
  { id: "business", number: "03", title: "Бизнес и деньги", note: "рост · партнёрство", intro: "Когда решение затрагивает ресурсы, партнёров и будущее проекта.", questions: ["Почему рост остановился именно сейчас?", "Подходим ли мы друг другу как партнёры?", "Какой период выбрать для нового запуска?"] },
  { id: "change", number: "04", title: "Перемены", note: "переезд · новый этап", intro: "Когда меняется город, работа или привычный уклад — и хочется увидеть маршрут целиком.", questions: ["Что я на самом деле ищу в переменах?", "Как подготовиться к новому этапу?", "Что сейчас мешает мне решиться?"] },
  { id: "family", number: "05", title: "Семья и дети", note: "понимание · поколения", intro: "Когда важно лучше понимать близких и выйти из повторяющегося семейного сценария.", questions: ["Почему дома повторяется один и тот же конфликт?", "Как лучше понимать потребности ребёнка?", "Что создаёт напряжение между поколениями?"] },
  { id: "self", number: "06", title: "О себе", note: "выбор · развитие", intro: "Когда главный вопрос не о событии, а о собственных желаниях, ритме и внутренней опоре.", questions: ["Чего я хочу на самом деле?", "Почему мне сложно сделать выбор?", "На что я могу опереться сейчас?"] },
];

const journal = [
  { meta: "Отношения · 7 минут", title: "Совместимость — не только ответ «подходим ли мы друг другу»" },
  { meta: "Выбор · 5 минут", title: "Как сформулировать вопрос, чтобы получить полезный разбор" },
  { meta: "Бизнес · 9 минут", title: "Что стоит увидеть до начала партнёрства" },
  { meta: "Перемены · 6 минут", title: "Почему новое иногда пугает сильнее, чем старое" },
];

const methods = [
  { symbol: "☉", label: "ASTRO / 01", title: "Астрология", text: "Показывает периоды, внутренние противоречия и контекст, в котором разворачивается вопрос." },
  { symbol: "№", label: "NUM / 02", title: "Нумерология", text: "Помогает увидеть повторяющиеся закономерности, сильные стороны и персональный ритм." },
  { symbol: "Ψ", label: "PSY / 03", title: "Цифровая психология", text: "Связывает расчёт с поведением, отношениями и реальным жизненным выбором человека." },
];

export default function Home() {
  const assetBase = import.meta.env.BASE_URL ?? "/";
  const [activeId, setActiveId] = useState(spheres[0].id);
  const [question, setQuestion] = useState(spheres[0].questions[0]);
  const [sent, setSent] = useState(false);
  const [compatibilityReady, setCompatibilityReady] = useState(false);
  const [dateOne, setDateOne] = useState("");
  const [dateTwo, setDateTwo] = useState("");
  const [compatibilityFocus, setCompatibilityFocus] = useState("Отношения");

  const active = useMemo(() => spheres.find((item) => item.id === activeId) ?? spheres[0], [activeId]);

  function chooseSphere(id: string) {
    const next = spheres.find((item) => item.id === id) ?? spheres[0];
    setActiveId(next.id);
    setQuestion(next.questions[0]);
  }

  function chooseQuestion(value: string) {
    setQuestion(value);
    document.querySelector("#ask")?.scrollIntoView({ behavior: "smooth" });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  function prepareCompatibility(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setDateOne(String(formData.get("dateOne") ?? dateOne));
    setDateTwo(String(formData.get("dateTwo") ?? dateTwo));
    setCompatibilityFocus(String(formData.get("compatibilityFocus") ?? compatibilityFocus));
    setCompatibilityReady(true);
  }

  return (
    <main id="top">
      <div className="utility-line">
        <span>Астрология · Нумерология · Цифровая психология</span>
        <span>Санкт-Петербург · Онлайн по всему миру</span>
      </div>

      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Валерия Фридлендер — главная"><strong>Валерия Фридлендер</strong><small>персональные разборы</small></a>
        <nav aria-label="Навигация"><a href="#directions">Темы</a><a href="#method">Метод</a><a href="#about">Эксперт</a><a href="#journal">Материалы</a></nav>
        <a className="masthead-action" href="#ask">Задать вопрос <span>↗</span></a>
      </header>

      <section className="hero-v3" aria-labelledby="hero-title">
        <div className="hero-v3-copy">
          <p className="offer-meta">Персональный астрологический и нумерологический разбор</p>
          <h1 id="hero-title">Ответ на ваш жизненный вопрос — <span>по дате рождения</span></h1>
          <p className="hero-v3-lead">Отношения, карьера, деньги, переезд или семья. Валерия Фридлендер разбирает вашу ситуацию индивидуально — без общих гороскопов и автоматических расшифровок.</p>
          <div className="hero-v3-actions"><a href="#ask">Задать свой вопрос <span>↗</span></a><a href="#directions">Посмотреть темы <span>↓</span></a></div>
        </div>
        <figure className="hero-v3-image">
          <img src={`${assetBase}images/valeria-astro-hero.jpg`} alt="Валерия Фридлендер" />
          <figcaption><span>Ваш запрос разбирает лично</span><strong>Валерия Фридлендер</strong></figcaption>
        </figure>
        <div className="hero-v3-index" aria-hidden="true"><span>VF / 01</span><span>PERSONAL ANALYSIS</span></div>
      </section>

      <div className="fact-strip" aria-label="Особенности разбора">
        <span>01</span><p><strong>Один конкретный вопрос</strong><small>в центре всего разбора</small></p>
        <span>02</span><p><strong>Три метода анализа</strong><small>вместо общего прогноза</small></p>
        <span>03</span><p><strong>Личная работа Валерии</strong><small>без генератора ответов</small></p>
      </div>

      <section className="directions" id="directions" aria-labelledby="directions-title">
        <div className="section-grid-head">
          <p className="section-index">01 / КАРТА ВОПРОСОВ</p>
          <h2 id="directions-title">С чего вы хотите<br /><em>начать разговор?</em></h2>
          <p>Выберите сферу и узнайте в примерах свой вопрос. Если точной формулировки нет — напишите её своими словами.</p>
        </div>
        <div className="question-explorer">
          <div className="sphere-list" role="tablist" aria-label="Сферы жизни">
            {spheres.map((sphere) => (
              <button key={sphere.id} type="button" role="tab" aria-selected={activeId === sphere.id} className={activeId === sphere.id ? "active" : ""} onClick={() => chooseSphere(sphere.id)}>
                <span className="sphere-number">{sphere.number}</span><span className="sphere-name"><strong>{sphere.title}</strong><small>{sphere.note}</small></span><span className="sphere-arrow">↗</span>
              </button>
            ))}
          </div>
          <div className="question-panel" role="tabpanel">
            <div className="symbol-rail" aria-hidden="true"><span>☉</span><span>☽</span><span>♀</span><span>♂</span><span>♃</span><span>♄</span><i>{active.number}</i></div>
            <p className="panel-label">Сфера {active.number} · {active.title}</p>
            <h3>{active.intro}</h3>
            <p className="examples-label">Возможно, ваш вопрос звучит так</p>
            <div className="question-lines">{active.questions.map((item) => <button type="button" key={item} onClick={() => chooseQuestion(item)}><span>{item}</span><i>↗</i></button>)}</div>
            <button className="own-question" type="button" onClick={() => chooseQuestion("")}>У меня другой вопрос <span>→</span></button>
          </div>
        </div>
      </section>

      <section className="compatibility" aria-labelledby="compatibility-title">
        <div className="compatibility-copy">
          <p className="section-index light">02 / БЫСТРЫЙ СЦЕНАРИЙ</p>
          <h2 id="compatibility-title">Совместимость<br /><em>двух людей</em></h2>
          <p>Быстрый вход в тему отношений или делового партнёрства. Никакого случайного процента: форма собирает данные для персонального разбора.</p>
          <div className="compatibility-legend"><span><b>A</b> точки притяжения</span><span><b>B</b> зоны напряжения</span><span><b>C</b> сценарии взаимодействия</span></div>
        </div>
        <div className="compatibility-tool">
          <div className="tool-header"><span>VF / COMPATIBILITY</span><span>INPUT 02</span></div>
          {compatibilityReady ? (
            <div className="compatibility-result" role="status">
              <p>Данные для запроса собраны</p><h3>{dateOne} <span>×</span> {dateTwo}</h3>
              <dl><div><dt>Фокус</dt><dd>{compatibilityFocus}</dd></div><div><dt>Формат</dt><dd>Персональный разбор Валерии</dd></div></dl>
              <button type="button" onClick={() => { setQuestion(`Хочу разобрать совместимость. Фокус: ${compatibilityFocus}. Даты: ${dateOne} и ${dateTwo}.`); document.querySelector("#ask")?.scrollIntoView({ behavior: "smooth" }); }}>Продолжить с этим вопросом <span>↗</span></button>
              <button className="tool-reset" type="button" onClick={() => setCompatibilityReady(false)}>Изменить данные</button>
            </div>
          ) : (
            <form className="compatibility-form" onSubmit={prepareCompatibility}>
              <label><span>Дата рождения · человек 01</span><input name="dateOne" type="date" value={dateOne} onChange={(event) => setDateOne(event.target.value)} required /></label>
              <div className="match-line" aria-hidden="true"><span>01</span><i /><b>×</b><i /><span>02</span></div>
              <label><span>Дата рождения · человек 02</span><input name="dateTwo" type="date" value={dateTwo} onChange={(event) => setDateTwo(event.target.value)} required /></label>
              <label><span>Что важно понять</span><select name="compatibilityFocus" value={compatibilityFocus} onChange={(event) => setCompatibilityFocus(event.target.value)}><option>Отношения</option><option>Сексуальная совместимость</option><option>Деловое партнёрство</option></select></label>
              <button type="submit">Собрать запрос <span>↗</span></button>
              <small>Это не автоматический гороскоп. Результат готовит Валерия на основе двух дат и вашей ситуации.</small>
            </form>
          )}
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <figure className="about-photo"><img src={`${assetBase}images/valeria-astro-profile.jpg`} alt="Валерия Фридлендер" /><figcaption><span>Эксперт</span><b>Валерия Фридлендер</b></figcaption></figure>
        <div className="about-copy">
          <p className="section-index">03 / ОБ ЭКСПЕРТЕ</p>
          <h2 id="about-title">Астролог, нумеролог<br />и психолог — <em>в одном разборе</em></h2>
          <p className="about-lead">Валерия соединяет расчёт с пониманием человека. Поэтому разговор начинается не с абстрактного описания характера, а с ситуации, которая требует решения сейчас.</p>
          <blockquote>«Моя задача — не решить за вас, а показать связи, которые трудно заметить изнутри ситуации».</blockquote>
          <dl><div><dt>01</dt><dd><strong>Лично</strong><span>Каждый запрос Валерия изучает сама.</span></dd></div><div><dt>02</dt><dd><strong>Предметно</strong><span>В центре — ваш вопрос, а не набор характеристик.</span></dd></div><div><dt>03</dt><dd><strong>Понятно</strong><span>Выводы переводятся в ясный человеческий язык.</span></dd></div></dl>
          <a className="underlined-link" href="#ask">Обсудить свою ситуацию <span>↗</span></a>
        </div>
      </section>

      <section className="method" id="method" aria-labelledby="method-title">
        <div className="method-head"><p className="section-index light">04 / МЕТОД</p><h2 id="method-title">Три слоя<br /><em>одного ответа</em></h2><p>Не магическое предсказание и не универсальная расшифровка. Каждый метод отвечает за свою часть картины.</p></div>
        <div className="method-grid">{methods.map((method) => <article key={method.title}><div className="method-symbol"><span>{method.symbol}</span><small>{method.label}</small></div><h3>{method.title}</h3><p>{method.text}</p></article>)}</div>
        <div className="method-process"><span>INPUT</span><p><b>Дата и место рождения</b><small>+ контекст вашей ситуации</small></p><i>→</i><span>ANALYSIS</span><p><b>Три метода</b><small>+ личная работа эксперта</small></p><i>→</i><span>OUTPUT</span><p><b>Ясная картина</b><small>+ ориентиры для решения</small></p></div>
      </section>

      <section className="journal" id="journal" aria-labelledby="journal-title">
        <div className="journal-head"><p className="section-index">05 / МАТЕРИАЛЫ</p><h2 id="journal-title">Жизненные вопросы.<br /><em>Без мистического тумана.</em></h2><p>Разбор конкретных тем помогает заранее понять подход Валерии и сформулировать собственный запрос.</p></div>
        <div className="journal-layout">
          <a className="journal-feature" href="#ask"><span className="article-number">01</span><small>{journal[0].meta}</small><h3>{journal[0].title}</h3><p>Почему одного сравнения знаков недостаточно и что действительно важно увидеть в паре.</p><b>Читать материал ↗</b><i aria-hidden="true">♀ × ♂</i></a>
          <div className="journal-list">{journal.slice(1).map((item, index) => <a href="#ask" key={item.title}><span>0{index + 2}</span><div><small>{item.meta}</small><h3>{item.title}</h3></div><i>↗</i></a>)}</div>
        </div>
      </section>

      <section className="ask" id="ask" aria-labelledby="ask-title">
        <div className="ask-copy"><p className="section-index light">06 / ПЕРСОНАЛЬНЫЙ ЗАПРОС</p><h2 id="ask-title">Задайте вопрос<br /><em>Валерии</em></h2><p>Опишите ситуацию своими словами. Валерия посмотрит запрос лично и предложит подходящий формат разбора.</p><div className="ask-meta"><span>CONFIDENTIAL</span><p>Данные используются только для ответа на ваш запрос.</p></div></div>
        {sent ? (
          <div className="sent-state" role="status"><span>✓</span><p>Вопрос принят</p><h3>Спасибо.<br />Начало положено.</h3><small>В рабочей версии здесь появится отправка заявки и информация о следующем шаге.</small><button type="button" onClick={() => setSent(false)}>Задать другой вопрос</button></div>
        ) : (
          <form className="ask-form" onSubmit={submit}>
            <label><span>Как к вам обращаться?</span><input name="name" placeholder="Ваше имя" required /></label>
            <label><span>Сфера вопроса</span><select value={activeId} onChange={(event) => chooseSphere(event.target.value)}>{spheres.map((sphere) => <option key={sphere.id} value={sphere.id}>{sphere.title}</option>)}</select></label>
            <label className="full"><span>Что вы хотите понять?</span><textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Опишите ситуацию так, как чувствуете" rows={4} required /></label>
            <label className="full"><span>Как с вами связаться?</span><input name="contact" placeholder="Telegram, WhatsApp или e-mail" required /></label>
            <label className="consent full"><input type="checkbox" required /><span>Я согласен(на) на обработку данных для ответа на мой запрос</span></label>
            <button className="form-button full" type="submit">Передать вопрос Валерии <span>↗</span></button><small className="prototype-note full">Прототип: сейчас форма показывает сценарий и не передаёт данные.</small>
          </form>
        )}
      </section>

      <footer className="site-footer">
        <div className="footer-lead"><a className="footer-wordmark" href="#top">Валерия<br />Фридлендер</a><p>Ваш вопрос заслуживает не общего прогноза, а внимательного персонального разбора.</p><a className="footer-action" href="#ask">Задать вопрос <span>↗</span></a></div>
        <div className="footer-grid">
          <div><p>Навигация</p><a href="#directions">Темы вопросов</a><a href="#method">Метод</a><a href="#about">Об эксперте</a><a href="#journal">Материалы</a></div>
          <div><p>Направления</p><a href="#directions">Отношения</a><a href="#directions">Карьера</a><a href="#directions">Бизнес и деньги</a><a href="#directions">Семья и дети</a></div>
          <div><p>Контакты</p><a href="tel:+79111284444">+7 911 128-44-44</a><a href="mailto:valeryafridlender@gmail.com">valeryafridlender@gmail.com</a><a href="https://t.me/Valeria_Fridlender" target="_blank" rel="noreferrer">Telegram ↗</a><a href="https://wa.me/79111284444" target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
          <div><p>География</p><span>Санкт-Петербург</span><span>Онлайн по всему миру</span><a href="https://vk.com/lerapsy" target="_blank" rel="noreferrer">VK ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Валерия Фридлендер</span><div><a href="https://ivashkov2022-droid.github.io/valerya-fridlender-redesign-preview/privacy-policy">Политика конфиденциальности</a><a href="https://ivashkov2022-droid.github.io/valerya-fridlender-redesign-preview/personal-data-consent">Согласие на обработку данных</a></div><a href="#top">Наверх ↑</a></div>
      </footer>
    </main>
  );
}
