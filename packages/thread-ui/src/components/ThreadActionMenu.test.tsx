/** @vitest-environment jsdom */
import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {expect,test,vi} from 'vitest';
import {ThreadActionMenu} from './ThreadActionMenu';
test('thread menu escapes sidebar clipping, retains theme and restores keyboard focus',async()=>{
 Object.defineProperty(globalThis,'IS_REACT_ACT_ENVIRONMENT',{value:true,configurable:true});
 const host=document.createElement('div');host.className='thread-ui-shell';host.dataset.themeEffective='dark';host.style.setProperty('--theme-panel','rgb(24, 25, 26)');host.style.overflow='hidden';document.body.append(host);const root=createRoot(host);const rename=vi.fn();
 try {
 await act(async()=>root.render(<ThreadActionMenu label="Thread actions"><button onClick={rename}>Rename thread</button><button>Delete thread</button></ThreadActionMenu>));
 const trigger=host.querySelector('button')!;await act(async()=>trigger.click());
 const menu=document.querySelector<HTMLElement>('[role="menu"]')!;
 expect(menu).not.toBeNull();expect(host.contains(menu)).toBe(false);
 expect(menu.closest<HTMLElement>('.thread-ui-portal')!.style.getPropertyValue('--theme-panel')).toBe('rgb(24, 25, 26)');
 expect(document.activeElement?.textContent).toBe('Rename thread');
 await act(async()=>menu.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true})));expect(document.activeElement?.textContent).toBe('Delete thread');
 await act(async()=>menu.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})));expect(document.querySelector('[role="menu"]')).toBeNull();expect(document.activeElement).toBe(trigger);expect(rename).not.toHaveBeenCalled();
 }finally{await act(async()=>root.unmount());host.remove();}
});
