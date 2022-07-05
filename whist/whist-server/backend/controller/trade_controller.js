// const Trade = require('../models/trade_model')


// const add = (req, res, next) => {
//   console.log("bdika router admin")
//   const message = new Trade({
//       messageFrom: "1",
//       messageTo: "2",
//       content: "bdika content",
//       senderName: "bdika 2"
//   });

//   message.save().then(() => {
//           res.status(201).json({
//               message: "recommendation was sent",
//           });
//       }),
//       (err) => {
//           return res.status(401).send({
//               status: "failed",
//               error: "failed to add recommendation",
//           });
//       }
// }

// module.exports = {
//   add
// };
