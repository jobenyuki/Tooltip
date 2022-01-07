import { RefObject, useCallback, useEffect, useState } from 'react';
import { getScrollableParents } from '@/Utils';

export const useParentScroll = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const [scrollableParents, setScrollableParents] = useState<HTMLElement[]>([]);

  const handleParentScroll = useCallback(() => {
    callback();
  }, [callback]);

  // Attach event listeners to all scrollable parents
  useEffect(() => {
    scrollableParents.forEach((sp) => sp.addEventListener('scroll', handleParentScroll));

    return () => {
      scrollableParents.forEach((sp) => sp.removeEventListener('scroll', handleParentScroll));
    };
  }, [scrollableParents, handleParentScroll]);

  // Get scrollable parents for given dom
  useEffect(() => {
    setScrollableParents(getScrollableParents(ref.current));
  }, []);
};
