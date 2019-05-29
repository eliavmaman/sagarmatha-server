const Order = require('../models/order');
const User = require('../models/user');
module.exports = {
    list: (req, res) => {
        Order.find().exec(function (err, orders) {
            if (err) throw err;
            res.json(orders)
        });
    },
    create: (req, res) => {
        let order = new Order(req.body);

        order.save(function (err) {
            if (err) {
                return res.status(422).send({
                    message: err
                });
            } else {
                User.findOne({_id: order.user}).exec((err, user) => {
                    user.orders.push(order._id);
                    user.save((err) => {
                        if (err) {
                            return res.status(422).send({
                                message: err
                            });
                        }
                        res.json(order);
                    })
                });

            }
        });

    },

    update: (req, res) => {
        var id = req.params.id;
        console.log('cid selected is:' + id);
        console.log('get orders');
        Order.findOne({_id: id}).exec(function (err, order) {
            if (err) throw err;
            order.store = req.body.store;
            order.created = req.body.created;
            order.discount = req.body.discount;
            order.total = req.body.total;

            order.save(function (err) {
                if (err) {
                    return res.status(422).send({
                        message: err
                    });
                } else {
                    res.json(order);
                }
            });
        });
    },
    delete: (req, res) => {

        Order.findByIdAndRemove(req.params.id, (err, order) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "successfully deleted",
                id: req.params.id
            };
            return res.status(200).send(response);
        });
    },


};