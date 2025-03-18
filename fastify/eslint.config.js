import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'dist*',
    ],
  },
  {
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'curly': ['error', 'all'],
    },
  },
  {
    files: [
      'src/**/*.js',
    ],
    rules: {
      'no-console': 'off',
    },
  },
)
