import React from "react";

interface Segment {
  value: number;
  color: string;
}

interface SegmentedCircularProgressbarProps {
  value: number;
  segments: Segment[];
  stroke: number;
}

interface CartesianCoordinate {
  x: number;
  y: number;
}

const SegmentedCircularProgressbar: React.FC<
  SegmentedCircularProgressbarProps
> = ({ value, segments, stroke }) => {
  const radius = 45;
  const strokeWidth = stroke;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const gapSize = 2; // Size of the gap between segments in degrees
  const fillPercentage = (value / 100) * (360 - segments.length * gapSize);
  let startAngle = -90; // Start from the top

  const createArc = (
    startAngle: number,
    endAngle: number,
    color: string
  ): string => {
    const start = polarToCartesian(50, 50, normalizedRadius, startAngle);
    const end = polarToCartesian(50, 50, normalizedRadius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${normalizedRadius} ${normalizedRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ): CartesianCoordinate => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-90">
      <circle
        cx="50"
        cy="50"
        r={normalizedRadius}
        fill="none"
        stroke="#e1e9ee"
        strokeWidth={strokeWidth}
      />
      {segments.map((segment, index) => {
        const segmentLength = (segment.value / value) * fillPercentage;
        const endAngle = startAngle + segmentLength;
        const path = createArc(
          startAngle,
          endAngle - gapSize / 2,
          segment.color
        );
        startAngle = endAngle + gapSize / 2;
        return (
          <path
            key={index}
            d={path}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </svg>
  );
};

export default SegmentedCircularProgressbar;
