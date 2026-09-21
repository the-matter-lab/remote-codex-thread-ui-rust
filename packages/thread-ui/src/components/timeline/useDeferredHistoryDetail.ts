import { useCallback, useEffect, useRef, useState } from 'react';

import type {
  ThreadHistoryItemDetailDto,
  ThreadHistoryItemDto,
} from '@remote-codex/shared';

export interface ExpandedTextState {
  title: string;
  text: string;
  kind?: string;
}

type HistoryItemDetailLoader = (
  itemId: string,
) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;

type SelectHistoryItemDetail = (input: {
  item: ThreadHistoryItemDto;
  detail: ThreadHistoryItemDetailDto;
}) => void;

interface DeferredHistoryDetailInput {
  loadHistoryItemDetail?: HistoryItemDetailLoader | undefined;
  onSelectHistoryItemDetail?: SelectHistoryItemDetail | undefined;
}

interface OpenDeferredDetailInput {
  item: ThreadHistoryItemDto;
  fallbackTitle: string;
  fallbackText: string;
  loadingText: string;
  errorText: string;
  useSelectionCallback: boolean;
}

function inlineDetail(
  item: ThreadHistoryItemDto,
  title: string,
  text: string,
): ThreadHistoryItemDetailDto {
  return {
    id: item.id,
    kind: item.kind,
    title,
    text,
  };
}

export function useDeferredHistoryDetail({
  loadHistoryItemDetail,
  onSelectHistoryItemDetail,
}: DeferredHistoryDetailInput) {
  const requestIdRef = useRef(0);
  const detailCacheRef = useRef<Map<string, ThreadHistoryItemDetailDto>>(
    new Map(),
  );
  const [expandedText, setExpandedText] = useState<ExpandedTextState | null>(
    null,
  );
  useEffect(() => {
    requestIdRef.current += 1;
    detailCacheRef.current.clear();
    setExpandedText(null);
  }, [loadHistoryItemDetail]);

  const openExpandedText = useCallback((title: string, text: string) => {
    requestIdRef.current += 1;
    setExpandedText({ title, text });
  }, []);

  const resolveDetail = useCallback(
    (
      item: ThreadHistoryItemDto,
      detail: ThreadHistoryItemDetailDto,
      useSelectionCallback: boolean,
    ) => {
      if (useSelectionCallback && onSelectHistoryItemDetail) {
        onSelectHistoryItemDetail({ item, detail });
        return;
      }
      setExpandedText({ title: detail.title, text: detail.text, ...(item.kind === 'fileChange' ? { kind: item.kind } : {}) });
    },
    [onSelectHistoryItemDetail],
  );

  const openDeferredDetail = useCallback(
    async ({
      item,
      fallbackTitle,
      fallbackText,
      loadingText,
      errorText,
      useSelectionCallback,
    }: OpenDeferredDetailInput) => {
      const requestId = ++requestIdRef.current;
      if (!loadHistoryItemDetail || (!item.hasDeferredDetail && item.kind !== 'commandExecution' && item.kind !== 'fileChange')) {
        resolveDetail(
          item,
          inlineDetail(item, fallbackTitle, fallbackText),
          useSelectionCallback,
        );
        return;
      }

      const cacheKey = `${item.id}:${item.status ?? ''}`;
      const cached = detailCacheRef.current.get(cacheKey);
      if (cached) {
        resolveDetail(item, cached, useSelectionCallback);
        return;
      }

      if (!(useSelectionCallback && onSelectHistoryItemDetail)) {
        setExpandedText({ title: fallbackTitle, text: loadingText });
      }

      try {
        const detail = await loadHistoryItemDetail(item.id);
        if (!['running', 'in_progress', 'pending'].includes(item.status ?? '')) detailCacheRef.current.set(cacheKey, detail);
        if (requestIdRef.current !== requestId) {
          return;
        }
        resolveDetail(item, detail, useSelectionCallback);
      } catch (caught) {
        if (requestIdRef.current !== requestId) {
          return;
        }
        resolveDetail(
          item,
          inlineDetail(
            item,
            fallbackTitle,
            caught instanceof Error ? caught.message : errorText,
          ),
          useSelectionCallback,
        );
      }
    },
    [
      loadHistoryItemDetail,
      onSelectHistoryItemDetail,
      resolveDetail,
    ],
  );

  const openCommandDetail = useCallback(
    async (
      item: ThreadHistoryItemDto & { kind: 'commandExecution' },
      fallbackTitle: string,
    ) => {
      await openDeferredDetail({
        item,
        fallbackTitle,
        fallbackText: item.detailText?.trim() || item.text || 'Command output',
        loadingText: 'Loading full command output...',
        errorText: 'Unable to load full command output.',
        useSelectionCallback: true,
      });
    },
    [openDeferredDetail],
  );

  const openToolCallDetail = useCallback(
    async (
      item: ThreadHistoryItemDto & {
        kind: 'toolCall' | 'agentToolCall' | 'skillToolCall';
      },
      fallbackTitle: string,
    ) => {
      await openDeferredDetail({
        item,
        fallbackTitle,
        fallbackText: item.detailText?.trim() || item.text || 'Tool call',
        loadingText: 'Loading full tool call details...',
        errorText: 'Unable to load full tool call details.',
        useSelectionCallback: true,
      });
    },
    [openDeferredDetail],
  );

  const openDeferredHistoryItemDetail = useCallback(
    async (
      item: ThreadHistoryItemDto,
      fallbackTitle: string,
      fallbackText: string,
      loadingText: string,
      errorText: string,
    ) => {
      await openDeferredDetail({
        item,
        fallbackTitle,
        fallbackText,
        loadingText,
        errorText,
        useSelectionCallback: false,
      });
    },
    [openDeferredDetail],
  );

  const closeExpandedText = useCallback(() => {
    requestIdRef.current += 1;
    setExpandedText(null);
  }, []);

  return {
    expandedText,
    openExpandedText,
    openCommandDetail,
    openToolCallDetail,
    openDeferredHistoryItemDetail,
    closeExpandedText,
  };
}
