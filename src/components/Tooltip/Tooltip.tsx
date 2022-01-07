import React, { FC, memo, useEffect, useState, useCallback, CSSProperties } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/Components';
import { useParentScroll } from '@/Hooks';
import { ITooltipProps, ETooltipPlace } from './Tooltip.d';
import s from './Tooltip.module.scss';

const ARROW_W = parseFloat(s.arrowW);

const ANIM_IN = {
  opacity: 1,
};
const ANIM_OUT = {
  opacity: 0,
};
const ANIM_TRANSITION = {
  type: 'spring',
  duration: 1,
  bounce: 0.35,
};

const Tooltip: FC<ITooltipProps> = ({
  className,
  style,
  children,
  anchorRef,
  place = ETooltipPlace.RIGHT,
  offset = [0, 0],
  ...rest
}) => {
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

    place === ETooltipPlace.TOP &&
      setCustomStyle({
        left: `${anchorL + anchorW / 2 + offset[0]}px`,
        top: `${anchorT + offset[1] - ARROW_W}px`,
      });
    place === ETooltipPlace.RIGHT &&
      setCustomStyle({
        left: `${anchorL + anchorW + offset[0] + ARROW_W}px`,
        top: `${anchorT + anchorH / 2 + offset[1]}px`,
      });
    place === ETooltipPlace.BOTTOM &&
      setCustomStyle({
        left: `${anchorL + anchorW / 2 + offset[0]}px`,
        top: `${anchorT + anchorH + offset[1] + ARROW_W}px`,
      });
    place === ETooltipPlace.LEFT &&
      setCustomStyle({
        left: `${anchorL + offset[0] - ARROW_W}px`,
        top: `${anchorT + anchorH / 2 + offset[1]}px`,
      });
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
    <AnimatePresence>
      {show && (
        <MotionDiv
          className={`
          ${s.tooltip} 
          ${place === ETooltipPlace.TOP && s.topPlace}
          ${place === ETooltipPlace.RIGHT && s.rightPlace}
          ${place === ETooltipPlace.BOTTOM && s.bottomPlace}
          ${place === ETooltipPlace.LEFT && s.leftPlace}
          ${className}`}
          style={{ ...customStyle, ...style }}
          initial={ANIM_OUT}
          animate={ANIM_IN}
          exit={ANIM_OUT}
          transition={ANIM_TRANSITION}
          {...rest}>
          {children}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default memo(Tooltip);
