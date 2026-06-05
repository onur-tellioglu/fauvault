import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-config-next 16 bundles eslint-plugin-react-hooks v6, which
    // promotes several previously non-existent rules to errors. The existing
    // client components use intentional mount-only effects and latest-ref
    // patterns that these rules flag. Keep them as warnings (matching the
    // pre-existing exhaustive-deps severity) so the migration does not change
    // runtime behavior; the flagged components can be refactored separately.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
  globalIgnores([
    'node_modules/**',
    '.next/**',
    '.worktrees/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
