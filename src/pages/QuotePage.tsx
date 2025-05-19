import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleLookupForm from '../components/forms/VehicleLookupForm';
import QuoteDetails from '../components/quote/QuoteDetails';
import DriverDetailsForm from '../components/forms/DriverDetailsForm';
import AccountForm from '../components/forms/AccountForm';
import PaymentForm from '../components/forms/PaymentForm';
import ConfirmationPage from '../components/quote/ConfirmationPage';
import ProgressSteps from '../components/ui/ProgressSteps';
import { lookupVehicle, calculatePrice } from '../services/vehicleApi';
import { createAccount, getCurrentUser } from '../firebase/auth';
import { saveQuote, completePayment } from '../firebase/insurance';
import { FormStep, InsuranceData } from '../types';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const QuotePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<FormStep>('vehicle-lookup');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [policyNumber, setPolicyNumber] = useState<string | null>(null);
  
  const [insuranceData, setInsuranceData] = useState<InsuranceData>({
    vehicleInformation: {
      registrationNumber: '',
      coverStart: '',
      coverEnd: ''
    },
    driverDetails: {
      fullName: '',
      dateOfBirth: '',
      address: {
        line1: '',
        line2: '',
        town: '',
        postCode: ''
      },
      phoneNumber: ''
    },
    accountInformation: {
      emailAddress: '',
      password: '',
      confirmPassword: ''
    },
    quoteSummary: {
      coverStart: '',
      coverEnd: '',
      price: ''
    }
  });
  
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  const steps = [
    { id: 'vehicle-lookup', label: 'Vehicle' },
    { id: 'quote', label: 'Quote' },
    { id: 'driver-details', label: 'Details' },
    { id: 'account', label: 'Account' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmation', label: 'Confirm' }
  ];
  
  const handleVehicleLookup = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get vehicle details
      const vehicleData = await lookupVehicle(data.registrationNumber);
      setVehicleDetails(vehicleData);
      
      // Format dates
      const formattedStartDate = format(data.coverStart, "yyyy-MM-dd'T'HH:mm:ss");
      const formattedEndDate = format(data.coverEnd, "yyyy-MM-dd'T'HH:mm:ss");
      
      // Calculate price
      const price = calculatePrice(vehicleData, data.coverStart, data.coverEnd);
      
      // Update insurance data
      setInsuranceData(prev => ({
        ...prev,
        vehicleInformation: {
          registrationNumber: data.registrationNumber,
          coverStart: formattedStartDate,
          coverEnd: formattedEndDate,
          ...vehicleData
        },
        quoteSummary: {
          coverStart: formattedStartDate,
          coverEnd: formattedEndDate,
          price,
          vehicleDetails: {
            make: vehicleData.make,
            model: vehicleData.model,
            year: vehicleData.year
          }
        }
      }));
      
      // Move to next step
      setCurrentStep('quote');
    } catch (error) {
      console.error('Error looking up vehicle:', error);
      setError('Failed to retrieve vehicle information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuoteContinue = () => {
    setCurrentStep('driver-details');
  };
  
  const handleDriverDetailsContinue = (data: any) => {
    setInsuranceData(prev => ({
      ...prev,
      driverDetails: data
    }));
    
    setCurrentStep('account');
  };
  
  const handleAccountContinue = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setInsuranceData(prev => ({
        ...prev,
        accountInformation: data
      }));
      
      if (!currentUser) {
        // Create user account
        await createAccount(data.emailAddress, data.password, insuranceData.driverDetails.fullName);
        const user = await getCurrentUser();
        setCurrentUser(user);
      }
      
      // Save quote to database
      const id = await saveQuote(
        currentUser?.uid || null, 
        {
          ...insuranceData,
          accountInformation: {
            emailAddress: data.emailAddress,
            password: '********', // Don't store actual password
            confirmPassword: '********'
          }
        }
      );
      
      setQuoteId(id);
      setCurrentStep('payment');
    } catch (error) {
      console.error('Error creating account:', error);
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAccountSkip = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate a temporary email for anonymous users
      const anonymousEmail = `temp_${Math.random().toString(36).substring(2)}@quickcover.temp`;
      
      // Update insurance data with temporary email
      setInsuranceData(prev => ({
        ...prev,
        accountInformation: {
          emailAddress: anonymousEmail,
          password: '',
          confirmPassword: ''
        }
      }));

      // Save anonymous quote
      const id = await saveQuote(
        null, 
        {
          ...insuranceData,
          accountInformation: {
            emailAddress: anonymousEmail,
            password: '',
            confirmPassword: ''
          }
        }
      );
      
      setQuoteId(id);
      setCurrentStep('payment');
    } catch (error) {
      console.error('Error saving quote:', error);
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePaymentComplete = async (paymentDetails: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (quoteId) {
        const result = await completePayment(quoteId, paymentDetails);
        
        if (result.success) {
          setPolicyNumber(result.policyNumber || `TEMP-${uuidv4().substring(0, 8).toUpperCase()}`);
          setCurrentStep('confirmation');
        } else {
          setError('Payment failed. Please try again.');
        }
      } else {
        throw new Error('Quote ID not found');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {currentStep !== 'confirmation' && (
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Temporary Car Insurance
          </h1>
          
          <ProgressSteps steps={steps} currentStep={currentStep} />
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      )}
      
      {currentStep === 'vehicle-lookup' && (
        <VehicleLookupForm 
          onSubmit={handleVehicleLookup} 
          isLoading={isLoading}
        />
      )}
      
      {currentStep === 'quote' && vehicleDetails && (
        <QuoteDetails 
          quote={insuranceData.quoteSummary}
          vehicleDetails={{
            ...vehicleDetails,
            registrationNumber: insuranceData.vehicleInformation.registrationNumber
          }}
          onContinue={handleQuoteContinue}
        />
      )}
      
      {currentStep === 'driver-details' && (
        <DriverDetailsForm 
          onSubmit={handleDriverDetailsContinue}
          defaultValues={insuranceData.driverDetails}
        />
      )}
      
      {currentStep === 'account' && (
        <AccountForm 
          onSubmit={handleAccountContinue}
          onSkip={handleAccountSkip}
          defaultValues={insuranceData.accountInformation}
          isLoading={isLoading}
        />
      )}
      
      {currentStep === 'payment' && (
        <PaymentForm 
          amount={insuranceData.quoteSummary.price}
          onSubmit={handlePaymentComplete}
          isLoading={isLoading}
        />
      )}
      
      {currentStep === 'confirmation' && policyNumber && (
        <ConfirmationPage 
          policyNumber={policyNumber}
          customerEmail={
            currentUser?.email || 
            insuranceData.accountInformation.emailAddress || 
            'your email'
          }
          registrationNumber={insuranceData.vehicleInformation.registrationNumber}
          coverStart={insuranceData.quoteSummary.coverStart}
          coverEnd={insuranceData.quoteSummary.coverEnd}
        />
      )}
    </div>
  );
};

export default QuotePage;