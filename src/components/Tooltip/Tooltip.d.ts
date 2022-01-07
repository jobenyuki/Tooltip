import React, { ReactNode, RefObject } from 'react';

export enum ETooltipPlace {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export interface ITooltipProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  anchorRef: RefObject<HTMLElement>;
  place?: ETooltipPlace; // Put tooltip to top/right/bottom/left position?
  offset?: number[]; // Left/Top offset
}
