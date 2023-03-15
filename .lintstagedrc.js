module.exports = {
  'src/**/*.(ts|tsx)': () => 'eslint src --ext .js,.jsx,.ts,.tsx',
  'src/**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
}