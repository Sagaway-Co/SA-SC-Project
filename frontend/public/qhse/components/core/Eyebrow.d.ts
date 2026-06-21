import React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Leading lime tick mark. */
  tick?: boolean;
  tone?: 'accent' | 'muted';
  children?: React.ReactNode;
}

/** Mono uppercase kicker label that sits above section headings. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
