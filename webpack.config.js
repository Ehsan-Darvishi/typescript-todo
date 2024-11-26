const path = require('path');

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/ //با این کاری نداشته باش
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'] //چه extantion هایی رو ساپورت بکنه
    }
}