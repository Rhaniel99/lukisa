import React from 'react';

const ThinkingIndicator = () => (
    <div className="flex items-center space-x-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
    </div>
);

export default ThinkingIndicator;
