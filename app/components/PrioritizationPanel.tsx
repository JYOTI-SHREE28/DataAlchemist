'use client';

import React from 'react';
import { saveAs } from 'file-saver';

type Props = {
  prioritization: Record<string, number>;
  setPrioritization: React.Dispatch<React.SetStateAction<Record<string, number>>>;
};

const DEFAULT_WEIGHTS = {
  priorityLevel: 5,
  fulfillment: 5,
  fairness: 5,
  workload: 5,
};

const PRESETS = {
  maximizeFulfillment: {
    priorityLevel: 2,
    fulfillment: 10,
    fairness: 3,
    workload: 5,
  },
  fairDistribution: {
    priorityLevel: 4,
    fulfillment: 4,
    fairness: 10,
    workload: 5,
  },
};

const PRIORITY_CONFIGS = [
  {
    key: 'priorityLevel',
    label: 'Priority Level',
    description: 'Weight for task priority importance',
    icon: '🎯',
    color: 'red'
  },
  {
    key: 'fulfillment',
    label: 'Fulfillment',
    description: 'Weight for task completion goals',
    icon: '✅',
    color: 'emerald'
  },
  {
    key: 'fairness',
    label: 'Fairness',
    description: 'Weight for equitable distribution',
    icon: '⚖️',
    color: 'blue'
  },
  {
    key: 'workload',
    label: 'Workload',
    description: 'Weight for balanced work distribution',
    icon: '📊',
    color: 'purple'
  },
];

export default function PrioritizationPanel({
  prioritization,
  setPrioritization,
}: Props) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(prioritization, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'prioritization.json');
  };

  const getIntensityColor = (value: number, baseColor: string) => {
    const intensity = Math.floor((value / 10) * 5) + 1;
    return `bg-${baseColor}-${intensity * 100}`;
  };

  const totalWeight = Object.values(prioritization).reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl text-white">⚖️</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Prioritization Settings</h2>
            <p className="text-slate-600 text-sm">Configure algorithm weights and preferences</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-800">{totalWeight}</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Total Weight</div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <span>🚀</span>
          Quick Presets
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setPrioritization(PRESETS.maximizeFulfillment)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span>🎯</span>
              Maximize Fulfillment
            </span>
          </button>
          <button
            onClick={() => setPrioritization(PRESETS.fairDistribution)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span>⚖️</span>
              Fair Distribution
            </span>
          </button>
          <button
            onClick={() => setPrioritization(DEFAULT_WEIGHTS)}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-300 transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <span>↻</span>
              Reset Default
            </span>
          </button>
        </div>
      </div>

      {/* Weight Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <span>🎛️</span>
          Fine-tune Weights
        </h3>
        <div className="space-y-4">
          {PRIORITY_CONFIGS.map(({ key, label, description, icon, color }) => {
            const value = prioritization[key] || 0;
            const percentage = totalWeight > 0 ? ((value / totalWeight) * 100).toFixed(1) : '0';
            
            return (
              <div key={key} className="bg-slate-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <div>
                      <h4 className="font-medium text-slate-800">{label}</h4>
                      <p className="text-xs text-slate-600">{description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-800">{value}</div>
                    <div className="text-xs text-slate-500">{percentage}%</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={value}
                    onChange={(e) =>
                      setPrioritization({ ...prioritization, [key]: Number(e.target.value) })
                    }
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider-${color}`}
                    style={{
                      background: `linear-gradient(to right, rgb(148 163 184) 0%, rgb(148 163 184) ${value * 10}%, rgb(226 232 240) ${value * 10}%, rgb(226 232 240) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weight Distribution Visualization */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <span>📊</span>
          Weight Distribution
        </h3>
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex rounded-lg overflow-hidden h-4">
            {PRIORITY_CONFIGS.map(({ key, color }, idx) => {
              const value = prioritization[key] || 0;
              const width = totalWeight > 0 ? (value / totalWeight) * 100 : 0;
              return (
                <div
                  key={key}
                  className={`bg-${color}-500 transition-all duration-500`}
                  style={{ width: `${width}%` }}
                  title={`${key}: ${value} (${width.toFixed(1)}%)`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-600">
            {PRIORITY_CONFIGS.map(({ key, label }) => (
              <span key={key} className="text-center">
                {label}: {prioritization[key] || 0}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        onClick={handleExport}
      >
        <span className="flex items-center justify-center gap-2">
          <span>💾</span>
          Export Prioritization Config
        </span>
      </button>
    </div>
  );
}