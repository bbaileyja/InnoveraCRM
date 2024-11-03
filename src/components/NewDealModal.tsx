import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const dealSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  contact: z.string().min(1, 'Contact is required'),
  description: z.string().min(1, 'Description is required'),
  dealNumber: z.string(),
  stage: z.string(),
  projectLeader: z.string(),
  technicalAssistant: z.string().optional(),
  services: z.string(),
  location: z.string(),
  dateReceived: z.string(),
  instructions: z.string(),
  siteVisitDate: z.string().optional(),
  amount: z.number().min(0),
  currency: z.string(),
  mainValueProp: z.string(),
  technologyProfile: z.string(),
  plannedEngagement: z.string(),
});

type DealForm = z.infer<typeof dealSchema>;

interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DealForm) => void;
}

export default function NewDealModal({ isOpen, onClose, onSubmit }: NewDealModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealForm>({
    resolver: zodResolver(dealSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">New Deal</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  {...register('company')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  {...register('contact')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.contact && (
                  <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Deal Number</label>
                <input
                  {...register('dealNumber')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Stage</label>
                <select
                  {...register('stage')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="potential">Potential Project</option>
                  <option value="quote">Quote Requested</option>
                  <option value="work">Work Requested</option>
                  <option value="planning">Planning</option>
                  <option value="assessment">Assessment/Site Visit</option>
                  <option value="quoting">Quoting Stage</option>
                  <option value="waiting">Waiting PO/Approval</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    {...register('amount', { valueAsNumber: true })}
                    type="number"
                    className="block w-full rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <select
                    {...register('currency')}
                    className="rounded-r-md border-l-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="JMD">JMD</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
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