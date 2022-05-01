import IChannel from 'src/interfaces/IChannel';
import { TAudioManagerStatus } from '../../../types/TAudioManagerStatus';
import IRadioHearthStreamData from '../../../api/radioheathAPI/types/IRadioHearthStreamData';
import { MutableRefObject } from 'react';

export default interface IPlayerManagerValues {
  status: TAudioManagerStatus;
  play: (c?: IChannel) => void;
  stop(): any;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  toggle(c?: IChannel): any;
  setPrevChannel(): void;
  setNextChannel(): void;
  channel: IChannel | null;
  id: string;
  data: IRadioHearthStreamData | null | undefined;
}
