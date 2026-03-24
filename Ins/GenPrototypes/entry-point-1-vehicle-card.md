# Publishing Tool — Entry Point 1: Vehicle Card
## Screen Flow & Wireframes

---

## Общий контекст

Vehicle Card — это модальное окно, которое открывается поверх списка инвентаря.
В нём менеджер видит машину целиком: характеристики, аксессуары, цену, и — Publishing Panel.
Publishing Panel встроена как один из блоков карточки, всегда видна без дополнительных кликов.

---

## Структура Vehicle Card (общий layout)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Volkswagen Golf 1.6 TDI Comfortline              [×] Close         │
│  Body: Hatchback   Engine: 1.6 TDI 115hp   VIN: WVW123456789       │
│  Grade: Comfortline                                                  │
├──────────────────────────────────────────────────────────────────────┤
│  [ Extras ]  [ Trade-In ]  [ Notes ]  [ Details ]  [ Publishing ]   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ┌───────────────┐  │
│  ░░  PUBLISHING PANEL (контент таба)  ░░░░░░░░  │  [Car image]  │  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │               │  │
│                                                  │ Vivid Blue /M │  │
│                                                  └───────────────┘  │
├──────────────────────────────────────────────────────────────────────┤
│  Base price: 14 990 €  ──strikethrough──  16 500 €                  │
│  [ Preview ]  [ Vehicle order ▼ ]  [ Select client ]                │
└─────────────────────────────────────────────────────────────────────┘
```

> Publishing Panel живёт в табе "Publishing" справа от Extras/Trade-In/Notes/Details.
> Правая колонка с фото машины присутствует всегда, Publishing Panel занимает левую часть.

---

---

# СОСТОЯНИЕ А — Все каналы не опубликованы

## А-1. Publishing Panel: Idle (unpublished)

Пользователь открыл таб Publishing. Машина ещё нигде не опубликована.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [ Extras ]  [ Trade-In ]  [ Notes ]  [ Details ]  [●Publishing]   │
├───────────────────────────────────────┬─────────────────────────────┤
│                                       │                             │
│  Publishing channels                  │    [Car image]              │
│  ─────────────────────────────────    │                             │
│                                       │    Vivid Blue / M           │
│  ○  Auto24          ○ Not published   │                             │
│  ○  Mobile.de       ○ Not published   │                             │
│  ○  SS.lv           ○ Not published   │    [Interior image]         │
│  ○  Autoplius       ○ Not published   │                             │
│  ○  City24          ○ Not published   │    Plum · Nappa leather      │
│                                       │                             │
│  ────────────────────────────         │                             │
│  [ + Publish to channels ]            │                             │
│                                       │                             │
└───────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- Каждая строка: иконка канала + название + статус-бейдж
- Статус "Not published" — серый, неактивный вид
- Кнопка `[ + Publish to channels ]` — primary action, открывает выбор каналов (→ А-2)
- Чекбоксов пока нет — они появятся только при входе в режим выбора

---

## А-2. Выбор каналов

Пользователь нажал `[ + Publish to channels ]`. Панель переходит в режим выбора.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [ Extras ]  [ Trade-In ]  [ Notes ]  [ Details ]  [●Publishing]   │
├───────────────────────────────────────┬─────────────────────────────┤
│                                       │                             │
│  Select channels to publish           │    [Car image]              │
│  [Select all]  [Deselect all]         │                             │
│  ─────────────────────────────────    │    Vivid Blue / M           │
│                                       │                             │
│  [✓] Auto24          ○ Not published  │                             │
│  [✓] Mobile.de       ○ Not published  │    [Interior image]         │
│  [✓] SS.lv           ○ Not published  │                             │
│  [✓] Autoplius       ○ Not published  │    Plum · Nappa leather      │
│  [ ] City24          ○ Not published  │                             │
│                                       │                             │
│  ─────────────────────────────────    │                             │
│  [ Cancel ]     [ Publish 4 channels →]│                            │
│                                       │                             │
└───────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- Все каналы выбраны по умолчанию, пользователь может снять ненужные
- Кнопка `Publish N channels` динамически обновляет N при изменении выбора
- `[ Cancel ]` — возврат в А-1 без изменений
- При нажатии `Publish` — система сначала запускает validation check (→ А-3)

---

## А-3. Validation Check

Перед публикацией система проверяет заполненность профиля машины для каждого канала.
Некоторые каналы строгие (требуют 100%), другие — мягкие (принимают неполные данные).

```
┌──────────────────────────────────────────────────────────────────────┐
│  [ Extras ]  [ Trade-In ]  [ Notes ]  [ Details ]  [●Publishing]    │
├────────────────────────────────────────┬─────────────────────────────┤
│                                        │                             │
│  ⚠  Validation warnings               │    [Car image]              │
│  Before publishing, review the issues  │                             │
│  ──────────────────────────────────    │    Vivid Blue / M           │
│                                        │                             │
│  [✓] Auto24        ████████████ 96%   │                             │
│                    ✓ Ready to publish  │    [Interior image]         │
│                                        │                             │
│  [✓] Mobile.de     ████████████ 100%  │    Plum · Nappa leather     │
│                    ✓ Ready to publish  │                             │
│                                        │                             │
│  [✓] SS.lv         ████████░░░░ 74%   │                             │
│                    ✓ Accepts partial   │                             │
│                                        │                             │
│  [✓] Autoplius     ██████████░░ 88%   │                             │
│                    ⚠ Requires 100%     │                             │
│                    Missing: interior   │                             │
│                    color, doors count  │                             │
│                    [ Go to Builder → ] │                             │
│                                        │                             │
│  ──────────────────────────────────    │                             │
│  [ Back ]   [ Publish anyway (3 of 4)]│                             │
│                                        │                             │
└────────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- Полоска прогресса заполненности профиля: зелёная ≥ 90%, оранжевая < 90%, красная < 60%
- `✓ Ready to publish` — зелёный текст
- `⚠ Requires 100%` — оранжевый, с раскрытым списком незаполненных полей
- `[ Go to Builder → ]` — переход в Vehicle Builder к конкретным полям (не закрывает карточку, открывает Builder рядом или переводит на него)
- `[ Publish anyway (3 of 4) ]` — публикация только тех каналов, у которых нет блокирующих ошибок
- `[ Back ]` — возврат к выбору каналов (→ А-2)

