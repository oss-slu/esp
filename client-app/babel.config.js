module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react"], 
    transform: {
      '^.+\\.css$': 'ignore', // Ignore all CSS files
    },
  };