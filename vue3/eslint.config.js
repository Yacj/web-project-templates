import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'public',
      'dist*',
    ],
  },
  {
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'curly': ['error', 'all'],
      'no-console': 'off',
    },
  },
  {
    files: [
      'src/**/*.vue',
    ],
    rules: {
      'vue/block-order': ['error', {
        order: ['route', 'script', 'template', 'style'],
      }],
    },
  },
)