---

## А-4. Publishing in Progress

Пользователь нажал Publish. Каналы обрабатываются последовательно.

```
┌──────────────────────────────────────────────────────────────────────┐
│  [ Extras ]  [ Trade-In ]  [ Notes ]  [ Details ]  [●Publishing]    │
├────────────────────────────────────────┬─────────────────────────────┤
│                                        │                             │
│  Publishing...                         │    [Car image]              │
│  ──────────────────────────────────    │                             │
│                                        │    Vivid Blue / M           │
│  ✓  Auto24          ● Published        │                             │
│  ✓  Mobile.de       ● Published        │                             │
│  ⟳  SS.lv           ◐ Sending...       │    [Interior image]         │
│  ·  Autoplius       · Waiting          │                             │
│                                        │    Plum · Nappa leather     │
│                                        │                             │
│  ──────────────────────────────────    │                             │
│  Processing 3 of 4...                  │                             │
│  [████████░░░░░░░░░░░░░░] 50%          │                             │
│                                        │                             │
│  (кнопки недоступны во время обработки)│                             │
│                                        │                             │
└────────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- Каналы обновляются по одному по мере завершения — не нужно ждать всех
- Иконки состояния: `✓` опубликовано, `⟳` в процессе, `·` ожидает, `✕` ошибка
- Общий прогресс-бар внизу
- UI заблокирован во время обработки — нельзя закрыть карточку (или предупреждение при попытке)

---

## А-5. Result: Success

Все выбранные каналы опубликованы успешно.

```
┌──────────────────────────────────────────────────────────────────────┐
│  [ Extras ]  [ Trade-In ]  [ Notes ]  [ Details ]  [●Publishing]    │
├────────────────────────────────────────┬─────────────────────────────┤
│                                        │                             │
│  ✓ Published successfully              │    [Car image]              │
│  ──────────────────────────────────    │                             │
│                                        │    Vivid Blue / M           │
│  ✓  Auto24       ● Published  2s ago   │                             │
│  ✓  Mobile.de    ● Published  3s ago   │                             │
│  ✓  SS.lv        ● Published  5s ago   │    [Interior image]         │
│                                        │                             │
│  ──────────────────────────────────    │    Plum · Nappa leather     │
│  3 channels · Published just now       │                             │
│                                        │                             │
│  [ Unpublish from channels ]           │                             │
│                                        │                             │
└────────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- Зелёный бейдж и заголовок-подтверждение вверху панели
- Каждый канал показывает время публикации
- Появляется кнопка `[ Unpublish from channels ]` — переход к flow В (→ В-1)

