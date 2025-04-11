// src/shared/neiso-api.ts
import { getSubmissionBase } from '@beyond/api'

// Virtual bid/offer interface
export interface Virtual {
  node: string;
  node_id: number;
  he: string;
  tranche: number;
  mw: number;
  price: number;
}

// Virtual delete interface
export interface VirtualDelete {
  node: string;
  node_id: number;
}

// Virtual validation request interface
export interface VirtualValidationRequest {
  bids?: Virtual[];
  offers?: Virtual[];
}

// API response interface
export interface ApiResponse {
  message: string;
  status_code: number;
  correlation_id: string;
}

// Error context interface
export interface ErrorContext {
  error: string;
  context: object;
}

// Error summary interface
export interface ErrorSummary {
  correlation_id: string;
  errors: ErrorContext[];
}

/**
 * Validates virtual bids and offers
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param data The virtual validation request data
 * @returns Promise with API response
 */
export async function validateVirtuals(
  accountName: string,
  tradeDate: string,
  data: VirtualValidationRequest
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('neiso/v1/validation/virtuals', data, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual bids to NEISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param bids The virtual bids data
 * @returns Promise with API response
 */
export async function submitVirtualBids(
  accountName: string,
  tradeDate: string,
  bids: Virtual[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('neiso/v1/submit/virtual-bids', bids, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual offers to NEISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param offers The virtual offers data
 * @returns Promise with API response
 */
export async function submitVirtualOffers(
  accountName: string,
  tradeDate: string,
  offers: Virtual[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('neiso/v1/submit/virtual-offers', offers, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual bids from NEISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param deletes The virtual deletes data
 * @returns Promise with API response
 */
export async function withdrawVirtualBids(
  accountName: string,
  tradeDate: string,
  deletes: VirtualDelete[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('neiso/v1/withdraw/virtual-bids', deletes, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual offers from NEISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param deletes The virtual deletes data
 * @returns Promise with API response
 */
export async function withdrawVirtualOffers(
  accountName: string,
  tradeDate: string,
  deletes: VirtualDelete[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('neiso/v1/withdraw/virtual-offers', deletes, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}