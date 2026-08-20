"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useMemo, useState } from "react";

const sphereData = [
  {
    id: "relationships",
    number: "01",
    title: "Отношения",
    short: "любовь и близость",
    intro: "Когда хочется понять не только другого человека, но и сценарий, который возникает между вами.",
    questions: [
      "Почему я повторяю один и тот же сценарий в отношениях?",
      "Как устроена наша совместимость?",
      "Что сейчас происходит между нами?",
    ],
  },
  {
    id: "career",
    number: "02",
    title: "Карьера",
    short: "работа и реализация",
    intro: "Когда прежняя роль стала тесной, а следующая точка пока не складывается в ясный маршрут.",
    questions: [
      "Почему я не чувствую себя на своём месте?",
      "Какой формат работы раскрывает мои сильные стороны?",
      "Подходящий ли сейчас момент для перемен?",
    ],
  },
  {
    id: "business",
    number: "03",
    title: "Бизнес и деньги",
    short: "рост и решения",
    intro: "Когда решение влияет на ресурсы, партнёрство и траекторию проекта — и нужен взгляд шире привычной логики.",
    questions: [
      "Почему рост остановился именно сейчас?",
      "Подходим ли мы друг другу как партнёры?",
      "Какой период выбрать для нового запуска?",
    ],
  },
  {
    id: "relocation",
    number: "04",
    title: "Переезд",
    short: "место и перемены",
    intro: "Когда меняется не только город, но и привычный ритм, окружение, работа и ощущение себя.",
    questions: [
      "Что я на самом деле ищу в переезде?",
      "Как новая среда может повлиять на мой ритм?",
      "Как подготовиться к периоду больших перемен?",
    ],
  },
  {
    id: "family",
    number: "05",
    title: "Семья и дети",
    short: "связи и поколения",
    intro: "Когда важно увидеть потребности близких и то, почему дома повторяются одни и те же ситуации.",
    questions: [
      "Почему в семье повторяются одни и те же конфликты?",
      "Как лучше понимать потребности ребёнка?",
      "Что создаёт напряжение между поколениями?",
    ],
  },
  {
    id: "education",
    number: "06",
    title: "Образование",
    short: "выбор и развитие",
    intro: "Когда вариантов много, а понять хочется главное: что действительно станет вашим инструментом роста.",
    questions: [
      "Какое направление действительно подходит мне?",
      "Когда лучше начинать обучение?",
      "Как я усваиваю новое эффективнее?",
    ],
  },
];

const methodSteps = [
  {
    index: "A",
    title: "Астрология",
    text: "Периоды, взаимосвязи и контекст ситуации — без обезличенного прогноза для знака зодиака.",
  },
  {
    index: "N",
    title: "Нумерология",
    text: "Повторяющиеся ритмы и индивидуальные числовые паттерны, связанные с вашим запросом.",
  },
  {
    index: "Ψ",
    title: "Цифровая психология",
    text: "Особенности реакций, решений и коммуникации, которые помогают перевести анализ в действие.",
  },
];

