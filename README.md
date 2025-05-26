# Test Task: Implementing a Responsive UI Based on a Ready-Made Design

Develop an interface based on the design using **Next.js 15.3** with **App Router**, **Server Actions**, and **Middleware**. Pay special attention to **smooth animations** to improve the user experience with the application.

## Project Overview

- **Technologies**: Next.js 15.3, TypeScript, React 18+, Tailwind CSS v4, Shadcn UI, Framer Motion, Zustand, Axios, Docker.
- **Functionality**: Animated dropdowns, page navigation with transitions, authentication forms, order list with details, and API integration.
- **Deployment**: Configured for Vercel with Docker support for local development.

## Features

- **Animated Dropdowns**: Currency (USD, UAH, EUR) and Language (EN, UA) selection with smooth transitions.
- **Navigation**: Jump buttons on the main page with animated transitions to auth and orders pages.
- **Authentication**: Login and registration forms with a toggle switch, success indicators, and social login options.
- **Order Management**: List of orders with a detailed view, accessible via click, with a close button to return.
- **Responsiveness**: Mobile-first design with cross-browser compatibility (Chrome, Firefox, Safari, Edge).
- **Backend**: Mock API using JSON Server with Docker.

## Project Structure

```
responsive-ui/
├── app/
│   ├── auth/[type]/page.tsx       # Authentication pages (login/register)
│   ├── orders/page.tsx            # Orders list and detail view
│   ├── page.tsx                   # Main page with navigation
│   ├── globals.css                # Global styles
│   └── layout.tsx                 # (Optional) Layout component
├── components/
│   ├── ui/                        # Shadcn UI components (button, input, checkbox, dropdown-menu)
│   └── Dropdown.tsx               # Custom Currency and Language Dropdowns
├── store/
│   └── auth.ts                    # Zustand store for auth, currency, and language
├── public/                        # Static assets (e.g., images/close.svg, images/flags.svg)
├── lib/
│   └── utils.ts                   # Utility functions (cn for class merging)
├── Dockerfile                     # Docker configuration for Next.js app
├── Dockerfile.json-server         # (Optional) Docker configuration for JSON server
├── docker-compose.yml             # Docker Compose configuration
├── db.json                        # Mock API data
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies and scripts
└── README.md                      # This file
```

## Prerequisites

- **Node.js**: v20.x or higher
- **Docker**: For containerized development
- **Docker Compose**: Included with Docker Desktop or installed separately
- **Git**: For version control and repository management
- **NPM**: Included with Node.js

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/taras723/Responsive-UI-Test-Project.git
   cd Responsive-UI-Test-Project
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Docker**:
   - Ensure Docker and Docker Compose are installed and running.
   - Verify with:
     ```bash
     docker --version
     docker-compose --version
     ```

4. **Prepare `db.json`**:
   - Ensure `db.json` is in the project root with the provided data structure.

## Running the Project

### Local Development

1. **Start JSON Server and App with Docker Compose**:
   - Build and run the services:
     ```bash
     docker-compose up --build
     ```
   - Access the app at `http://localhost:3000` and the API at `http://localhost:3001`.

2. **Development Mode**:
   - For live reloading, run without Docker:
     ```bash
     npm run dev
     ```
   - Ensure JSON Server runs separately:
     ```bash
     npx json-server --watch db.json --port 3001
     ```

3. **Stop Services**:
   ```bash
   docker-compose down
   ```

### Testing

- Test authentication with `test@gmail.com` and `@password`.
- Navigate between pages and verify animations.
- Check API responses at `http://localhost:3001/orders`.

## Deployment

### Vercel Deployment

1. **Push to GitHub/GitLab**:
   - Create a repository and push the code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin <your-repo-url>
     git push -u origin main
     ```

2. **Deploy to Vercel**:
   - Connect your repository to Vercel.
   - Set environment variables (if needed) in Vercel dashboard (e.g., `NEXT_PUBLIC_API_URL=[http://your-api-url](https://responsive-ui-api-latest.onrender.com)`).
   - Deploy and get the live URL (e.g., `[https://responsive-ui.vercel.app](https://responsive-ui-test-project.vercel.app/)`).

### Alternative Deployment (Netlify)
- Follow Netlify’s Next.js deployment guide, adjusting the build command to `npm run build`.

## Documentation

- **Code Comments**: Included in `.tsx` files for key logic (e.g., animations, API calls).
- **API**: Mock data in `db.json` simulates users and orders.
- **Styles**: Tailwind CSS with custom colors in `tailwind.config.ts`.

## Troubleshooting

- **JSON Server Not Found**: Ensure `db.json` is in the project root and permissions allow access. Recreate with `docker-compose down` and `docker-compose up --build`.
- **Port Conflicts**: Change ports in `docker-compose.yml` (e.g., `3001:3001` to `3002:3001`) if `3000` or `3001` are in use.
- **Build Errors**: Check `Dockerfile` and `package.json` for version mismatches.

## License

This project is for demonstration purposes. Feel free to modify and use it under your own terms.

## Contributors

- TarasTachuk - Initial development

## Demo

- Live demo available at: (https://responsive-ui-test-project.vercel.app/)
- Repository: (https://github.com/taras723/Responsive-UI-Test-Project)

---

Last updated: May 25, 2025
