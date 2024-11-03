import React, { useState } from 'react';
import { useDealStore } from '../../store/dealStore';
import {
  MessageSquare,
  FileText,
  MapPin,
  Calendar,
  X,
  Save,
  Trash2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Deal } from '../../types/deals';

interface DealDetailsProps {
  dealId: string | null;
  onClose: () => void;
}

export default function DealDetails({ dealId, onClose }: DealDetailsProps) {
  const { deals, updateDeal, deleteDeal } = useDealStore();
  const [isEditing, setIsEditing] = useState(false);
  const deal = deals.find(d => d.id === dealId);
  
  const [formData, setFormData] = useState<Partial<Deal>>({
    name: deal?.name || '',
    company: deal?.company || '',
    value: deal?.value || 0,
    pipeline: deal?.pipeline || 'pre_approval',
    stage: deal?.stage || 'potential',
    owner: deal?.owner || '',
    description: deal?.description || '',
    priority: deal?.priority || 'medium'
  });

  if (!deal || !dealId) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? Number(value) : value
    }));
  };

  const handleSave = () => {
    updateDeal(dealId, formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      deleteDeal(dealId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Deal' : 'Deal Details'}
          </h2>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
            {isEditing && (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </>
            )}
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Deal Name</label>
                {isEditing ? (
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-gray-700">{deal.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                {isEditing ? (
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-gray-700">{deal.company}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Value</label>
                {isEditing ? (
                  <Input
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-gray-700">${deal.value?.toLocaleString()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Pipeline</label>
                {isEditing ? (
                  <Select
                    name="pipeline"
                    value={formData.pipeline}
                    onChange={handleInputChange}
                  >
                    <option value="pre_approval">Pre-Approval</option>
                    <option value="quoting">Quoting</option>
                    <option value="active">Active</option>
                    <option value="post_work">Post Work</option>
                  </Select>
                ) : (
                  <p className="text-gray-700">{deal.pipeline}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stage</label>
                {isEditing ? (
                  <Select
                    name="stage"
                    value={formData.stage}
                    onChange={handleInputChange}
                  >
                    <option value="potential">Potential</option>
                    <option value="quote_requested">Quote Requested</option>
                    <option value="emergency">Emergency</option>
                    <option value="planning">Planning</option>
                    <option value="site_visit">Site Visit</option>
                    <option value="quoting">Quoting</option>
                    <option value="waiting_approval">Waiting Approval</option>
                    <option value="closed">Closed</option>
                  </Select>
                ) : (
                  <p className="text-gray-700">{deal.stage}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                {isEditing ? (
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-700">{deal.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                {isEditing ? (
                  <Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                ) : (
                  <p className="text-gray-700 capitalize">{deal.priority}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Updated</label>
                <p className="text-gray-700">
                  {new Date(deal.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-4 flex justify-between items-center">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Comments
            </Button>
            <Button variant="ghost" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Tasks
            </Button>
            <Button variant="ghost" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Site Visits
            </Button>
            <Button variant="ghost" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
          {isEditing && (
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Deal
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}