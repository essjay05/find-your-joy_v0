// Require constants
const
    User = require('../models/User.js'),
    signToken = require('../serverAuth').signToken;

// Export modules:
    module.exports = {
        index: (req, res) => {
            User.find({}, (err, users) => {
                if (err) res.json({ success: false, payload: null, code: err.code })
                res.json({ success: true, payload: users })
            })
        },
        show: (req, res) => {
            User.findById(req.params.id, (err, user) => {
                res.json({ success: true, payload: user })
            })
        },
        create: (req, res) => {
            User.create(req.body, (err, newUser) => {
                if (err) res.json({ success: false, payload: null, code: err.code })
                const token = signToken(newUser)
                res.json({ success: true, token })
            })
        },
        update: (req, res) => {
            console.log(req.params)
            User.findById(req.params.id, (err, updatedUser) => {
                if (!req.body.password) delete req.body.password
                console.log(res.data)
                Object.assign(updatedUser, req.body)
                updatedUser.save(( err, updatedUser ) => {
                    if (err) res.json({ success: false, payload: null, code: err.code })
                    res.json({ success: true, payload: updatedUser })
                })
            })
        },
        destroy: (req, res) => {
            User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
                if (err) res.json({ success: false, payload: null, code: err.code })
                res.json({ success: true, payload: deletedUser })
            })
        },
        authenticate: (req, res) => {
            let { email, password } = req.body;
            User.findOne({ email }, (err, authenticatedUser) => {
                if (!authenticatedUser || !authenticatedUser.validPassword(password)) {
                    return res.json({ success: false, message: 'INVALID CREDENTIALS' })
                }
                const token = signToken(authenticatedUser);
                res.json({ success: true, token })
            })
        }
    }