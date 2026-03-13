import { create } from 'zustand';
import { api } from '@/lib/api-client';

export interface Resource {
    id: string;
    name: string;
    category: string;
    description: string;
    estimatedValue: number;
    tags: string[];
    condition: string;
    imageUrl?: string;
    status: 'available' | 'in-negotiation' | 'exchanged';
    ownerId: string;
    owner?: {
        id: string;
        name: string;
        image?: string;
        reputation: number;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Exchange {
    id: string;
    senderId: string;
    receiverId: string;
    sender?: { id: string; name: string; image?: string; reputation: number };
    receiver?: { id: string; name: string; image?: string; reputation: number };
    offeredResource?: Resource;
    requestedResource?: Resource;
    status: 'pending' | 'negotiating' | 'completed' | 'cancelled';
    aiMatchScore: number;
    blockchainTxHash?: string;
    senderNote?: string;
    receiverNote?: string;
    counterOffer?: string;
    createdAt: string;
    completedAt?: string;
}

export interface AIAgent {
    id: string;
    name: string;
    type: 'matcher' | 'negotiator' | 'validator' | 'analyst';
    status: 'idle' | 'scanning' | 'negotiating' | 'processing';
    efficiency: number;
    matchesFound: number;
    avatar: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    walletAddress?: string;
    bio?: string;
    reputation: number;
    level: number;
    levelName: string;
    xp: number;
    xpProgress?: number;
    nextLevelXP?: number;
    totalExchanges: number;
    createdAt: string;
    _count?: {
        resources: number;
        sentExchanges: number;
        receivedExchanges: number;
        achievements: number;
    };
}

export interface MarketMetrics {
    networkValue: number;
    networkValueChange: number;
    activeUsers: number;
    activeUsersChange: number;
    exchangeVolume: number;
    volumeChange: number;
    aiEfficiency: number;
    efficiencyChange: number;
    avgMatchTime: number;
    matchTimeChange: number;
    satisfaction: number;
    totalResources?: number;
    totalExchanges?: number;
    completedExchanges?: number;
}

export interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    read: boolean;
    link?: string;
    createdAt: string;
}

interface BarterStore {
    // UI State
    activeTab: string;
    setActiveTab: (tab: string) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;

    // Loading states
    loading: {
        profile: boolean;
        resources: boolean;
        exchanges: boolean;
        metrics: boolean;
        notifications: boolean;
    };

    // User State
    currentUser: UserProfile | null;
    isWalletConnected: boolean;
    setWalletConnected: (connected: boolean) => void;

    // Data
    resources: Resource[];
    exchanges: Exchange[];
    agents: AIAgent[];
    metrics: MarketMetrics;
    notifications: Notification[];
    unreadCount: number;

    // API Actions
    fetchProfile: () => Promise<void>;
    fetchResources: (params?: any) => Promise<void>;
    fetchExchanges: (params?: any) => Promise<void>;
    fetchMetrics: () => Promise<void>;
    fetchNotifications: () => Promise<void>;
    
    // CRUD Actions
    createResource: (data: any) => Promise<Resource>;
    updateResource: (id: string, data: any) => Promise<void>;
    deleteResource: (id: string) => Promise<void>;
    createExchange: (data: any) => Promise<Exchange>;
    respondToExchange: (id: string, data: any) => Promise<void>;
    markNotificationsRead: (id?: string) => Promise<void>;
    updateProfile: (data: any) => Promise<void>;

