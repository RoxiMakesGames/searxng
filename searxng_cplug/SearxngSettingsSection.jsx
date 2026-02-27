// ---------------------------------------------------------------------------
// SearXNG Settings Section — privacy search engine configuration.
// ---------------------------------------------------------------------------

import React, { useState } from 'react';
import { useKernel } from '../../cms/kernel/providers.jsx';
import { Toggle, Field, Section, SettingsShell } from '../../cms/components/index.js';
import { Search, Link, Sliders } from 'lucide-react';

export function SearxngSettingsSection() {
  const { getService } = useKernel();
  const storage = getService('storage');
  const saved = storage?.get('svc:searxng', {}) || {};

  const [enabled, setEnabled] = useState(saved.enabled ?? false);
  const [url, setUrl] = useState(saved.url || '');
  const [safeSearch, setSafeSearch] = useState(saved.safeSearch ?? 1);
  const [defaultLang, setDefaultLang] = useState(saved.defaultLang || 'en');
  const [autoComplete, setAutoComplete] = useState(saved.autoComplete ?? true);
  const [done, setDone] = useState(false);

  function save() {
    storage?.set('svc:searxng', { enabled, url, safeSearch, defaultLang, autoComplete });
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }

  return (
    <SettingsShell
      pluginId="searxng"
      serviceId="searxng"
      title="SearXNG"
      icon={Search}
      iconColor="text-cyan-400"
      badge={{ label: enabled ? 'Enabled' : 'Disabled', color: enabled ? 'emerald' : 'slate' }}
      onSave={save}
      saved={done}
      routingDefaults={{ defaultSubdomain: 'search', defaultPort: 8080 }}
    >
      <div className="space-y-5">
        <Toggle label="Enable SearXNG Integration" desc="Privacy-respecting metasearch engine." value={enabled} onChange={setEnabled} card />

        {enabled && (
          <>
            <Section icon={Link} iconColor="text-blue-400" title="Connection">
              <Field label="SearXNG URL" value={url} onChange={setUrl} placeholder="https://search.example.com" type="url" />
            </Section>

            <Section icon={Sliders} iconColor="text-amber-400" title="Search Settings">
              <div className="space-y-3">
                <Field label="Safe Search" value={safeSearch} onChange={(v) => setSafeSearch(Number(v))} type="select" options={[
                  { value: 0, label: 'Off' },
                  { value: 1, label: 'Moderate' },
                  { value: 2, label: 'Strict' },
                ]} />
                <Field label="Default Language" value={defaultLang} onChange={setDefaultLang} placeholder="en" />
                <Toggle label="Auto-Complete" desc="Enable search suggestions." value={autoComplete} onChange={setAutoComplete} card />
              </div>
            </Section>
          </>
        )}
      </div>
    </SettingsShell>
  );
}
