import type {
  ThreadWorkspaceCapabilities,
  ThreadWorkspaceArchiveFormat,
} from '../../../adapters';

export function validateWorkspaceOperationCapabilities(
  capabilities: ThreadWorkspaceCapabilities,
) {
  const { archives, trash } = capabilities;
  if (
    archives !== undefined &&
    (archives.version !== 1 ||
      !Array.isArray(archives.formats) ||
      archives.formats.length > 2 ||
      archives.formats.some((format) => format !== 'tar' && format !== 'zip') ||
      new Set(archives.formats).size !== archives.formats.length)
  ) {
    throw new Error(
      'Archive capability is unsupported. Refresh the workspace to retry discovery.',
    );
  }
  if (
    trash !== undefined &&
    (trash.version !== 1 ||
      ['files', 'restore', 'empty'].some(
        (key) => typeof trash[key as keyof typeof trash] !== 'boolean',
      ))
  ) {
    throw new Error(
      'Trash capability is unsupported. Refresh the workspace to retry discovery.',
    );
  }
  return capabilities;
}

export function workspaceArchiveFormats(
  capabilities: ThreadWorkspaceCapabilities | null,
  operation: 'import' | 'download',
): ThreadWorkspaceArchiveFormat[] {
  if (!capabilities) return [];
  try {
    validateWorkspaceOperationCapabilities(capabilities);
  } catch {
    return [];
  }
  if (capabilities.archives) return capabilities.archives.formats;
  return (operation === 'import'
    ? capabilities.archiveImport
    : capabilities.download.directory) === 'tar'
    ? ['tar']
    : [];
}

export function workspaceTrashCapabilities(
  capabilities: ThreadWorkspaceCapabilities | null,
) {
  if (!capabilities) return null;
  try {
    validateWorkspaceOperationCapabilities(capabilities);
  } catch {
    return null;
  }
  return capabilities.trash ?? null;
}
