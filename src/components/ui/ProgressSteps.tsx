import React from 'react';
import { motion } from 'framer-motion';
import { FormStep } from '../../types';

interface ProgressStepsProps {
  steps: {
    id: FormStep;
    label: string;
  }[];
  currentStep: FormStep;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between px-2">
        {steps.map((step, index) => {
          const isActive = index <= currentIndex;
          const isCompleted = index < currentIndex;
          
          return (
            <React.Fragment key={step.id}>
              {/* Circle indicator */}
              <motion.div
                className={`
                  relative z-10 flex items-center justify-center h-8 w-8 rounded-full
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
                initial={false}
                animate={{ 
                  backgroundColor: isActive ? '#2563EB' : '#E5E7EB',
                  color: isActive ? '#FFFFFF' : '#6B7280' 
                }}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </motion.div>
              
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="flex-1 relative mx-2">
                  <div className="absolute top-1/2 h-0.5 w-full bg-gray-200" />
                  <motion.div
                    className="absolute top-1/2 h-0.5 bg-blue-600"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: isCompleted ? '100%' : (index < currentIndex ? '50%' : '0%') 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Step labels */}
      <div className="flex items-center justify-between mt-2 px-1 text-xs">
        {steps.map((step, index) => {
          const isActive = index <= currentIndex;
          
          return (
            <div
              key={`label-${step.id}`}
              className={`text-center w-16 -ml-4 ${
                isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}
              style={{
                marginLeft: index === 0 ? 0 : undefined,
                marginRight: index === steps.length - 1 ? 0 : undefined,
              }}
            >
              {step.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;