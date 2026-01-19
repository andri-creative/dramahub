<template>
  <div class="app">
    <h1>🎬 DramaDash</h1>

    <!-- Error Message -->
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-btn', { active: activeTab === index }]"
        @click="loadTabData(tab.id, index)"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">Loading...</div>

    <!-- Drama Grid -->
    <div v-else class="drama-grid">
      <div
        v-for="drama in dramas"
        :key="drama.id"
        class="drama-card"
        @click="goToDramaDetail(drama.id)"
      >
        <img
          :src="drama.poster"
          :alt="drama.name"
          class="drama-poster"
          loading="lazy"
        />
        <div class="drama-info">
          <h3 class="drama-name">{{ drama.name }}</h3>
          <p class="drama-views">👁️ {{ drama.viewCount }}</p>
          <div v-if="drama.gendres" class="genres">
            <span
              v-for="(genre, i) in drama.gendres.slice(0, 2)"
              :key="i"
              class="genre-tag"
            >
              {{ genre }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_BASE_URL = 'http://localhost:3000/api';

// Reactive state
const homeData = ref(null);
const tabs = ref([]);
const dramas = ref([]);
const activeTab = ref(0);
const loading = ref(true);
const error = ref(null);

// Fetch home data
const fetchHomeData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(`${API_BASE_URL}/home`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    homeData.value = result.data;
    tabs.value = result.tabs;
    dramas.value = result.data.drama; // Default: tampilkan semua drama
    loading.value = false;

  } catch (err) {
    error.value = err.message;
    loading.value = false;
    console.error('Error fetching data:', err);
  }
};

// Load data untuk tab tertentu
const loadTabData = async (tabId, index) => {
  try {
    activeTab.value = index;
    
    if (tabId === null) {
      // Tab "Populer" - tampilkan semua drama
      dramas.value = homeData.value.drama;
      return;
    }

    loading.value = true;
    const response = await fetch(`${API_BASE_URL}/tabs/${tabId}`);
    const result = await response.json();
    
    dramas.value = result.data || [];
    loading.value = false;

  } catch (err) {
    error.value = err.message;
    loading.value = false;
    console.error('Error loading tab data:', err);
  }
};

// Navigate to drama detail
const goToDramaDetail = (dramaId) => {
  // Jika menggunakan Vue Router:
  // router.push(`/drama/${dramaId}`);
  
  // Atau redirect biasa:
  window.location.href = `/drama.html?id=${dramaId}`;
};

// Initialize on mount
onMounted(() => {
  fetchHomeData();
});
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 10px 20px;
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.tab-btn:hover {
  background: #f0f0f0;
}

.tab-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.drama-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.drama-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
}

.drama-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.drama-poster {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
}

.drama-info {
  padding: 12px;
}

.drama-name {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #333;
}

.drama-views {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.genres {
  display: flex;
  gap: 5px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.genre-tag {
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error {
  background: #ff4444;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>
