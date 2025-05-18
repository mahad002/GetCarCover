import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Car, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Temporary Car Insurance In Minutes
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Quick, flexible coverage from 1 hour to 30 days. No long-term commitments.
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                <Link to="/quote">
                  <Button size="lg" variant="primary" className="w-full md:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full md:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg" 
                alt="Car with insurance protection" 
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose QuickCover?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make temporary car insurance simple, fast, and affordable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Instant Coverage</h3>
              <p className="text-gray-600 text-center">
                Get insured in minutes. Our streamlined process gets you covered when you need it most.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <ShieldCheck className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Comprehensive Protection</h3>
              <p className="text-gray-600 text-center">
                Full coverage including accidental damage, fire, theft and third-party liability.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Car className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Flexible Duration</h3>
              <p className="text-gray-600 text-center">
                From hours to weeks, choose exactly how long you need coverage for without long-term commitments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to get your temporary car insurance
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="hidden md:block absolute left-[50px] top-0 bottom-0 w-0.5 bg-blue-100 z-0"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                <motion.div 
                  className="flex flex-col md:flex-row items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-600 text-white w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold z-10 mb-4 md:mb-0 mx-auto md:mx-0">
                    1
                  </div>
                  <div className="md:ml-8 md:mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Enter Your Vehicle Details</h3>
                    <p className="text-gray-600 md:max-w-lg text-center md:text-left">
                      Simply enter your vehicle registration number and we'll retrieve all the necessary details.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col md:flex-row items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-600 text-white w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold z-10 mb-4 md:mb-0 mx-auto md:mx-0">
                    2
                  </div>
                  <div className="md:ml-8 md:mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Customize Your Coverage</h3>
                    <p className="text-gray-600 md:max-w-lg text-center md:text-left">
                      Select your coverage duration and provide driver details to get your personalized quote.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col md:flex-row items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-600 text-white w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold z-10 mb-4 md:mb-0 mx-auto md:mx-0">
                    3
                  </div>
                  <div className="md:ml-8 md:mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Pay & Get Insured</h3>
                    <p className="text-gray-600 md:max-w-lg text-center md:text-left">
                      Make a secure payment and receive your insurance documents instantly via email.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/quote">
                <Button size="lg" variant="primary">
                  Get Your Quote Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - see what others have to say
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "So easy to use! I needed insurance for a day to drive my friend's car and got covered in less than 5 minutes."
              </p>
              <div className="font-semibold">Sarah T.</div>
              <div className="text-sm text-gray-500">London</div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The price was much better than I expected for temporary coverage. Documents arrived instantly in my inbox."
              </p>
              <div className="font-semibold">James M.</div>
              <div className="text-sm text-gray-500">Manchester</div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Had to borrow my parent's car for a weekend trip. QuickCover made it hassle-free and affordable."
              </p>
              <div className="font-semibold">Emily R.</div>
              <div className="text-sm text-gray-500">Edinburgh</div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Covered?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Temporary car insurance that fits your schedule, not the other way around.
          </p>
          <Link to="/quote">
            <Button 
              size="lg" 
              variant="primary"
              className="bg-white text-blue-700 hover:bg-gray-100"
            >
              Get Started Now
            </Button>
          </Link>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center">
              <CheckCircle className="text-blue-300 mr-2" />
              <span>Instant coverage</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-blue-300 mr-2" />
              <span>No long-term commitments</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-blue-300 mr-2" />
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;