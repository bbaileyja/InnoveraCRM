import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={`p-6 border-b border-gray-200 ${className}`} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={`p-6 ${className}`} {...props} />;
}