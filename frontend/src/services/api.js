const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload?.detail || payload?.message || 'Request failed';
    throw new Error(message);
  }

  return payload;
}

export function fetchCompanyOverview() {
  return request('/api/company/overview/');
}

export function fetchProductCategories() {
  return request('/api/products/categories/');
}

export function submitInquiry(payload) {
  return request('/api/inquiries/submit/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
