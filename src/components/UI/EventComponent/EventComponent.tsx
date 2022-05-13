/**
 * Created by westprophet on 11.05.2022
 */

import React from 'react';
import s from './EventComponent.module.scss';
import cn from 'classnames';
import Image from 'next/image';
import DATA_FOR_BLUR from '../../../constants/DATA_FOR_BLUR';
import NoImage from 'components/UI/NoImage';
import TextPlaceholder from 'components/UI/TextPlaceholder';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// @ts-ignore
import Marquee from 'react-double-marquee';

export default function EventComponent({
  address,
  date,
  className,
  cover,
  title,
  resizable,
}: IEventComponent) {
  return (
    <div className={cn(s.EventComponent, { [s.resizable]: resizable }, className)}>
      {cover ? (
        <div className={cn(s.cover)}>
          <Image
            src={cover}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            blurDataURL={DATA_FOR_BLUR}
          />
        </div>
      ) : (
        <NoImage className={cn(s.cover)} />
      )}
      <div className={cn(s.desc)}>
        <TextPlaceholder className={cn(s.title)} placeholder="Подробнее">
          {title}
        </TextPlaceholder>

        <div className={cn(s.date)}>
          <AccessTimeIcon />
          <span>
            <Marquee speed={0.02} direction="left" scrollWhen={'overflow'} delay={3000}>
              {date}
            </Marquee>
          </span>
        </div>

        <div className={cn(s.address)}>
          <FmdGoodIcon />
          <span>
            <Marquee speed={0.02} direction="right" scrollWhen={'overflow'} delay={3000}>
              {address}
            </Marquee>
          </span>
        </div>
      </div>
    </div>
  );
}

EventComponent.defaultProps = {
  className: '',
  resizable: false,
};

export interface IEventComponentProps {
  resizable?: boolean;
}

interface IEventComponent extends IEventComponentProps {
  className?: string;
  cover?: string | null;
  title: string;
  date: string;
  address: string;
}