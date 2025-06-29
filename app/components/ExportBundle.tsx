/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

interface ExportBundleProps {
  clients: any[];
  workers: any[];
  tasks: any[];
  rules: any[];
  prioritization: Record<string, number>;
}

export default function ExportBundle({
  clients,
  workers,
  tasks,
  rules,
  prioritization,
}: ExportBundleProps) {
  const exportAll = async () => {
    const zip = await import('jszip');
    const JSZip = zip.default;
    const zipFile = new JSZip();

    const addCSV = (name: string, data: any[]) => {
      const csv = Papa.unparse(data);
      zipFile.file(`${name}.csv`, csv);
    };

    addCSV('clients', clients);
    addCSV('workers', workers);
    addCSV('tasks', tasks);
    zipFile.file('rules.json', JSON.stringify(rules, null, 2));
    zipFile.file(
      'prioritization.json',
      JSON.stringify(prioritization, null, 2)
    );

    const content = await zipFile.generateAsync({ type: 'blob' });
    saveAs(content, 'data-bundle.zip');
  };

  const totalItems = clients.length + workers.length + tasks.length + rules.length + 1; // +1 for prioritization

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-sm border border-indigo-100 p-8 w-full">
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-2xl text-white">📦</span>
        </div>

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Export Data Bundle</h2>
          <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
            Download your cleaned and validated datasets along with custom rules and prioritization settings as a comprehensive ZIP package.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-600">{clients.length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Clients</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{workers.length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Workers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-teal-600">{tasks.length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-600">{rules.length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Rules</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">{totalItems}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Total Items</div>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={exportAll}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <span className="text-lg">⬇️</span>
          Export All Data
        </button>

        {/* File List */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">Package Contents</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              clients.csv
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              workers.csv
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
              tasks.csv
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              rules.json
            </div>
            <div className="flex items-center gap-2 text-slate-600 md:col-span-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              prioritization.json
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}