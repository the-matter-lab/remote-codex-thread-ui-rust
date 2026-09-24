/** @vitest-environment jsdom */
import {act,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {expect,test,vi} from 'vitest';
import {GraphChatThreadChatPanel} from './GraphChatThreadChatPanel';
import type {ThreadDetailDto} from '@remote-codex/shared';
import type {ThreadComposerProps} from '../ThreadComposer';
const state=vi.hoisted(()=>({timeline:null as any,composer:null as any}));
vi.mock('../ThreadComposer',()=>({ThreadComposer:(props:any)=>{state.composer=props;return <button onClick={props.onToggleFollow}>Latest</button>;}}));
function Timeline(props:any) { state.timeline=props; useEffect(()=>{
 props.onTailVisibilityChange(false);props.onPreviousTurnAvailabilityChange(true);props.onNextTurnAvailabilityChange(true);
},[props.onTailVisibilityChange,props.onPreviousTurnAvailabilityChange,props.onNextTurnAvailabilityChange]);return <div/>; }
test('embedded chat wires all navigation controls without host-provided callbacks',async()=>{
 Object.defineProperty(globalThis,'IS_REACT_ACT_ENVIRONMENT',{value:true,configurable:true});
 const host=document.createElement('div');document.body.append(host);const root=createRoot(host);
 try {
 await act(async()=>root.render(<GraphChatThreadChatPanel detail={{thread:{id:'t',status:'idle',activeTurnId:null},turns:[],pendingRequests:[]} as unknown as ThreadDetailDto} adapter={{sendPrompt:vi.fn()} as any} timelineAdapter={{}} TimelineComponent={Timeline} transcriptItemCount={0} composerProps={{value:'',onChange:vi.fn()} as unknown as Omit<ThreadComposerProps,'activeView'|'onSubmit'>}/>));
 expect(state.composer.followTail).toBe(false);expect(state.composer.canJumpToPreviousTurn).toBe(true);expect(state.composer.canJumpToNextTurn).toBe(true);
 await act(async()=>state.composer.onToggleFollow());expect(state.timeline.scrollRequestKey).toBe(1);
 await act(async()=>state.composer.onJumpToPreviousTurn());expect(state.timeline.previousTurnScrollRequestKey).toBe(1);
 await act(async()=>state.composer.onJumpToNextTurn());expect(state.timeline.nextTurnScrollRequestKey).toBe(1);
 } finally {await act(async()=>root.unmount());host.remove();}
});
