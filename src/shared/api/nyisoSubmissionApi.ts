import { getSubmissionBase } from '@beyond/api'

// Virtual interface
export interface Virtual {
  node: string;
  he: string;
  tranche: number;
  mw: number;
  price: number;
}

// Virtual delete interface
export interface VirtualDelete {
  node: string;
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
  const response = await api.post('nyiso/v1/validation/virtuals', data, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Validates virtual bids and offers using CSV files
 * @param accountName The account name
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param bidFile The CSV file containing bids
 * @param offerFile The CSV file containing offers
 * @returns Promise with API response
 */
export async function validateVirtualsWithFiles(
  accountName: string,
  tradeDate: string,
  bidFile: File,
  offerFile: File
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const formData = new FormData();
  formData.append('bids', bidFile);
  formData.append('offers', offerFile);

  const response = await api.post('nyiso/v1/validation/virtuals', formData, {
    headers: {
      'X-Account-Name': accountName,
      'X-Trade-Date': tradeDate,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

/**
 * Submits virtual bids to NYISO
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
  const response = await api.post('nyiso/v1/submit/virtual-bids', bids, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual bids to NYISO using a CSV file
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param bidFile The CSV file containing bids
 * @returns Promise with API response
 */
export async function submitVirtualBidsWithFile(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  bidFile: File
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('nyiso/v1/submit/virtual-bids', bidFile, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate,
      'Content-Type': 'text/csv'
    }
  });
  return response.data;
}

/**
 * Submits virtual offers to NYISO
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
  const response = await api.post('nyiso/v1/submit/virtual-offers', offers, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Submits virtual offers to NYISO using a CSV file
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param offerFile The CSV file containing offers
 * @returns Promise with API response
 */
export async function submitVirtualOffersWithFile(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  offerFile: File
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('nyiso/v1/submit/virtual-offers', offerFile, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate,
      'Content-Type': 'text/csv'
    }
  });
  return response.data;
}

/**
 * Withdraws virtual bids from NYISO
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
  const response = await api.post('nyiso/v1/withdraw/virtual-bids', deletes, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual bids from NYISO using a CSV file
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param deleteFile The CSV file containing nodes to delete
 * @returns Promise with API response
 */
export async function withdrawVirtualBidsWithFile(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  deleteFile: File
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('nyiso/v1/withdraw/virtual-bids', deleteFile, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate,
      'Content-Type': 'text/csv'
    }
  });
  return response.data;
}

/**
 * Withdraws virtual offers from NYISO
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
  const response = await api.post('nyiso/v1/withdraw/virtual-offers', deletes, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate
    }
  });
  return response.data;
}

/**
 * Withdraws virtual offers from NYISO using a CSV file
 * @param accountName The account name
 * @param accountPassword The account password
 * @param tradeDate The trade date in YYYY-MM-DD format
 * @param deleteFile The CSV file containing nodes to delete
 * @returns Promise with API response
 */
export async function withdrawVirtualOffersWithFile(
  accountName: string,
  accountPassword: string,
  tradeDate: string,
  deleteFile: File
): Promise<ApiResponse> {
  const api = await getSubmissionBase();
  const response = await api.post('nyiso/v1/withdraw/virtual-offers', deleteFile, {
    headers: {
      'X-Account-Name': accountName,
      'X-Account-Password': accountPassword,
      'X-Trade-Date': tradeDate,
      'Content-Type': 'text/csv'
    }
  });
  return response.data;
}