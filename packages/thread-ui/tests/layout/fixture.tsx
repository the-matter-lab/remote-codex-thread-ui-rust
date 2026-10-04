import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThreadDetailSurface } from '../../src/ThreadDetailSurface';
import { ThreadWorkspaceLayout } from '../../src/components/ThreadWorkspaceLayout';
import { PluginProvider } from '../../src/plugins/PluginProvider';
import type { MatterWorkbenchOptions } from '../../src/components/MatterWorkbench';
import type { ThreadDetailUiAdapter } from '../../src';
import { mockCapabilities, mockDetail, mockStatus, mockThreads } from '../../../../apps/playground/src/mockData';
import './fixture.css';

const adapter: ThreadDetailUiAdapter = {
  openThread() {}, sendPrompt() {}, interrupt() {}, compact() {}, updateSettings() {},
  workspace: {
    async listTree() {
      return {name:'Workspace', path:'', kind:'directory', childrenLoaded:true, children:Array.from({length:80}, (_, index) => ({name:`inspection-result-${index}.txt`, path:`inspection-result-${index}.txt`, kind:'file', size:24}))};
    },
    async readFile({path}) { return {path, name:path, content:'Persistent inspection fixture\n', language:'text', size:30, truncated:false, nextOffset:30}; },
  },
};
function Fixture() {
  const params = new URLSearchParams(location.search);
  const theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  const unavailable = params.has('unavailable');
  // A reply ending in one short code block exposes overlapping copy controls.
  const detail = params.has('copyCode') ? {
    ...mockDetail,
    turns: mockDetail.turns.map((turn, index) => index === 0 ? {
      ...turn,
      items: turn.items.map(item => item.kind === 'agentMessage' ? {
        ...item, text: '**Copy fixture**\n\n```javascript\nconst water = "H2O";\n```',
      } : item),
    } : turn),
  } : mockDetail;
  const [agent, setAgent] = useState('Agent Alpha');
  const options: MatterWorkbenchOptions = {
    brandName:'ElAgente', hideRail:true, showShortcuts:false, showNotifications:false, showSearch:false,
    threads:mockThreads.map(t => ({key:t.id, title:t.title, subtitle:agent, href:`#${t.id}`, status:t.status, favorite:false})),
    currentKey:mockDetail.thread.id, workspacePath:agent, favorite:false, activeView:'chat', terminalEnabled:false,
    notifications:[], unreadCount:0, onViewChange() {}, onToggleFavorite() {}, onNavigate() {}, onSearch() {}, onReadNotifications() {},
    renderNavigationHeader: ({closeNavigation}) => <nav aria-label="Agents">{['Agent Alpha','Agent Beta'].map(name => <button key={name} aria-pressed={agent===name} onClick={() => {setAgent(name); closeNavigation();}}>{name}</button>)}</nav>,
  };
  return <PluginProvider builtinPlugins={[]}>
    {unavailable ? <ThreadWorkspaceLayout threads={[]} workbench={{...options, emptyWorkspace:true}} effectiveTheme={theme} themeMode={theme} viewportConstrained currentWorkspaceLabel={agent} globalSettingsContent={<p>Appearance</p>}><div className="fixture-unavailable">Agent paused</div></ThreadWorkspaceLayout> :
      <ThreadDetailSurface threads={mockThreads} detail={detail} loading={false} error={null} status={mockStatus} capabilities={mockCapabilities} adapter={adapter} currentThreadId={mockDetail.thread.id} currentWorkspaceId={mockDetail.workspace.id} currentWorkspaceLabel={agent} activeView="chat" workbench={options} shellEffectiveTheme={theme} shellThemeMode={theme} onShellThemeModeChange={() => {}} globalSettingsContent={<p>Appearance</p>} composerProps={{disabled:false, draftPrompt:'', model:mockDetail.thread.model, reasoningEffort:mockDetail.thread.reasoningEffort, collaborationMode:mockDetail.thread.collaborationMode, canInterrupt:true, onInterrupt() {}}}/>
    }
  </PluginProvider>;
}
createRoot(document.getElementById('root')!).render(<Fixture />);
