import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const siteVisitSchema = z.object({
  date: z.string(),
  time: z.string(),
  technician: z.string(),
  notes: z.string().optional(),
  location: z.string(),
});

type SiteVisitForm = z.infer<typeof siteVisitSchema>;

interface ScheduleSiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SiteVisitForm) => void;
}

export default function ScheduleSiteVisitModal({
  isOpen,
  onClose,
  onSubmit,
}: ScheduleSiteVisitModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteVisitForm>({
    resolver: zodResolver(siteVisitSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Schedule Site Visit</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              {...register('date')}
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              {...register('time')}
              type="time"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Technician</label>
            <select
              {...register('technician')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Technician</option>
              <option value="tech1">John Smith</option>
              <option value="tech2">Jane Doe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              {...register('location')}
              type="text"
              placeholder="Enter address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              {...register('notes')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Any special instructions or requirements..."
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
              Schedule Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}