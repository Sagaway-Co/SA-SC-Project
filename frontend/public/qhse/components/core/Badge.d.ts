import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. grade1–grade4 map to GB 6441 hazard grading. */
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
    | 'grade1' | 'grade2' | 'grade3' | 'grade4';
  /** soft = tinted fill; dot = leading status dot; outline = bordered. */
  variant?: 'soft' | 'dot' | 'outline';
  size?: 'sm' | 'md';
  children?: React.ReactNode;
}

/**
 * Compact status / metadata pill set in Geist Mono. Use for statuses,
 * counts, and hazard grades.
 */
export function Badge(props: BadgeProps): JSX.Element;
