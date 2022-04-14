import IChannel from 'src/interfaces/IChannel';
import _getAudioSourceLink from '../IStream/getAudioSourceLink';

export default function getAudioSourceLink(c: IChannel) {
  if (!c) return '';
  return _getAudioSourceLink(c.attributes.stream);
}
