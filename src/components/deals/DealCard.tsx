import React from 'react';
import { MessageSquare, CheckSquare, MapPin, Calendar, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Deal } from '../../types/deals';

type DraggableProvided = {
  draggableProps: any;
  dragHandleProps: any | null;
  innerRef: (element: HTMLElement | null) => void;
};

type DraggableStateSnapshot = {
  isDragging: boolean;
};

interface DealCardProps {
  deal: Deal;
  onClick: (dealId: string) => void;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const formatCurrency = (value: number): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  } catch {
    return `$${value}`;
  }
};

const DealCard = ({ deal, onClick, provided, snapshot }: DealCardProps) => {
  if (!deal) {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="bg-gray-50 rounded-lg shadow p-4"
      >
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>No deal data available</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!snapshot.isDragging) {
      onClick(deal.id);
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={handleClick}
      className={`bg-white rounded-lg shadow p-4 cursor-pointer
        ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500 ring-opacity-50' : ''}
        hover:shadow-md transition-shadow duration-200`}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{deal.name}</h3>
            <p className="text-sm text-gray-500 mt-1 truncate">{deal.company}</p>
          </div>
          <span className="text-sm font-medium text-gray-900 ml-2 whitespace-nowrap">
            {formatCurrency(deal.value)}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            className="p-1 hover:bg-gray-100 rounded" 
            title="Comments"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageSquare className="w-4 h-4 text-gray-500" />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded" 
            title="Tasks"
            onClick={(e) => e.stopPropagation()}
          >
            <CheckSquare className="w-4 h-4 text-gray-500" />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded" 
            title="Site Visits"
            onClick={(e) => e.stopPropagation()}
          >
            <MapPin className="w-4 h-4 text-gray-500" />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded" 
            title="Schedule"
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {deal.owner && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Owner</span>
            <span className="font-medium text-gray-900">{deal.owner}</span>
          </div>
        )}

        {deal.stage && (
          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${
                deal.stage === 'completed' ? 'bg-green-100 text-green-800' :
                deal.stage === 'waiting_approval' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {deal.stage.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealCard;