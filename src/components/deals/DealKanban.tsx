import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Settings } from 'lucide-react';
import { PIPELINES, STAGES } from '../../constants/deals';
import DealCard from './DealCard';
import { formatCurrency } from '../../utils/formatters';
import { Deal } from '../../types/deals';
import { Dialog, DialogContent } from '../ui/dialog';

interface DealKanbanProps {
  deals: Deal[];
  onDealClick: (dealId: string) => void;
  onDragEnd: (result: any) => void;
}

const DEFAULT_COLORS = {
  potential: '#E8F5E9',
  quote_requested: '#FFF3E0',
  work_requested: '#FFEBEE',
  planning: '#E3F2FD',
  assessment: '#F3E5F5',
  quoting: '#FFF8E1',
  waiting_approval: '#E0F7FA',
  in_progress: '#E8F5E9',
  completed: '#F1F8E9'
};

export default function DealKanban({ deals, onDealClick, onDragEnd }: DealKanbanProps) {
  const [stageColors, setStageColors] = React.useState(DEFAULT_COLORS);
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);

  const handleColorChange = (stageId: string, color: string) => {
    const newColors = { ...stageColors, [stageId]: color };
    setStageColors(newColors);
    try {
      localStorage.setItem('stage-colors', JSON.stringify(newColors));
    } catch (error) {
      console.error('Error saving colors:', error);
    }
  };

  const calculatePipelineTotal = (pipelineId: string): number => {
    return deals
      .filter(deal => deal.pipeline === pipelineId)
      .reduce((sum, deal) => sum + (deal.value || 0), 0);
  };

  const calculateStageTotal = (stageId: string): number => {
    return deals
      .filter(deal => deal.stage === stageId)
      .reduce((sum, deal) => sum + (deal.value || 0), 0);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Deal Pipeline</h2>
          <button
            onClick={() => setIsColorPickerOpen(true)}
            className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            <Settings className="w-4 h-4 mr-2" />
            Customize Colors
          </button>
        </div>

        {Object.entries(PIPELINES).map(([pipelineId, pipeline]) => {
          const pipelineStages = Object.entries(STAGES)
            .filter(([_, stage]) => stage.pipeline === pipelineId)
            .map(([stageId, stage]) => ({
              id: stageId,
              ...stage
            }));

          return (
            <div key={pipelineId} className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {pipeline.name}
                  </h3>
                  <span className="text-lg font-medium text-gray-700">
                    {formatCurrency(calculatePipelineTotal(pipelineId))}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {pipelineStages.map((stage) => {
                    const stageDeals = deals.filter(
                      (deal) => deal.stage === stage.id
                    );
                    const backgroundColor = stageColors[stage.id] || stage.color || DEFAULT_COLORS[stage.id];

                    return (
                      <Droppable key={`${pipelineId}-${stage.id}`} droppableId={stage.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex-shrink-0 w-72"
                          >
                            <div
                              className="rounded-lg p-4"
                              style={{ backgroundColor }}
                            >
                              <div className="flex justify-between items-center mb-4">
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {stage.name}
                                  </h4>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {formatCurrency(calculateStageTotal(stage.id))}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                {stageDeals.map((deal, index) => (
                                  <Draggable
                                    key={deal.id}
                                    draggableId={deal.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <DealCard
                                        deal={deal}
                                        onClick={onDealClick}
                                        provided={provided}
                                        snapshot={snapshot}
                                      />
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            </div>
                          </div>
                        )}
                      </Droppable>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
        <DialogContent>
          <h2 className="text-lg font-semibold mb-4">Customize Stage Colors</h2>
          <div className="space-y-4">
            {Object.entries(STAGES).map(([stageId, stage]) => (
              <div key={stageId} className="flex items-center justify-between">
                <span>{stage.name}</span>
                <input
                  type="color"
                  value={stageColors[stageId] || stage.color || DEFAULT_COLORS[stageId]}
                  onChange={(e) => handleColorChange(stageId, e.target.value)}
                  className="w-12 h-8 rounded cursor-pointer"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </DragDropContext>
  );
}