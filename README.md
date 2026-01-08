## Технології

- **Next.js 15** — React фреймворк
- **TypeScript** — типізація
- **Firebase Firestore** — база даних у реальному часі
- **shadcn/ui** — UI компоненти
- **Zustand** — управління станом
- **Zod** — валідація форм
- **Tailwind CSS** — стилізація

## Що реалізовано

### UI компоненти

- Всі UI елементи побудовані на базі **shadcn/ui** (Dialog, Drawer, Button, Input, Card, Avatar, Badge, Select, Skeleton)
- **Адаптивні модальні вікна** — форма створення поста та детальний перегляд відкриваються як `Dialog` на десктопі та `Drawer` на мобільних пристроях
- Використано `useIsMobile` хук для визначення типу пристрою

### Функціональність

- **Створення постів** — модальна форма з валідацією Zod
- **Перегляд постів** — картки з автором, датою, тегами та кількістю лайків
- **Детальний перегляд** — модалка з повним контентом та коментарями
- **Лайки** — можливість вподобати пост
- **Коментарі** — додавання коментарів до постів у реальному часі
- **Пошук** — пошук за заголовком, контентом та тегами
- **Сортування** — за датою (новіші/старіші) та популярністю

### Структура проєкту

```
src/
├── app/                    # Next.js App Router
├── components/             # React компоненти
│   ├── ui/                 # shadcn/ui компоненти
│   ├── PostForm.tsx        # Форма створення поста
│   ├── PostFormFields.tsx  # Поля форми
│   ├── PostFormActions.tsx # Кнопки форми
│   ├── PostCard.tsx        # Картка поста
│   ├── PostDetail.tsx      # Детальний перегляд
│   ├── PostActions.tsx     # Кнопки дій (лайк, закрити)
│   ├── PostTags.tsx        # Відображення тегів
│   ├── PostList.tsx        # Список постів
│   ├── PostFilters.tsx     # Пошук та сортування
│   ├── PostsSection.tsx    # Секція з фільтрами та списком
│   ├── CommentsSection.tsx # Секція коментарів
│   ├── CommentForm.tsx     # Форма коментаря
│   ├── CommentList.tsx     # Список коментарів
│   └── CommentItem.tsx     # Окремий коментар
├── hooks/                  # Кастомні хуки
│   ├── usePosts.ts         # Отримання та фільтрація постів
│   ├── usePost.ts          # Отримання одного поста
│   ├── useComments.ts      # Робота з коментарями
│   └── useMediaQuery.ts    # Визначення мобільного пристрою
├── store/                  # Zustand store
│   └── useBlogStore.ts     # Глобальний стан
├── lib/                    # Утиліти
│   ├── firebase.ts         # Firebase конфігурація
│   ├── utils.ts            # Допоміжні функції
│   └── validations.ts      # Zod схеми
└── types/                  # TypeScript типи
    └── index.ts            # Всі типи в одному файлі
```

## Запуск

```bash
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

## Налаштування Firebase

Створіть файл `.env.local` з вашими Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB8r6jUU9FFnQOMLvd6aGzSXzzB2zUwHsA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=blogs-task-db.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=blogs-task-db
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=blogs-task-db.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=140370985270
NEXT_PUBLIC_FIREBASE_APP_ID=1:140370985270:web:500bbf697b0a7716ad7397
```
