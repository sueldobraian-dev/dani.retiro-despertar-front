import React from 'react';

interface DespertarIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
  rayStrokeWidth?: number | string;
}

export function DespertarIcon({
  size,
  className = '',
  strokeWidth = 2,
  rayStrokeWidth = 1.3,
  width,
  height,
  ...props
}: DespertarIconProps) {
  const iconWidth = size || width || 24;
  const iconHeight = size || height || 24;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Eye / Horizon contour (ampliado para mayor uso de espacio) */}
      <path d="M 1 15.5 C 5 22.5 19 22.5 23 15.5" />
      <path d="M 1 15.5 C 5 11.2 19 11.2 23 15.5" />

      {/* Sun Circle (sol a medio salir) */}
      <circle cx="12" cy="12" r="4.9" fill="currentColor" stroke="none" />

      {/* Sun Rays (rayos más finos) */}
      <g strokeWidth={rayStrokeWidth}>
        <line x1="12" y1="6.0" x2="12" y2="3.4" />
        <line x1="9.1" y1="6.9" x2="7.8" y2="4.6" />
        <line x1="14.9" y1="6.9" x2="16.2" y2="4.6" />
        <line x1="7.2" y1="8.7" x2="5.1" y2="7.1" />
        <line x1="16.8" y1="8.7" x2="18.9" y2="7.1" />
        <line x1="6.3" y1="10.7" x2="3.7" y2="10.7" />
        <line x1="17.7" y1="10.7" x2="20.3" y2="10.7" />
      </g>
    </svg>
  );
}

export default DespertarIcon;
