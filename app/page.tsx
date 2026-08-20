"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useMemo, useState } from "react";

const spheres = [
  {
    id: "relationships",
    number: "01",
    title: "Отношения",
    note: "близость и выбор",
    intro:
      "Когда хочется понять не только другого человека, но и то, что происходит между вами.",
    questions: [
      "Почему я снова оказываюсь в похожих отношениях?",
      "Что происходит между нами сейчас?",
      "Как устроена наша совместимость?",
    ],
  },
  {
    id: "career",
    number: "02",
    title: "Карьера",
    note: "работа и реализация",
    intro:
      "Когда прежняя роль стала тесной, а следующий шаг пока не складывается в ясный маршрут.",
    questions: [
      "Почему я не чувствую себя на своём месте?",
      "В каком деле раскрываются мои сильные стороны?",
      "Подходящий ли сейчас момент для перемен?",
    ],
  },
  {
    id: "business",
    number: "03",
    title: "Бизнес и деньги",
    note: "рост и решения",
    intro:
      "Когда решение затрагивает ресурсы, партнёрство и будущее проекта — и хочется увидеть картину шире.",
    questions: [
      "Почему рост остановился именно сейчас?",
      "Подходим ли мы друг другу как партнёры?",
      "Какой период выбрать для нового запуска?",
    ],
  },
  {
    id: "change",
    number: "04",
    title: "Перемены",
    note: "переезд и новый этап",
    intro:
      "Когда меняется не только город или работа, но и привычный ритм, окружение и ощущение себя.",
    questions: [
      "Что я на самом деле ищу в переменах?",
      "Как подготовиться к новому этапу?",
      "Что сейчас мешает мне решиться?",
    ],
  },
  {
    id: "family",
    number: "05",
    title: "Семья",
    note: "дети и поколения",
    intro:
      "Когда важно лучше понимать близких и перестать ходить по кругу в повторяющихся ситуациях.",
    questions: [
      "Почему дома повторяется один и тот же конфликт?",
      "Как лучше понимать потребности ребёнка?",
      "Что создаёт напряжение между поколениями?",
    ],
  },
  {
    id: "self",
    number: "06",
    title: "О себе",
    note: "смыслы и развитие",
    intro:
      "Когда главный вопрос не о событии, а о себе: своих желаниях, ритме и внутренней опоре.",
    questions: [
      "Чего я хочу на самом деле?",
      "Почему мне сложно сделать выбор?",
      "На что я могу опереться сейчас?",
    ],
  },
];

const journal = [
  {
    meta: "Отношения · 7 минут",
    title: "Совместимость — это не только «подходим ли мы друг другу»",
  },
  {
    meta: "Выбор · 5 минут",
    title: "Как задать вопрос, чтобы действительно получить ответ",
  },
  {
    meta: "Бизнес · 9 минут",
    title: "Что полезно увидеть до начала партнёрства",
  },
  {
    meta: "Перемены · 6 минут",
    title: "Почему новое иногда пугает сильнее, чем старое",
  },
];

