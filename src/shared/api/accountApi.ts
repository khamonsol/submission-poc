import { getApiBase } from '@beyond/api'

export interface UploaderInfo {
  asset_owner: string;
  iso: string;
  trader: string;

}

interface ApiResponse {
  data: UploaderInfo[];
  updated: string;
}

export async function fetchAccounts(): Promise<UploaderInfo[]> {
  const api = await getApiBase();
  const rResp =  await api.get('user/uploader_info');
  const response: ApiResponse = rResp.data;
  const resp :UploaderInfo[] = response.data;
  console.log(resp);
  return resp
}