import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Search, Car } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import DatePicker from '../ui/DatePicker';
import { format, add } from 'date-fns';

interface VehicleLookupFormProps {
  onSubmit: (data: {
    registrationNumber: string;
    coverStart: Date;
    coverEnd: Date;
  }) => void;
  isLoading?: boolean;
}

const VehicleLookupForm: React.FC<VehicleLookupFormProps> = ({ 
  onSubmit, 
  isLoading = false 
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [coverStart, setCoverStart] = useState<Date>(new Date());
  const [coverEnd, setCoverEnd] = useState<Date>(add(new Date(), { days: 1 }));
  
  const handleCoverStartChange = (date: Date | null) => {
    if (date) {
      setCoverStart(date);
      // Update end date to be at least 1 day after start date
      if (date >= coverEnd) {
        setCoverEnd(add(date, { days: 1 }));
      }
    }
  };
  
  const handleCoverEndChange = (date: Date | null) => {
    if (date && date > coverStart) {
      setCoverEnd(date);
    }
  };
  
  const onFormSubmit = (data: any) => {
    onSubmit({
      registrationNumber: data.registrationNumber,
      coverStart,
      coverEnd
    });
  };
  
  return (
    <Card className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
          <Car className="mr-2" />
          Vehicle Information
        </h2>
        
        <div className="mb-6">
          <Input
            label="Enter your registration number"
            placeholder="e.g., AB12CDE"
            {...register('registrationNumber', { 
              required: 'Registration number is required',
              pattern: {
                value: /^[A-Z0-9]{5,8}$/i,
                message: 'Please enter a valid UK registration number'
              }
            })}
            error={errors.registrationNumber?.message as string}
            leftIcon={<Car size={18} />}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <DatePicker
            label="When do you want your cover to start?"
            value={coverStart}
            onChange={handleCoverStartChange}
            minDate={new Date()}
            showTimeSelect
            dateFormat="MM/dd/yyyy h:mm aa"
          />
          
          <DatePicker
            label="When do you want your cover to end?"
            value={coverEnd}
            onChange={handleCoverEndChange}
            minDate={add(coverStart, { hours: 1 })}
            showTimeSelect
            dateFormat="MM/dd/yyyy h:mm aa"
          />
        </div>
        
        <div className="text-center">
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isLoading}
            size="lg"
            icon={<Search size={20} />}
            className="w-full md:w-auto"
          >
            Find vehicle
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default VehicleLookupForm;