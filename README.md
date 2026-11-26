# MentorLagbe

This is the frontend of MentorLagbe, a site where students find tutors and tutors post tuition batches. It is a Next.js app. The data, applications, admin actions and payment verification come from a separate Express server (`mentor-lagbe-server`).

**Live site:** https://mentor-lagbe-client-rho.vercel.app  
**API server:** https://mentor-lagbe-server-sable.vercel.app

## What the app does

A student can browse tuitions, filter them, open a tuition and send an application. A tutor can post tuitions, edit or delete their own posts and see who applied. An admin can check users, tuitions, transactions and change roles or approval status.

There are two plans: free and pro. Free students can send up to 2 applications and free tutors can post up to 2 tuitions. When they hit that limit, the app sends them to the pricing page. Pro users do not have those limits.

## Main features

- Sign up and sign in with email and password using Better Auth. Role is stored on the user (student, tutor or admin).
- Home page with a search box, subject list and a few recent tuitions from the live API.
- Browse page with filters for subject, class, mode and location.
- Tuition details page with an application form for signed-in students.
- Student dashboard: stats, recent applications and a full "My Applications" page.
- Tutor dashboard: stats, posted tuitions, applicants, add/edit/delete tuition, and a post form with image upload.
- Admin dashboard: overview, revenue, users, tuition approval and transactions.
- Profile page with name, phone, bio and image update. Images are uploaded to ImgBB.
- Stripe checkout for upgrading to pro, plus success and cancel pages.
- JWT-based calls to protected server APIs. `src/proxy.js` redirects logged-out users away from protected pages.
- Loading screens, 404 pages and a simple error screen when a server render fails.

## Packages used

Runtime:

- `next` (16.4.6), `react` (19.3.0), `react-dom` (19.3.0)
- `better-auth`, `@better-auth/mongo-adapter`, `mongodb`
- `stripe`, `@stripe/stripe-js`
- `shadcn`, `@base-ui/react`, `class-variance-authority`, `cn`
- `lucide-react`, `react-icons`, `next-themes`, `tw-animate-css`
- `sonner`

Development:

- `tailwindcss`, `@tailwindcss/turbopack`
- `eslint`, `eslint-config-next`
- `babel-plugin-react-compiler`

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Create a `.env` file with these keys before running:

```bash
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=
NEXT_PUBLIC_IMGBB_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_STUDENT_PRICE_ID=
STRIPE_TUTOR_PRICE_ID=
```

`NEXT_PUBLIC_API_URL` should point to the Express server. For local work that is usually `http://localhost:5000`. The MongoDB URI and auth secret are private, so keep them out of git.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## Where things are

- `src/app` — pages and route handlers
- `src/components` — UI pieces, auth forms, dashboards and shared navbar/footer
- `src/lib/actions` — API calls grouped by area (`auth`, `student`, `tutor`, `admin`, `payment`)
- `src/lib/auth.js` — Better Auth setup on the server side
- `src/lib/auth-client.js` — Better Auth client used in the browser
- `src/proxy.js` — route protection

The backend repo has to be running for data to load. Admin login details are managed separately and are not stored in this repo.
