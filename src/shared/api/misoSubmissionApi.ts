// src/api/misoApi.ts
import { getSubmissionBase } from '@beyond/api';

// Virtual transaction interface for MISO
export interface MisoVirtual {
  node: string;
  he: string;
  tranche: number;
  mw: number;
  price: number;
}

// Virtual withdrawal transaction interface
export interface MisoVirtualWithdraw {
  node: string;
}

// Virtual validation request interface
export interface VirtualValidationRequest {
  bids?: MisoVirtual[];
  offers?: MisoVirtual[];
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
 * Gets split transactions for submission
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param transactions The virtual transactions to split
 * @returns Promise with split transactions
 */
export async function getSubmitSplitTransactions(
  accountName: string,
  tradeDate: string,
  transactions: MisoVirtual[]
): Promise<MisoVirtual[][]> {
  const api = await getSubmissionBase();
  const response = await api.post('miso/v1/submit/split-transactions', transactions, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Gets split transactions for withdrawal
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param transactions The virtual withdrawal transactions to split
 * @returns Promise with split transactions
 */
export async function getWithdrawSplitTransactions(
  accountName: string,
  tradeDate: string,
  transactions: MisoVirtualWithdraw[]
): Promise<MisoVirtualWithdraw[][]> {
  const api = await getSubmissionBase();
  const response = await api.post('miso/v1/withdraw/split-transactions', transactions, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Validates virtual bids and offers for MISO
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
  const response = await api.post('miso/v1/validation/virtuals', data, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual bids to MISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param bids The virtual bids data
 * @returns Promise with API response
 */
export async function submitVirtualBids(
  accountName: string,
  tradeDate: string,
  bids: MisoVirtual[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('miso/v1/submit/virtual-bids', bids, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual offers to MISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param offers The virtual offers data
 * @returns Promise with API response
 */
export async function submitVirtualOffers(
  accountName: string,
  tradeDate: string,
  offers: MisoVirtual[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('miso/v1/submit/virtual-offers', offers, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual bids from MISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param withdrawals The virtual bid withdrawals
 * @returns Promise with API response
 */
export async function withdrawVirtualBids(
  accountName: string,
  tradeDate: string,
  withdrawals: MisoVirtualWithdraw[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('miso/v1/withdraw/virtual-bids', withdrawals, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual offers from MISO
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param withdrawals The virtual offer withdrawals
 * @returns Promise with API response
 */
export async function withdrawVirtualOffers(
  accountName: string,
  tradeDate: string,
  withdrawals: MisoVirtualWithdraw[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('miso/v1/withdraw/virtual-offers', withdrawals, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}