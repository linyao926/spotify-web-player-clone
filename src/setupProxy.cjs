module.exports = function (app) {
    app.use(proxy(`/auth/**`, { 
        target: 'http://localhost:3000' 
    }));
};