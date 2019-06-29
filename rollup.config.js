import babel from 'rollup-plugin-babel';

var input = 'src/shc-pc.js';
var babelPlugin = babel({
    exclude: 'node_modules/**'
});

export default [{
    input: input,
    output: {
        file: 'dist/shc-pc.common.js',
        format: 'cjs'
    },
    plugins: [
        babelPlugin
    ]
}, {
    input: input,
    output: {
        file: 'dist/shc-pc.esm.js',
        format: 'esm'
    },
    plugins: [
        babelPlugin
    ]
}];