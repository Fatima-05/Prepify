<div align="center">
  <h1>Prepify</h1>
  <p>Verified past papers repository for COMSATS University Abbottabad Campus</p>
</div>

AI Gatekeeper verifies every upload for course, department and instructor before it's published, with duplicate management (Rule 3 Clean Set) and moderation.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and set your Gemini API key:
   `GEMINI_API_KEY=your_api_key_here`
3. Run the app:
   `npm run dev`
4. Open http://localhost:3000

Without a Gemini API key the app falls back to an offline heuristic matcher (flagged as "Demo verification").

## Scripts

- `npm run dev` — start dev server (Express + Vite middleware, port 3000)
- `npm run build` — build the client and bundle the server
- `npm run lint` — TypeScript type check
- `npm run start` — run the production build
