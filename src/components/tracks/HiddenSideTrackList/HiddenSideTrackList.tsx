/**
 * Created by westp on 10.06.2022
 */

// @ts-ignore
import React, { CSSProperties, startTransition, useCallback, useState } from 'react';
import s from './HiddenSideTrackList.module.scss';
import cn from 'classnames';
import DSection from 'layouts/DefaultLayout/components/DoubleSection';
import SearchInput from 'components/SearchInput';
import isEmptyString from 'utils/isEmptyString';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import useBreakpoint from 'hooks/useBreakpoint';

export default function HiddenSideTrackList<T>({
  className,
  tracks,
  isShow,
  title,
  onClose,
  onFilter,
  children,
}: ITrackListDataProps<T>) {
  const [searchValue, setSearchValue] = useState('');
  const allTracks: T[] = tracks;
  const b = useBreakpoint();
  const onSearchHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchValue(e.target.value);
    });
  }, []);
  let filteredTracks: T[] = [...allTracks];

  if (!isEmptyString(searchValue))
    filteredTracks = allTracks?.filter((value: T, index: number, array: T[]) =>
      onFilter(value, searchValue, index, array)
    );

  // const res_tracks = filteredTracks.map(children);

  return (
    <DSection.HiddenAside.Wrapper open={isShow} className={cn(s.TrackList, className)}>
      <DSection.HiddenAside.Inner>
        <DSection.HiddenAside.Container>
          <DSection.HiddenAside.Title onClick={onClose}>{title}</DSection.HiddenAside.Title>
          <SearchInput onChange={onSearchHandler} />
        </DSection.HiddenAside.Container>
        <DSection.HiddenAside.Scroller className={cn(s.inner)}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={cn(s.inner)}
                height={height}
                itemCount={filteredTracks.length}
                itemSize={b.fxl ? 90 : b.lg ? 72 : 50}
                itemData={filteredTracks}
                width={width}
              >
                {children}
              </List>
            )}
          </AutoSizer>
        </DSection.HiddenAside.Scroller>
      </DSection.HiddenAside.Inner>
    </DSection.HiddenAside.Wrapper>
  );
}

export interface ITrackListProps<T> {
  className?: string;

  onClose(): any;

  tracks: T[];
  title: string;
  isShow: boolean;
}

interface ITrackListDataProps<T> extends ITrackListProps<T> {
  onFilter(value: T, search: string, index: number, array: T[]): boolean;

  children(arg: ListChildComponentProps): any;
}
