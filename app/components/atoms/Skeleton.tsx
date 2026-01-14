import React from 'react';


export default function Skeleton({ className = '' }: { className?: string }) {
return <div className={`bg-gray-700 animate-shimmer rounded ${className}`} />;
}