# Modera Salesfront — Vehicle Publishing Tool
## Тексты слайдов для демо-звонка

Цвета проекта: navy `#1e3a52`, blue `#4a9ec4`, green `#2d8a4e`, amber `#b07820`, red `#b03030`, gray `#8a9aaa`.
Фон: белый. Ориентация: 16:9.

---

## Слайд 1 — Заголовок

**Modera Salesfront**
Vehicle Publishing Tool

*HiFi-прототип*

---

## Слайд 2 — Задача

**Что нужно было сделать**

Спроектировать интерфейс публикации автомобилей в несколько порталов одновременно — Auto24, Mobile.de, SS.lv, Autoplius, City24 — в рамках CRM-системы для автодилеров.

Три точки входа:
- **EP1** — Карточка автомобиля (одиночная публикация)
- **EP2** — Vehicle Builder (публикация из редактора)
- **EP3** — Инвентарь (пакетная публикация)

`[СКРИНШОТ: ep3-inventory-pipeline.html — общий вид таблицы с боковой панелью]`

---

## Слайд 3 — Подход

**Как я подошёл к работе**

- Разобрался в контексте: CRM для дилерских центров, задачи сотрудников
- Выделил три сценария и прописал состояния для каждого
- Визуальный стиль намеренно под legacy Modera — чтобы вписаться в существующий продукт
- Результат: интерактивный прототип, все состояния переключаются по URL-хэшу

`[СКРИНШОТ: ep1-vehicle-card.html#a1 — Idle state, карточка с Publishing tab]`

---

## Слайд 4 — EP1: Карточка автомобиля

**Одиночная публикация — Vehicle Card**

Сотрудник открывает карточку, видит статус каналов и процент заполненности. Выбирает каналы, проходит валидацию, публикует.

Ключевые решения:
- **«Publish anyway»** — пропустить неготовый канал, не терять прогресс по остальным
- **Error flow** — конкретные поля, прямая ссылка на нужную вкладку Builder
- **Unpublish с подтверждением** — необратимое действие требует отдельного шага

`[СКРИНШОТ: ep1-vehicle-card.html#a3 — Validation warnings, Autoplius требует поля]`
`[СКРИНШОТ: ep1-vehicle-card.html#b2 — Error detail с раскрытой строкой Mobile.de]`

---

## Слайд 5 — EP2: Vehicle Builder

**Публикация прямо из редактора**

Форма редактирования и панель публикации — на одном экране. Связаны в реальном времени.

- Заполнил поле → панель сразу обновляет процент готовности канала
- Проблемное поле на другой вкладке → панель показывает кнопку перехода
- Нет разрыва между «заполнением данных» и «публикацией» — единый рабочий процесс

`[СКРИНШОТ: ep2-vehicle-builder.html#a2 — Builder с подсвеченными полями и панелью справа]`
`[СКРИНШОТ: ep2-vehicle-builder.html#a3 — Real-time update: одно поле заполнено, прогресс обновился]`

---

## Слайд 6 — EP3: Инвентарь и батч

**Пакетная публикация из таблицы**

**Advanced Filter sidebar** — постоянно видимая панель: фильтрация по марке, сводка по статусам публикации.

Batch flow в три шага:
1. Выбрать автомобили → появляется batch-бар снизу
2. Выбрать каналы для группы
3. Матрица валидации (авто × канал) → inline-исправление или пропуск → прогресс

`[СКРИНШОТ: ep3-inventory-pipeline.html#b1 — 4 строки выбраны, batch-бар внизу]`
`[СКРИНШОТ: ep3-inventory-pipeline.html#b3 — Матрица валидации, шаг 2 из 3]`

---

## Слайд 7 — UX-решения

**Решения, которые улучшают рабочий процесс**

- **Статус-пилюля в шапке** — Publishing-индикатор виден на любой странице, не нужно переключаться во вкладку
- **Проактивная готовность каналов** — полосы заполненности показаны до нажатия «Publish»
- **Предупреждение при большом батче** — «⚠ 23 выбрано на 3 страницах»
- **Ссылки на живые объявления** — hover-reveal кнопка «View →» после публикации

`[СКРИНШОТ: ep1-vehicle-card.html#a1 — Idle state с completeness bars]`
`[СКРИНШОТ: ep1-vehicle-card.html#c1 — All published, hover view-links]`

---

## Слайд 8 — Технически

**Как устроен прототип**

- Чистый HTML/CSS/JS, без фреймворков и сборщиков
- Design tokens — общие цвета, радиусы, тени для всех трёх сценариев
- State machine с URL-хэш навигацией — можно скинуть ссылку на любое конкретное состояние
- Анимации через CSS: slide-up для batch-бара, debounce на real-time обновление

