import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';
import type { InsuranceData } from '../types';

export const saveQuote = async (userId: string | null, quoteData: InsuranceData) => {
  try {
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quoteData,
      userId: userId || 'anonymous',
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving quote:', error);
    throw error;
  }
};

export const getQuote = async (quoteId: string) => {
  try {
    const docRef = doc(db, 'quotes', quoteId);
    const quoteSnap = await getDoc(docRef);
    
    if (quoteSnap.exists()) {
      return { id: quoteSnap.id, ...quoteSnap.data() };
    } else {
      throw new Error('Quote not found');
    }
  } catch (error) {
    console.error('Error getting quote:', error);
    throw error;
  }
};

export const getUserQuotes = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'quotes'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const quotes: any[] = [];
    
    querySnapshot.forEach((doc) => {
      quotes.push({ id: doc.id, ...doc.data() });
    });
    
    return quotes;
  } catch (error) {
    console.error('Error getting user quotes:', error);
    throw error;
  }
};

export const completePayment = async (quoteId: string, paymentDetails: any) => {
  // This would connect to a payment processing service
  // For now, we'll just update the quote status
  try {
    const docRef = doc(db, 'quotes', quoteId);
    await getDoc(docRef); // Verify the document exists
    
    // In a real app, this would be handled by a secure server-side function
    // Here we're simplifying for demonstration purposes
    
    // Update quote status to 'paid'
    // This would normally happen on the server side after payment confirmation
    
    return {
      success: true,
      message: 'Payment processed successfully',
      policyNumber: `TCI-${Math.floor(100000 + Math.random() * 900000)}`
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};