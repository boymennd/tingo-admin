import { get } from '../../adapters/back-adapter';
import { env } from '../../adapters/environmentConfigs';
import { environment } from '../../enveroment-base';

export async function getUserList(
  keyword: string,
  page: number,
  pageSize: number
) {
  try {
    const response = await get(
      `${env.backEnd.url}${environment.userManagement.userList.url}?keyword=${keyword}&page=${page}&size=${pageSize}`
    );
    return response;
  } catch (error) {
    return error;
  }
}
