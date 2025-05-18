import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Car, Clock, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { QuoteSummary } from '../../types';
import { formatDateForDisplay } from '../../services/vehicleApi';

interface QuoteDetailsProps {
  quote: QuoteSummary;
  vehicleDetails?: {
    make?: string;
    model?: string;
    year?: number;
    registrationNumber: string;
  };
  onContinue: () => void;
}

const QuoteDetails: React.FC<QuoteDetailsProps> = ({ 
  quote, 
  vehicleDetails, 
  onContinue 
}) => {
  // Calculate duration in days
  const startDate = new Date(quote.coverStart);
  const endDate = new Date(quote.coverEnd);
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
  
  return (
    <Card className="w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
        <CheckCircle2 className="mr-2" />
        Your Quote
      </h2>
      
      {vehicleDetails && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 flex items-center mb-2">
            <Car size={18} className="mr-2 text-blue-600" />
            Vehicle Details
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Registration:</p>
              <p className="font-medium">{vehicleDetails.registrationNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Make/Model:</p>
              <p className="font-medium">
                {vehicleDetails.make} {vehicleDetails.model}
              </p>
            </div>
            {vehicleDetails.year && (
              <div>
                <p className="text-sm text-gray-500">Year:</p>
                <p className="font-medium">{vehicleDetails.year}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 flex items-center mb-2">
          <Calendar size={18} className="mr-2 text-blue-600" />
          Coverage Period
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Cover Start:</p>
            <p className="font-medium">{formatDateForDisplay(quote.coverStart)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cover End:</p>
            <p className="font-medium">{formatDateForDisplay(quote.coverEnd)}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500 flex items-center">
            <Clock size={16} className="mr-1 text-blue-600" />
            Duration: {durationDays} {durationDays === 1 ? 'day' : 'days'}
          </p>
        </div>
      </div>
      
      <motion.div 
        className="bg-blue-50 p-4 rounded-lg mb-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <p className="text-blue-800 font-medium">Total Price:</p>
          <p className="text-blue-800 font-bold text-2xl">£{quote.price}</p>
        </div>
      </motion.div>
      
      <div className="border-t border-gray-200 pt-4 mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">What's included:</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <CheckCircle2 size={16} className="mt-1 mr-2 text-green-500" />
            <span>Comprehensive coverage for the entire duration</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 size={16} className="mt-1 mr-2 text-green-500" />
            <span>24/7 roadside assistance</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 size={16} className="mt-1 mr-2 text-green-500" />
            <span>Accidental damage protection</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 size={16} className="mt-1 mr-2 text-green-500" />
            <span>Third-party liability cover</span>
          </li>
        </ul>
      </div>
      
      <div className="text-center">
        <Button 
          onClick={onContinue} 
          variant="primary" 
          size="lg"
          className="w-full md:w-auto"
        >
          Continue with this quote
        </Button>
      </div>
    </Card>
  );
};

export default QuoteDetails;