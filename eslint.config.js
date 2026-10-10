import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/**', 'coverage/**']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
  },
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: [
      '*.{js,mjs,cjs}',
      'scripts/**/*.{js,mjs,cjs}',
      'tests/**/*.{js,mjs,cjs}',
    ],
    languageOptions: { globals: globals.node },
  },
]);
