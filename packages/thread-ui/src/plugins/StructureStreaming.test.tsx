/** @vitest-environment jsdom */
import {useEffect, act} from 'react';
import {createRoot} from 'react-dom/client';
import {test,expect,vi} from 'vitest';
import {webcrypto,createHash} from 'node:crypto';
import {StructureView} from '../../../plugin-xyz/src/index';
const mounted=vi.hoisted(()=>({count:0}));
vi.mock('@remote-codex/thread-ui/scientific-viewer',()=>({GraphMoleculeViewer:({source}:any)=>{
  useEffect(()=>{mounted.count++;},[]);
  return <div data-testid="viewer">{source.content[0]}</div>;
}}));
test('new acknowledged frames update the existing viewer without unmounting it',async()=>{
 Object.defineProperty(globalThis,'IS_REACT_ACT_ENVIRONMENT',{value:true,configurable:true});
 Object.defineProperty(window.crypto,'subtle',{value:webcrypto.subtle,configurable:true});
 const first='1\nfirst\nHe 0 0 0\n',second=first+'1\nsecond\nHe 1 0 0\n';
 let complete:(value:any)=>void=()=>{};
 vi.stubGlobal('fetch',vi.fn().mockResolvedValueOnce({ok:true,arrayBuffer:async()=>new TextEncoder().encode(first).buffer}).mockImplementationOnce(()=>new Promise(resolve=>{complete=resolve;})));
 const node=document.createElement('div'),root=createRoot(node);document.body.append(node);
 const asset=(text:string)=>({url:'/artifact/'+text.length,checksum:createHash('sha256').update(text).digest('hex'),name:'trajectory.xyz',format:'xyz' as const,streamId:'stable'});
 try {
  await act(async()=>{root.render(<StructureView asset={asset(first)}/>);});
  await vi.waitFor(()=>expect(node.textContent).toContain('first'));
  const viewer=node.querySelector('[data-testid="viewer"]');
  await act(async()=>{root.render(<StructureView asset={asset(second)}/>);});
  expect(node.querySelector('[data-testid="viewer"]')).toBe(viewer);
  await act(async()=>{complete({ok:true,arrayBuffer:async()=>new TextEncoder().encode(second).buffer});});
  await vi.waitFor(()=>expect(node.textContent).toContain('second'));
  expect(node.querySelector('[data-testid="viewer"]')).toBe(viewer);
  expect(mounted.count).toBe(1);
 } finally {await act(async()=>root.unmount());node.remove();vi.unstubAllGlobals();}
});
