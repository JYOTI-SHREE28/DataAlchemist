/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';

type Props = {
  data: any[];
  onEdit: (rowIndex: number, key: string, value: string) => void;
  cellErrors?: { row: number; column: string; message: string }[];
};

export default function DataGrid({ data, onEdit, cellErrors = [] }: Props) {
  const [editingCell, setEditingCell] = useState<{
    row: number;
    key: string;
  } | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [loadingFix, setLoadingFix] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<{ [key: string]: string }>({});

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
        <div className="text-center">
          <div className="text-2xl mb-2">📄</div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  const getError = (row: number, key: string) => {
    return cellErrors.find((err) => err.row === row && err.column === key);
  };

  const handleSuggestFix = async (error: {
    row: number;
    column: string;
    message: string;
  }) => {
    const originalValue = data[error.row][error.column];
    const fullRow = data[error.row];
    const key = `${error.row}-${error.column}`;
    setLoadingFix(key);

    try {
      const response = await fetch('/api/ai-fix-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          column: error.column,
          value: originalValue,
          message: error.message,
          row: fullRow,
          dataset: data,
        }),
      });

      const result = await response.json();
      const suggested = result.fix;

      if (suggested) {
        setSuggestions((prev) => ({
          ...prev,
          [key]: suggested,
        }));
      }
    } catch (err) {
      console.error('AI suggestion failed:', err);
    } finally {
      setLoadingFix(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-slate-50/50 transition-colors duration-150"
              >
                {headers.map((key) => {
                  const error = getError(rowIndex, key);
                  const isEditing =
                    editingCell?.row === rowIndex && editingCell?.key === key;
                  const suggestionKey = `${rowIndex}-${key}`;
                  const suggested = suggestions[suggestionKey];

                  return (
                    <td
                      key={key}
                      onClick={() => {
                        setEditingCell({ row: rowIndex, key });
                        setTempValue(typeof row[key] === 'string' ? row[key] : '');
                      }}
                      className={`px-4 py-3 cursor-pointer align-top transition-colors duration-150 ${
                        error 
                          ? 'bg-red-50 border-l-2 border-red-400' 
                          : row[key] === '' 
                          ? 'bg-amber-50 border-l-2 border-amber-300' 
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onBlur={() => {
                              onEdit(rowIndex, key, tempValue);
                              setEditingCell(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                onEdit(rowIndex, key, tempValue);
                                setEditingCell(null);
                              }
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                            autoFocus
                          />
                          {error && (
                            <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                              {error.message}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="text-slate-800">
                            {row[key] !== undefined && row[key] !== '' ? (
                              row[key]
                            ) : (
                              <span className="text-slate-400 italic text-xs">
                                Click to edit
                              </span>
                            )}
                          </span>

                          {error && (
                            <div className="space-y-2">
                              <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                                {error.message}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSuggestFix(error);
                                }}
                                disabled={loadingFix === suggestionKey}
                                className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                              >
                                {loadingFix === suggestionKey
                                  ? 'Generating...'
                                  : '✨ AI Fix'}
                              </button>

                              {suggested && (
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-3">
                                  <div className="text-xs text-emerald-800 mb-2">
                                    <span className="font-semibold">💡 AI Suggestion:</span>
                                  </div>
                                  <div className="text-xs text-emerald-700 mb-2 font-mono bg-white px-2 py-1 rounded">
                                    {suggested}
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEdit(rowIndex, key, suggested);
                                      setSuggestions((prev) => {
                                        const copy = { ...prev };
                                        delete copy[suggestionKey];
                                        return copy;
                                      });
                                    }}
                                    className="text-xs bg-emerald-500 text-white px-3 py-1 rounded-full hover:bg-emerald-600 transition-colors duration-200"
                                  >
                                    ✓ Apply Fix
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}