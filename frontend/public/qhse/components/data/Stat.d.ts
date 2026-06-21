import React from 'react';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  /** Count-up duration in ms. */
  duration?: number;
  align?: 'left' | 'center';
}

/**
 * Animated count-up KPI metric — the marketing "trust number". Animates on
 * scroll-into-view.
 *
 * @startingPoint section="Data" subtitle="Animated count-up KPI metric" viewport="700x200"
 */
export function Stat(props: StatProps): JSX.Element;
