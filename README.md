# Shreejit Gautam — portfolio

A responsive portfolio built with React, Tailwind CSS, Framer Motion, GSAP, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run build` for the production build and `npm run preview` to preview it.

## Deploy to Vercel

1. Commit and push the project, including `vercel.json`, to the GitHub repository.
2. In Vercel, add a new project and import the repository. Use the repository root as the project root.
3. Deploy with the Vite framework settings: build command `npm run build` and output directory `dist`. These are also specified in `vercel.json`.

Vercel will deploy future pushes to the configured production branch automatically. The configuration also includes a single-page application fallback for direct URL requests. No environment variables are required by the current project.

## Content

- The original supplied portrait is in `public/shreejit-profile.png`.
- Navigation, social links, project links, and the hero content are in `src/App.jsx`.
- The LinkedIn and Instagram links currently open searches for Shreejit Gautam. Replace those URLs in `socialLinks` and the contact section with direct profile or contact links when available.
- The experience figures are taken from the supplied reference image.
- The first experience entry is selected by hostname in `src/experienceByDomain.js`. `shreejit.me` and `shreejitgautam.com.np` have separate content; other hosts keep the default entry. The `www` version of either domain uses the same content as its root domain.
- On `shreejitgautam.com.np`, the résumé button downloads `public/Shreejit_Gtm.pdf`. Other hosts use the existing résumé.
- To preview domain-specific content while running the development server, open `http://localhost:5173/?previewDomain=shreejit.me#experience` or `http://localhost:5173/?previewDomain=shreejitgautam.com.np#experience`. The preview parameter is ignored in production builds.
