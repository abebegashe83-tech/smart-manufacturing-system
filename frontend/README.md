# Smart Manufacturing System

Company website for Super Double T General Trading PLC, featuring its business areas, products, contact details, and a customer inquiry form.

## Run locally

Start the Django API from the `backend` directory:

```powershell
..\.venv\Scripts\python.exe manage.py migrate
..\.venv\Scripts\python.exe manage.py runserver
```

In a second terminal, start the frontend from the `frontend` directory:

```powershell
npm install
npm run dev
```

Open the Vite URL printed in the terminal (usually `http://localhost:5173/`). The frontend uses `http://127.0.0.1:8000` as its API by default. Set `VITE_API_URL` to override it.

## API endpoints

- `GET /` — API endpoint index
- `GET /api/company/overview/` — company profile and business areas
- `GET /api/products/categories/` — product categories
- `POST /api/inquiries/submit/` — validate and save a customer inquiry

Inquiries are available in Django admin at `/admin/`.

## Frontend checks

Run from the `frontend` directory:

```powershell
npm run lint
npm run build
```

## Deploy to Render

1. Push this repository to GitHub and sign in to [Render](https://render.com).
2. In the Render Dashboard, choose **New** → **Blueprint**, connect this repository, and apply the root `render.yaml` blueprint.
3. Wait for the frontend, Django API, and PostgreSQL database to finish provisioning and deploying.
4. Open the site at `https://smart-manufacturing-system.onrender.com/`. The admin panel is at `https://smart-manufacturing-system-api.onrender.com/admin/`.
5. From the API service's Render Shell, create an administrator with `python manage.py createsuperuser`. Use a new strong password; do not reuse local development credentials.

The Blueprint uses Render's free PostgreSQL plan, which expires after 30 days. Free web services can also sleep when idle. Upgrade to persistent paid plans before relying on this deployment for real inquiries. If you use a custom domain, update `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and the frontend's `VITE_API_URL` in `render.yaml`.
