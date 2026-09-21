import { useId, useState, type ReactNode } from 'react';

export type SettingsSection = { id: string; label: string; description?: string; content: ReactNode };

export function SettingsPanels({ sections, initialId }: { sections: SettingsSection[]; initialId?: string }) {
  const [selected, setSelected] = useState(initialId ?? sections[0]?.id);
  const scope = useId();
  const active = sections.find((section) => section.id === selected) ?? sections[0];
  if (!active) return null;
  return <div className="settings-workspace">
    <nav className="settings-navigation" role="tablist" aria-label="Settings categories">
      {sections.map((section, index) => <button
        key={section.id} type="button" role="tab" id={`${scope}-${section.id}`}
        aria-controls={`${scope}-panel`} aria-selected={active.id === section.id}
        tabIndex={active.id === section.id ? 0 : -1}
        onClick={() => setSelected(section.id)}
        onKeyDown={(event) => {
          let next = index;
          if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % sections.length;
          else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (index + sections.length - 1) % sections.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = sections.length - 1;
          else return;
          event.preventDefault();
          setSelected(sections[next]!.id);
          document.getElementById(`${scope}-${sections[next]!.id}`)?.focus();
        }}
      ><span>{section.label}</span></button>)}
    </nav>
    <section key={active.id} className="settings-panel" role="tabpanel" id={`${scope}-panel`} aria-labelledby={`${scope}-${active.id}`} tabIndex={0}>
      <header className="settings-panel-heading"><h3>{active.label}</h3>{active.description && <p>{active.description}</p>}</header>
      {active.content}
    </section>
  </div>;
}
