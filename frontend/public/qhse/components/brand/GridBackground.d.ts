import React from 'react';

export interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Line grid or dot grid. */
  variant?: 'grid' | 'dots';
  /** Drifting accent glow orbs. */
  glow?: boolean;
  /** Radial mask that fades the grid out toward the edges. */
  fade?: boolean;
  /** Glow opacity multiplier (0–1+). */
  intensity?: number;
}

/**
 * Animated technical backdrop (perspective grid + drifting glow). Place as
 * the first child of a relative section, behind content.
 *
 * @startingPoint section="Brand" subtitle="Animated grid + glow hero backdrop" viewport="700x300"
 */
export function GridBackground(props: GridBackgroundProps): JSX.Element;
