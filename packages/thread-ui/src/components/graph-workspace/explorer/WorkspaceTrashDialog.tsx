import * as Dialog from '@radix-ui/react-dialog';
import type {
  ThreadWorkspaceTrashEntry,
  ThreadWorkspaceTrashList,
} from '../../../adapters';

export function WorkspaceTrashDialog({
  open,
  list,
  pending,
  error,
  notice,
  canRestore,
  canEmpty,
  confirming,
  onClose,
  onRefresh,
  onRestore,
  onConfirmingChange,
  onEmpty,
}: {
  open: boolean;
  list: ThreadWorkspaceTrashList | null;
  pending: boolean;
  error: string | null;
  notice: string | null;
  canRestore: boolean;
  canEmpty: boolean;
  confirming: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onRestore: (entry: ThreadWorkspaceTrashEntry) => void;
  onConfirmingChange: (value: boolean) => void;
  onEmpty: () => void;
}) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (!value && !pending) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content
          className="thread-graph-dialog fixed left-1/2 top-1/2 z-50 max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border bg-[var(--theme-panel)] p-5 shadow-xl"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            document
              .querySelector<HTMLButtonElement>('[aria-label="Close trash"]')
              ?.focus();
          }}
        >
          <Dialog.Title className="text-base font-semibold">
            {confirming ? 'Empty trash' : 'Trash'}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm">
            {confirming
              ? 'Permanently delete these recoverable workspace copies? This cannot be undone. '
              : 'Trashed files can be restored to their original paths while those paths are empty. '}
            Immutable artifacts, artifact downloads and thread history are
            retained. Workspace file links can stop working when a file is in
            trash or permanently deleted.
          </Dialog.Description>
          {error ? (
            <p
              role="alert"
              className="my-2 text-sm text-rose-700 dark:text-rose-200"
            >
              {error}
            </p>
          ) : null}
          {notice ? <p role="status" className="my-2 text-sm">{notice}</p> : null}
          <ul className="my-3 max-h-48 overflow-y-auto text-sm">
            {list?.entries.map((entry) => (
              <li
                key={entry.trashId}
                className="flex flex-wrap items-center justify-between gap-2 border-b py-2"
              >
                <span className="min-w-0 break-all">
                  {entry.path} ({entry.size.toLocaleString()} bytes)
                </span>
                {!confirming ? (
                  <button
                    type="button"
                    aria-label={`Restore ${entry.path}`}
                    disabled={pending || !canRestore}
                    onClick={() => onRestore(entry)}
                    className="rounded border px-3 py-2 disabled:opacity-50"
                  >
                    Restore
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
          {!list?.entries.length ? (
            <p className="my-2 text-sm">Trash is empty.</p>
          ) : null}
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              aria-label="Close trash"
              disabled={pending}
              onClick={() =>
                confirming ? onConfirmingChange(false) : onClose()
              }
              className="rounded border px-3 py-2"
            >
              {confirming ? 'Cancel' : 'Close'}
            </button>
            {confirming ? (
              <button
                type="button"
                disabled={pending || !canEmpty || !list?.entries.length}
                onClick={onEmpty}
                className="rounded border px-3 py-2 text-rose-700 disabled:opacity-50"
              >
                Empty trash permanently
              </button>
            ) : (
              <>
                <button
                  type="button"
                  disabled={pending}
                  onClick={onRefresh}
                  className="rounded border px-3 py-2"
                >
                  Refresh trash
                </button>
                <button
                  type="button"
                  disabled={pending || !canEmpty || !list?.entries.length}
                  onClick={() => onConfirmingChange(true)}
                  className="rounded border px-3 py-2 text-rose-700 disabled:opacity-50"
                >
                  Empty trash…
                </button>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
