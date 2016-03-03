var browserSync = require('browser-sync');

browserSync({
    port: 3000,
    ui: {
        port: 3001
    },
    server: {
        baseDir: './'
    },
    files: [
        './index.html'
    ]
});