---

---

# СОСТОЯНИЕ Б — Часть опубликована, часть с ошибкой

## Б-1. Publishing Panel: Mixed state

Пользователь открывает карточку машины, у которой уже была попытка публикации
с неоднозначным результатом.

```
┌──────────────────────────────────────────────────────────────────────┐
│  [ Extras ]  [ Trade-In ]  [ Notes ]  [ Details ]  [●Publishing]    │
├────────────────────────────────────────┬─────────────────────────────┤
│                                        │                             │
│  Publishing channels                   │    [Car image]              │
│  ──────────────────────────────────    │                             │
│                                        │    Vivid Blue / M           │
│  ✓  Auto24       ● Published           │                             │
│  ✕  Mobile.de    ✕ Error        [›]    │                             │
│  ✓  SS.lv        ● Published           │    [Interior image]         │
│  ○  Autoplius    ○ Not published        │                             │
│  ✕  City24       ✕ Error        [›]    │    Plum · Nappa leather     │
│                                        │                             │
│  ──────────────────────────────────    │                             │
│  2 errors · 2 published · 1 pending    │                             │
│                                        │                             │
│  [ Fix errors ]  [ Publish remaining ] │                             │
│                                        │                             │
└────────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- Строки с ошибкой выделены красным бейджем и иконкой `✕`
- `[›]` — кнопка раскрытия деталей ошибки (→ Б-2), inline, без перехода
- `[ Fix errors ]` — главный CTA, открывает детали всех ошибок (→ Б-2)
- `[ Publish remaining ]` — опубликовать те каналы, которые ещё не опубликованы и без ошибок

---

## Б-2. Error Detail (inline expand)

Пользователь нажал `[›]` рядом с каналом с ошибкой.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Publishing channels                   │                             │
│  ──────────────────────────────────    │    [Car image]              │
│                                        │                             │
│  ✓  Auto24       ● Published           │                             │
│                                        │                             │
│  ✕  Mobile.de    ✕ Error        [∧]    │                             │
│  ┌─────────────────────────────────┐   │                             │
│  │ ✕ Publishing failed             │   │    [Interior image]         │
│  │ Missing required field:         │   │                             │
│  │ · Mileage (km)                  │   │    Plum · Nappa leather     │
│  │ · Fuel type                     │   │                             │
│  │ [ Go to Vehicle Builder → ]     │   │                             │
│  │ [ Retry this channel ]          │   │                             │
│  └─────────────────────────────────┘   │                             │
│                                        │                             │
│  ✓  SS.lv        ● Published           │                             │
│  ○  Autoplius    ○ Not published        │                             │
│  ✕  City24       ✕ Error        [›]    │                             │
│  ──────────────────────────────────    │                             │
│  [ Fix errors ]  [ Publish remaining ] │                             │
└────────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- Ошибка раскрывается inline под строкой канала, не открывает новый экран
- Показывает конкретные незаполненные поля
- `[ Go to Vehicle Builder → ]` — переход к Builder с подсветкой нужных полей
- `[ Retry this channel ]` — повторная попытка публикации только этого канала
- `[∧]` — кнопка схлопывания детали обратно

---

## Б-3. Переход в Vehicle Builder

Пользователь нажал `[ Go to Vehicle Builder → ]`.
Vehicle Builder открывается (или Vehicle Card заменяется Builder'ом).
Нужные поля автоматически подсвечены.

```
┌──────────────────────────────────────────────────────────────────────┐
│  VW Golf 1.6 TDI Comfortline — Edit                    [×] Close    │
│                                                                      │
│  ← Back to Publishing                                                │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄     │
│  ⚠  Complete these fields to publish on Mobile.de                   │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄     │
│                                                                      │
│  Make           [Volkswagen              ]                           │
│  Model          [Golf                   ]                           │
│                                                                      │
│  ┌──────────────────────────────────────────┐                       │
│  │  ⚠  Mileage (km)    [___________] km    │  ← подсвечено красным  │
│  └──────────────────────────────────────────┘                       │
│                                                                      │
│  ┌──────────────────────────────────────────┐                       │
│  │  ⚠  Fuel type       [ Select ▼        ]  │  ← подсвечено красным  │
│  └──────────────────────────────────────────┘                       │
│                                                                      │
│  Color          [Silver                 ]                           │
│  Year           [2019                   ]                           │
│                                                                      │
│  ──────────────────────────────────────────                         │
│  [ Save & Return to Publishing ]                                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Аннотации:**
- Баннер вверху напоминает контекст: "зачем пользователь здесь"
- `← Back to Publishing` — возврат в Vehicle Card без сохранения
- Только поля с ошибкой подсвечены — остальная форма не отвлекает
- `[ Save & Return to Publishing ]` — сохранение и автоматический возврат в Vehicle Card → таб Publishing

