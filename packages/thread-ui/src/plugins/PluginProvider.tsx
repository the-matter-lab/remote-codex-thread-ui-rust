import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  ImportPluginInput,
  PluginDto,
  UpdatePluginInput,
  ThreadArtifactDto,
} from '@remote-codex/shared';
import {
  PluginContext,
  mergePluginState,
  type PluginContextValue,
} from './plugin-context';
import type {
  ArtifactRenderContext,
  FrontendPluginModule,
  InlineCodeRenderContext,
  ExtensionHostAdapter,
} from './plugin-types';
import {createExtensionPluginApi, extensionModuleAvailable} from './extension-api';

export interface PluginProviderAdapter {
  fetchPlugins?: () => Promise<PluginDto[]> | PluginDto[];
  importPlugin?: (input: ImportPluginInput) => Promise<PluginDto> | PluginDto;
  updatePlugin?: (
    pluginId: string,
    input: UpdatePluginInput,
  ) => Promise<PluginDto> | PluginDto;
  deletePlugin?: (pluginId: string) => Promise<PluginDto> | PluginDto;
}

const DEFAULT_PLUGIN_PROVIDER_ADAPTER: PluginProviderAdapter = {};
const DEFAULT_BUILTIN_PLUGINS: FrontendPluginModule[] = [];

export function PluginProvider({
  adapter = DEFAULT_PLUGIN_PROVIDER_ADAPTER,
  builtinPlugins = DEFAULT_BUILTIN_PLUGINS,
  extensionHost,
  children,
}: {
  adapter?: PluginProviderAdapter;
  builtinPlugins?: FrontendPluginModule[];
  extensionHost?: ExtensionHostAdapter;
  children: ReactNode;
}) {
  const [plugins, setPlugins] = useState<PluginDto[]>(() =>
    mergePluginState(builtinPlugins, []),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const serverPlugins = adapter.fetchPlugins
        ? await adapter.fetchPlugins()
        : [];
      setPlugins(mergePluginState(builtinPlugins, serverPlugins));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load plugins.');
    } finally {
      setLoading(false);
    }
  }, [adapter, builtinPlugins]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const setPluginEnabled = useCallback(
    async (pluginId: string, enabled: boolean) => {
      let previousEnabled: boolean | undefined;
      setError(null);
      setPlugins((current) =>
        current.map((plugin) => {
          if (plugin.id !== pluginId) {
            return plugin;
          }
          previousEnabled = plugin.enabled;
          return { ...plugin, enabled };
        }),
      );

      if (!adapter.updatePlugin) {
        return;
      }

      try {
        const updated = await adapter.updatePlugin(pluginId, { enabled });
        setPlugins((current) =>
          current.map((plugin) => (plugin.id === updated.id ? updated : plugin)),
        );
      } catch (err) {
        if (previousEnabled !== undefined) {
          setPlugins((current) =>
            current.map((plugin) =>
              plugin.id === pluginId && plugin.enabled === enabled
                ? { ...plugin, enabled: previousEnabled! }
                : plugin,
            ),
          );
        }
        setError(err instanceof Error ? err.message : 'Unable to update plugin.');
        throw err;
      }
    },
    [adapter],
  );

  const importPluginManifest = useCallback(
    async (input: ImportPluginInput) => {
      if (!adapter.importPlugin) {
        throw new Error('Plugin import is not available.');
      }

      const imported = await adapter.importPlugin(input);
      setPlugins((current) => {
        const next = current.filter((plugin) => plugin.id !== imported.id);
        return [...next, imported];
      });
    },
    [adapter],
  );

  const uninstallPlugin = useCallback(
    async (pluginId: string) => {
      if (!adapter.deletePlugin) {
        throw new Error('Plugin uninstall is not available.');
      }

      const removed = await adapter.deletePlugin(pluginId);
      setPlugins((current) =>
        current.filter((plugin) => plugin.id !== removed.id),
      );
    },
    [adapter],
  );

  const enabledModules = useMemo(() => {
    const enabledIds = new Set(
      plugins.filter((plugin) => plugin.enabled).map((plugin) => plugin.id),
    );
    return builtinPlugins.filter((module) =>
      enabledIds.has(module.manifest.id) && extensionModuleAvailable(module, extensionHost),
    );
  }, [builtinPlugins, plugins, extensionHost]);

  const extensions = useMemo(() => createExtensionPluginApi(enabledModules, extensionHost), [enabledModules, extensionHost]);

  const renderArtifact = useCallback(
    (context: ArtifactRenderContext) => {
      const module = enabledModules.find(
        (entry) =>
          entry.renderArtifact &&
          entry.manifest.capabilities.artifactTypes.some(
            (type) => type.type === context.artifact.type,
          ),
      );
      return module?.renderArtifact?.({...context, extensionHost: extensions.extensionHost}) ?? null;
    },
    [enabledModules, extensions],
  );

  const renderInlineCode = useCallback(
    (context: InlineCodeRenderContext) => {
      for (const module of enabledModules) {
        for (const renderer of module.inlineCodeRenderers ?? []) {
          if (!renderer.languages.includes(context.language.trim().toLowerCase())) {
            continue;
          }
          const rendered = renderer.render(context);
          if (rendered) {
            return rendered;
          }
        }
      }
      return null;
    },
    [enabledModules],
  );

  const hasRendererForArtifact = useCallback(
    (artifact: ThreadArtifactDto) =>
      enabledModules.some(
        (entry) =>
          Boolean(entry.renderArtifact) &&
          entry.manifest.capabilities.artifactTypes.some(
            (type) => type.type === artifact.type,
          ),
      ),
    [enabledModules],
  );

  const getThreadPanels = useCallback(
    extensions.getExtensionPanels,
    [extensions],
  );

  const value = useMemo<PluginContextValue>(
    () => ({
      extensions,
      plugins,
      loading,
      error,
      refresh,
      importPluginManifest,
      setPluginEnabled,
      uninstallPlugin,
      renderArtifact,
      renderInlineCode,
      hasRendererForArtifact,
      getThreadPanels,
    }),
    [
      extensions,
      error,
      getThreadPanels,
      hasRendererForArtifact,
      importPluginManifest,
      loading,
      plugins,
      refresh,
      renderArtifact,
      renderInlineCode,
      setPluginEnabled,
      uninstallPlugin,
    ],
  );

  return (
    <PluginContext.Provider value={value}>
      {children}
    </PluginContext.Provider>
  );
}
