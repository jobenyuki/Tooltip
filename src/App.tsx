import React, { useRef } from 'react';
import { Tooltip } from '@/Components';
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
        <Tooltip anchorRef={anchorRef2}>Tooltip content 2 here.</Tooltip>
        <a ref={anchorRef3} className={s.anchor}>
          Hover me 3
        </a>
        <Tooltip anchorRef={anchorRef3}>Tooltip content 3 here.</Tooltip>
        <a ref={anchorRef4} className={s.anchor}>
          Hover me 4
        </a>
        <Tooltip anchorRef={anchorRef4}>Tooltip content 4 here.</Tooltip>
      </div>
    </div>
  );
}

export default App;
