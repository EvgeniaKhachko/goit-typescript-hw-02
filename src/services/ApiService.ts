import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = "vXW7F-1Dh6Ci3JW9KFWm9aaVclzdtzvcW8oDVXtK7GM";
const IMAGES_PER_PAGE = 12;

interface UnsplashImage {
  id: string;
  urls: {
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  description: string | null;
  alt_description: string | null;
}

interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export default class ApiService {
  private searchQuery: string;
  private page: number;

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPost(): Promise<UnsplashResponse> {
    const REQUEST_PARAMS = new URLSearchParams({
      client_id: API_KEY,
      query: this.searchQuery,
      page: this.page.toString(),
      per_page: IMAGES_PER_PAGE.toString(),
      orientation: 'landscape',
      content_filter: 'high',
    });

    const response = await axios.get<UnsplashResponse>(`${API_URL}?${REQUEST_PARAMS.toString()}`);
    this.page += 1;

    return response.data;
  }

  get query(): string {
    return this.searchQuery;
  }

  set query(newQuery: string) {
    this.searchQuery = newQuery;
  }

  resetPage(): void {
    this.page = 1;
  }
}
