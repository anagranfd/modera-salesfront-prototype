# Gamma Presentation Prompt

Используй этот промпт для создания презентации через Gamma (gamma.app).

---

## Prompt

Create a professional presentation in **Russian** for a product design demo call. The topic is a HiFi prototype for a Vehicle Publishing Tool feature in Modera Salesfront, an automotive dealership CRM system.

**Tone:** Confident, concise, professional. Technical but accessible. No marketing fluff.

**Style:** Clean, modern dark theme. Minimal text per slide. Use icons and visual structure where possible.

**Slides:**

---

**Slide 1 — Title**
Title: Modera Salesfront — Vehicle Publishing Tool
Subtitle: HiFi Prototype · Тестовое задание

---

**Slide 2 — Задача**
Headline: Что нужно было сделать

Спроектировать интерфейс публикации автомобилей в несколько порталов (Auto24, Mobile.de, SS.lv, Autoplius, City24) в рамках CRM-системы для автодилеров.

Three cards:
- EP1 — Карточка автомобиля (одиночная публикация)
- EP2 — Vehicle Builder (публикация из редактора)
- EP3 — Инвентарь (пакетная публикация)

---

**Slide 3 — Подход**
Headline: Как я подошёл к работе

Bullets:
- Изучил контекст: CRM для дилерских центров, рабочие процессы сотрудников
- Выделил три ключевых сценария и прописал состояния для каждого
- Визуальный стиль намеренно под legacy Modera (jQuery UI эпохи) — чтобы вписаться
- Результат: интерактивный HiFi-прототип, все состояния по URL-хэшу

---

**Slide 4 — EP1: Карточка автомобиля**
Headline: Одиночная публикация — Vehicle Card

Flow A1 → A5: Выбор каналов → Валидация → Прогресс → Результат

Key decisions (две колонки):
- «Publish anyway» — пропустить неготовый канал, не терять прогресс
- Flow ошибок B1–B4 — конкретные поля, прямая ссылка на Builder
- Unpublish с подтверждением — необратимое действие

---

**Slide 5 — EP2: Vehicle Builder**
Headline: Публикация прямо из редактора

Один экран — форма + панель публикации. Связаны в реальном времени.

Key points:
- Заполнил поле → панель сразу обновляет процент готовности канала
- Проблемное поле на другой вкладке → панель показывает кнопку перехода
- Нет разрыва между «заполнением» и «публикацией» — единый процесс

---

**Slide 6 — EP3: Инвентарь и батч**
Headline: Пакетная публикация из таблицы

Advanced Filter sidebar: фильтрация по марке + сводка по статусам публикации всегда на виду.

Batch flow — 3 шага:
1. Выбрать автомобили (batch-бар снизу)
2. Выбрать каналы для группы
3. Матрица валидации: авто × канал, inline-исправление или пропуск

Прогресс и результат тоже в матричном виде.

---

**Slide 7 — UX-решения**
Headline: 4 улучшения сверх базового задания

Four cards with icons:
- 🔔 U1 — Статус в шапке — индикатор публикации виден на любой странице
- 📊 U2 — Проактивная готовность — полосы заполненности до нажатия «Publish»
- ⚠️ U3 — Предупреждение батча — «23 выбрано на 3 страницах»
- 🔗 U4 — Ссылки на живые объявления — hover-reveal кнопка «View →»

---

**Slide 8 — Технически**
Headline: Как устроен прототип

Bullets:
- Чистый HTML/CSS/JS, без фреймворков
- Design tokens — общие цвета и стили для всех трёх EP
- State machine с URL-хэш навигацией — можно скинуть ссылку на любое состояние
- ~29 состояний и переходов, запускается через python3 server.py

---

**Slide 9 — Итог**
Headline: Что сделано

Three metrics:
- 3 сценария — EP1, EP2, EP3
- ~29 состояний — все с переходами
- 4 UX-улучшения — сверх базового задания

Footer text: Готов показать любой экран подробнее и объяснить решения.

---

**End of prompt**

---

## Инструкция по использованию

1. Открой [Gamma](https://gamma.app)
2. Выбери «Create new» → «Presentation»
3. Вставь промпт выше в поле генерации
4. При необходимости в настройках выбери тёмную тему
5. После генерации отредактируй скриншоты/иллюстрации вручную — добавь нужные экраны из прототипа
