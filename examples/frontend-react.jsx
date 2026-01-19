/**
 * React Example - DramaDash Frontend
 * Contoh implementasi dengan React Hooks
 */

import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3000/api';

function DramaDashApp() {
  const [homeData, setHomeData] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [dramas, setDramas] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch home data saat component mount
  useEffect(() => {
    fetchHomeData();
  }, []);

  // Fetch data dari API
  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/home`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setHomeData(result.data);
      setTabs(result.tabs);
      setDramas(result.data.drama); // Default: tampilkan semua drama
      setLoading(false);

    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error fetching data:', err);
    }
  };

  // Load data untuk tab tertentu
  const loadTabData = async (tabId, index) => {
    try {
      setActiveTab(index);
      
      if (tabId === null) {
        // Tab "Populer" - tampilkan semua drama
        setDramas(homeData.drama);
        return;
      }

      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/tabs/${tabId}`);
      const result = await response.json();
      
      setDramas(result.data || []);
      setLoading(false);

    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error loading tab data:', err);
    }
  };

  // Handle drama click
  const handleDramaClick = (dramaId) => {
    // Navigate to drama detail page
    window.location.href = `/drama/${dramaId}`;
    // atau jika menggunakan React Router:
    // navigate(`/drama/${dramaId}`);
  };

  if (loading && !homeData) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <h1>🎬 DramaDash</h1>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${activeTab === index ? 'active' : ''}`}
            onClick={() => loadTabData(tab.id, index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && <div className="loading">Loading...</div>}

      {/* Drama Grid */}
      <div className="drama-grid">
        {dramas.map((drama) => (
          <div
            key={drama.id}
            className="drama-card"
            onClick={() => handleDramaClick(drama.id)}
          >
            <img
              src={drama.poster}
              alt={drama.name}
              className="drama-poster"
              loading="lazy"
            />
            <div className="drama-info">
              <h3 className="drama-name">{drama.name}</h3>
              <p className="drama-views">👁️ {drama.viewCount}</p>
              {drama.gendres && (
                <div className="genres">
                  {drama.gendres.slice(0, 2).map((genre, i) => (
                    <span key={i} className="genre-tag">{genre}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DramaDashApp;

/**
 * Custom Hook untuk data fetching (Optional - lebih reusable)
 */
export function useDramaDash() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
      return result;

    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { data, loading, error, fetchData };
}

/**
 * Contoh penggunaan custom hook:
 * 
 * function MyComponent() {
 *   const { data, loading, error, fetchData } = useDramaDash();
 * 
 *   useEffect(() => {
 *     fetchData('/home');
 *   }, []);
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   
 *   return <div>{JSON.stringify(data)}</div>;
 * }
 */
