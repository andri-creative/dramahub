# DramaDash API

> Unofficial REST API wrapper for DramaDash application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

A simple and easy-to-use REST API server that provides access to DramaDash content including home page data, drama details, search functionality, and episode information.

---

## 🚀 Features

- **RESTful API** - Clean and intuitive REST endpoints
- **Home Page Data** - Get banners, trending dramas, and drama lists
- **Drama Details** - Retrieve complete drama information including episodes
- **Search** - Search for dramas by title
- **Episode Data** - Access specific episode details with video URLs and subtitles
- **Tab Navigation** - Get content organized by tabs (Popular, New, Trending, etc.)
- **Error Handling** - Proper HTTP status codes and JSON error responses
- **CORS Enabled** - Ready for frontend integration

---

## 📦 Installation

### Prerequisites

- Node.js >= 18
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/IkuzaDev/DramaDash-API.git
cd DramaDash-API
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment (Optional)**
```bash
cp .env.example .env
# Edit .env to change PORT or other settings
```

4. **Start the server**

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start at `http://localhost:3000` (or the PORT specified in .env)

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. **API Information**
Get API metadata and available endpoints

**Request:**
```http
GET /
```

**Response:**
```json
{
  "name": "DramaDash API Backend",
  "version": "1.0.0",
  "description": "REST API wrapper for DramaDash application",
  "endpoints": {
    "home": "GET /api/home",
    "drama": "GET /api/drama/:id",
    "search": "GET /api/search?q=:query",
    "episode": "GET /api/drama/:id/episode/:episode",
    "tabs": "GET /api/tabs/:tabId"
  }
}
```

---

#### 2. **Get Home Page Data**
Retrieve home page content including banners, trending dramas, and drama lists

**Request:**
```http
GET /api/home
```

**Response:**
```json
{
  "status": 200,
  "data": {
    "banner": [
      {
        "id": 58,
        "name": "Balikan Cinta dengan Mantan Suami",
        "poster": "https://...",
        "desc": "",
        "viewCount": "2.1m",
        "tags": ["Eksklusif"],
        "gendres": ["Romansa Miliuner", "CEO"]
      }
    ],
    "trending": [
      {
        "id": 59,
        "name": "Aku Curiga Istriku Ingin Membunuhku",
        "poster": "https://...",
        "genres": ["Romansa Miliuner", "Balas Dendam"]
      }
    ],
    "drama": [...]
  },
  "tabs": [
    {"id": null, "name": "Populer"},
    {"id": 2, "name": "Baru"}
  ]
}
```

**cURL Example:**
```bash
curl http://localhost:3000/api/home
```

---

#### 3. **Get Drama Details**
Get detailed information about a specific drama including all episodes

**Request:**
```http
GET /api/drama/:id
```

**Parameters:**
- `id` (number, required) - Drama ID

**Response (Success - 200):**
```json
{
  "status": 200,
  "data": {
    "name": "Menikah dengan Orang Asing",
    "poster": "https://...",
    "description": "Lily pura-pura menjadi tunangan Tristan..."
  },
  "episodes": [
    {
      "id": 2862,
      "episodeNumber": 1,
      "isLocked": false,
      "videoUrl": "https://...",
      "subtitles": [
        {
          "language": "id",
          "languageDisplayName": "Indonesian",
          "url": "https://..."
        }
      ]
    }
  ]
}
```

**Response (Error - 404):**
```json
{
  "error": "Drama not found",
  "message": "No query results for model [App\\Models\\Drama] 100",
  "dramaId": 100
}
```

**cURL Example:**
```bash
curl http://localhost:3000/api/drama/44
```

---

#### 4. **Search Dramas**
Search for dramas by title

**Request:**
```http
GET /api/search?q=:query
```

**Parameters:**
- `q` (string, required) - Search query

**Response (Success - 200):**
```json
{
  "status": 200,
  "data": [
    {
      "id": 605,
      "name": "Putri Mahkota",
      "poster": "https://...",
      "genres": ["Drama", "Historical"]
    }
  ]
}
```

**Response (Error - 400):**
```json
{
  "error": "Missing query parameter",
  "message": "Please provide a search query using ?q=yourquery"
}
```

**cURL Example:**
```bash
curl "http://localhost:3000/api/search?q=putri"
```

---

#### 5. **Get Episode Details**
Get specific episode information

**Request:**
```http
GET /api/drama/:id/episode/:episode
```

**Parameters:**
- `id` (number, required) - Drama ID
- `episode` (number, required) - Episode number

**Response (Success - 200):**
```json
{
  "status": 200,
  "data": {
    "id": 2862,
    "episodeNumber": 1,
    "isLocked": false,
    "isLiked": false,
    "isWatched": false,
    "duration": 0,
    "current": true,
    "videoUrl": "https://...",
    "subtitles": [...]
  }
}
```

**Response (Error - 404):**
```json
{
  "error": "Episode or drama not found",
  "message": "Episode 999 not found for drama 1",
  "dramaId": 1,
  "episode": 999
}
```

**cURL Example:**
```bash
curl http://localhost:3000/api/drama/44/episode/1
```

---

#### 6. **Get Tab Data**
Get dramas organized by specific tab category

**Request:**
```http
GET /api/tabs/:tabId
```

**Parameters:**
- `tabId` (number, required) - Tab ID (e.g., 2 for "New", 3 for "Trending")

**Response:**
```json
{
  "dramaList": [...],
  "bannerDramaList": {...},
  "trendingSearches": [...]
}
```

**cURL Example:**
```bash
curl http://localhost:3000/api/tabs/2
```

---

## 🔧 Error Handling

The API uses standard HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request (invalid parameters) |
| 404 | Not Found (drama/episode doesn't exist) |
| 500 | Internal Server Error |

All errors return JSON:
```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "dramaId": 100  // (if applicable)
}
```

---

## 🧪 Testing the API

### Using the HTTP File

Open `examples/api-requests.http` in VS Code with the REST Client extension and click "Send Request" on any endpoint.

### Using cURL

```bash
# Get home data
curl http://localhost:3000/api/home

# Get drama details
curl http://localhost:3000/api/drama/44

# Search
curl "http://localhost:3000/api/search?q=putri"

# Get episode
curl http://localhost:3000/api/drama/44/episode/1
```

### Using the DramaDash Class Directly

Run the example usage script:
```bash
node examples/usage.js
```

---

## 📂 Project Structure

```
DramaDash-API/
├── api/
│   └── DramaDash.js       # Core DramaDash class
├── examples/
│   ├── usage.js           # Example usage of DramaDash class
│   └── api-requests.http  # REST API test requests
├── server.js              # Express server
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🛠️ Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=3000              # Server port
NODE_ENV=development   # Environment mode
```

---

## ⚙️ Development

### Running in Development Mode
```bash
npm run dev
```
Uses nodemon for auto-reload on file changes.

### Running in Production Mode
```bash
npm start
```

---

## 📝 License

MIT License - see LICENSE file for details

---

## ⚠️ Disclaimer

This is an **unofficial** API wrapper. It may stop working if the DramaDash API changes. Use at your own risk.

---

## 👤 Author

**IkuzaDev**

- GitHub: [@IkuzaDev](https://github.com/IkuzaDev)
- Repository: [DramaDash-API](https://github.com/IkuzaDev/DramaDash-API)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
