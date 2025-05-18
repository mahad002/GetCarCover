import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Phone, MapPin, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import DatePicker from '../ui/DatePicker';
import { DriverDetails } from '../../types';
import { format, subYears } from 'date-fns';

interface DriverDetailsFormProps {
  onSubmit: (data: DriverDetails) => void;
  defaultValues?: Partial<DriverDetails>;
  isLoading?: boolean;
}

const DriverDetailsForm: React.FC<DriverDetailsFormProps> = ({ 
  onSubmit, 
  defaultValues = {},
  isLoading = false
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(
    defaultValues.dateOfBirth ? new Date(defaultValues.dateOfBirth) : null
  );
  
  const minAge = 17; // Minimum age for driving in the UK
  const maxDate = subYears(new Date(), minAge);
  
  const onFormSubmit = (data: any) => {
    if (!dateOfBirth) return;
    
    onSubmit({
      ...data,
      dateOfBirth: format(dateOfBirth, 'yyyy-MM-dd')
    });
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
          <User className="mr-2" />
          Driver Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Full Name"
            placeholder="Enter Full name"
            {...register('fullName', { 
              required: 'Full name is required' 
            })}
            error={errors.fullName?.message as string}
            leftIcon={<User size={18} />}
          />
          
          <div className="mb-0">
            <DatePicker
              label="Date of Birth (Min age: 17 years)"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              maxDate={maxDate}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select your date of birth"
              error={!dateOfBirth ? 'Date of birth is required' : undefined}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Address line 1"
            placeholder="Address line 1"
            {...register('address.line1', { 
              required: 'Address line 1 is required' 
            })}
            error={errors.address?.line1?.message as string}
            leftIcon={<MapPin size={18} />}
          />
          
          <Input
            label="Address line 2"
            placeholder="Address line 2 (optional)"
            {...register('address.line2')}
            leftIcon={<MapPin size={18} />}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Town"
            placeholder="Town"
            {...register('address.town', { 
              required: 'Town is required' 
            })}
            error={errors.address?.town?.message as string}
            leftIcon={<MapPin size={18} />}
          />
          
          <Input
            label="Post Code"
            placeholder="Post Code"
            {...register('address.postCode', { 
              required: 'Post code is required',
              pattern: {
                value: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
                message: 'Please enter a valid UK post code'
              }
            })}
            error={errors.address?.postCode?.message as string}
            leftIcon={<MapPin size={18} />}
          />
        </div>
        
        <div className="mb-6">
          <Input
            label="Phone Number"
            placeholder="Phone Number"
            {...register('phoneNumber', { 
              required: 'Phone number is required',
              pattern: {
                value: /^(?:(?:\+44)|(?:0))(?:(?:(?:7(?:[1-4]\d\d|5[0-2]\d|5[4-9]\d\d|6\d{2}|[7-9]\d{2}))|(?:8(?:[0-2]\d{2}|[3-9]\d{2}))))\d{6}$/,
                message: 'Please enter a valid UK phone number'
              }
            })}
            error={errors.phoneNumber?.message as string}
            leftIcon={<Phone size={18} />}
          />
        </div>
        
        <div className="flex justify-center">
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isLoading}
            size="lg"
            className="w-full md:w-auto"
          >
            Continue
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DriverDetailsForm;