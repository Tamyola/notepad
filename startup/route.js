module.exports = function (app) {
    app.use('/', require('../routes/router'))
    app.use('/admin', require('../routes/admin'))
    app.use('/user', require('../routes/user'))
    app.use('/notes', require('../routes/notes'))
}