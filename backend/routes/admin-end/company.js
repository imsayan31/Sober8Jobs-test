const express = require('express');

const router = express.Router();

/* Loading Company Model */
const Company = require('../../model/company');

/* Get Companies */
router.get('/company-listing', (req, res, next) => {
  let totalCompanies;
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const searchParam = req.query.search;

  const companyQuery = Company
  /* .find({ isDeleted: false }).select({ "company_name": 1 }); */
  .find({ isDeleted: false })
  .sort([['createdDtm', -1]]);

  if(searchParam) {
    companyQuery.or([{ 'company_name': { $regex: '.*' + searchParam + '.*' } }]);
    companyQuery.or([{ 'website': { $regex: '.*' + searchParam + '.*' } }]);
  }
  /* console.log(companyQuery);
  return; */
  /* companyQuery.exec(function (err) {
    if (err) {
      console.log(err);
      // handle error
      return;
    }
    console.log('success');
    return;
    // handle success
  }); */
  companyQuery
  .then(companyRes => {
    totalCompanies = companyRes.length;
    return totalCompanies;
  })
  .then(companyCount => {
    if(pageSize && currentPage) {
      companyQuery
      .skip(pageSize * (currentPage -1))
      .limit(pageSize)
    }
    companyQuery
    .then(companyList => {
      /* console.log(companyList);
      return; */
      res.status(200).json(
        {
          status: 200,
          message: 'Companies returned successfully',
          companyList: companyList,
          totalCount: companyCount
        }
      )
    })
  })
  .catch(companyResError => {

    res.status(404).json({
      status: 404,
      message: 'Companies not found',
      comapnyList: companyResError,
      totalCount: 0
    })
  })

});

module.exports = router;


