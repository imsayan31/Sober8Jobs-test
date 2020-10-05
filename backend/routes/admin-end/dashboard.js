const express = require('express');

const router = express.Router();

/* Load Models */
const User = require('../../model/user');
const Company = require('../../model/company');

/* Get Total Users */
router.get('/get-users', (req, res, next) => {
  const userRole = req.query.role;
  let fetchedCount;
  const userQuery = User.where(
    {
      role: userRole,
      isDeleted: false
    }
  );
  userQuery
  .then(userQuery => {
    fetchedCount = userQuery.length;
    res.status(200).json({
      status: 200,
      totalUsers: fetchedCount
    });
  })
  .catch(userQueryError => {
    res.status(404).json({
      status: 404,
      totalUsers: 0
    });
  })
});

/* Get Total Companies */
router.get('/get-companies', (req, res, next) => {
  let fetchedComCount;
  const companyQuery = Company.where({ isDeleted: false });
  companyQuery
  .then(companyRes => {
    fetchedComCount = companyRes.length;
    res.status(200).json({
      status: 200,
      totalCompany: fetchedComCount
    });
  })
  .catch(companyResError => {
    res.status(404).json({
      status: 404,
      totalCompany: 0
    });
  })
});

module.exports = router;
