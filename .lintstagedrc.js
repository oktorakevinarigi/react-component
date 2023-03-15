module.exports = {
  'src/**/*.(ts|tsx)': () => 'eslint src --ext .ts,.tsx',
  'src/**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
}