export default function Home() {
  const assetBase = import.meta.env.BASE_URL ?? "/";
  const [activeId, setActiveId] = useState(spheres[0].id);
  const [question, setQuestion] = useState(spheres[0].questions[0]);
  const [sent, setSent] = useState(false);

  const active = useMemo(
    () => spheres.find((item) => item.id === activeId) ?? spheres[0],
    [activeId],
  );

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

  return (
    <main id="top">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brand-sign">VF</span>
          <span>
            <strong>Валерия Фридлендер</strong>
            <small>астролог · нумеролог · цифровой психолог</small>
          </span>
        </a>
        <nav aria-label="Навигация">
          <a href="#directions">Сферы</a>
          <a href="#about">О Валерии</a>
          <a href="#method">Как это работает</a>
        </nav>
        <a className="header-link" href="#ask">Задать вопрос</a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker"><span>Персональный разбор</span><i />Один вопрос — ваш ответ</p>
          <h1 id="hero-title">
            Какой вопрос
            <em>не даёт вам покоя?</em>
          </h1>
          <p className="hero-lead">
            Иногда ясность начинается не с совета, а с правильно заданного вопроса.
            Посмотрим на вашу ситуацию через астрологию, нумерологию и психологию —
            бережно, предметно и лично.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#directions">Найти свой вопрос <span>↗</span></a>
            <a className="quiet-link" href="#about">Познакомиться с Валерией <span>↓</span></a>
          </div>
          <p className="hero-note">Не общий прогноз. Не готовый сценарий. Разговор именно о вашей жизни.</p>
        </div>

        <div className="hero-portrait">
          <div className="portrait-glow" />
          <div className="soft-orbit orbit-a" />
          <div className="soft-orbit orbit-b" />
          <span className="orbit-word word-a">контекст</span>
          <span className="orbit-word word-b">ритм</span>
          <img src={`${assetBase}images/valeria-hero.webp`} alt="Валерия Фридлендер" />
          <div className="portrait-caption">
            <span>Личный разбор</span>
            <strong>Валерия Фридлендер</strong>
          </div>
        </div>

        <a className="scroll-note" href="#directions"><span>↓</span> Начните с того, что волнует</a>
      </section>

      <section className="directions" id="directions" aria-labelledby="directions-title">
        <div className="section-intro">
          <p className="eyebrow">Карта жизненных вопросов</p>
          <h2 id="directions-title">Не выбирайте услугу.<br /><em>Выберите то, что важно сейчас.</em></h2>
          <p>Нажмите на близкую тему. Вопрос не обязан звучать идеально — достаточно узнать в нём себя.</p>
        </div>

        <div className="question-explorer">
          <div className="sphere-list" role="tablist" aria-label="Сферы жизни">
            {spheres.map((sphere) => (
              <button
                key={sphere.id}
                type="button"
                role="tab"
                aria-selected={activeId === sphere.id}
                className={activeId === sphere.id ? "active" : ""}
                onClick={() => chooseSphere(sphere.id)}
              >
                <span className="sphere-number">{sphere.number}</span>
                <span className="sphere-name"><strong>{sphere.title}</strong><small>{sphere.note}</small></span>
                <span className="sphere-arrow">↗</span>
              </button>
            ))}
          </div>

          <div className="question-canvas" role="tabpanel">
            <div className="canvas-orbit" aria-hidden="true" />
            <p className="canvas-label">Сфера {active.number} · {active.title}</p>
            <h3>{active.intro}</h3>
            <p className="examples-label">Возможно, ваш вопрос звучит так:</p>
            <div className="question-lines">
              {active.questions.map((item) => (
                <button type="button" key={item} onClick={() => chooseQuestion(item)}>
                  <span>{item}</span><i>→</i>
                </button>
              ))}
            </div>
            <button className="own-question" type="button" onClick={() => chooseQuestion("")}>
              У меня другой вопрос <span>↗</span>
            </button>
          </div>
        </div>

        <div className="small-routes" aria-label="Быстрые маршруты">
          <p>Можно начать ещё конкретнее</p>
          <a href="#ask">Совместимость с партнёром <span>↗</span></a>
          <a href="#ask">Подходящий момент для решения <span>↗</span></a>
          <a href="#ask">Личный год и его задачи <span>↗</span></a>
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-photo">
          <div className="photo-shape" />
          <img src={`${assetBase}images/valeria-expert.webp`} alt="Валерия Фридлендер" />
          <p>15+ лет практики<br />с людьми и их историями</p>
        </div>
        <div className="about-copy">
          <p className="eyebrow">Валерия Фридлендер</p>
          <h2 id="about-title">За любыми данными<br /><em>я всегда вижу человека.</em></h2>
          <blockquote>
            «Мне важно не выдать красивый прогноз, а помочь вам увидеть ситуацию
            объёмнее — так, чтобы после разговора стало легче сделать свой следующий шаг».
          </blockquote>
          <dl>
            <div><dt>Лично</dt><dd>Каждый запрос я изучаю сама — без потоковых расшифровок.</dd></div>
            <div><dt>Предметно</dt><dd>В центре не набор характеристик, а ваша реальная ситуация.</dd></div>
            <div><dt>Понятно</dt><dd>Сложные взаимосвязи перевожу в человеческий язык и ясные выводы.</dd></div>
          </dl>
          <a className="text-link" href="#ask">Рассказать о своей ситуации <span>↗</span></a>
        </div>
      </section>

      <section className="method" id="method" aria-labelledby="method-title">
        <div className="method-heading">
          <p className="eyebrow">Как это устроено</p>
          <h2 id="method-title">Не предсказание.<br /><em>Система координат.</em></h2>
          <p>Три оптики помогают увидеть контекст, повторяющиеся сценарии и возможные направления решения.</p>
        </div>
        <div className="method-flow">
          <article><span>01</span><h3>Ваш вопрос</h3><p>Мы начинаем с того, что происходит в вашей жизни, а не со списка услуг.</p></article>
          <article><span>02</span><h3>Три оптики</h3><p>Астрология, нумерология и цифровая психология дополняют друг друга.</p></article>
          <article><span>03</span><h3>Личная ясность</h3><p>Вы получаете не директиву, а объёмную картину и точки для собственного решения.</p></article>
        </div>
        <p className="method-footnote">Астрологические символы здесь — язык анализа, а не декорация и не обещание магического ответа.</p>
      </section>

      <section className="journal" aria-labelledby="journal-title">
        <div className="journal-heading">
          <div>
            <p className="eyebrow">Журнал жизненных ситуаций</p>
            <h2 id="journal-title">Почитать,<br /><em>пока вы прислушиваетесь.</em></h2>
          </div>
          <p>Короткие материалы без мистического тумана — о вопросах, которые возникают у обычных живых людей.</p>
        </div>
        <div className="journal-list">
          {journal.map((item, index) => (
            <a href="#ask" key={item.title}>
              <span>0{index + 1}</span>
              <div><small>{item.meta}</small><h3>{item.title}</h3></div>
              <i>↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className="ask" id="ask" aria-labelledby="ask-title">
        <div className="ask-copy">
          <p className="eyebrow">Ваш вопрос</p>
          <h2 id="ask-title">Если он уже<br /><em>звучит внутри.</em></h2>
          <p>Опишите ситуацию своими словами. Сначала Валерия посмотрит, подходит ли запрос для такого формата, и только потом предложит следующий шаг.</p>
          <div className="ask-promise"><span>⌁</span><p><strong>Бережно и конфиденциально</strong>Ваши данные нужны только для понимания запроса.</p></div>
        </div>

        {sent ? (
          <div className="sent-state" role="status">
            <span>✓</span>
            <p>Вопрос принят</p>
            <h3>Спасибо.<br />Начало положено.</h3>
            <small>В рабочей версии здесь появится отправка заявки и информация о следующем шаге.</small>
            <button type="button" onClick={() => setSent(false)}>Задать другой вопрос</button>
          </div>
        ) : (
          <form className="ask-form" onSubmit={submit}>
            <label><span>Как к вам обращаться?</span><input name="name" placeholder="Ваше имя" required /></label>
            <label><span>Сфера вопроса</span>
              <select value={activeId} onChange={(event) => chooseSphere(event.target.value)}>
                {spheres.map((sphere) => <option key={sphere.id} value={sphere.id}>{sphere.title}</option>)}
              </select>
            </label>
            <label className="full"><span>Что вы хотите понять?</span><textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Опишите ситуацию так, как чувствуете" rows={4} required /></label>
            <label className="full"><span>Как с вами связаться?</span><input name="contact" placeholder="Telegram, WhatsApp или e-mail" required /></label>
            <label className="consent full"><input type="checkbox" required /><span>Я согласен(на) на обработку данных для ответа на мой запрос</span></label>
            <button className="form-button full" type="submit">Передать вопрос Валерии <span>↗</span></button>
            <small className="prototype-note full">Это прототип: форма показывает сценарий и пока не отправляет данные.</small>
          </form>
        )}
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-sign">VF</span><span><strong>Валерия Фридлендер</strong><small>персональная система координат</small></span></a>
        <p>© 2026 · Астрология о жизни, а не вместо неё</p>
        <a href="#top">Наверх ↑</a>
      </footer>
    </main>
  );
}
