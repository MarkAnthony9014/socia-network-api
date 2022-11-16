const router = require('express').Router();
const userRoutes = require('./api/user-routes');
const thoughtRoutes = require('./api/thought-routes');

router.use('/api/users', userRoutes);

router.use('/api/thoughts', thoughtRoutes);




module.exports = router;