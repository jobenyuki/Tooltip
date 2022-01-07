import React, { ReactNode, RefObject } from 'react';

export interface ITooltipProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  anchorRef: RefObject<HTMLElement>;
}
