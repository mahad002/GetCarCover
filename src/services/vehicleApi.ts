import { format } from 'date-fns';

const API_URL = import.meta.env.VITE_VEHICLE_API_URL;

interface VehicleApiResponse {
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  engineSize: number;
  fuelType: string;
  color: string;
}

// In a real application, this would make an actual API call
// For demo purposes, we're mocking the vehicle data
export const lookupVehicle = async (registrationNumber: string): Promise<VehicleApiResponse> => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data - in a real application, this would come from the API
    const vehicleData = {
      registrationNumber,
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      engineSize: 1.8,
      fuelType: 'Petrol',
      color: 'Silver'
    };
    
    return vehicleData;
  } catch (error) {
    console.error('Error looking up vehicle:', error);
    throw error;
  }
};

// Calculate insurance price based on vehicle details
export const calculatePrice = (
  vehicleData: Partial<VehicleApiResponse>,
  coverStartDate: Date, 
  coverEndDate: Date
): string => {
  // Basic calculation logic (demo purposes only)
  // In a real application, this would be more complex and likely server-side
  const durationInDays = Math.ceil((coverEndDate.getTime() - coverStartDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Base rate per day
  let baseRate = 15; 
  
  // Adjust based on vehicle details
  if (vehicleData.engineSize && vehicleData.engineSize > 2.0) {
    baseRate += 10;
  }
  
  if (vehicleData.year && vehicleData.year < 2015) {
    baseRate += 5;
  }
  
  // Calculate total price
  const totalPrice = baseRate * durationInDays;
  
  return totalPrice.toFixed(2);
};

export const formatDateForDisplay = (dateString: string): string => {
  return format(new Date(dateString), 'dd-MM-yyyy HH:mm');
};

export const formatDateForInput = (dateString: string): string => {
  return format(new Date(dateString), "yyyy-MM-dd'T'HH:mm");
};