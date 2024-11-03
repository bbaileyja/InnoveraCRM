import React from 'react';
import { MapPin } from 'lucide-react';

function JobCards() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Job Cards</h1>
      </div>
      
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Job Cards</h3>
            <p className="mt-1 text-sm text-gray-500">
              Coming soon. This feature will allow you to manage site visits and materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCards;