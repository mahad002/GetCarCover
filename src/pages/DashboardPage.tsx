import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../firebase/auth';
import { getUserQuotes } from '../firebase/insurance';
import { FileText, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { formatDateForDisplay } from '../services/vehicleApi';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }
        
        setUser(currentUser);
        loadQuotes(currentUser.uid);
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const loadQuotes = async (userId: string) => {
    setIsLoading(true);
    try {
      const userQuotes = await getUserQuotes(userId);
      setQuotes(userQuotes);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 size={12} className="mr-1" />
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} className="mr-1" />
            Pending
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle size={12} className="mr-1" />
            Expired
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };
  
  // Check if policy is active, expired, or pending based on dates
  const calculateStatus = (quote: any) => {
    const now = new Date();
    const startDate = new Date(quote.quoteSummary?.coverStart);
    const endDate = new Date(quote.quoteSummary?.coverEnd);
    
    if (now < startDate) {
      return 'pending';
    } else if (now > endDate) {
      return 'expired';
    } else {
      return 'active';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Your Dashboard</h1>
        <p className="text-gray-600 mb-8">
          View and manage your temporary insurance policies
        </p>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p>Loading your policies...</p>
          </div>
        ) : quotes.length === 0 ? (
          <Card className="text-center py-8">
            <div className="mb-4">
              <FileText size={48} className="mx-auto text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Policies Found</h2>
            <p className="text-gray-600 mb-6">
              You don't have any temporary insurance policies yet.
            </p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/quote')}
            >
              Get a Quote
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Your Policies</h2>
              <p className="text-gray-600">
                You have {quotes.length} {quotes.length === 1 ? 'policy' : 'policies'} in your account.
              </p>
            </div>
            
            {quotes.map((quote) => {
              const status = calculateStatus(quote);
              
              return (
                <Card key={quote.id} hoverable className="transform transition-all duration-200">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold mr-3">
                          {quote.vehicleInformation?.make} {quote.vehicleInformation?.model}
                        </h3>
                        {getStatusBadge(status)}
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        Registration: <span className="font-semibold">{quote.vehicleInformation?.registrationNumber}</span>
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Cover Start:</p>
                          <p className="font-medium">
                            {formatDateForDisplay(quote.quoteSummary?.coverStart)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Cover End:</p>
                          <p className="font-medium">
                            {formatDateForDisplay(quote.quoteSummary?.coverEnd)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6 md:text-right">
                      <p className="text-gray-500 text-sm mb-1">Policy Price:</p>
                      <p className="text-blue-800 font-bold text-xl mb-4">
                        £{quote.quoteSummary?.price}
                      </p>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<FileText size={16} />}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
            
            <div className="text-center mt-8">
              <Button 
                variant="primary"
                onClick={() => navigate('/quote')}
              >
                Get Another Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;