import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'

const pkg = require('./package.json')

const moduleName = 'linq'

export default {
  entry: `dist/${moduleName}.js`,
  targets: [
    { dest: pkg['umd:main'], moduleName, format: 'umd' },
  ],
  sourcemap: true,
  external: [],
  watch: {
    include: 'dist/**',
  },
  plugins: [commonjs(), resolve(), sourceMaps()],
}