    // Local actions
    addNotificationLocal: (message: string, type: string) => void;
}

// AI Agents are simulated on the frontend (they don't have a database yet)
const SIMULATED_AGENTS: AIAgent[] = [
    { id: 'agent-1', name: 'NOVA', type: 'matcher', status: 'scanning', efficiency: 96.2, matchesFound: 1247, avatar: '🤖' },
    { id: 'agent-2', name: 'ATLAS', type: 'negotiator', status: 'negotiating', efficiency: 94.8, matchesFound: 892, avatar: '🧠' },
    { id: 'agent-3', name: 'SENTINEL', type: 'validator', status: 'processing', efficiency: 99.1, matchesFound: 2156, avatar: '🛡️' },
    { id: 'agent-4', name: 'ORACLE', type: 'analyst', status: 'scanning', efficiency: 97.5, matchesFound: 1563, avatar: '🔮' },
    { id: 'agent-5', name: 'CIPHER', type: 'matcher', status: 'idle', efficiency: 93.7, matchesFound: 734, avatar: '⚡' },
    { id: 'agent-6', name: 'NEXUS', type: 'negotiator', status: 'scanning', efficiency: 95.4, matchesFound: 1089, avatar: '🌐' },
];

const DEFAULT_METRICS: MarketMetrics = {
    networkValue: 0,
    networkValueChange: 0,
    activeUsers: 0,
    activeUsersChange: 0,
    exchangeVolume: 0,
    volumeChange: 0,
    aiEfficiency: 0,
    efficiencyChange: 0,
    avgMatchTime: 0,
    matchTimeChange: 0,
    satisfaction: 0,
};

export const useBarterStore = create<BarterStore>((set, get) => ({
    // UI State
    activeTab: 'dashboard',
    setActiveTab: (tab) => set({ activeTab: tab }),
    sidebarOpen: true,
    setSidebarOpen: (open) => set({ sidebarOpen: open }),

    // Loading
    loading: {
        profile: false,
        resources: false,
        exchanges: false,
        metrics: false,
        notifications: false,
    },

    // User
    currentUser: null,
    isWalletConnected: false,
    setWalletConnected: (connected) => set({ isWalletConnected: connected }),

    // Data
    resources: [],
    exchanges: [],
    agents: SIMULATED_AGENTS,
    metrics: DEFAULT_METRICS,
    notifications: [],
    unreadCount: 0,

    // ========== FETCH ACTIONS ==========

    fetchProfile: async () => {
        set((s) => ({ loading: { ...s.loading, profile: true } }));
        try {
            const user = await api.user.getProfile();
            set({ currentUser: user });
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            set((s) => ({ loading: { ...s.loading, profile: false } }));
        }
    },

    fetchResources: async (params) => {
        set((s) => ({ loading: { ...s.loading, resources: true } }));
        try {
            const data = await api.resources.list(params);
            set({ resources: data.resources || [] });
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        } finally {
            set((s) => ({ loading: { ...s.loading, resources: false } }));
        }
    },

    fetchExchanges: async (params) => {
        set((s) => ({ loading: { ...s.loading, exchanges: true } }));
        try {
            const data = await api.exchanges.list(params);
            set({ exchanges: data.exchanges || [] });
        } catch (error) {
            console.error('Failed to fetch exchanges:', error);
        } finally {
            set((s) => ({ loading: { ...s.loading, exchanges: false } }));
        }
    },

    fetchMetrics: async () => {
        set((s) => ({ loading: { ...s.loading, metrics: true } }));
        try {
            const data = await api.analytics.getDashboard();
            set({ metrics: data.metrics || DEFAULT_METRICS });
        } catch (error) {
            console.error('Failed to fetch metrics:', error);
        } finally {
            set((s) => ({ loading: { ...s.loading, metrics: false } }));
        }
    },

    fetchNotifications: async () => {
        set((s) => ({ loading: { ...s.loading, notifications: true } }));
        try {
            const data = await api.notifications.list();
            set({
                notifications: data.notifications || [],
                unreadCount: data.unreadCount || 0,
            });
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            set((s) => ({ loading: { ...s.loading, notifications: false } }));
        }
    },

    // ========== CRUD ACTIONS ==========

    createResource: async (data) => {
        const resource = await api.resources.create(data);
        set((s) => ({ resources: [resource, ...s.resources] }));
        return resource;
    },

    updateResource: async (id, data) => {
        const updated = await api.resources.update(id, data);
        set((s) => ({
            resources: s.resources.map((r) => (r.id === id ? updated : r)),
        }));
    },

    deleteResource: async (id) => {
        await api.resources.delete(id);
        set((s) => ({
            resources: s.resources.filter((r) => r.id !== id),
        }));
    },

    createExchange: async (data) => {
        const exchange = await api.exchanges.create(data);
        set((s) => ({ exchanges: [exchange, ...s.exchanges] }));
        return exchange;
    },

    respondToExchange: async (id, data) => {
        const updated = await api.exchanges.respond(id, data);
        set((s) => ({
            exchanges: s.exchanges.map((e) => (e.id === id ? { ...e, ...updated } : e)),
        }));
    },

    markNotificationsRead: async (id) => {
        await api.notifications.markRead(id);
        if (id) {
            set((s) => ({
                notifications: s.notifications.map((n) =>
                    n.id === id ? { ...n, read: true } : n
                ),
                unreadCount: Math.max(0, s.unreadCount - 1),
            }));
        } else {
            set((s) => ({
                notifications: s.notifications.map((n) => ({ ...n, read: true })),
                unreadCount: 0,
            }));
        }
    },

    updateProfile: async (data) => {
        const updated = await api.user.updateProfile(data);
        set((s) => ({
            currentUser: s.currentUser ? { ...s.currentUser, ...updated } : null,
        }));
    },

    // Local
    addNotificationLocal: (message, type) =>
        set((s) => ({
            notifications: [
                {
                    id: crypto.randomUUID(),
                    type,
                    title: type === 'success' ? 'Success' : 'Info',
                    message,
                    read: false,
                    createdAt: new Date().toISOString(),
                },
                ...s.notifications,
            ],
        })),
}));
