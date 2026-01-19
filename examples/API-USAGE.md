# 📚 DramaDash API - Frontend Integration Guide

Panduan lengkap cara mengintegrasikan DramaDash API ke aplikasi frontend Anda.

## 🔗 API Base URL

```
http://localhost:3000/api
```

**Production**: Ganti dengan URL server production Anda.

---

## 📋 Available Endpoints

### 1. **Get Home Data**
```http
GET /api/home
```

**Response:**
```json
{
  "status": 200,
  "data": {
    "banner": [...],    // 10 items
    "trending": [...],  // 10 items
    "drama": [...]      // 77 items
  },
  "tabs": [
    { "id": null, "name": "Populer" },
    { "id": 2, "name": "Baru" },
    { "id": 3, "name": "Trending" },
    ...
  ]
}
```

### 2. **Get Drama by ID**
```http
GET /api/drama/:id
```

**Example:** `/api/drama/1`

### 3. **Search Drama**
```http
GET /api/search?q=:query
```

**Example:** `/api/search?q=love`

### 4. **Get Episode**
```http
GET /api/drama/:id/episode/:episode
```

**Example:** `/api/drama/1/episode/1`

### 5. **Get Tab Data**
```http
GET /api/tabs/:tabId
```

**Example:** `/api/tabs/2`

---

## 💻 Quick Start Examples

### ✅ Vanilla JavaScript

```javascript
// Fetch home data
async function fetchHome() {
  const response = await fetch('http://localhost:3000/api/home');
  const data = await response.json();
  
  console.log(data.data.drama); // Array of dramas
  console.log(data.tabs);       // Array of tabs
}

fetchHome();
```

### ✅ With Fetch + Error Handling

```javascript
async function fetchHome() {
  try {
    const response = await fetch('http://localhost:3000/api/home');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### ✅ Axios (Alternative)

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

// Get home data
const getHome = async () => {
  const { data } = await API.get('/home');
  return data;
};

// Get drama by ID
const getDrama = async (id) => {
  const { data } = await API.get(`/drama/${id}`);
  return data;
};

// Search
const searchDrama = async (query) => {
  const { data } = await API.get('/search', {
    params: { q: query }
  });
  return data;
};
```

---

## 🎯 Common Use Cases

### 1. Display All Dramas

```javascript
fetch('http://localhost:3000/api/home')
  .then(res => res.json())
  .then(data => {
    const dramas = data.data.drama;
    
    // Render dramas
    dramas.forEach(drama => {
      console.log(drama.name, drama.poster, drama.viewCount);
    });
  });
```

### 2. Implement Tab Switching

```javascript
async function loadTab(tabId) {
  if (tabId === null) {
    // Load all dramas (Populer tab)
    const data = await fetch('http://localhost:3000/api/home')
      .then(res => res.json());
    return data.data.drama;
  } else {
    // Load specific tab
    const data = await fetch(`http://localhost:3000/api/tabs/${tabId}`)
      .then(res => res.json());
    return data.data;
  }
}

// Usage
loadTab(2).then(dramas => {
  console.log('Tab data:', dramas);
});
```

### 3. Search Functionality

```javascript
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', async () => {
  const query = searchInput.value;
  
  const response = await fetch(
    `http://localhost:3000/api/search?q=${encodeURIComponent(query)}`
  );
  const result = await response.json();
  
  renderSearchResults(result.data);
});
```

---

## 🛡️ CORS Configuration

Jika frontend Anda berjalan di domain/port berbeda, pastikan backend sudah mengaktifkan CORS (sudah diatur di `server.js`):

```javascript
app.use(cors());
```

Jika perlu konfigurasi lebih spesifik:

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // URL frontend Anda
  credentials: true
}));
```

---

## 📱 Response Structure

Semua endpoint mengembalikan JSON dengan struktur konsisten:

**Success Response:**
```json
{
  "status": 200,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "error": "Error Type",
  "message": "Error description",
  "dramaId": 123  // (optional, context-specific)
}
```

---

## 🔥 Production Tips

1. **Environment Variables**
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
   ```

2. **Request Retries**
   ```javascript
   async function fetchWithRetry(url, retries = 3) {
     for (let i = 0; i < retries; i++) {
       try {
         return await fetch(url);
       } catch (err) {
         if (i === retries - 1) throw err;
         await new Promise(r => setTimeout(r, 1000 * (i + 1)));
       }
     }
   }
   ```

3. **Caching**
   ```javascript
   const cache = new Map();
   
   async function fetchWithCache(url) {
     if (cache.has(url)) {
       return cache.get(url);
     }
     
     const data = await fetch(url).then(r => r.json());
     cache.set(url, data);
     return data;
   }
   ```

---

## 📦 Example Files

Lihat contoh implementasi lengkap di folder `examples/`:

- `frontend-vanilla.html` - Pure JavaScript example
- `frontend-react.jsx` - React with Hooks
- `frontend-vue.vue` - Vue.js with Composition API

---

## 🚀 Next Steps

1. Sesuaikan API URL dengan environment Anda
2. Implementasikan error handling yang proper
3. Tambahkan loading states
4. Implementasikan caching jika diperlukan
5. Deploy backend ke production (Vercel, Railway, etc.)
6. Update frontend API URL ke production URL

Happy coding! 🎉
