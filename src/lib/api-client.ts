// Centralized API client for all backend calls

const API_BASE = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${url}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
    }

    return data as T;
}

// ========== AUTH ==========
export const api = {
    auth: {
        register: (data: { name: string; email: string; password: string }) =>
            request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    },

    // ========== USER ==========
    user: {
        getProfile: () =>
            request<any>('/users/me'),
        updateProfile: (data: any) =>
            request<any>('/users/me', { method: 'PUT', body: JSON.stringify(data) }),
        getLeaderboard: (sort = 'reputation', limit = 20) =>
            request<any>(`/users/leaderboard?sort=${sort}&limit=${limit}`),
    },

    // ========== RESOURCES ==========
    resources: {
        list: (params?: {
            page?: number;
            limit?: number;
            query?: string;
            category?: string;
            status?: string;
            minValue?: number;
            maxValue?: number;
        }) => {
            const searchParams = new URLSearchParams();
            if (params?.page) searchParams.set('page', String(params.page));
            if (params?.limit) searchParams.set('limit', String(params.limit));
            if (params?.query) searchParams.set('query', params.query);
            if (params?.category) searchParams.set('category', params.category);
            if (params?.status) searchParams.set('status', params.status);
            if (params?.minValue) searchParams.set('minValue', String(params.minValue));
            if (params?.maxValue) searchParams.set('maxValue', String(params.maxValue));
            return request<any>(`/resources?${searchParams.toString()}`);
        },
        get: (id: string) =>
            request<any>(`/resources/${id}`),
        create: (data: any) =>
            request<any>('/resources', { method: 'POST', body: JSON.stringify(data) }),
        update: (id: string, data: any) =>
            request<any>(`/resources/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        delete: (id: string) =>
            request<any>(`/resources/${id}`, { method: 'DELETE' }),
    },

    // ========== EXCHANGES ==========
    exchanges: {
        list: (params?: { status?: string; page?: number; limit?: number }) => {
            const searchParams = new URLSearchParams();
            if (params?.status) searchParams.set('status', params.status);
            if (params?.page) searchParams.set('page', String(params.page));
            if (params?.limit) searchParams.set('limit', String(params.limit));
            return request<any>(`/exchanges?${searchParams.toString()}`);
        },
        get: (id: string) =>
            request<any>(`/exchanges/${id}`),
        create: (data: {
            offeredResourceId: string;
            requestedResourceId: string;
            receiverId: string;
            senderNote?: string;
        }) =>
            request<any>('/exchanges', { method: 'POST', body: JSON.stringify(data) }),
        respond: (id: string, data: {
            action: 'accept' | 'reject' | 'counter' | 'complete';
            note?: string;
            counterOffer?: string;
        }) =>
            request<any>(`/exchanges/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    },

    // ========== NOTIFICATIONS ==========
    notifications: {
        list: (unreadOnly = false) =>
            request<any>(`/notifications${unreadOnly ? '?unread=true' : ''}`),
        markRead: (notificationId?: string) =>
            request<any>('/notifications', {
                method: 'PUT',
                body: JSON.stringify(notificationId ? { notificationId } : { markAllRead: true }),
            }),
    },

    // ========== ANALYTICS ==========
    analytics: {
        getDashboard: () =>
            request<any>('/analytics'),
    },

    // ========== AI ==========
    ai: {
        getMatches: (resourceId: string) =>
            request<any>(`/ai/matches?resourceId=${resourceId}`),
        runMatchingJob: () =>
            request<any>('/ai/matches', { method: 'POST' }),
    },
};
