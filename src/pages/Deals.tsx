import React, { useState } from 'react';
import { Plus, Search, Filter, LayoutGrid, Table2 } from 'lucide-react';
import DealTable from '../components/deals/DealTable';
import DealKanban from '../components/deals/DealKanban';
import NewDealModal from '../components/deals/NewDealModal';
import DealDetails from '../components/deals/DealDetails';
import { useDealStore } from '../store/dealStore';

export default function Deals() {
  const { deals, addDeal, moveDeal } = useDealStore();
  const [isTableView, setIsTableView] = useState(false);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDealClick = (dealId: string) => {
    setSelectedDealId(dealId);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const dealId = result.draggableId;
    const newStage = result.destination.droppableId;
    moveDeal(dealId, newStage);
  };

  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Deals</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTableView(false)}
              className={`p-2 rounded-md ${!isTableView ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsTableView(true)}
              className={`p-2 rounded-md ${isTableView ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
            >
              <Table2 className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setIsNewDealModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Deal
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search deals..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {isTableView ? (
        <DealTable deals={filteredDeals} onDealClick={handleDealClick} />
      ) : (
        <DealKanban deals={filteredDeals} onDealClick={handleDealClick} onDragEnd={handleDragEnd} />
      )}

      {selectedDealId && (
        <DealDetails
          dealId={selectedDealId}
          onClose={() => setSelectedDealId(null)}
        />
      )}

      <NewDealModal
        isOpen={isNewDealModalOpen}
        onClose={() => setIsNewDealModalOpen(false)}
        onSubmit={(data) => {
          addDeal(data);
          setIsNewDealModalOpen(false);
        }}
      />
    </div>
  );
}