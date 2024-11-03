import * as React from 'react';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {}
interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {}

export function Table({ className, ...props }: TableProps) {
  return (
    <table
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  );
}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead className={`[&_tr]:border-b ${className}`} {...props} />
  );
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />;
}

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={`border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50 ${className}`}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  );
}