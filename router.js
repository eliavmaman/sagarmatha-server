const express = require('express');
const router = express.Router();


const users = require('./services/user.service');
const orders = require('./services/order.service');


const cors = require('cors');

router.all('*', cors());
router.route('/auth').post(users.auth);
// users
router.route('/users').post(users.create);
router.route('/users/:id/all').post(users.list);
router.route('/users/:id/ordersperday').get(users.ordersPerDay);
router.route('/users/:id').put(users.update);
router.route('/users/:id/orders').post(users.userOrders);

router.route('/orders').post(orders.create);
router.route('/orders').get(orders.list);
router.route('/orders/:id').delete(orders.delete);

router.route('/orders/:id').put(orders.update);

module.exports = router;