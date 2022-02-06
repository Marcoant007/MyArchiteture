module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
          alias: {
            '@config': './src/config',
            '@database': './src/database',
            '@dto': './src/dto',
            '@models': './src/models',
            '@modules': './src/modules',
            '@routes': './src/routes',
            "@repositories": "./src/repositories",
            "@services": "./src/services",
            "@util": "./src/util",
            '@app': './src/app'
          }
        }]
      ],
  };