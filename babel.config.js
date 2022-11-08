module.exports = {
  comments: false,
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-typescript'],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ]
};
