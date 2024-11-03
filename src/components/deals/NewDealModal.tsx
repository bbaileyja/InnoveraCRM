import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Deal } from '../../types/deals';

const dealSchema = z.object({
  name: z.string().min(1, 'Deal name is required'),
  company: z.string().min(1, 'Company is required'),
  value: z.number().min(0, 'Value must be positive'),
  pipeline: z.string(),
  stage: z.string(),
  owner: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

type DealFormData = z.infer<typeof dealSchema>;

interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Deal, 'id' | 'lastUpdated' | 'activities'>) => void;
}

export default function NewDealModal({ isOpen, onClose, onSubmit }: NewDealModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      pipeline: 'pre_approval',
      stage: 'potential',
      priority: 'medium',
    },
  });

  const onSubmitForm = (data: DealFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">New Deal</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Deal Name</label>
            <input
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              {...register('company')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Value</label>
            <input
              {...register('value', { valueAsNumber: true })}
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.value && (
              <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pipeline</label>
            <select
              {...register('pipeline')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pre_approval">Pre-Approval</option>
              <option value="quoting">Quoting</option>
              <option value="active">Active</option>
              <option value="post_work">Post Work</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stage</label>
            <select
              {...register('stage')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="potential">Potential</option>
              <option value="quote_requested">Quote Requested</option>
              <option value="emergency">Emergency</option>
              <option value="planning">Planning</option>
              <option value="site_visit">Site Visit</option>
              <option value="quoting">Quoting</option>
              <option value="waiting_approval">Waiting Approval</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              {...register('priority')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Deal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}