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

/* Get All Users */
router.get('/get-users', (req, res, next) => {
	const pageSize = +req.query.pageSize;
	const currentPage = +req.query.page;
	const searchItem = req.query.search;
	let fetchedCount;
	const userQuery = User.find(
						{
							role: {$ne: 'administrator'}
						},
						{
							_id: 1,
							first_name: 1,
							last_name: 1,
							email: 1,
							role: 1,
							createdDtm: 1,
							updatedDtm: 1
						}
					);
	
	if(searchItem) {
		//userQuery.where('email').regex('.*' + searchItem + '.*');
		userQuery.or([{'email': {$regex: '.*' + searchItem + '.*'}}]);
		userQuery.or([{'first_name': {$regex: '.*' + searchItem + '.*'}}]);
		userQuery.or([{'last_name': {$regex: '.*' + searchItem + '.*'}}]);
		userQuery.or([{'role': {$regex: '.*' + searchItem + '.*'}}]);
		//userQuery.or([{'createdDtm': {$regex: '.*' + searchItem + '.*'}}]);
	}
	//userQuery.getFilter();
	/*var ss = userQuery.getFilter();
	console.log(ss);
	return;*/
	userQuery.then(usersList => {
		fetchedCount = usersList.length;
		//console.log('Length is: ' + fetchedCount);
		return fetchedCount;
	}).then(count => {
		if(pageSize && currentPage) {
			userQuery
			.skip(pageSize * (currentPage - 1))
			.limit(pageSize);
		}
		userQuery.then(usersList => {
			/*console.log('Users data: ' + usersList);
			return;*/
			res.status(200).json({
				status: 200,
				message: 'Users returned successfully',
				usersList: usersList,
				totalCount: count
			});
		})
		
	}).catch(error => {
		res.status(404).json({
			status: 404,
			message: 'Users not found',
			usersList: error
		})
	})
});

/* Get User Details */
router.get('/get-user-details', (req, res, next) => {
	const userId = req.query.userId;
	let fetchedCount;
	const userQuery = User.findById(userId);
	
	
	userQuery.then(userInfo => {

		res.status(200).json({
			status: 200,
			message: 'User details fetched successfully',
			userInfo: userInfo
		});
	}).catch(error => {
		res.status(404).json({
			status: 404,
			message: 'Users not found',
			userInfo: error
		})
	})
});

router.put('/update-user-profile', (req, res, next) => {
	User.updateOne(
    {
      _id: req.body.id
    },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      fax: req.body.fax,
      state: req.body.state,
      city: req.body.city,
      country: req.body.country,
      address1: req.body.address1,
      zipcode: req.body.zipcode
    }
  )
  .then(updatedData => {
    res.status(200).json({
      status: 200,
      message: 'User data updated successfully.'
    });
  })
  .catch(error => {
    res.status(400).json({
      status: 400,
      message: 'Profile data can not be updated.'
    });
  });
});

module.exports = router;