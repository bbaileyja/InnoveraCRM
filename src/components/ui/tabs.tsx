import * as React from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div data-value={value} className="tabs">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onChange: setValue });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={`flex space-x-1 rounded-lg bg-gray-100 p-1 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  return (
    <button
      className={`flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md ${
        value === value
          ? 'bg-white text-gray-900 shadow'
          : 'text-gray-600 hover:text-gray-900'
      } ${className}`}
      onClick={() => {}}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  return (
    <div
      className={`mt-2 ${className}`}
      style={{ display: value === value ? 'block' : 'none' }}
    >
      {children}
    </div>
  );
}