import type React from 'react';
import { useState } from 'react';

interface WatchListProps {
    stocks: string[];
    onAdd: (code: string) => void;
    onRemove: (code: string) => void;
    onAnalyze: (code: string) => void;
    isAnalyzing?: boolean;
    className?: string;
}

/**
 * 自选股管理面板
 * 展示自选股列表，支持添加、删除、点击分析
 */
export const WatchList: React.FC<WatchListProps> = ({
    stocks,
    onAdd,
    onRemove,
    onAnalyze,
    isAnalyzing = false,
    className = '',
}) => {
    const [inputCode, setInputCode] = useState('');

    const handleAdd = () => {
        const code = inputCode.trim().toUpperCase();
        if (!code) return;
        if (stocks.includes(code)) {
            setInputCode('');
            return;
        }
        onAdd(code);
        setInputCode('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className={`glass-card overflow-hidden flex flex-col ${className}`}>
            <div className="p-3">
                {/* 标题 */}
                <h2 className="text-xs font-medium text-purple uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    自选股
                    {stocks.length > 0 && (
                        <span className="text-muted font-normal">({stocks.length})</span>
                    )}
                </h2>

                {/* 股票列表 */}
                {stocks.length === 0 ? (
                    <div className="text-center py-4 text-muted text-xs">
                        暂无自选股，在下方添加
                    </div>
                ) : (
                    <div className="space-y-1 mb-2 max-h-[20vh] overflow-y-auto">
                        {stocks.map((code) => (
                            <div
                                key={code}
                                className="group flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                <button
                                    type="button"
                                    onClick={() => onAnalyze(code)}
                                    disabled={isAnalyzing}
                                    className="flex items-center gap-2 min-w-0 flex-1 text-left disabled:opacity-50"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 flex-shrink-0" />
                                    <span className="text-xs text-white font-mono truncate">{code}</span>
                                </button>
                                <button
                                    type="button"
                                    title="移除"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(code);
                                    }}
                                    className="p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-red-400 hover:bg-red-400/10 flex-shrink-0"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* 添加输入框 */}
                <div className="flex items-center gap-1.5 mt-1">
                    <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                        onKeyDown={handleKeyDown}
                        placeholder="输入代码添加"
                        className="flex-1 min-w-0 px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted/50 focus:outline-none focus:border-cyan/30 transition-colors"
                    />
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!inputCode.trim()}
                        className="p-1 rounded-lg bg-white/5 border border-white/10 text-muted hover:text-cyan hover:border-cyan/30 hover:bg-cyan/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WatchList;
