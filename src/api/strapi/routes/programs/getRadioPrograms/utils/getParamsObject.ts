import { IGetRadioProgramsRequestParams } from '../types';

/***
 *
 *   https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html
 *   Формируем параметры для запроса на основе переданных аргументов
 */

export default function getParamsObject(p?: IGetRadioProgramsRequestParams) {
  const filter: any = {};
  if (p && p.channelID) filter['channel'] = p.channelID;
  return {
    filter,
    populate: {
      DaySchedule: '*',
      cover: '*',
    },
  };
}
