import { ComposerMenuSurface } from './ComposerMenuSurface';
import { InputGroupButton } from '../graph-ui/InputGroup';
import { PlusIcon } from './composerPresentation';

export function ComposerAttachmentMenu({
  open,
  canPickPhoto = true,
  canPickFile = true,
  iconButtonClassName,
  menuClassName,
  menuItemClassName,
  onToggle,
  onPickPhoto,
  onPickFile,
}: {
  open: boolean;
  canPickPhoto?: boolean;
  canPickFile?: boolean;
  iconButtonClassName: string;
  menuClassName: string;
  menuItemClassName: string;
  onToggle: () => void;
  onPickPhoto: () => void;
  onPickFile: () => void;
}) {
  return (
    <div className="relative">
      <InputGroupButton
        type="button"
        variant="ghost"
        size="icon-xs"
        data-composer-menu-trigger="true"
        aria-label="Add attachment"
        title="Add attachment"
        onClick={onToggle}
        className={`${iconButtonClassName} h-9 w-9 rounded-full sm:h-8 sm:w-8`}
      >
        <PlusIcon />
      </InputGroupButton>

      {open && (
        <ComposerMenuSurface
          align="start"
          className={`${menuClassName} w-32 rounded-2xl border bg-stone-900/72 shadow-2xl shadow-stone-950/20`}
        >
          <div className="p-2">
            {canPickPhoto ? (
              <button
                type="button"
                onClick={onPickPhoto}
                className={`${menuItemClassName} block w-full rounded-xl px-3 py-2 text-left text-sm transition`}
              >
                Photo
              </button>
            ) : null}
            {canPickFile ? (
              <button
                type="button"
                onClick={onPickFile}
                className={`${menuItemClassName} mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition`}
              >
                File
              </button>
            ) : null}
          </div>
        </ComposerMenuSurface>
      )}
    </div>
  );
}
