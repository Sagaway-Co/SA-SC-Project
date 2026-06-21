import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` is the glowing lime CTA. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Element/icon rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Element/icon rendered after the label. */
  iconRight?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Render as another tag, e.g. 'a' for links. */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}

/**
 * Primary action control for HSE Check. Glowing lime `primary` for the one
 * key action per view; `secondary`/`outline`/`ghost` for everything else.
 *
 * @startingPoint section="Core" subtitle="Buttons in every variant & size" viewport="700x220"
 */
export function Button(props: ButtonProps): JSX.Element;
