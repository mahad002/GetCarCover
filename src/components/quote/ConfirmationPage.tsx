import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, Mail, FileText } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ConfirmationPageProps {
  policyNumber: string;
  customerEmail: string;
  registrationNumber: string;
  coverStart: string;
  coverEnd: string;
  isPolicyReady?: boolean;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  policyNumber,
  customerEmail,
  registrationNumber,
  coverStart,
  coverEnd,
  isPolicyReady = true
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block bg-green-100 p-4 rounded-full mb-4"
          >
            <CheckCircle2 size={64} className="text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 text-lg">
            Your temporary car insurance has been purchased successfully.
          </p>
        </div>
        
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
            <FileText size={20} className="mr-2" />
            Policy Details
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <div>
                <p className="text-sm text-gray-500">Policy Number:</p>
                <p className="font-semibold">{policyNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status:</p>
                <p className="font-semibold text-green-600 flex items-center">
                  <CheckCircle2 size={16} className="mr-1" />
                  Active
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <div>
                <p className="text-sm text-gray-500">Vehicle Registration:</p>
                <p className="font-semibold">{registrationNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email:</p>
                <p className="font-semibold">{customerEmail}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Cover Start:</p>
                <p className="font-semibold">{new Date(coverStart).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cover End:</p>
                <p className="font-semibold">{new Date(coverEnd).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <Button 
              variant="outline" 
              size="md" 
              icon={<Download size={18} />}
              className="w-full"
            >
              Download Policy Documents
            </Button>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 flex items-start">
                <Mail size={18} className="mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  We've sent your policy documents to <strong>{customerEmail}</strong>. 
                  Please check your inbox (and spam folder) for emails from QuickCover.
                </span>
              </p>
            </div>
          </div>
        </Card>
        
        <div className="text-center">
          <Link to="/">
            <Button variant="primary">
              Return to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;