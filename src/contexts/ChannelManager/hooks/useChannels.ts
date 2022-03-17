import IChannel from 'src/interfaces/IChannel';
import { CHANNELS } from '../constants';
import { useQuery } from 'react-query';
import api from '../../../api';
import isEmptyArray from '../../../utils/isEmptyArray';

//Получаем каналы по умолчанию и пробуем подгружать каналы от сервера
export default function useChannels(): {
  channels: IChannel[];
  isLoading: boolean;
} {
  const { isLoading, error, data } = useQuery('getAllChannels', () =>
    api.strapi.channels.getChannels().catch(() => {
      console.error('getChannels error');
    })
  );

  return {
    // @ts-ignore
    channels: !isEmptyArray(data) ? data : CHANNELS,
    isLoading,
  };
}