---

## Б-4. Retry после исправления

Пользователь вернулся из Builder. Панель обновилась, поля заполнены.
Ошибочные каналы теперь готовы к retry.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Publishing channels                                                  │
│  ──────────────────────────────────                                  │
│                                                                      │
│  ✓  Auto24       ● Published                                         │
│  ○  Mobile.de    ○ Ready to retry      [ Retry ]                    │
│  ✓  SS.lv        ● Published                                         │
│  ○  Autoplius    ○ Not published                                     │
│  ○  City24       ○ Ready to retry      [ Retry ]                    │
│                                                                      │
│  ──────────────────────────────────                                  │
│  Fields updated · Ready to republish                                 │
│                                                                      │
│  [ Retry all failed channels ]                                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Аннотации:**
- Статус ошибочных каналов изменился с `✕ Error` на `○ Ready to retry`
- `[ Retry ]` — inline кнопка для каждого канала отдельно
- `[ Retry all failed channels ]` — массовый retry
- После retry — переход в А-4 (progress), затем А-5 (success) или снова Б-1

---

---

# СОСТОЯНИЕ В — Всё опубликовано

## В-1. Publishing Panel: All Published

Машина опубликована на всех каналах. Менеджер открывает карточку.

```
┌──────────────────────────────────────────────────────────────────────┐
│  [ Extras ]  [ Trade-In ]  [ Notes ]  [ Details ]  [●Publishing]    │
├────────────────────────────────────────┬─────────────────────────────┤
│                                        │                             │
│  ✓ Published on all channels           │    [Car image]              │
│  ──────────────────────────────────    │                             │
│                                        │    Vivid Blue / M           │
│  ✓  Auto24       ● Published  2h ago   │                             │
│  ✓  Mobile.de    ● Published  2h ago   │                             │
│  ✓  SS.lv        ● Published  2h ago   │    [Interior image]         │
│  ✓  Autoplius    ● Published  2h ago   │                             │
│  ✓  City24       ● Published  2h ago   │    Plum · Nappa leather     │
│                                        │                             │
│  ──────────────────────────────────    │                             │
│  5 channels · Last updated 2h ago      │                             │
│                                        │                             │
│  [ Unpublish from channels ]           │                             │
│                                        │                             │
└────────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- Зелёный заголовок-статус вверху панели
- Время публикации каждого канала — помогает понять актуальность
- `[ Unpublish from channels ]` — единственный CTA, открывает выбор каналов для снятия (→ В-2)
- Можно также добавить на отдельный канал `[ Unpublish ]` hover-кнопку

---

## В-2. Выбор каналов для снятия с публикации

```
┌──────────────────────────────────────────────────────────────────────┐
│  Select channels to unpublish          │                             │
│  [Select all]  [Deselect all]          │    [Car image]              │
│  ──────────────────────────────────    │                             │
│                                        │    Vivid Blue / M           │
│  [ ] Auto24       ● Published          │                             │
│  [ ] Mobile.de    ● Published          │                             │
│  [ ] SS.lv        ● Published          │    [Interior image]         │
│  [✓] Autoplius    ● Published          │                             │
│  [✓] City24       ● Published          │    Plum · Nappa leather     │
│                                        │                             │
│  ──────────────────────────────────    │                             │
│  [ Cancel ]    [ Unpublish 2 channels ]│                             │
│                                        │                             │
└────────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- По умолчанию ничего не выбрано — деструктивное действие требует явного выбора
- `[ Unpublish N channels ]` кнопка становится активной только после выбора хотя бы одного
- `[ Cancel ]` — возврат в В-1

