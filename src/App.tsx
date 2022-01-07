import React, { useRef } from 'react';
import { Tooltip, ETooltipPlace } from '@/Components';
import s from './App.module.scss';

function App() {
  const anchorRef1 = useRef<HTMLAnchorElement>(null);
  const anchorRef2 = useRef<HTMLAnchorElement>(null);
  const anchorRef3 = useRef<HTMLAnchorElement>(null);
  const anchorRef4 = useRef<HTMLAnchorElement>(null);

  return (
    <div className={s.app}>
      <div className={s.anchorContainer}>
        <a ref={anchorRef1} className={s.anchor}>
          Hover me 1
        </a>
        <Tooltip anchorRef={anchorRef1}>Tooltip content 1 here.</Tooltip>
        <a ref={anchorRef2} className={s.anchor}>
          Hover me 2
        </a>
        <Tooltip anchorRef={anchorRef2} place={ETooltipPlace.TOP}>
          Tooltip content 2 here.
        </Tooltip>
        <a ref={anchorRef3} className={s.anchor}>
          Hover me 3
        </a>
        <Tooltip anchorRef={anchorRef3} place={ETooltipPlace.BOTTOM}>
          Tooltip content 3 here.
        </Tooltip>
        <a ref={anchorRef4} className={s.anchor}>
          Hover me 4
        </a>
        <Tooltip anchorRef={anchorRef4} place={ETooltipPlace.LEFT}>
          Tooltip content 4 here.
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
