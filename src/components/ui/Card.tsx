import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  hoverable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  elevation = 'medium',
  hoverable = false,
  onClick,
}) => {
  const elevationClasses = {
    none: 'shadow-none',
    low: 'shadow-sm',
    medium: 'shadow-md',
    high: 'shadow-lg',
  };
  
  const hoverClasses = hoverable
    ? 'transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
    : '';
  
  const cardClasses = `
    bg-white rounded-xl overflow-hidden
    ${elevationClasses[elevation]}
    ${hoverClasses}
    ${className}
  `;
  
  const cardContent = (
    <>
      {title && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className={`p-6 ${!title ? 'pt-6' : 'pt-4'}`}>{children}</div>
    </>
  );
  
  if (onClick) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={hoverable ? { y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } : {}}
        whileTap={hoverable ? { y: -2 } : {}}
      >
        {cardContent}
      </motion.div>
    );
  }
  
  return <div className={cardClasses}>{cardContent}</div>;
};

export default Card;