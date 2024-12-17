import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Flex1, FlexColumn } from '../../Flex';

interface OwnProps {
  threshold: number;
  hasNext: () => boolean;
  next: () => Promise<any>;
}

const InfiniteScroll: React.FC<PropsWithChildren & OwnProps> = (props) => {
  const { threshold, hasNext, next } = props;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observeCallback = useCallback(
    (entries: any) => {
      const sen = entries[0];
      if (sen.isIntersecting) {
        if (hasNext && typeof hasNext == 'function' && hasNext()) {
          next && typeof next == 'function' && next();
        }
      }
    },
    [hasNext, next],
  );
  useEffect(() => {
    const sentinel = document.getElementById('sentinel');
    if (sentinel) {
      observerRef.current = new IntersectionObserver(observeCallback, {
        root: null,
        rootMargin: '0px',
        threshold,
      });
      observerRef.current.observe(sentinel);
    }
    return () => {
      observerRef && sentinel && observerRef.current?.unobserve(sentinel);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [observeCallback, threshold]);

  const { children } = props;
  return (
    <Flex1 flexDirection="column">
      <FlexColumn flex={1}>{children}</FlexColumn>
      <FlexColumn id="sentinel"></FlexColumn>
    </Flex1>
  );
};

export default InfiniteScroll;
