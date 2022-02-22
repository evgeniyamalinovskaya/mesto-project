const autoprefixer = require('autoprefixer'); // подключили плагины в файл
const cssnano = require('cssnano');

module.exports = {  // подключите плагины к PostCSS
    plugins: [
        autoprefixer, // подключите autoprefixer
        cssnano({ preset: 'default' }) // cssnano при подключении нужно передать объект опций{ preset: default } говорит о минификации
    ]
};