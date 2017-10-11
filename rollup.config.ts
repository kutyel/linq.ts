import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'

export default {
  input: 'dist/linq.js',
  output: [
    { file: 'dist/linq.umd.js', name: 'linq', format: 'umd', exports: 'named' },
  ],
  external: [],
  watch: {
    include: 'dist/**',
  },
  plugins: [commonjs(), resolve(), sourceMaps()],
}
