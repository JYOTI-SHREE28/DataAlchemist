/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';

export default function NLRuleInput({ onRule }: { onRule: (r: any) => void }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleConvert = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const res = await fetch('/api/nl-to-rule', {
        method: 'POST',
        body: JSON.stringify({ prompt: text }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.rule) {
        onRule(data.rule);
        setText('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || 'Failed to convert rule.');
      }
    } catch {
      setError('Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exampleRules = [
    "Ensure T5 and T7 always run together",
    "Limit group Alpha to maximum 3 tasks per phase",
    "Task T12 can only run in phases 2, 3, or 4",
    "Workers in team Beta need at least 2 common time slots"
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-lg text-white">🤖</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">AI Rule Generator</h3>
          <p className="text-sm text-slate-600">Describe your rule in plain English</p>
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <textarea
          className="w-full border border-amber-200 rounded-xl p-4 text-sm resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
          rows={3}
          placeholder="e.g., Ensure T5 and T7 always run together..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              handleConvert();
            }
          }}
        />

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Press Cmd/Ctrl + Enter to convert
          </span>
          <button
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-xl font-medium hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            onClick={handleConvert}
            disabled={loading || !text.trim()}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⚙️</span>
                Converting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>✨</span>
                Convert to Rule
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <span>❌</span>
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <span>✅</span>
          Rule converted successfully!
        </div>
      )}

      {/* Example Rules */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <span>💡</span>
          Example Rules
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {exampleRules.map((rule, idx) => (
            <button
              key={idx}
              onClick={() => setText(rule)}
              className="text-left text-xs bg-white/60 hover:bg-white/80 border border-amber-200 hover:border-amber-300 text-slate-600 p-3 rounded-lg transition-all duration-200 hover:shadow-sm"
            >
              {rule}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}