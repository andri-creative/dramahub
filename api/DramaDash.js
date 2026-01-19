import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

export default class DramaDash {
    constructor() {
        this.apiUrl = `https://www.dramadash.app/api/`;
        this.deviceId = this.generateDeviceId();
        this.deviceToken = null;
    }

    async init() {
        this.deviceToken = await this.getToken();
        return this;
    }

    generateDeviceId() {
        return uuidv4().replace(/-/g, "").substring(0, 16);
    }

    getDefaultHeaders() {
        return {
            "app-version": 70,
            lang: "id",
            platform: "android",
            tz: "Asia/Bangkok",
            "device-type": "phone",
            "content-type": "application/json; charset=UTF-8",
            "accept-encoding": "gzip",
            "user-agent": "okhttp/5.1.0",
            ...(this.deviceToken && { authorization: `Bearer ${this.deviceToken}` })
        };
    }

    async request(endpoint, method = "GET", data = null) {
        const config = {
            url: `${this.apiUrl}${endpoint}`,
            method,
            headers: this.getDefaultHeaders(),
            ...(data && { data })
        };

        try {
            const res = await axios(config);
            return res.data;
        } catch (err) {
            console.error(`Request failed [${method} ${endpoint}]:`, err?.response?.data || err.message);
            throw err;
        }
    }

    async getToken() {
        const payload = { android_id: this.deviceId };
        const res = await this.request("landing", "POST", payload);
        return res?.token || null;
    }

    async getHome() {
        const res = await this.request('home', "GET");
        const {dramaList, bannerDramaList, trendingSearches, tabs} = res;
        const dramaListFIlee = dramaList.filter(item => Array.isArray(item.list)).flatMap(item => item.list);
        const trending = trendingSearches.map(item => ({id: item.id,name: item.name,poster: item.poster,genres: item.genres.map(g => g.displayName)}));
        const banner = bannerDramaList.list.map(item => ({id: item.id,name: item.name,poster: item.poster,desc: item.desc || "",viewCount: item.viewCount || 0,tags: item.tags ? item.tags.map(t => t.displayName) : [],gendres: item.genres ? item.genres.map(g => g.displayName) : []}));
        const drama = dramaListFIlee.map(item => ({id: item.id,name: item.name,poster: item.poster,desc: item.desc || "",viewCount: item.viewCount || 0,tags: item.tags ? item.tags.map(t => t.displayName) : [],gendres: item.genres ? item.genres.map(g => g.displayName) : []}));
        return {
            status: 200,
            data:{
                banner,
                trending,
                drama
            },
            tabs
        };
    }

    async getTabs(tab) {
        const res = await this.request(`home?tab_id=${tab}`, "GET");
        return res || {};
    }

    async getDrama(dramaId) { 
        const {drama} = await this.request(`drama/${dramaId}`, "GET");
        return {
            status:200,
            data: {
                name: drama.name,
                poster: drama.poster,
                description: drama.description,
            },
            episodes: drama.episodes,
        };
    }

    async searchDrama(search){
        const {result} = await this.request(`search/text`, "POST", {search});
        return {
            status: 200,
            data: result.map(item => ({id: item.id,name: item.name,poster: item.poster,genres: item.genres.map(g => g.displayName)})),
        };
    }

    async getEpisode(dramaId, eps) {
        const {episodes} = await this.getDrama(dramaId);
        const episode = episodes.find(e => e.episodeNumber === eps);
        
        if (!episode) {
            const error = new Error(`Episode ${eps} not found for drama ${dramaId}`);
            error.statusCode = 404;
            throw error;
        }
        
        return{
            status:200,
            data: episode
        }
    }
}