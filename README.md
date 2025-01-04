# Yengflixv3

Yengflixv3 is a movie streaming platform that allows users to browse, search, and stream movies or TV shows. It also requires users to register and verify their email to utilize the full features of Yengflix v3. Built using NextJS fullstack.

## Features

- **Movie Browsing & Searching**: Discover and search for your favorite movies or TV shows.
- **Streaming**: Watch movies and TV show episodes directly on the platform.
- **User Authentication**: Register and log in to access personalized features such as favorites list.
- **User Profiles**: Create and manage your own profile.
- **Responsive Design**: Optimized for use on both desktop and mobile devices.

## Tech Stack

- **Frontend**: NextJS, Zustand (State Management), TailwindCSS
- **Backend**: NextJS integrated backend
- **Database**: PostgreSQL and Prisma ORM
- **Authentication**: next-auth
- **APIs**: Integrated with TMDP APIs to fetch movie data

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version >=14)
- [PostgreSQL](https://www.postgresql.org/) (or any other database you plan to use)

### Clone the repository

```bash
git clone https://github.com/yourusername/yengflixv3.git
cd yengflixv3
```

### Prerequisites

1. Install the dependencies:

```bash
npm install
```

2. Create an `.env.local` file in the root of the directory and add your environment variables (e.g., database URL, JWT secret, etc.).

```bash
AUTH_SECRET="YOUR_JWT_AUTH_SECRET_FOR_NEXT_AUTH"
NEXT_PUBLIC_API_KEY="API_KEY_FOR_TMDB_API"
NEXT_DATABASE_URL="YOUR_DATABASE_URL"
GMAIL_USERNAME="YOUR_GMAIL_FOR_NODEMAILER"
GMAIL_PASS="YOUR_GENERATED_GMAIL_APP_PASSWORD_DO_NOT_USE_YOUR_GMAIL'S_PASSWORD"
JWT_SECRET="JWT_SECRET_FOR_RESENDING_VERIFICATION_EMAIL"
```

3. Run development server:

   ```bash
   npm run dev
   ```

The app will be running at http://localhost:3000 by default.
