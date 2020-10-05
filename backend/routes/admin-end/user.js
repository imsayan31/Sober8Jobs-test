const expres = require('express');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');

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
          ).sort([['createdDtm', -1]]);

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

/* Admin Update User Data */
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
      zipcode: req.body.zipcode,
      role: req.body.role
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

/* Admin Update User Password */
router.put('/update-user-password', (req, res, next) => {
	const userId = req.body.id;
	const userQuery = User.findById(userId);
	let userFoundIndex;

	userQuery.then(userFound => {
		if(!userFound) {

		}
		userFoundIndex = userFound;
		return bcryptjs.compare(req.body.old_password, userFound.password);
	  }).then(passwordMatched => {
	  	if(!passwordMatched) {
			res.status(404).json({
				message: 'Your old password not matched',
				status: 404
			});
		}
		return bcryptjs.compare(req.body.new_password, userFoundIndex.password);
	  }).then(newOldPasswordSame => {
	  	if(newOldPasswordSame) {
	  		res.status(404).json({
				message: 'Your new password must be different from your current password',
				status: 404
			});
	  	}
	  	return bcryptjs.hash(req.body.new_password, 10);
	  }).then(passwordGenerated => {
	  	return User.updateOne(
		    {
		      _id: req.body.id
		    },
		    {
		      password: passwordGenerated
		    }
		  )
	  }).then(passwordUpdated => {
	  	if(passwordUpdated) {
	  		res.status(200).json({
		      status: 200,
		      message: 'User password updated successfully.'
		    });
	  	}
	  }).catch(error => {
	    res.status(400).json({
	      status: 400,
	      message: 'User not found.'
	    });
	  });
});

/* Admin Create User Profile */
router.post('/create-user-account', (req, res, next) => {
  const randomPassword = cryptoRandomString({ length: 10, type: 'alphanumeric' })

  /* Make Password Hashed */
  bcryptjs.hash(randomPassword, 10)
  .then(hash => {
    /* Setting Up User Registration Data */
    const userData = new User({
      email: req.body.email,
      password: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.body.role,
      address1: req.body.address1,
      state: req.body.state,
      city: req.body.city,
      country: req.body.country,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
      fax: req.body.fax,
      hear_about: 'Admin Panel'
    })

    /* Create New User */
    userData.save()
    .then(userCreated => {
      res.status(200).json({
        message: 'User successfully registered.',
        status: 200
      });
    })
    .catch(userError => {
      res.status(400).json({
        message: 'User registration failed.',
        status: 400
      });
    })
  })
});

module.exports = router;
