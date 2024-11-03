import React from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import { Deal } from '../../types/deals';

interface DealTableProps {
  deals: Deal[];
  onDealClick: (dealId: string) => void;
}

const DealTable = ({ deals, onDealClick }: DealTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Deal Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow
              key={deal.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onDealClick(deal.id)}
            >
              <TableCell className="font-medium">{deal.name}</TableCell>
              <TableCell>{deal.company}</TableCell>
              <TableCell>{formatCurrency(deal.value)}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  deal.stage === 'emergency' ? 'bg-red-100 text-red-800' :
                  deal.stage === 'potential' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {deal.stage.replace('_', ' ').toUpperCase()}
                </span>
              </TableCell>
              <TableCell>{deal.owner}</TableCell>
              <TableCell>{formatDate(deal.lastUpdated)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DealTable;