import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, LogOut } from 'lucide-react';
import { signOut } from '../../firebase/auth';
import Button from '../ui/Button';

interface HeaderProps {
  isLoggedIn?: boolean;
  userEmail?: string | null;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false, userEmail = null }) => {
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };
  
  return (
    <header className="bg-white py-4 px-6 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-blue-800 font-bold text-2xl">
          <Car size={28} />
          <span>QuickCover</span>
        </Link>
        
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </li>
            
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/dashboard" className="flex items-center gap-1 text-blue-600">
                    <User size={18} />
                    <span className="hidden md:inline">{userEmail}</span>
                  </Link>
                </li>
                <li>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                    icon={<LogOut size={16} />}
                  >
                    Sign Out
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">
                  <Button variant="primary" size="sm">
                    Log In
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;