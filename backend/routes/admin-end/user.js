const expres = require('express');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const router = expres.Router();

/* Loading 'User' model */
const User = require('../../model/user');

/* Admin Account Opening */
router.post('/signup', (req, res, next) => {
	let userRole = 'administrator';

	bcryptjs.hash(req.body.password, 10)
	.then(passwordEncrypted => {

		/* Setting up User registration data */
	    const user = new User({
	      email: req.body.email,
	      password: passwordEncrypted,
	      first_name: 'Super',
	      last_name: 'Admin',
	      role: userRole,
	      address1: '2762 Elkview Drive',
	      address2: '',
	      state: 'Florida',
	      city: 'Vero Beach',
	      country: 'United States',
	      zipcode: '32963',
	      phone: '772-234-7199',
	      fax: '589-98-2145',
	      hear_about: 'Admin'
	    });

	    user.save()
	    .then(adminCreated => {
	    	res.status(200).json({
	    		message: 'Admin registered',
	    		status: 200
	    	});
	    })
	    .catch(adminCreationFailted => {
	    	res.status(400).json({
	    		message: 'Admin registration failed',
	    		status: 400
	    	});
	    });
	})
	.catch(passwordHashError => {
		res.status(400).json({
    		message: 'Password generation failed',
    		status: 400
    	});
	});
});

/* Admin Sign In */
router.post('/login', (req, res, next) => {
	let fetchedUser;
	User.findOne({
		email: req.body.email
	})
	.then(userDetails => {
		if(!userDetails){
			res.status(404).json({
				message: 'Admin not found',
				status: 404
			});
		}
		if(userDetails && userDetails.role != 'administrator'){
			res.status(201).json({
				message: 'You are not allowed to log in from here.',
				status: 201
			});
		}
		fetchedUser = userDetails;
		return bcryptjs.compare(req.body.password, userDetails.password);
	})
	.then(passwordMatched => {
		if(!passwordMatched) {
			res.status(404).json({
				message: 'Password not matched',
				status: 404
			});
		}
		let tokenData = {
			email: fetchedUser.email,
			userId: fetchedUser._id
		};
		const token = jsonwebtoken.sign(tokenData, 'login_secret_token', {expiresIn: '1h'});
		res.status(200).json({
			message: 'Log in successful',
			status: 200,
			role: fetchedUser.role,
			userId: fetchedUser._id,
			token: token,
			expiry: 3600
		});
	})
	.catch(passwordError => {
		res.status(404).json({
			message: 'Admin auth failed',
			status: 404
		});
	})
});

module.exports = router;