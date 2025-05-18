import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreditCard, Calendar, ShieldCheck, User } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface PaymentFormProps {
  amount: string;
  onSubmit: (paymentDetails: any) => void;
  isLoading?: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  onSubmit, 
  isLoading = false 
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const onFormSubmit = async (data: any) => {
    setIsProcessing(true);
    try {
      // In a real app, this would securely send payment details to a payment processor
      // For demo purposes, we're just simulating a payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onSubmit({
        cardNumber: data.cardNumber.replace(/\s/g, ''),
        expiryDate: data.expiryDate,
        cvv: data.cvv,
        nameOnCard: data.nameOnCard,
        success: true
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };
  
  return (
    <Card className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h2 className="text-2xl font-bold text-blue-800 mb-2 flex items-center">
          <CreditCard className="mr-2" />
          Payment Details
        </h2>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-800 font-medium">
            Total Amount: <span className="font-bold text-lg">£{amount}</span>
          </p>
        </div>
        
        <div className="mb-4">
          <Input
            label="Name on Card"
            placeholder="Name as it appears on the card"
            {...register('nameOnCard', { 
              required: 'Name on card is required' 
            })}
            error={errors.nameOnCard?.message as string}
            leftIcon={<User size={18} />}
          />
        </div>
        
        <div className="mb-4">
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            {...register('cardNumber', { 
              required: 'Card number is required',
              pattern: {
                value: /^[\d\s]{16,19}$/,
                message: 'Please enter a valid card number'
              },
              onChange: (e) => {
                e.target.value = formatCardNumber(e.target.value);
              }
            })}
            error={errors.cardNumber?.message as string}
            leftIcon={<CreditCard size={18} />}
            maxLength={19}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Input
            label="Expiry Date"
            placeholder="MM/YY"
            {...register('expiryDate', { 
              required: 'Expiry date is required',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                message: 'Please enter a valid expiry date (MM/YY)'
              }
            })}
            error={errors.expiryDate?.message as string}
            leftIcon={<Calendar size={18} />}
          />
          
          <Input
            label="CVV"
            placeholder="123"
            type="password"
            {...register('cvv', { 
              required: 'CVV is required',
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: 'Please enter a valid CVV'
              }
            })}
            error={errors.cvv?.message as string}
            leftIcon={<ShieldCheck size={18} />}
            maxLength={4}
          />
        </div>
        
        <div className="text-center">
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isLoading || isProcessing}
            size="lg"
            className="w-full md:w-auto"
          >
            Pay £{amount} Now
          </Button>
          
          <p className="mt-4 text-sm text-gray-600 flex items-center justify-center">
            <ShieldCheck size={16} className="text-green-500 mr-1" />
            Your payment details are encrypted and secure
          </p>
        </div>
      </form>
    </Card>
  );
};

export default PaymentForm;