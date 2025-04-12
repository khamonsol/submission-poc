import { atom } from 'jotai';
import { selectedIsoAtom } from '@/shared/atoms/iso';
import { selectedProductAtom } from '@/shared/atoms/products';
import { selectedTraderNameAtom } from '@/shared/atoms/account';
import { tradeDateAtom } from '@/shared/atoms/dates';
import { apiFilePayloadAtom } from '@/shared/atoms/fileData';

// Import ISO-specific APIs
import * as ErcotAPI from '@/shared/api/ercotSubmissionApi';
import * as PjmisoAPI from '@/shared/api/pjmisoSubmissionApi';
import * as NeisoAPI from '@/shared/api/neisoSubmissionApi';
import * as CaisoAPI from '@/shared/api/caisoSubmissionApi';
import * as MisoAPI from '@/shared/api/misoSubmissionApi';
import * as NyisoAPI from '@/shared/api/nyisoSubmissionApi';
import * as SppisoAPI from '@/shared/api/sppisoSubmissionApi';

// Function to format the date as YYYY-MM-DD
const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toISOString().split('T')[0];
};

// Define submission function type to handle password prompts and various API parameters
type SubmissionFunction = (config?: {
  password?: string;
}) => Promise<any>;

// Helper function to handle API responses and errors consistently
const handleApiRequest = async (apiCall: () => Promise<any>): Promise<any> => {
  try {
    return await apiCall();
  } catch (error: any) {
    // If the error has response data from Axios
    if (error.response) {
      // Check the content type to see if it's plain text
      const contentType = error.response.headers?.['content-type'] || '';
      
      if (contentType.includes('text/plain')) {
        // For plain text responses, create a structured error
        const statusText = error.response.statusText || '';
        const statusCode = error.response.status || 500;
        const plainTextMessage = error.response.data || '';
        
        // Extract correlation ID if present in the message
        const correlationMatch = plainTextMessage.match(/correlation:?\s*([a-f0-9-]+)/i);
        const correlationId = correlationMatch ? correlationMatch[1] : '';
        
        // Create a structured error object
        throw {
          status_code: statusCode,
          message: statusCode === 401 ? 'Unauthorized' : statusText,
          details: {
            error: plainTextMessage,
            correlation_id: correlationId
          }
        };
      } else if (error.response.data) {
        // For JSON responses, just pass through the data
        throw error.response.data;
      } else {
        // For other response types with no data
        throw {
          status_code: error.response.status || 500,
          message: error.response.statusText || 'API Error',
          details: { error: `HTTP ${error.response.status}` }
        };
      }
    }
    // Otherwise rethrow the original error
    throw error;
  }
};

// Interface for the submission payload
export interface SubmissionPayload {
  iso: string;
  product: string;
  traderName: string;
  formattedDate: string;
  apiPayload: any[];
  isValid: boolean;
  submit: SubmissionFunction;
  requiresPassword: boolean;
}

// Atom that prepares the submission payload
export const submissionPayloadAtom = atom<SubmissionPayload>((get) => {
  const selectedIso = get(selectedIsoAtom);
  const selectedProduct = get(selectedProductAtom);
  const traderName = get(selectedTraderNameAtom);
  const tradeDate = get(tradeDateAtom);
  const apiPayload = get(apiFilePayloadAtom);
  
  // Format the date as YYYY-MM-DD
  const formattedDate = formatDate(tradeDate);
  const typedPayload = Array.isArray(apiPayload) ? apiPayload : [];
  
  // Determine if the payload is valid
  const isValid = Boolean(
    selectedIso && 
    selectedProduct && 
    traderName && 
    formattedDate && 
    typedPayload.length > 0
  );
  
  // Default values
  let submit: SubmissionFunction = async () => {
    throw new Error('No submission function available for the selected ISO and product');
  };
  let requiresPassword = false;
  
  // Determine the submission function based on ISO and product
  if (isValid) {
    switch (selectedIso) {
      case 'ERCOT':
        if (selectedProduct.includes('Virtual')) {
          if (selectedProduct.includes('Bid')) {
            submit = async () => {
              return await handleApiRequest(() => ErcotAPI.submitVirtualBids(
                traderName,
                formattedDate,
                typedPayload as ErcotAPI.Virtual[]
              ));
            };
          } else if (selectedProduct.includes('Offer')) {
            submit = async () => {
              return await handleApiRequest(() => ErcotAPI.submitVirtualOffers(
                traderName,
                formattedDate,
                typedPayload as ErcotAPI.Virtual[]
              ));
            };
          }
        } else if (selectedProduct === 'UTC/Spread') {
          submit = async () => {
            return await handleApiRequest(() => ErcotAPI.submitSpreads(
              traderName,
              formattedDate,
              typedPayload as ErcotAPI.Spread[]
            ));
          };
        }
        break;
        
      case 'PJMISO':
        requiresPassword = true;
        if (selectedProduct.includes('Virtual')) {
          submit = async (config) => {
            if (!config?.password) throw new Error('Password is required for PJM submissions');
            return await handleApiRequest(() => PjmisoAPI.submitVirtualBids(
              traderName,
              config.password as string,
              formattedDate,
              typedPayload as PjmisoAPI.Virtual[]
            ));
          };
        } else if (selectedProduct === 'UTC/Spread') {
          submit = async (config) => {
            if (!config?.password) throw new Error('Password is required for PJM submissions');
            return await handleApiRequest(() => PjmisoAPI.submitSpreads(
              traderName,
              config.password as string,
              formattedDate,
              typedPayload as PjmisoAPI.Spread[]
            ));
          };
        }
        break;
        
      case 'NEISO':
        submit = async () => {
          return await handleApiRequest(() => NeisoAPI.submitVirtualBids(
            traderName,
            formattedDate,
            typedPayload as NeisoAPI.Virtual[]
          ));
        };
        break;
        
      case 'CAISO':
        submit = async () => {
          return await handleApiRequest(() => CaisoAPI.submitVirtualBids(
            traderName,
            formattedDate,
            typedPayload as CaisoAPI.Virtual[]
          ));
        };
        break;
        
      case 'MISO':
        submit = async () => {
          return await handleApiRequest(() => MisoAPI.submitVirtualBids(
            traderName,
            formattedDate,
            typedPayload as MisoAPI.MisoVirtual[]
          ));
        };
        break;
        
      case 'NYISO':
        requiresPassword = true;
        submit = async (config) => {
          if (!config?.password) throw new Error('Password is required for NYISO submissions');
          return await handleApiRequest(() => NyisoAPI.submitVirtualBids(
            traderName,
            config.password as string,
            formattedDate,
            typedPayload as NyisoAPI.Virtual[]
          ));
        };
        break;
        
      case 'SPPISO':
        submit = async () => {
          return await handleApiRequest(() => SppisoAPI.submitVirtualBids(
            traderName,
            formattedDate,
            typedPayload as SppisoAPI.SppisoVirtual[]
          ));
        };
        break;
    }
  }
  
  return {
    iso: selectedIso,
    product: selectedProduct,
    traderName,
    formattedDate,
    apiPayload: typedPayload,
    isValid,
    submit,
    requiresPassword
  };
}); 