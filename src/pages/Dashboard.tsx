import React from 'react';
import { BarChart3, Users, DollarSign, Briefcase } from 'lucide-react';
import { useDealStore } from '../store/dealStore';
import { formatCurrency } from '../utils/formatters';

const StatCard = ({ title, value, icon: Icon, trend }: { 
  title: string; 
  value: string; 
  icon: React.ElementType;
  trend?: { value: string; positive: boolean };
}) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        {trend && (
          <p className={`text-sm mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value} vs last month
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-full">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const deals = useDealStore(state => state.deals);

  const calculatePipelineTotal = (pipeline: string) => {
    return deals
      .filter(deal => deal.pipeline === pipeline)
      .reduce((sum, deal) => sum + deal.value, 0);
  };

  const pipelineTotals = {
    preApproval: calculatePipelineTotal('pre_approval'),
    quoting: calculatePipelineTotal('quoting'),
    active: calculatePipelineTotal('active'),
    postWork: calculatePipelineTotal('post_work'),
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <select className="rounded-lg border-gray-300 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Pre-Approval Total" 
          value={formatCurrency(pipelineTotals.preApproval)}
          icon={BarChart3}
          trend={{ value: "12%", positive: true }}
        />
        <StatCard 
          title="Quoting Total" 
          value={formatCurrency(pipelineTotals.quoting)}
          icon={DollarSign}
          trend={{ value: "8%", positive: true }}
        />
        <StatCard 
          title="Active Total" 
          value={formatCurrency(pipelineTotals.active)}
          icon={Briefcase}
          trend={{ value: "15%", positive: true }}
        />
        <StatCard 
          title="Post-Work Total" 
          value={formatCurrency(pipelineTotals.postWork)}
          icon={Users}
          trend={{ value: "5%", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Deals</h2>
          <div className="space-y-4">
            {deals.slice(0, 3).map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{deal.name}</p>
                  <p className="text-sm text-gray-500">{deal.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{formatCurrency(deal.value)}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    deal.stage === 'potential' ? 'bg-green-100 text-green-800' :
                    deal.stage === 'quote_requested' ? 'bg-yellow-100 text-yellow-800' :
                    deal.stage === 'emergency' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {deal.stage.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Overview</h2>
          <div className="space-y-4">
            {Object.entries(pipelineTotals).map(([pipeline, total]) => (
              <div key={pipeline} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 capitalize">
                  {pipeline.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="font-medium text-gray-900">{formatCurrency(total)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}