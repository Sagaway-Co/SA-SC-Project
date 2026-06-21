import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: number | string;
  /** Hover lift + accent border. */
  interactive?: boolean;
  /** Ambient accent halo for featured/"live" cards. */
  glow?: boolean;
  /** Cursor-follow radial spotlight (feature-grid effect). */
  spotlight?: boolean;
  children?: React.ReactNode;
}

/**
 * Layered surface container — the base building block for feature grids,
 * panels, and dashboard tiles.
 *
 * @startingPoint section="Core" subtitle="Surface card with hover/glow/spotlight" viewport="700x260"
 */
export function Card(props: CardProps): JSX.Element;
