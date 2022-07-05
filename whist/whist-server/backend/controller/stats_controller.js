const Sales = require("../models/stats_model");

const add = async (req, res, next) => {
  const sales = {
    dateString: req.body.dateString,
    totalPrice: req.body.totalPrice,
    dateNumber: req.body.dateNumber,
  };
  try {
    const exists = await Sales.findOne({
      dateString: req.body.dateString,
    });
    if (exists != null) {
      sales.totalPrice += exists.totalPrice;
      await Sales.updateOne(
        {
          _id: exists.id,
        },
        sales
      ).then((result) => {
        res.status(200).json({
          message: "Contract updated succesfully.",
        });
      });
    } else {
      const newSales = new Sales ({
        dateString: sales.dateString,
        totalPrice: sales.totalPrice,
        dateNumber: sales.dateNumber,
      });
      newSales.save().then((result) => {
        res.status(201).json({
          message: "recommendation was sent",
        });
      }),
        (err) => {
          return res.status(401).send({
            status: "failed",
            error: "failed to add recommendation",
          });
        };
    }
  } catch (err) {
    console.log(err);
  }
};

const getStats = (req, res, next) => {
  Sales.find().then((documents) => {
    res.status(200).json({
      message: "posts fetched successfully",
      sales: documents,
    });
  });
};

module.exports = {
  add,
  getStats,
};
