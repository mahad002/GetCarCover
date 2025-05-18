import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { AccountInformation } from '../../types';

interface AccountFormProps {
  onSubmit: (data: AccountInformation) => void;
  onSkip: () => void;
  defaultValues?: Partial<AccountInformation>;
  isLoading?: boolean;
}

const AccountForm: React.FC<AccountFormProps> = ({ 
  onSubmit, 
  onSkip,
  defaultValues = {},
  isLoading = false
}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const password = watch('password', '');
  
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  
  return (
    <Card className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
          <Mail className="mr-2" />
          Create an account (Optional)
        </h2>
        
        <p className="text-gray-600 mb-6">
          Creating an account allows you to view your insurance details later and makes future purchases easier.
        </p>
        
        <div className="mb-4">
          <Input
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            {...register('emailAddress', { 
              required: 'Email address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
            error={errors.emailAddress?.message as string}
            leftIcon={<Mail size={18} />}
          />
        </div>
        
        <div className="mb-4">
          <Input
            label="Password"
            placeholder="Create a password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
              }
            })}
            error={errors.password?.message as string}
            leftIcon={<Lock size={18} />}
            rightIcon={
              <button type="button" onClick={toggleShowPassword} className="focus:outline-none">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
        </div>
        
        <div className="mb-6">
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            error={errors.confirmPassword?.message as string}
            leftIcon={<Lock size={18} />}
            rightIcon={
              <button type="button" onClick={toggleShowConfirmPassword} className="focus:outline-none">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
        </div>
        
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onSkip}
            className="w-full md:w-auto"
          >
            Continue without account
          </Button>
          
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isLoading}
            className="w-full md:w-auto"
          >
            Create account
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AccountForm;