export default function Home() {
  const assetBase = import.meta.env.BASE_URL ?? "/";
  const [activeSphere, setActiveSphere] = useState(sphereData[0].id);
  const [selectedQuestion, setSelectedQuestion] = useState(sphereData[0].questions[0]);
  const [questionDraft, setQuestionDraft] = useState(sphereData[0].questions[0]);
  const [compatibilityReady, setCompatibilityReady] = useState(false);
  const [questionSent, setQuestionSent] = useState(false);

  const sphere = useMemo(
    () => sphereData.find((item) => item.id === activeSphere) ?? sphereData[0],
    [activeSphere],
  );

  function chooseSphere(id: string) {
    const next = sphereData.find((item) => item.id === id) ?? sphereData[0];
    setActiveSphere(next.id);
    setSelectedQuestion(next.questions[0]);
    setQuestionDraft(next.questions[0]);
    requestAnimationFrame(() => document.querySelector("#question-map")?.scrollIntoView({ behavior: "smooth" }));
  }

  function submitCompatibility(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCompatibilityReady(true);
  }

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuestionSent(true);
  }

  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <header className="topbar">
          <a className="brand" href="#top" aria-label="Валерия Фридлендер — главная">
            <span className="brand-mark">VF</span>
            <span className="brand-copy">
              <strong>Валерия Фридлендер</strong>
              <small>астролог · нумеролог · цифровой психолог</small>
            </span>
          </a>
          <nav className="nav" aria-label="Основная навигация">
            <a href="#question-map">Сферы</a>
            <a href="#method">Метод</a>
            <a href="#expert">О Валерии</a>
          </nav>
          <a className="nav-cta" href="#custom-question">Задать вопрос</a>
        </header>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span>01</span> персональный разбор ситуации</p>
            <h1 id="hero-title">
              Какой вопрос
              <em>не даёт вам покоя?</em>
            </h1>
            <p className="hero-lead">
              Один важный вопрос — индивидуальный разбор через астрологию,
              нумерологию и цифровую психологию. Без общих прогнозов и готовых формул.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#question-map">Выбрать сферу</a>
              <a className="button button-ghost" href="#custom-question">Задать свой вопрос <span>↗</span></a>
            </div>
            <div className="signal-row" aria-label="Особенности разбора">
              <span>1 конкретный вопрос</span>
              <span>3 системы анализа</span>
              <span>100% персонально</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Валерия Фридлендер">
            <div className="chart-field" aria-hidden="true">
              <div className="chart-ring ring-one" />
              <div className="chart-ring ring-two" />
              <div className="chart-ring ring-three" />
              <div className="chart-axis axis-one" />
              <div className="chart-axis axis-two" />
              <span className="chart-code code-one">Ⅷ · CONTEXT</span>
              <span className="chart-code code-two">DATA / BIRTH</span>
              <span className="chart-code code-three">PERSONAL / SIGNAL</span>
            </div>
            <img
              src={`${assetBase}images/valeria-hero.webp`}
              alt="Валерия Фридлендер"
            />
            <div className="expert-chip">
              <span className="status-dot" />
              <div>
                <small>Ваш вопрос разбирает лично</small>
                <strong>Валерия Фридлендер</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="sphere-strip" aria-label="Сферы вопросов">
          <p>Где сейчас<br />нужен ответ?</p>
          <div className="sphere-list">
            {sphereData.map((item) => (
              <button type="button" onClick={() => chooseSphere(item.id)} key={item.id}>
                <span>{item.number}</span>{item.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="question-map section-light" id="question-map" aria-labelledby="question-map-title">
        <div className="section-heading">
          <p className="section-code">02 / КАРТА ВОПРОСОВ</p>
          <h2 id="question-map-title">Начните не с услуги.<br /><em>Начните с того, что волнует.</em></h2>
          <p>Выберите сферу — и посмотрите, на какой вопрос вы действительно хотите получить ответ.</p>
        </div>

        <div className="question-console">
          <div className="sphere-tabs" role="tablist" aria-label="Выберите сферу жизни">
            {sphereData.map((item) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeSphere === item.id}
                className={activeSphere === item.id ? "active" : ""}
                onClick={() => {
                  setActiveSphere(item.id);
                  setSelectedQuestion(item.questions[0]);
                  setQuestionDraft(item.questions[0]);
                }}
                key={item.id}
              >
                <span>{item.number}</span>
                <span><strong>{item.title}</strong><small>{item.short}</small></span>
                <b>↗</b>
              </button>
            ))}
          </div>

          <div className="question-panel" role="tabpanel">
            <div className="panel-meta">
              <span>Сфера / {sphere.number}</span>
              <span>выбрано</span>
            </div>
            <h3>{sphere.title}</h3>
            <p className="sphere-intro">{sphere.intro}</p>
            <div className="question-options">
              {sphere.questions.map((question, index) => (
                <button
                  type="button"
                  className={selectedQuestion === question ? "selected" : ""}
                  onClick={() => {
                    setSelectedQuestion(question);
                    setQuestionDraft(question);
                  }}
                  key={question}
                >
                  <span>{index + 1}</span>
                  {question}
                  <b aria-hidden="true">{selectedQuestion === question ? "●" : "○"}</b>
                </button>
              ))}
            </div>
            <div className="selected-route">
              <div>
                <small>Ваш маршрут</small>
                <strong>{selectedQuestion}</strong>
              </div>
              <a href="#custom-question">Перейти к вопросу <span>→</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="method-section" id="method" aria-labelledby="method-title">
        <div className="method-copy">
          <p className="section-code">03 / МЕТОД</p>
          <h2 id="method-title">Не предсказание.<br /><em>Система координат.</em></h2>
          <p className="method-lead">
            В центре разбора — ваша реальная ситуация. Три подхода накладываются друг на друга,
            чтобы увидеть контекст, повторяющиеся сценарии и возможные направления решения.
          </p>
          <div className="method-list">
            {methodSteps.map((step) => (
              <article key={step.index}>
                <span>{step.index}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </article>
            ))}
          </div>
        </div>

        <div className="analysis-visual" aria-label="Условная схема трёх слоёв анализа">
          <div className="analysis-toolbar">
            <span>PERSONAL ANALYSIS / 03 LAYERS</span>
            <b>● LIVE</b>
          </div>
          <div className="orbit-system" aria-hidden="true">
            <div className="orbit orbit-outer"><span>A</span><i /><i /><i /></div>
            <div className="orbit orbit-middle"><span>N</span></div>
            <div className="orbit orbit-inner"><span>Ψ</span></div>
            <div className="crosshair horizontal" />
            <div className="crosshair vertical" />
            <strong>ВАШ<br />ВОПРОС</strong>
          </div>
          <div className="analysis-coordinates">
            <span>01 / КОНТЕКСТ</span><span>02 / ПАТТЕРН</span><span>03 / ДЕЙСТВИЕ</span>
          </div>
          <p className="visual-disclaimer">
            Схема показывает логику анализа и не является рассчитанной натальной картой.
          </p>
        </div>
      </section>

      <section className="compatibility" id="compatibility" aria-labelledby="compatibility-title">
        <div className="compatibility-intro">
          <p className="section-code">04 / БЫСТРЫЙ МАРШРУТ</p>
          <h2 id="compatibility-title">Что происходит<br /><em>между вами?</em></h2>
          <p>
            Укажите исходные данные двух людей. Здесь не будет автоматического «процента любви»:
            форма подготовит основу для содержательного сравнения.
          </p>
          <div className="compatibility-tags">
            <span>эмоциональный ритм</span><span>коммуникация</span><span>совместные решения</span>
          </div>
        </div>

        <form className="compatibility-form" onSubmit={submitCompatibility}>
          <div className="form-topline"><span>COMPARE / TWO PEOPLE</span><span>01—02</span></div>
          <label>
            <span>Контекст отношений</span>
            <select name="context" defaultValue="romantic">
              <option value="romantic">Романтические отношения</option>
              <option value="family">Семья</option>
              <option value="business">Деловое партнёрство</option>
            </select>
          </label>
          <div className="people-grid">
            <fieldset>
              <legend><span>01</span> Первый человек</legend>
              <label><span>Имя</span><input name="personOneName" placeholder="Например, Анна" required /></label>
              <label><span>Дата рождения</span><input type="date" name="personOneDate" required /></label>
            </fieldset>
            <div className="compare-sign" aria-hidden="true">×</div>
            <fieldset>
              <legend><span>02</span> Второй человек</legend>
              <label><span>Имя</span><input name="personTwoName" placeholder="Например, Алексей" required /></label>
              <label><span>Дата рождения</span><input type="date" name="personTwoDate" required /></label>
            </fieldset>
          </div>
          {compatibilityReady ? (
            <div className="form-success" role="status">
              <span>✓</span><div><strong>Основа сравнения готова</strong><small>Следующий шаг — сформулировать ваш главный вопрос об этих отношениях.</small></div>
              <a href="#custom-question">Продолжить →</a>
            </div>
          ) : (
            <button className="submit-dark" type="submit">Подготовить сравнение <span>→</span></button>
          )}
          <p className="form-note">Это демонстрация логики сервиса. Автоматические выводы по введённым данным не формируются.</p>
        </form>
      </section>

      <section className="expert-section" id="expert" aria-labelledby="expert-title">
        <div className="expert-photo">
          <img
            src={`${assetBase}images/valeria-expert.webp`}
            alt="Валерия Фридлендер в рабочем кабинете"
          />
          <span>Личный разбор,<br />не потоковая расшифровка</span>
        </div>
        <div className="expert-story">
          <p className="section-code">05 / ЭКСПЕРТ</p>
          <h2 id="expert-title">За схемой всегда<br /><em>остаётся человек.</em></h2>
          <p className="expert-quote">
            «Мне важно не выдать красивый прогноз, а помочь увидеть ситуацию объёмнее —
            так, чтобы после разбора у вас появилась ясность, с которой можно действовать».
          </p>
          <div className="expert-principles">
            <div><span>01</span><p><strong>Лично</strong>Я изучаю исходные данные и контекст вашего вопроса.</p></div>
            <div><span>02</span><p><strong>Предметно</strong>Разбор строится вокруг ситуации, а не набора общих характеристик.</p></div>
            <div><span>03</span><p><strong>Понятно</strong>Перевожу сложные взаимосвязи в человеческий язык и выводы.</p></div>
          </div>
          <a className="text-link" href="#custom-question">Обсудить свой вопрос <span>↗</span></a>
        </div>
      </section>

      <section className="result-section" aria-labelledby="result-title">
        <div className="section-heading compact">
          <p className="section-code">06 / РЕЗУЛЬТАТ</p>
          <h2 id="result-title">Не ещё больше информации.<br /><em>Больше ясности.</em></h2>
        </div>
        <div className="result-grid">
          <article><span>01</span><h3>Картина ситуации</h3><p>Что влияет на ваш вопрос прямо сейчас и какие связи обычно остаются незаметными.</p></article>
          <article><span>02</span><h3>Личный сценарий</h3><p>Какие индивидуальные особенности и повторяющиеся реакции участвуют в ситуации.</p></article>
          <article><span>03</span><h3>Точки выбора</h3><p>Где находится пространство для решения — без директив и обещаний единственно верного пути.</p></article>
          <article className="result-highlight"><span>04</span><h3>Ваш следующий шаг</h3><p>Конкретный ориентир, с которым можно продолжить разговор, принять решение или изменить действие.</p></article>
        </div>
      </section>

      <section className="journal" aria-labelledby="journal-title">
        <div className="journal-head">
          <div><p className="section-code">07 / БИБЛИОТЕКА СИТУАЦИЙ</p><h2 id="journal-title">Разобраться<br /><em>чуть глубже.</em></h2></div>
          <p>Материалы о конкретных жизненных вопросах — основа для будущего тематического и SEO-развития сайта.</p>
        </div>
        <div className="journal-grid">
          <a href="#custom-question"><span>ОТНОШЕНИЯ · 7 МИН</span><h3>Совместимость — это не только «подходим ли мы друг другу»</h3><b>Читать материал ↗</b></a>
          <a href="#custom-question"><span>БИЗНЕС · 9 МИН</span><h3>Что полезно проверить до начала партнёрства</h3><b>Читать материал ↗</b></a>
          <a href="#custom-question"><span>ВЫБОР · 6 МИН</span><h3>Как сформулировать вопрос, чтобы получить предметный ответ</h3><b>Читать материал ↗</b></a>
        </div>
      </section>

      <section className="custom-question" id="custom-question" aria-labelledby="custom-question-title">
        <div className="custom-intro">
          <p className="section-code">08 / ВАШ ВОПРОС</p>
          <h2 id="custom-question-title">Если вопрос уже<br /><em>звучит внутри.</em></h2>
          <p>Опишите его своими словами. Сначала Валерия посмотрит, подходит ли запрос для такого формата, и только затем предложит дальнейшие шаги.</p>
          <div className="privacy-note"><span>⌁</span><p><strong>Конфиденциально</strong>Данные нужны только для понимания вашего запроса.</p></div>
        </div>
        {questionSent ? (
          <div className="question-success" role="status">
            <span>✓</span>
            <p className="section-code">ВОПРОС ПРИНЯТ</p>
            <h3>Спасибо.<br />Маршрут начался.</h3>
            <p>В рабочей версии здесь появится отправка заявки и информация о следующем шаге.</p>
            <button type="button" onClick={() => setQuestionSent(false)}>Задать другой вопрос</button>
          </div>
        ) : (
          <form className="question-form" onSubmit={submitQuestion}>
            <div className="question-form-grid">
              <label><span>Как к вам обращаться?</span><input name="name" placeholder="Ваше имя" required /></label>
              <label><span>Сфера вопроса</span><select name="sphere" value={activeSphere} onChange={(event) => setActiveSphere(event.target.value)}>{sphereData.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select></label>
              <label className="wide"><span>Что вы хотите понять?</span><textarea name="question" value={questionDraft} onChange={(event) => setQuestionDraft(event.target.value)} rows={4} required /></label>
              <label><span>Дата рождения</span><input type="date" name="birthDate" required /></label>
              <label><span>Город рождения</span><input name="birthPlace" placeholder="Город, страна" required /></label>
              <label className="wide"><span>Как с вами связаться?</span><input name="contact" placeholder="Telegram, WhatsApp или e-mail" required /></label>
            </div>
            <label className="consent"><input type="checkbox" required /><span>Я согласен(на) на обработку данных для ответа на мой запрос</span></label>
            <button className="submit-light" type="submit">Передать вопрос Валерии <span>↗</span></button>
            <p className="prototype-note">В прототипе форма показывает сценарий и не отправляет данные.</p>
          </form>
        )}
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">VF</span><span className="brand-copy"><strong>Валерия Фридлендер</strong><small>персональная система координат</small></span></a>
        <div className="footer-links"><a href="#question-map">Сферы</a><a href="#method">Метод</a><a href="#expert">О Валерии</a></div>
        <p>© 2026 · Первый дизайн-прототип</p>
      </footer>
    </main>
  );
}
