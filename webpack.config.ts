import { join } from 'path';

export default {
    entry: './linq.ts',
    output: {
        path: join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'linq'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
};
