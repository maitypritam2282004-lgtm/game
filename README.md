# Tik Tok Showdown

A polished, browser-based take on the classic Tic-Tac-Toe (a.k.a “Tik Tok”) duel. It features a responsive layout, round/tie tracking, quick resets, and an undo button for friendly rematches.

## Preview

Open `index.html` in any modern browser. No build tools or dependencies required.
  
👉 Live demo: https://maitypritam2282004-lgtm.github.io/game/

## Local Setup

1. Clone or download this repository.
2. (Optional) If you prefer using a local web server, run one via Python:
   ```bash
   python -m http.server 4173
   ```
3. Visit `http://localhost:4173` (or just double-click `index.html`).

## How To Publish On GitHub

1. Create a new repository on GitHub (or use an existing one).
2. In your terminal:
   ```bash
   git init
   git add .
   git commit -m "Add Tik Tok Showdown"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

### Optional: GitHub Pages

1. Push the code to GitHub as shown above.
2. In your repository’s **Settings → Pages**, set the source to the `main` branch and root directory.
3. Wait for the deployment badge to turn green, then share the provided URL.

## Gameplay Features

- Animated 3×3 board with touch-friendly buttons
- Live scoreboard (Player X, Player O, ties)
- Undo last move & clear score controls
- Accessible labels and keyboard focus states

Enjoy building, customizing, and sharing your own Tik Tok experience! 🎮

