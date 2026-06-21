import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  iconLeft?: React.ReactNode;
  size?: 'md' | 'lg';
}

/** Dark-UI text field with label, lime focus ring, and optional leading icon. */
export function Input(props: InputProps): JSX.Element;
