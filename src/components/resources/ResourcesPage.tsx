'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBarterStore } from '@/store/barterStore';
import toast from 'react-hot-toast';
import {
    Package,
    Plus,
    Search,
    Edit3,
    Trash2,
    Eye,
    X,
    Tag,
    DollarSign,
    FileText,
    Loader2,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.28, 0.84, 0.42, 1] as [number, number, number, number] } },
};

export default function ResourcesPage() {
    const { resources, fetchResources, createResource, deleteResource, loading } = useBarterStore();
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [submitting, setSubmitting] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        estimatedValue: '',
        tags: '',
        condition: 'good',
    });

    // Fetch resources on mount
    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    const handleSubmit = async () => {
        if (!formData.name || !formData.description || !formData.category || !formData.estimatedValue) {
            toast.error('Please fill in all required fields');
            return;
        }
        setSubmitting(true);
        try {
            await createResource({
                name: formData.name,
                description: formData.description,
                category: formData.category,
                estimatedValue: parseFloat(formData.estimatedValue),
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                condition: formData.condition,
            });
            toast.success('Resource listed successfully!');
            setShowAddModal(false);
            setFormData({ name: '', description: '', category: '', estimatedValue: '', tags: '', condition: 'good' });
            fetchResources(); // Refresh
        } catch (error: any) {
            toast.error(error.message || 'Failed to create resource');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete "${name}"?`)) return;
        try {
            await deleteResource(id);
            toast.success('Resource deleted');
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete');
        }
    };

    const filteredResources = searchQuery
        ? resources.filter(r =>
              r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              r.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : resources;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-5"
        >
            {/* Hero */}
            <motion.div variants={item} className="liquid-glass-hero p-6 md:p-7">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="ios-title-1 text-label-primary mb-1.5">
                            My <span className="text-ios-blue">Resources</span>
                        </h1>
                        <p className="text-label-secondary max-w-lg text-[15px]">
                            Manage listed resources, update details, and track exchange status.
                        </p>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-ios-blue text-label-primary text-[14px] font-semibold rounded-full shadow-ios-md"
                    >
                        <Plus className="w-4 h-4" strokeWidth={2} />
                        List Resource
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Total Listed', value: resources.length.toString(), color: '#007AFF' },
                    { label: 'Available', value: resources.filter(r => r.status === 'available').length.toString(), color: '#34C759' },
                    { label: 'In Negotiation', value: resources.filter(r => r.status === 'in-negotiation').length.toString(), color: '#FF9500' },
                    { label: 'Total Value', value: '$' + (resources.reduce((s, r) => s + r.estimatedValue, 0) / 1000).toFixed(1) + 'K', color: '#5AC8FA' },
                ].map((s, i) => (
                    <motion.div key={i} variants={item} className="ios-card p-4 text-center">
                        <p className="text-[22px] font-bold tracking-tight" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-[11px] text-label-tertiary mt-1">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Table */}
            <motion.div variants={item} className="ios-card overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-separator">
                    <h3 className="text-[15px] font-semibold text-label-primary flex items-center gap-2">
                        <Package className="w-4 h-4 text-ios-blue" strokeWidth={1.8} />
                        All Resources
                        {loading.resources && <Loader2 className="w-3.5 h-3.5 animate-spin text-label-tertiary" />}
                    </h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-label-tertiary" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-fill-quaternary rounded-[10px] pl-9 pr-3 py-1.5 text-[13px] text-label-primary placeholder-label-quaternary focus:outline-none focus:bg-fill-tertiary w-44 transition-colors"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {filteredResources.length === 0 ? (
                        <div className="py-16 text-center">
                            <Package className="w-10 h-10 text-label-quaternary mx-auto mb-3" />
                            <p className="text-[15px] text-label-secondary">No resources yet</p>
                            <p className="text-[13px] text-label-tertiary mt-1">Click "List Resource" to add your first one</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-separator">
                                    <th className="py-3 px-4 text-left text-[11px] text-label-tertiary font-medium">Resource</th>
                                    <th className="py-3 px-4 text-left text-[11px] text-label-tertiary font-medium">Category</th>
                                    <th className="py-3 px-4 text-left text-[11px] text-label-tertiary font-medium">Value</th>
                                    <th className="py-3 px-4 text-left text-[11px] text-label-tertiary font-medium">Status</th>
                                    <th className="py-3 px-4 text-left text-[11px] text-label-tertiary font-medium">Tags</th>
                                    <th className="py-3 px-4 text-left text-[11px] text-label-tertiary font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResources.map((resource, i) => (
                                    <motion.tr
                                        key={resource.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="border-b border-separator/50 hover:bg-fill-quaternary transition-colors group"
                                    >
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[14px] ${resource.category === 'Computing' ? 'bg-[#5AC8FA]/12' :
                                                        resource.category === 'Data' ? 'bg-[#AF52DE]/12' :
                                                            resource.category === 'Services' ? 'bg-[#FF2D55]/12' : 'bg-[#FF9500]/12'}`}>
                                                    {resource.category === 'Computing' ? '💻' :
                                                        resource.category === 'Data' ? '📊' :
                                                            resource.category === 'Services' ? '🛠️' : '📚'}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-medium text-label-primary">{resource.name}</p>
                                                    <p className="text-[11px] text-label-quaternary truncate max-w-[180px]">{resource.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 text-[13px] text-label-secondary">{resource.category}</td>
                                        <td className="py-3.5 px-4 text-[13px] font-semibold text-label-primary">${resource.estimatedValue.toLocaleString()}</td>
                                        <td className="py-3.5 px-4">
                                            <span className={`ios-badge ${resource.status === 'available' ? 'bg-ios-green/12 text-ios-green' :
                                                    resource.status === 'in-negotiation' ? 'bg-ios-orange/12 text-ios-orange' : 'bg-ios-blue/12 text-ios-blue'}`}>
                                                {resource.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex gap-1">
                                                {resource.tags?.slice(0, 2).map(tag => (
                                                    <span key={tag} className="px-1.5 py-0.5 rounded-md bg-fill-quaternary text-[10px] text-label-tertiary">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {(resource.tags?.length || 0) > 2 && (
                                                    <span className="px-1.5 py-0.5 rounded-md bg-fill-quaternary text-[10px] text-label-quaternary">
                                                        +{resource.tags.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded-[8px] hover:bg-fill-tertiary text-label-tertiary hover:text-label-primary transition-all">
                                                    <Eye className="w-3.5 h-3.5" strokeWidth={1.8} />
                                                </button>
                                                <button className="p-1.5 rounded-[8px] hover:bg-fill-tertiary text-label-tertiary hover:text-label-primary transition-all">
                                                    <Edit3 className="w-3.5 h-3.5" strokeWidth={1.8} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(resource.id, resource.name)}
                                                    className="p-1.5 rounded-[8px] hover:bg-ios-red/10 text-label-tertiary hover:text-ios-red transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </motion.div>

            {/* Add Resource Modal — DYNAMIC */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 12 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 12 }}
                            transition={{ duration: 0.25, ease: [0.28, 0.84, 0.42, 1] }}
                            className="relative w-full max-w-lg ios-material-ultra rounded-[20px] border border-separator shadow-ios-xl"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-separator">
                                <h2 className="text-[17px] font-bold text-label-primary">List New Resource</h2>
                                <button onClick={() => setShowAddModal(false)} className="p-1 rounded-full hover:bg-fill-tertiary text-label-tertiary">
                                    <X className="w-5 h-5" strokeWidth={1.8} />
                                </button>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="text-[13px] text-label-secondary block mb-1.5 flex items-center gap-1">
                                        <FileText className="w-3 h-3" strokeWidth={1.8} />
                                        Resource Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g., GPU Computing Time"
                                        className="w-full bg-fill-quaternary rounded-[12px] px-4 py-3 text-[15px] text-label-primary placeholder-label-quaternary focus:outline-none focus:bg-fill-tertiary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-[13px] text-label-secondary block mb-1.5">Description *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe your resource..."
                                        rows={3}
                                        className="w-full bg-fill-quaternary rounded-[12px] px-4 py-3 text-[15px] text-label-primary placeholder-label-quaternary focus:outline-none focus:bg-fill-tertiary transition-colors resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[13px] text-label-secondary block mb-1.5 flex items-center gap-1">
                                            <Tag className="w-3 h-3" strokeWidth={1.8} />
                                            Category *
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-fill-quaternary rounded-[12px] px-4 py-3 text-[15px] text-label-primary focus:outline-none focus:bg-fill-tertiary transition-colors"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Computing">Computing</option>
                                            <option value="Data">Data</option>
                                            <option value="Services">Services</option>
                                            <option value="Education">Education</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[13px] text-label-secondary block mb-1.5 flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" strokeWidth={1.8} />
                                            Est. Value ($) *
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.estimatedValue}
                                            onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                                            placeholder="0"
                                            className="w-full bg-fill-quaternary rounded-[12px] px-4 py-3 text-[15px] text-label-primary placeholder-label-quaternary focus:outline-none focus:bg-fill-tertiary transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[13px] text-label-secondary block mb-1.5">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="GPU, AI, Machine Learning"
                                        className="w-full bg-fill-quaternary rounded-[12px] px-4 py-3 text-[15px] text-label-primary placeholder-label-quaternary focus:outline-none focus:bg-fill-tertiary transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 p-5 border-t border-separator">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="px-5 py-2.5 rounded-full bg-fill-tertiary text-label-secondary text-[14px] font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="px-6 py-2.5 rounded-full bg-ios-blue text-label-primary text-[14px] font-semibold shadow-ios-md disabled:opacity-50 flex items-center gap-2"
                                >
                                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    List Resource
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
