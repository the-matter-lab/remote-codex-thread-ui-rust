import { ChevronRight } from 'lucide-react';
import type { ThreadTurnDto } from '@remote-codex/shared';
import { GraphChatMessageFrame } from './graph-chat/GraphChatMessageFrame';
import { GraphChatMessageContent } from './graph-chat/GraphChatMessageContent';
import { GraphChatUserMessageBody } from './graph-chat/GraphChatMessageBody';
import { TurnUsageInline } from './timeline/TurnUsageInline';
import { formatWorkedDuration } from './timeline/TimelineTurnRows';
import { formatMessageTimestamp } from './threadPresentation';

export interface PublicTranscriptMessage {
  role: 'user' | 'assistant';
  text: string;
  createdAt?: string | null;
}
export interface PublicTranscriptTurn {
  messages: PublicTranscriptMessage[];
  startedAt?: string | null;
  completedAt?: string | null;
  model?: ThreadTurnDto['model'];
  reasoningEffort?: ThreadTurnDto['reasoningEffort'];
  tokenUsage?: ThreadTurnDto['tokenUsage'];
  priceEstimate?: ThreadTurnDto['priceEstimate'];
}
export interface PublicTranscriptSnapshot {
  title: string;
  createdAt: string;
  turnCount: number;
  turns: PublicTranscriptTurn[];
  theme?: 'light' | 'dark';
  images?: Record<string, string>;
  live?: boolean;
  stale?: boolean;
  updatedAt?: string;
}

export function transcriptSnapshot(title: string, turns: ThreadTurnDto[], theme: 'light' | 'dark'): PublicTranscriptSnapshot {
  return {
    title, createdAt: new Date().toISOString(), turnCount: turns.length, theme,
    turns: turns.map(turn => {
      const final = turn.status === 'inProgress' ? undefined : turn.items.findLast(item => item.kind === 'agentMessage' && !('phase' in item && item.phase === 'commentary'));
      return {
        startedAt: turn.startedAt ?? null, completedAt: turn.completedAt ?? null,
        model: turn.model ?? null, reasoningEffort: turn.reasoningEffort ?? null,
        tokenUsage: turn.tokenUsage ?? null, priceEstimate: turn.priceEstimate ?? null,
        messages: turn.items.filter(item => item.kind === 'userMessage' || item === final).map(item => ({
          role: item.kind === 'userMessage' ? 'user' : 'assistant', text: item.text, createdAt: item.createdAt ?? null,
        })),
      };
    }),
  };
}

// The same message frame, Markdown/code renderer and usage row as the live
// thread. No timeline adapter, command history, composer or navigation is mounted.
export function PublicTranscript({snapshot}: {snapshot: PublicTranscriptSnapshot}) {
  const message = (item: PublicTranscriptMessage, index: number) => <GraphChatMessageFrame
    key={index} kind={item.role === 'user' ? 'userMessage' : 'agentMessage'}
    timeLabel={item.createdAt ? formatMessageTimestamp(item.createdAt) : undefined}
  >
    {item.role === 'user' ? <GraphChatUserMessageBody text={item.text} attachmentPreviewUrls={snapshot.images} />
      : <div className="thread-graph-message-prose"><GraphChatMessageContent readOnly content={item.text} resolveHref={href => snapshot.images?.[href] ?? href} /></div>}
  </GraphChatMessageFrame>;
  return <main className="public-transcript thread-ui-shell" data-theme-effective={snapshot.theme ?? 'dark'}>
    <div className="public-transcript-content">
      <header className="public-transcript-header"><h1>{snapshot.title}</h1><p>{snapshot.live ? 'Live read-only thread' : 'Read-only snapshot'} · {snapshot.turnCount} turns{snapshot.live && snapshot.updatedAt ? ` · Updated ${new Date(snapshot.updatedAt).toLocaleString()}` : ''}</p>{snapshot.stale && <p role="status">The device is unavailable. Showing the last published version.</p>}</header>
      {snapshot.turns.map((turn, index) => {
        const displayTurn: ThreadTurnDto = {id:`snapshot-${index}`,status:'completed',error:null,items:[],startedAt:turn.startedAt ?? null,completedAt:turn.completedAt ?? null,model:turn.model ?? null,reasoningEffort:turn.reasoningEffort ?? null,tokenUsage:turn.tokenUsage ?? null,priceEstimate:turn.priceEstimate ?? null};
        return <section key={index} className="thread-graph-turn public-transcript-turn">
          {turn.messages.filter(item => item.role === 'user').map(message)}
          <div className="thread-graph-worked-summary flex w-full items-center gap-2 py-2 text-sm" aria-label="Turn summary">
            <span className="thread-graph-worked-label shrink-0">{formatWorkedDuration(turn.startedAt, turn.completedAt, [])}</span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            {turn.model || turn.tokenUsage ? <TurnUsageInline turn={displayTurn} readOnly /> : null}
            <span className="thread-graph-worked-rule h-px min-w-0 flex-1" aria-hidden="true" />
          </div>
          {turn.messages.filter(item => item.role === 'assistant').map(message)}
        </section>;
      })}
    </div>
  </main>;
}
