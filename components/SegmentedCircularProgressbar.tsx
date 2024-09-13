import React from 'react';

interface Segment {
  value: number;
  color: string;
}

interface SegmentedCircularProgressbarProps {
  value: number;
  segments: Segment[];
}

const SegmentedCircularProgressbar: React.FC<SegmentedCircularProgressbarProps> = ({ value, segments }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = (value / 100) * circumference;
  let startAngle = -90;
  let totalValue = 0;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full transform">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="#e0e0e0" strokeWidth="7" />
      {segments.map((segment, index) => {
        const segmentPercentage = (segment.value / value) * fillPercentage;
        const segmentLength = (segmentPercentage / circumference) * 360;
        totalValue += segment.value;
        const endAngle = startAngle + segmentLength;
        const largeArcFlag = segmentLength > 180 ? 1 : 0;
        const x1 = 50 + radius * Math.cos((startAngle * Math.PI) / 180);
        const y1 = 50 + radius * Math.sin((startAngle * Math.PI) / 180);
        const x2 = 50 + radius * Math.cos((endAngle * Math.PI) / 180);
        const y2 = 50 + radius * Math.sin((endAngle * Math.PI) / 180);

        const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

        startAngle = endAngle;
        return <path key={index} d={pathData} fill="none" stroke={segment.color} strokeWidth="7" />;
      })}
      <text x="50" y="50" textAnchor="middle" dy="0.3em" className="font-bold text-3xl fill-current transform rotate-90">
        {value}
      </text>
    </svg>
  );
};

export default SegmentedCircularProgressbar;