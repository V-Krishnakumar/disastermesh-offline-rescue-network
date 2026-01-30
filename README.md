# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Unified backend (one server, one database)**

Both the **Command Center** and the **Ambulance Dashboard** use the same backend and SQLite database so assignments and live ambulance positions stay in sync.

1. **Start the backend** (first time: install deps in `server/`): `cd server && npm install && npm start`. Or from repo root: `npm run start:backend`. Backend runs at http://localhost:3000.
2. **Start the command center:** `npm run dev`. Open http://localhost:8080. Vite proxies `/api` to the backend.
3. **Ambulance dashboard:** Open http://localhost:3000/ambulance-dashboard/login.html (after the backend is running). Demo login: `bhavna@resqueue.local` / `demo`. Or from the command center, click **Ambulance** then **Open Ambulance Dashboard**.

Data is stored in the backend’s `sos.db` (SQLite). If the backend is on another host/port, set `VITE_API_URL` in a `.env` file (see `.env.example`).

**Flow**

**Setup (first time only):**

1. Install Python dependencies:
   ```bash
   cd "ambulance login - Copy"
   pip install -r requirements.txt
   ```
   (If `pip` doesn't work, try `pip3` or `python -m pip install -r requirements.txt`)

2. Start the ambulance backend:
   ```bash
   python app.py
   ```
   Flask runs on http://localhost:5000.

3. In the command center, click **Ambulance** then **Open Ambulance Dashboard** to open the driver login in a new tab.

**Dispatch integration (command center → ambulance)**

The **Dispatch** button sends the pinned SOS location to the ambulance dashboard so the driver sees the rescue target and route. This uses a Vite proxy (`/ambulance-api` → Flask :5000) so there is no CORS.

**For Dispatch to work:**

1. **Start the ambulance app first** (Flask must be running so the proxy can forward):
   - **Easy:** Double‑click **`start-ambulance.bat`** in the project root (Windows), or run **`./start-ambulance.sh`** (Mac/Linux).
   - **Or manually:**
     ```bash
     cd "ambulance login - Copy"
     pip install -r requirements.txt   # first time only
     python app.py
     ```
   Leave the window open (Flask runs on http://localhost:5000).

2. **Start the command center:**
   ```bash
   npm run dev
   ```
   Open http://localhost:8080.

3. **Dispatch:** In the command center, select an SOS that has a **pinned location** (green “Location pinned on map”), open **SOS Actions**, then click **Dispatch** next to Ambulance A1. You should see a toast “Mission sent…”. Open (or refresh) the ambulance dashboard at http://localhost:5000/dashboard — the driver will see the target and driving route.

To use a different URL for opening the ambulance app in the browser, set `VITE_AMBULANCE_APP_URL` in `.env`.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
