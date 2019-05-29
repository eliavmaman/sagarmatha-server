const User = require('../models/user');
const Order = require('../models/order');
var ObjectID = require("mongodb").ObjectID;
module.exports = {
    auth: (req, res) => {

        let email = req.body.email;

        if (email === 'admin@admin.com') {
            res.json({email: 'admin@admin.com', _id: -1, role: 'admin'});
        }

        User.findOne({email: email}).populate('orders','_id').exec(function (err, user) {
            if (err) throw err;

            if (!user)
                return res.status(404).send({
                    message: 'user not found'
                });
            res.json(user)
        });
    }
    ,
    list: (req, res) => {
        let id = req.params.id;
        let role = req.body.role;
        let query = {};
        if (role === 'customer')
            query._id = id;

        User.find(query).exec(function (err, users) {
            if (err) throw err;
            res.json(users)
        });
    },
    create:
        (req, res) => {
            let user = new User(req.body);

            user.save(function (err) {
                if (err) {
                    return res.status(422).send({
                        message: err
                    });
                } else {
                    res.json(user);
                }
            });

        },
    update:
        (req, res) => {
            var id = req.params.id;
            console.log('cid selected is:' + id);
            console.log('get active users');
            User.findOne({_id: id}).exec(function (err, user) {
                if (err) throw err;
                user.name = req.body.name;
                user.email = req.body.email;
                user.role = req.body.role;

                user.save(function (err) {
                    if (err) {
                        return res.status(422).send({
                            message: err
                        });
                    } else {
                        res.json(user);
                    }
                });
            });
        },
    userOrders: (req, res) => {
        const id = req.params.id;
        const role = req.body.role;
        let query = {};
        if (role === 'customer') {
            query.user = id;
        }
        console.log('Try get user orders');
        console.log(query);
        Order.find(query).exec(function (err, orders) {
            if (err) throw err;
            res.json(orders)
        });
    },
    ordersPerDay:
        (req, res) => {
            let id = req.params.id;
            console.log('cid selected is:' + id);

            var userid = new ObjectID(id);
            Order.aggregate([
                {$match: {user: userid}},
                {$group: {_id: "$created", orders_per_day: {$sum: 1}}}
            ], (err, data) => {

                if (err)
                    throw err;

                res.json(data);
            });

        },

};