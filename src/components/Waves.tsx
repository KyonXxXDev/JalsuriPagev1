import React from 'react';

interface WavesProps {
  /**
   * The solid fill color of the base (foreground) wave.
   * Defaults to '#0f172a' (corporate-900).
   */
  baseColor?: string;
  /**
   * Wave color variant
   */
  variant?: 'corporate' | 'ice' | 'cyan' | 'slate';
  /**
   * Whether to flip the wave vertically (useful for section headers)
   */
  flip?: boolean;
  className?: string;
}

export const Waves: React.FC<WavesProps> = ({
  baseColor,
  variant = 'corporate',
  flip = false,
  className = '',
}) => {
  // Preset color schemes for the 4 parallax layers
  const getLayerColors = () => {
    switch (variant) {
      case 'ice':
        return {
          layer1: 'rgba(224, 242, 254, 0.4)', // ice-100
          layer2: 'rgba(186, 230, 253, 0.6)', // ice-200
          layer3: 'rgba(125, 211, 252, 0.5)',
          layer4: baseColor || '#f0f9ff',      // ice-50
        };
      case 'cyan':
        return {
          layer1: 'rgba(34, 211, 238, 0.25)', // cyanbrand-400
          layer2: 'rgba(6, 182, 212, 0.45)',  // cyanbrand-500
          layer3: 'rgba(8, 145, 178, 0.65)',  // cyanbrand-600
          layer4: baseColor || '#0f172a',
        };
      case 'slate':
        return {
          layer1: 'rgba(29, 78, 216, 0.2)',   // corporate-700
          layer2: 'rgba(30, 64, 175, 0.35)',  // corporate-800
          layer3: 'rgba(15, 23, 42, 0.7)',    // corporate-900
          layer4: baseColor || '#0b1329',      // corporate-950
        };
      case 'corporate':
      default:
        return {
          layer1: 'rgba(6, 182, 212, 0.2)',   // cyanbrand
          layer2: 'rgba(29, 78, 216, 0.3)',   // corporate-700
          layer3: 'rgba(30, 64, 175, 0.5)',   // corporate-800
          layer4: baseColor || '#0f172a',      // corporate-900
        };
    }
  };

  const colors = getLayerColors();

  return (
    <div
      className={`waves-container pointer-events-none select-none ${
        flip ? 'rotate-180 -mt-1' : '-mb-1'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use href="#gentle-wave" x="48" y="0" fill={colors.layer1} />
          <use href="#gentle-wave" x="48" y="3" fill={colors.layer2} />
          <use href="#gentle-wave" x="48" y="5" fill={colors.layer3} />
          <use href="#gentle-wave" x="48" y="7" fill={colors.layer4} />
        </g>
      </svg>
    </div>
  );
};
