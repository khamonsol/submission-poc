import { getSubmissionBase } from '@beyond/api'

// Virtual bid/offer interface
export interface Virtual {
  node: string;
  he: string;
  tranche: number;
  mw: number;
  price: number;
  is_block: boolean;
}

// Spread interface
export interface Spread {
  source: string;
  sink: string;
  he: string;
  tranche: number;
  mw: number;
  price: number;
  is_block: boolean;
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
  const response = await api.post('ercot/v1/validation/virtuals', data, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Validates spreads
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param spreads The spreads data
 * @returns Promise with API response
 */
export async function validateSpreads(
  accountName: string,
  tradeDate: string,
  spreads: Spread[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('ercot/v1/validation/spreads', spreads, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual bids to ERCOT
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
  const response = await api.post('ercot/v1/submit/virtual-bids', bids, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual offers to ERCOT
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
  const response = await api.post('ercot/v1/submit/virtual-offers', offers, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits spreads to ERCOT
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param spreads The spreads data
 * @returns Promise with API response
 */
export async function submitSpreads(
  accountName: string,
  tradeDate: string,
  spreads: Spread[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('ercot/v1/submit/spreads', spreads, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual bids from ERCOT
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @returns Promise with API response
 */
export async function withdrawVirtualBids(
  accountName: string,
  tradeDate: string
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('ercot/v1/withdraw/virtual-bids', {}, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual offers from ERCOT
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @returns Promise with API response
 */
export async function withdrawVirtualOffers(
  accountName: string,
  tradeDate: string
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('ercot/v1/withdraw/virtual-offers', {}, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws spreads from ERCOT
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @returns Promise with API response
 */
export async function withdrawSpreads(
  accountName: string,
  tradeDate: string
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('ercot/v1/withdraw/spreads', {}, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}