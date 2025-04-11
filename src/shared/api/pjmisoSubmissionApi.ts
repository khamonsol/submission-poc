import { getSubmissionBase } from '@beyond/api'

// Virtual bid/offer interface
export interface Virtual {
  node: string;
  node_id: string;
  he: string;
  tranche: number;
  mw: number;
  price: number;
}

// Spread interface
export interface Spread {
  source: string;
  source_id: number;
  sink: string;
  sink_id: number;
  he: string;
  tranche: number;
  mw: number;
  price: number;
}

// Virtual delete interface
export interface VirtualDelete {
  node: string;
  node_id: string;
  he: string;
  tranche: number;
}

// Spread delete interface
export interface SpreadDelete {
  source: string;
  source_id: number;
  sink: string;
  sink_id: number;
  he: string;
  tranche: number;
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
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param data The virtual validation request data
 * @returns Promise with API response
 */
export async function validateVirtuals(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  data: VirtualValidationRequest
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('pjmiso/v1/validation/virtuals', data, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Validates spreads
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param spreads The spreads data
 * @returns Promise with API response
 */
export async function validateSpreads(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  spreads: Spread[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('pjmiso/v1/validation/spreads', spreads, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual bids to PJMISO
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param bids The virtual bids data
 * @returns Promise with API response
 */
export async function submitVirtualBids(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  bids: Virtual[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('pjmiso/v1/submit/virtual-bids', bids, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual offers to PJMISO
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param offers The virtual offers data
 * @returns Promise with API response
 */
export async function submitVirtualOffers(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  offers: Virtual[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('pjmiso/v1/submit/virtual-offers', offers, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits spreads to PJMISO
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param spreads The spreads data
 * @returns Promise with API response
 */
export async function submitSpreads(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  spreads: Spread[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('pjmiso/v1/submit/spreads', spreads, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual bids from PJMISO
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param deletes The virtual deletes data
 * @returns Promise with API response
 */
export async function withdrawVirtualBids(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  deletes: VirtualDelete[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('pjmiso/v1/withdraw/virtual-bids', deletes, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual offers from PJMISO
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param deletes The virtual deletes data
 * @returns Promise with API response
 */
export async function withdrawVirtualOffers(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  deletes: VirtualDelete[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('pjmiso/v1/withdraw/virtual-offers', deletes, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws spreads from PJMISO
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param deletes The spread deletes data
 * @returns Promise with API response
 */
export async function withdrawSpreads(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  deletes: SpreadDelete[]
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('pjmiso/v1/withdraw/spreads', deletes, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}