export const getScrollableParents = (node: HTMLElement | null): HTMLElement[] => {
  if (node === null) return [];

  let n = node;
  let scrollableParents = [];
  while (n) {
    n.scrollHeight > n.clientHeight && scrollableParents.push(n);
    n = n.parentNode as HTMLElement;
  }

  return scrollableParents;
};