`[СКРИНШОТ: любой экран — показывает общее качество визуала]`

---

## Слайд 9 — Итог

**Что сделано**

- **3 сценария** — EP1, EP2, EP3
- **~29 состояний** — все с переходами
- **Интерактивный прототип** — запускается через `python3 server.py`

Готов показать любой экран подробнее и объяснить решения.

---
---

# Vehicle Publishing Tool — English version

---

## Slide 1 — Title

**Modera Salesfront**
Vehicle Publishing Tool

*HiFi Prototype*

---

## Slide 2 — The task

**What needed to be designed**

An interface for publishing vehicle listings to multiple portals simultaneously — Auto24, Mobile.de, SS.lv, Autoplius, City24 — within a dealership CRM system.

Three entry points:
- **EP1** — Vehicle Card (single vehicle publishing)
- **EP2** — Vehicle Builder (publish from the editor)
- **EP3** — Inventory (batch publishing)

`[SCREENSHOT: ep3-inventory-pipeline.html — full table view with sidebar]`

---

## Slide 3 — Approach

**How I approached the work**

- Understood the context: dealership CRM, staff workflows
- Defined three core scenarios with full state coverage
- Visual style intentionally matches legacy Modera — fits the existing product
- Result: an interactive prototype, every state addressable via URL hash

`[SCREENSHOT: ep1-vehicle-card.html#a1 — Idle state, Vehicle Card with Publishing tab]`

---

## Slide 4 — EP1: Vehicle Card

**Single vehicle publishing — Vehicle Card**

Staff open the card, see channel statuses and completeness. Select channels, go through validation, publish.

Key decisions:
- **«Publish anyway»** — skip an incomplete channel without losing progress on the rest
- **Error flow** — specific missing fields, direct link to the right Builder tab
- **Unpublish confirmation** — a destructive action gets a dedicated confirmation step

`[SCREENSHOT: ep1-vehicle-card.html#a3 — Validation warnings, Autoplius requires fields]`
`[SCREENSHOT: ep1-vehicle-card.html#b2 — Error detail, Mobile.de row expanded]`

---

## Slide 5 — EP2: Vehicle Builder

**Publishing from the editor**

The edit form and publishing panel are on one screen. They're connected in real time.

- Fill in a field → the panel immediately updates channel readiness
- Missing field is on a different tab → the panel shows a direct tab link
- No context switch between "filling in data" and "publishing" — one workflow

`[SCREENSHOT: ep2-vehicle-builder.html#a2 — Builder with highlighted fields and panel on the right]`
`[SCREENSHOT: ep2-vehicle-builder.html#a3 — Real-time update: one field filled, progress updated]`

---

## Slide 6 — EP3: Inventory & Batch

**Batch publishing from the inventory table**

**Advanced Filter sidebar** — always-visible panel: filter by make, channel status summary.

Batch flow in three steps:
1. Select vehicles → batch action bar slides up from bottom
2. Choose channels for the group
3. Validation matrix (vehicle × channel) → inline fix or skip → publish

`[SCREENSHOT: ep3-inventory-pipeline.html#b1 — 4 rows selected, batch bar visible]`
`[SCREENSHOT: ep3-inventory-pipeline.html#b3 — Validation matrix, step 2 of 3]`

---

## Slide 7 — UX decisions

**Decisions that improve the workflow**

- **Publishing status in the top nav** — always visible, no need to switch tabs
- **Proactive channel readiness** — completeness bars shown before clicking Publish
- **Large batch warning** — «⚠ 23 selected across 3 pages»
- **Live listing deep links** — hover-reveal «View →» button after publishing

`[SCREENSHOT: ep1-vehicle-card.html#a1 — Idle state with completeness bars]`
`[SCREENSHOT: ep1-vehicle-card.html#c1 — All published, hover view-links visible]`

---

## Slide 8 — Technical

**How the prototype is built**

- Plain HTML/CSS/JS — no frameworks, no build tools
- Design tokens — shared colors, radii, shadows across all three scenarios
- State machine with URL hash navigation — any state is directly linkable
- CSS animations: slide-up for batch bar, debounce on real-time updates

`[SCREENSHOT: any screen — shows overall visual quality]`

---

## Slide 9 — Summary

**What was delivered**

- **3 scenarios** — EP1, EP2, EP3
- **~29 states** — all with transitions
- **Interactive prototype** — runs via `python3 server.py`

Happy to walk through any screen in detail and explain the decisions.
