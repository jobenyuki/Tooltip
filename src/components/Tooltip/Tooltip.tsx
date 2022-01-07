import React, { FC, memo, useEffect, useState, useCallback, CSSProperties } from 'react';
import { useParentScroll } from '@/Hooks';
import { ITooltipProps } from './Tooltip.d';
import s from './Tooltip.module.scss';

const Tooltip: FC<ITooltipProps> = ({ className, style, children, anchorRef, ...rest }) => {
  const [show, setShow] = useState(false);
  const [customStyle, setCustomStyle] = useState<Partial<CSSProperties>>({});

  // Show tooltip
  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  // Hide tooltip
  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  // Bounding rect should be re-calculated
  const handleBoundingRectChange = useCallback(() => {
    if (!anchorRef.current) return;

    const {
      left: anchorL,
      top: anchorT,
      width: anchorW,
      height: anchorH,
    } = anchorRef.current.getBoundingClientRect();

    setCustomStyle({ left: `${anchorL + anchorW}px`, top: `${anchorT + anchorH / 2}px` });
  }, []);

  // Re-calculate bounding rect when any parent is scrolled
  useParentScroll(anchorRef, handleBoundingRectChange);

  // Attach event listeners to anchor and determine scrollable parents of the anchor
  useEffect(() => {
    handleBoundingRectChange();
    anchorRef.current?.addEventListener('mouseenter', handleShow);
    anchorRef.current?.addEventListener('mouseout', handleHide);

    return () => {
      anchorRef.current?.removeEventListener('mouseenter', handleShow);
      anchorRef.current?.removeEventListener('mouseout', handleHide);
    };
  }, [handleShow, handleHide, handleBoundingRectChange]);

  return (
    <>
      {show && (
        <div className={`${s.tooltip} ${className}`} style={{ ...customStyle, ...style }} {...rest}>
          {children}
        </div>
      )}
    </>
  );
};

export default memo(Tooltip);
