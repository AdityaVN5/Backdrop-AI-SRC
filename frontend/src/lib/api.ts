export const API_BASE_URL = 'https://unexpediently-multinodous-napoleon.ngrok-free.dev';

export interface RemoveBackgroundResponse {
  video_id: string;
  preview_video: string;
  rgba_video: string;
  fps: number;
}

export const api = {
  removeBackground: async (file: File): Promise<RemoveBackgroundResponse> => {
    // Check local storage for request limit
    const STORAGE_KEY = 'backdrop_requests_count';
    const MAX_FREE_REQUESTS = 5;
    
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    
    if (currentCount >= MAX_FREE_REQUESTS) {
      throw new Error(`Free request limit reached (${MAX_FREE_REQUESTS}/${MAX_FREE_REQUESTS}). Please upgrade or check back later.`);
    }

    const formData = new FormData();
    formData.append('video', file);

    const response = await fetch(`${API_BASE_URL}/remove-background`, {
      method: 'POST',
      body: formData,
      // Note: Do not set Content-Type header manually, let the browser set it with the boundary
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to process video: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // Increment request count on success
    localStorage.setItem(STORAGE_KEY, (currentCount + 1).toString());

    return response.json();
  },

  getDownloadUrl: (path: string): string => {
    // If the path is already a full URL, return it
    if (path.startsWith('http')) {
      return path;
    }
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
  },
  
  checkHealth: async (): Promise<boolean> => {
      try {
          const res = await fetch(`${API_BASE_URL}/health`);
          return res.ok;
      } catch (e) {
          console.error("Health check failed", e);
          return false;
      }
  }
};
