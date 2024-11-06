import {
  CSSProperties,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// TODO вынести в отдельный репозиторий
export const VirtualList = memo(
  <Element extends HTMLElement, Item>(
    props: VirtualListProps<Element, Item>,
  ) => {
    const { items, renderItem } = props;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollHistoryRef = useRef<number[]>([]);

    const [{ spaceHeight, target: itemsToRender }, setBatchData] = useState({
      count: 1,
      offset: 0,
      source: [items[0]],
      spaceHeight: 0,
      target: new Map([[0, items[0]]]),
    });

    const wrapperStyle = useMemo<CSSProperties>(
      () => ({
        transform: `translate(0, ${spaceHeight}px)`,
      }),
      [spaceHeight],
    );

    const setListItemOffsetByElement = useCallback(
      (itemKey: number, element: Element) => {
        if (!element || !element.clientHeight) return;

        const previousElementHeight =
          scrollHistoryRef.current[itemKey - 1] ?? 0;

        scrollHistoryRef.current[itemKey] =
          element.clientHeight + previousElementHeight;
      },
      [],
    );

    const getClosestListItemOffsetEntryByScrollTop = useCallback(
      (scrollTop: number) => {
        const { current: scrollHistory } = scrollHistoryRef;

        let index = scrollHistory.length;

        while (index--) {
          if (scrollTop > scrollHistory[index])
            return [index + 1, scrollHistory[index]] as const;
        }

        return [0, 0] as const;
      },
      [],
    );

    const renderBatchOfNodes = useCallback(() => {
      const { current: wrapperElement } = wrapperRef;
      const { current: scrollHistory } = scrollHistoryRef;

      if (
        !wrapperElement ||
        !wrapperElement.firstElementChild ||
        !wrapperElement.parentElement
      )
        return;

      const { firstElementChild, parentElement } = wrapperElement;

      if (!firstElementChild.clientHeight) return;

      setBatchData(state => {
        const { offset, source, spaceHeight, target } = state;

        const [preliminaryOffset, preliminarySpaceHeight] =
          getClosestListItemOffsetEntryByScrollTop(parentElement.scrollTop);

        const newCount = Math.ceil(
          window.outerHeight / firstElementChild.clientHeight,
        );

        const lastBatchFirstItemOffset = items.length - newCount;

        const lastBatchFirstItemSpaceHeight =
          scrollHistory[lastBatchFirstItemOffset];

        const [newOffset, newSpaceHeight] =
          preliminaryOffset > 0 &&
          target.size + preliminaryOffset > items.length
            ? [lastBatchFirstItemOffset, lastBatchFirstItemSpaceHeight]
            : [preliminaryOffset, preliminarySpaceHeight];

        if (source === items && items.length <= newCount) return state;

        if (
          source === items &&
          offset === newOffset &&
          spaceHeight === newSpaceHeight
        )
          return state;

        const newTarget = new Map<number, Item>();
        const start = items[newOffset] ? newOffset : 0;
        const limit = newCount + newOffset;

        for (let index = start; index < limit; index++) {
          const data = items[index];

          if (!data) break;

          newTarget.set(index, data);
        }

        return {
          count: newCount,
          offset: newOffset,
          source: items,
          spaceHeight: newSpaceHeight,
          target: newTarget,
        };
      });
    }, [getClosestListItemOffsetEntryByScrollTop, items]);

    useEffect(() => {
      const { current: wrapperElement } = wrapperRef;

      scrollHistoryRef.current = [];

      wrapperRef.current?.parentElement?.scrollTo(0, 0);

      renderBatchOfNodes();

      wrapperElement?.parentElement?.addEventListener(
        "scroll",
        renderBatchOfNodes,
      );

      return () => {
        wrapperElement?.parentElement?.removeEventListener(
          "scroll",
          renderBatchOfNodes,
        );
      };
    }, [renderBatchOfNodes]);

    return (
      <div ref={wrapperRef} style={wrapperStyle}>
        {Array.from(itemsToRender.entries()).map(([index, item]) =>
          renderItem(item, el => setListItemOffsetByElement(index, el), index),
        )}
      </div>
    );
  },
);

export interface VirtualListProps<Element extends HTMLElement, Item> {
  items: Array<Item>;
  renderItem: VirtualListItemRenderer<Element, Item>;
}

export interface VirtualListItemRenderer<Element extends HTMLElement, Item> {
  (item: Item, ref: (element: Element) => void, index: number): ReactElement;
}
