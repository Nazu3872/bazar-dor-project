# বাজার দর (Bazar Dor)

একটি Next.js ও Better Auth-ভিত্তিক বাজার দর ট্র্যাকিং অ্যাপ্লিকেশন, যেখানে ব্যবহারকারীরা পণ্যের দামের ওঠানামা, ক্যাটাগরি অনুযায়ী ফিল্টারিং, সাইন-আপ/সাইন-ইন, এবং প্রোফাইল ম্যানেজমেন্ট দেখতে পারে।

## Project Overview

এই প্রজেক্টটি বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর ও তুলনামূলক দাম দেখানোর জন্য তৈরি। এতে:

- পণ্যের তালিকা দেখানো
- ক্যাটাগরি অনুযায়ী ফিল্টার করা
- দাম অনুযায়ী সাজানো
- নির্দিষ্ট পণ্যের বিস্তারিত তথ্য দেখা
- লগইন ব্যবহারকারীদের জন্য protected route
- Better Auth দিয়ে email/password ও social login
- MongoDB-ভিত্তিক ডাটাবেস

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- DaisyUI
- Better Auth
- MongoDB
- React Toastify
- React Icons
- ESLint

## Features

- Live price ticker
- Category-wise product browsing
- Sort by price
- Product detail page with protected access
- User sign-up and sign-in
- Google and GitHub login support
- User profile update page
- Responsive UI for mobile, tablet, and desktop

## Project Structure

```bash
.
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   ├── products/
│   │   ├── product/
│   │   ├── profile/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── components/
│   └── lib/
│       ├── auth.js
│       └── auth-client.js
├── .env
├── package.json
├── next.config.mjs
├── jsconfig.json
├── eslint.config.mjs
├── public/
└── README.md
```

## Local Setup

### 1 Install dependencies

```bash
npm install
```

### 2 Create environment variables

Create a `.env` file in the project root and add the following values:

```env
BETTER_AUTH_SECRET=your-very-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bazar-dor

# Optional if you want Google login
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional if you want GitHub login
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Optional app URL used by client
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Project also supports this legacy key
BETTER_AUTH_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bazar-dor
```

> Note: `BETTER_AUTH_MONGO_URI` is the preferred key for Better Auth, but this project also accepts `BETTER_AUTH_MONGO_URI` as a fallback.

### 3 Run the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Build and Production

```bash
npm run build
npm run start
```

## Scripts

```bash
npm run dev     # start development server
npm run build   # production build
npm run start   # run production server
npm run lint    # run ESLint
```

## Notes

- This app uses Better Auth with MongoDB on the server side.
- The auth route is under `src/app/api/auth/[...all]/route.js`.
- The root layout includes global UI elements such as Navbar, Marquee, Footer, and Toast container.
- `.env*` files are ignored by default in this repository configuration.

## License

This project is intended for educational and personal development use.
