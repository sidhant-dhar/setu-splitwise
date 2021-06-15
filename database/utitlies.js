const userModel = require('../database/models/UserSchema');
const jwt = require('jsonwebtoken');
const { ConnectionStates } = require('mongoose');

const userOperation = {
  AddUser(userObject, response) {
    userObject.amount = 0;
    userModel.create(userObject, (err, doc) => {
      if (err) {
        console.log('Error is ', err);
        response.json({ Status: 'F' });
      } else {
        response.json({ Status: 'S', record: doc });
      }
    });
  },

  Find(username) {
    return userModel.findOne({ username }, function (err, doc) {
      if (err) {
        console.log(err);
        //   return false;
      } else {
        if (doc) {
          console.log(doc);
          // return true;
        } else {
          console.log('not Found');
          //  return false;
        }
      }
    });
  },

  AddExp(userObject, response) {
    console.log(userObject.equal, typeof userObject.equal);
    const isEqual = userObject.equal;

    if (isEqual === 'true') {
      userModel
        .find()
        .count(function (err, count) {
          console.log('Number of docs: ', count);
        })
        .then((count) => {
          const amount = userObject.amount / count;

          console.log(amount, 'newamt');
          userModel.updateMany(
            {},
            {
              $inc: { amount },
            },
            { multi: true },
            (err, doc) => {
              if (err) {
                console.log(err);
              } else {
                console.log(doc);
              }
            }
          );
        })
        .then(() => {
          userModel.findOneAndUpdate(
            { username: userObject.username },
            {
              $inc: { amount: userObject.amount * -1 },
            },
            { new: true },
            (err, doc) => {
              if (err) {
                console.log(err);
              } else {
                console.log(doc);
                response.json({
                  Status: 'S',
                  msg: 'Added succesfully balances to all users',
                });
              }
            }
          );
        });
    } else {
      const userArray = JSON.parse(userObject.userarray);
      const amount = userObject.amount / (userArray.length + 1);
      const remAmount = userObject.amount - amount;
      console.log(userArray);
      userModel
        .find(
          { username: { $in: ['sid', 'sidh', '123'] } },
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        )
        .updateMany(
          {},
          {
            $inc: { amount },
          },
          { multi: true },
          (err, doc) => {
            if (err) {
              console.log(err);
            } else {
              console.log(doc);
            }
          }
        )
        .then(() => {
          userModel.findOneAndUpdate(
            { username: userObject.username },
            {
              $inc: { amount: remAmount * -1 },
            },
            { new: true },
            (err, doc) => {
              if (err) {
                console.log(err);
              } else {
                console.log(doc);
                response.json({
                  Status: 'S',
                  msg: 'Added succesfully balances to specific users',
                });
              }
            }
          );
        });
    }
  },

  settle(userObject, response) {
    userModel.findOneAndUpdate(
      { username: userObject.username },
      { $set: { amount: 0 } },
      { new: true, useFindAndModify: false },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
          response.json({ Status: 'S', msg: 'Settled up!', doc: doc });
        }
      }
    );
  },

  getAllUsers(req, res) {
    userModel.find().exec(function (err, users) {
      console.log('err', err);
      return res.send(users);
    });
  },
};

module.exports = userOperation;
