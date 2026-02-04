const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAuthToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as HeadersInit & Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: { name: string; email: string; password: string }) {
    const result = await this.request<{ user: any; token: string }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (result.token) {
      localStorage.setItem("authToken", result.token);
    }

    return result;
  }

  async login(data: { email: string; password: string }) {
    const result = await this.request<{ user: any; token: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (result.token) {
      localStorage.setItem("authToken", result.token);
    }

    return result;
  }

  async getMe() {
    return this.request<any>("/auth/me");
  }

  logout() {
    localStorage.removeItem("authToken");
  }

  // Posts endpoints
  async getPosts(params?: { search?: string; sortBy?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);

    const query = queryParams.toString();
    return this.request<any[]>(`/posts${query ? `?${query}` : ""}`);
  }

  async getPost(id: string) {
    return this.request<any>(`/posts/${id}`);
  }

  async createPost(data: { title: string; content: string; tags?: string[] }) {
    return this.request<any>("/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatePost(
    id: string,
    data: { title?: string; content?: string; tags?: string[] }
  ) {
    return this.request<any>(`/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string) {
    return this.request<{ message: string }>(`/posts/${id}`, {
      method: "DELETE",
    });
  }

  async toggleLike(postId: string) {
    return this.request<{ liked: boolean; message: string }>(
      `/posts/${postId}/like`,
      {
        method: "POST",
      }
    );
  }

  async getLikes(postId: string) {
    return this.request<{ count: number; users: any[] }>(
      `/posts/${postId}/likes`
    );
  }

  // Comments endpoints
  async getComments(postId: string) {
    return this.request<any[]>(`/comments?postId=${postId}`);
  }

  async createComment(data: { postId: string; content: string }) {
    return this.request<any>("/comments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateComment(id: string, data: { content: string }) {
    return this.request<any>(`/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteComment(id: string) {
    return this.request<{ message: string }>(`/comments/${id}`, {
      method: "DELETE",
    });
  }
}

export const api = new ApiClient(API_URL);
