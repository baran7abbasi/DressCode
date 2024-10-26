import React from 'react';

interface CircularProgressBarProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress, size = 100, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size}>
            <circle
                stroke="#e6e6e6"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                stroke="#4caf50" // Change color as needed
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.35s ease-in-out' }}
            />
        </svg>
    );
};

export default CircularProgressBar;
