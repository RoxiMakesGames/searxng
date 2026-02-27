import React from 'react';
import { Search } from 'lucide-react';

export default function SearxngPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-8 h-8 text-cyan-400" />
        <h1 className="text-2xl font-bold text-white">SearXNG</h1>
        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-500">service</span>
      </div>
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
        <p className="text-slate-400 mb-4">Privacy-respecting metasearch engine for your Citadel.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded p-4">
            <div className="text-sm text-slate-500 mb-1">Status</div>
            <div className="text-emerald-400 font-medium">Available</div>
          </div>
          <div className="bg-slate-800/50 rounded p-4">
            <div className="text-sm text-slate-500 mb-1">Engines</div>
            <div className="text-cyan-400 font-medium">—</div>
          </div>
        </div>
        <p className="text-slate-600 text-sm mt-4 italic">Configure SearXNG integration in Settings → SearXNG.</p>
      </div>
    </div>
  );
}
