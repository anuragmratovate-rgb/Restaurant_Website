# Saffron House

A static restaurant website for a contemporary Indian dining room in Breach Candy, Mumbai. Built with React and Vite. Forms confirm in the browser and do not send data to a server.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Pages

- `/` Home
- `/menu` Starters, mains, breads, and desserts
- `/story` Our story
- `/visit` Hours, map, and contact form
- `/reserve` Table request with an on-page confirmation

## Structure

```text
src/
  components/   layout, shared UI, menu, and forms
  data/         restaurant facts, menu, and story copy
  hooks/        document title and description
  pages/        one route per file
  styles/       design tokens and base styles
  utils/        formatting and form validation
```
