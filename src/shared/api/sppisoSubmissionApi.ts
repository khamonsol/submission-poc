// src/api/sppisoApi.ts
import { getSubmissionBase } from '@beyond/api';

// Virtual transaction interface for SPPISO
export interface SppisoVirtual {
  node: string;
  he: string;
  tranche: number;
  mw: number;
  price: number;
}

// Virtual validation request interface
export interface VirtualValidationRequest {
  bids?: SppisoVirtual[];
  offers?: SppisoVirtual[];
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
 * Validates virtual bids and offers for SPPISO
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
  const response = await api.post('sppiso/v1/validation/virtuals', data, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual bids to SPPISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param bids The virtual bids data
 * @returns Promise with API response
 */
export async function submitVirtualBids(
  accountName: string,
  tradeDate: string,
  bids: SppisoVirtual[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('sppiso/v1/submit/virtual-bids', bids, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual offers to SPPISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param offers The virtual offers data
 * @returns Promise with API response
 */
export async function submitVirtualOffers(
  accountName: string,
  tradeDate: string,
  offers: SppisoVirtual[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('sppiso/v1/submit/virtual-offers', offers, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual bids from SPPISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @returns Promise with API response
 */
export async function withdrawVirtualBids(
  accountName: string,
  tradeDate: string
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('sppiso/v1/withdraw/virtual-bids', {}, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual offers from SPPISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @returns Promise with API response
 */
export async function withdrawVirtualOffers(
  accountName: string,
  tradeDate: string
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('sppiso/v1/withdraw/virtual-offers', {}, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}