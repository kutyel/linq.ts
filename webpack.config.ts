import { join } from 'path';

export default {
    entry: './linq.ts',
    output: {
        path: join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'linq'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};
