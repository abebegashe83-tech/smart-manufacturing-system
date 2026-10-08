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
