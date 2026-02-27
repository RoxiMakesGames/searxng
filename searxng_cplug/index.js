// ---------------------------------------------------------------------------
// SearXNG Plugin — Privacy-respecting metasearch engine integration.
// ---------------------------------------------------------------------------
import { definePlugin } from '../../cms/kernel/index.js';
import { Search } from 'lucide-react';
import SearxngPage from './SearxngPage.jsx';
import { SearxngSettingsSection } from './SearxngSettingsSection.jsx';

export default definePlugin({
  id: 'searxng_cplug',
  name: 'SearXNG',
  type: 'service',
  required: false,
  defaultEnabled: true,
  version: '0.1.0',
  description: 'Privacy-respecting metasearch engine for your Citadel.',
  icon: Search,
  category: 'Services',
  tags: ['service', 'search', 'privacy'],
  requires: ['user_cplug'],

  routes: [
    { path: '/services/searxng', component: SearxngPage, label: 'SearXNG', permission: 'admin.config' },
  ],

  menuItems: [
    { id: 'searxng', to: '/services/searxng', icon: Search, label: 'SearXNG', section: 'services', order: 40, permission: 'admin.config' },
  ],

  hooks: {
    hook_init({ registerService }) {
      registerService('searxng', {
        _baseUrl: '',
        configure(url) { this._baseUrl = url; },
        search(query) {
          return fetch(`${this._baseUrl}/search?q=${encodeURIComponent(query)}&format=json`)
            .then(r => r.json()).catch(() => ({ results: [] }));
        },
      });
    },

    hook_permission() {
      return [
        { id: 'searxng.admin',            label: 'Administer SearXNG',          module: 'searxng' },
        { id: 'searxng.settings.view',    label: 'View SearXNG settings',       module: 'searxng' },
        { id: 'searxng.settings.edit',    label: 'Edit SearXNG settings',       module: 'searxng' },
        { id: 'searxng.search',           label: 'Use search',                  module: 'searxng' },
        { id: 'searxng.engines.manage',   label: 'Enable / disable engines',    module: 'searxng' },
        { id: 'searxng.preferences.edit', label: 'Edit search preferences',     module: 'searxng' },
      ];
    },

    hook_settings() {
      return {
        id: 'searxng',
        label: 'SearXNG',
        icon: Search,
        weight: 72,
        category: 'Services',
        pluginId: 'searxng_cplug',
        component: SearxngSettingsSection,
      };
    },

    hook_admin() {
      return {
        id: 'searxng',
        label: 'SearXNG',
        icon: Search,
        weight: 72,
        pluginId: 'searxng_cplug',
        component: SearxngSettingsSection,
      };
    },
  },
});