---

## В-3. Confirm Unpublish

Перед снятием — диалог подтверждения (т.к. действие деструктивное).

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│           ┌──────────────────────────────────────┐                  │
│           │  Unpublish from 2 channels?           │                  │
│           │                                       │                  │
│           │  The vehicle ad will be removed from: │                  │
│           │  · Autoplius                          │                  │
│           │  · City24                             │                  │
│           │                                       │                  │
│           │  This action cannot be undone.        │                  │
│           │                                       │                  │
│           │  [ Cancel ]  [ Unpublish ]            │                  │
│           └──────────────────────────────────────┘                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Аннотации:**
- Модальный диалог поверх Vehicle Card
- Список каналов для наглядности — пользователь видит что именно снимается
- `[ Unpublish ]` — деструктивная кнопка, красная или нейтральная в зависимости от системы
- `[ Cancel ]` — возврат в В-2

---

## В-4. Result: Partially Unpublished

После подтверждения — снятие выполнено. Панель обновляет статусы.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Publishing channels                   │                             │
│  ──────────────────────────────────    │    [Car image]              │
│                                        │                             │
│  ✓  Auto24       ● Published  2h ago   │    Vivid Blue / M           │
│  ✓  Mobile.de    ● Published  2h ago   │                             │
│  ✓  SS.lv        ● Published  2h ago   │                             │
│  ○  Autoplius    ○ Unpublished          │    [Interior image]         │
│  ○  City24       ○ Unpublished          │                             │
│                                        │    Plum · Nappa leather     │
│  ──────────────────────────────────    │                             │
│  3 published · 2 unpublished           │                             │
│                                        │                             │
│  [ Publish to channels ]               │                             │
│                                        │                             │
└────────────────────────────────────────┴─────────────────────────────┘
```

**Аннотации:**
- Снятые каналы получают статус `○ Unpublished` — серый, неактивный
- Сводка обновляется: "3 published · 2 unpublished"
- Основной CTA меняется обратно на `[ Publish to channels ]` — возможность опубликовать снова

---

---

# Сводная таблица состояний

| Состояние | Заголовок панели | Primary CTA | Secondary CTA |
|---|---|---|---|
| А-1 Все unpublished | "Publishing channels" | Publish to channels | — |
| А-2 Выбор каналов | "Select channels to publish" | Publish N channels | Cancel |
| А-3 Validation | "⚠ Validation warnings" | Publish anyway (N of M) | Back |
| А-4 In progress | "Publishing..." | — (заблокировано) | — |
| А-5 Success | "✓ Published successfully" | Unpublish from channels | — |
| Б-1 Mixed | "Publishing channels" | Fix errors | Publish remaining |
| Б-2 Error detail | (inline expand) | Go to Builder / Retry | — |
| Б-3 Builder | "Edit vehicle" | Save & Return | Back to Publishing |
| Б-4 Ready retry | "Publishing channels" | Retry all failed | — |
| В-1 All published | "✓ Published on all channels" | Unpublish from channels | — |
| В-2 Выбор unpublish | "Select channels to unpublish" | Unpublish N channels | Cancel |
| В-3 Confirm | (modal) "Unpublish from N channels?" | Unpublish | Cancel |
| В-4 Partial result | "Publishing channels" | Publish to channels | — |

---

# Open questions для обсуждения с командой

1. **Polling vs WebSocket** — как обновляются статусы во время публикации? Реальный real-time или polling каждые N секунд?
2. **Блокировка UI** — можно ли закрыть карточку пока идёт публикация? Если да — что происходит с процессом?
3. **Retry logic** — сколько раз система может автоматически retry? Или всегда только вручную?
4. **Builder → Publishing** — как технически реализован возврат? Роутинг или состояние?
5. **Partial unpublish** — если снятие с одного канала упало с ошибкой, показываем ли это как ошибку?
