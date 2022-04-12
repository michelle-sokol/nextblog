import { useContext, useEffect } from 'react';
import { SliderWrapperManagerContext } from 'components/SliderWrapper/contexts/SliderWrapperManager/SliderWrapperManager';

export default function useSliderData(count: number, swipe = false) {
  const sm = useContext(SliderWrapperManagerContext);

  useEffect(() => {
    sm.setCount(count);
  }, [count]);

  const settings = {
    speed: 300,
    variableWidth: true,
    initialSlide: 0,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    arrows: false,
    swipe: swipe,
    allowTouchMove: swipe,
    afterChange: (cs) => sm.setCurrentSlideIndex(Number(cs) + 1),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToScroll: 1,
          swipe: true,
          allowTouchMove: true,
        },
      },
    ],
  };
  return {
    settings,
    ref: sm.ref,
  };
}
