const express = require('express');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const router = express.Router();

/* Loading `User` Model */
const User = require('../model/user');
const Company = require('../model/company');
const CompanyAddress = require('../model/company-address');

/* Employer, Job Seeker & Company Registration Process */
router.post('/signup', (req, res, next) => {

  /* Setting User Role */
  let userRole = 'job-seeker';
  if (req.body.company_name) {
    userRole = 'employer';
  }

  /* Make Password Hashed */
  bcryptjs.hash(req.body.password, 10)
  .then(hash => {

    /* Setting up User registration data */
    const user = new User({
      email: req.body.email,
      password: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: userRole,
      address1: req.body.address_1,
      address2: req.body.address2,
      state: req.body.state,
      city: req.body.city,
      country: req.body.country,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
      fax: req.body.fax,
      hear_about: req.body.hear_about
    });

    /* Create New User */
    user.save()
    .then(userCreated => {
      if(req.body.company_name){  //Employer registered
        const company = new Company({
          user_id: userCreated._id,
          company_name: req.body.company_name,
          website: req.body.website,
          description: req.body.company_desc
        });

        /* Create New Company */
        company.save()
        .then(companyCreated => {
          res.status(200).json({
            message: 'Employer and company successfully registered.',
            status: 200
          });
        })
        .catch(companyError => {
          res.status(500).json({
            message: 'Company registration failed.',
            status: 500
          });
        });
      } else {  //Job seeker registered
        res.status(200).json({
          message: 'User successfully registered.',
          status: 200
        });
      }
    })
    .catch(userError => {

      res.status(500).json({
        message: 'User registration failed.',
        status: 500,
        errorMsg: userError.error
      });
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Password can not be hashed.',
      status: 500
    });
  });
});

/* Employer & Job Seeker Log In Process */
router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }) //Find user by email
  .then(user => {
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Email not found'
      });
    }
    fetchedUser = user;
    return bcryptjs.compare(req.body.password, user.password);  //Matching user password with database password
  })
  .then(hashPassword => {
    if (!hashPassword) {
      return res.status(404).json({
        status: 404,
        message: 'Password not matched'
      });
    }

    //On successful login, generating web token
    const token = jsonwebtoken.sign(
      { email: fetchedUser.email, userId: fetchedUser._id},
      'login_secret_token',
      { expiresIn: '1h' }
    );
    res.status(200).json({
      status: 200,
      message: 'Logged in successfully',
      role: fetchedUser.role,
      userId: fetchedUser._id,
      token: token,
      expiry: 3600
    });
  })
  .catch(userError => {
    res.status(404).json({
      status: 404,
      message: 'Auth failed'
    });
  })
});

/* User Profile Details */
router.get('/profile/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(resp => {
    res.status(200).json({
      status: 200,
      message: 'User retreived successfully',
      userData: resp
    })
  })
  .catch(err => {
    res.status(404).json({
      status: 404,
      message: 'No user found',
      userData: null
    })
  })
});

/* Company Profile Details */
router.get('/company-profile/:companyId', (req, res, next) => {

});

/* Save User Profile Data */
router.put('/save-profile', (req, res, next) => {

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
      message: 'Profile data updated successfully.',
      updatedData: updatedData
    });
  })
  .catch(error => {
    res.status(400).json({
      status: 400,
      message: 'Profile data can not be updated.',
      error: error
    });
  });

});

/* Save Company Profile Data */
router.put('/save-company-profile', (req, res, next) => {
  Company.updateOne(
    {
      user_id: req.body.id
    },
    {
      company_name: req.body.company_name,
      website: req.body.company_website,
      description: req.body.company_desc
    }
  )
  .then(updatedData => {

    CompanyAddress.find({
      user_id: req.body.id
    })
    .then(foundData => {
      console.log('User id not found.');
      CompanyAddress.deleteMany({
        user_id: req.body.id
      }).then(deletedAddr => {
        console.log('Prev address deleted: ' + deletedAddr);
      }).catch(errorAddress => {
        console.log('Prev address not deleted: ' + errorAddress);
      });
    });

    const locationCount = req.body.locations.length;
    const locationArr = req.body.locations;
    let i = 0;
    for (i = 0; i < locationCount; i++) {
      const companyAddress = new CompanyAddress({
        user_id: req.body.id,
        address: locationArr[i].address,
        city: locationArr[i].city,
        state: locationArr[i].state,
        zipcode: locationArr[i].zipcode,
        country: locationArr[i].country
      });
      companyAddress.save()
      .then(addressStored => {
        res.status(200).json({
          status: 200,
          message: 'Company profile and adrdress updated successfully.',
          updatedData: addressStored
        });
      })
      .catch(addressError => {
        res.status(400).json({
          status: 400,
          message: 'Company address can not be saved.',
          updatedData: addressError
        });
      })
    }

    
  })
  .catch(error => {
    res.status(400).json({
      status: 400,
      message: 'Company profile data can not be updated.',
      error: error
    });
  });

});

module.exports = router;
