module.exports = {
  'src/**/*.(ts|tsx)': () => ['eslint src --ext .ts,.tsx', 'tsc --noEmit']
}