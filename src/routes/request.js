const express = require("express");
const connectionRouter = express.Router();
const { userLoginAuth } = require("../middlewares/auth");
const ConnectionModel = require("../models/connectRequestModel");
const User = require("../models/user");

connectionRouter.post(
  "/request/send/:status/:userID",
  userLoginAuth,
  async (req, res) => {
    try {
      const fromRequestID = req.authData._id;
      const toRequestID = req.params.userID;
      const status = req.params.status;

      const isIDValid = await User.findById({ _id: toRequestID });
      console.log(isIDValid, "valid?");

      if (!["interested", "ignored"].includes(status)) {
        res.status(400).send("status is not valid");
      } else {
        if (isIDValid !== null) {
          const isConnectionExist = await ConnectionModel.findOne({
            $or: [
              { fromRequestID, toRequestID },
              { fromRequestID: toRequestID, toRequestID: fromRequestID },
            ],
          });

          if (isConnectionExist == null) {
            const establishedConnection = new ConnectionModel({
              fromRequestID: fromRequestID,
              toRequestID: toRequestID,
              status: status,
            });
            await establishedConnection.save();
            res.status(200).json({
              message: "connection established successfully",
              data: establishedConnection,
            });
          } else {
            throw new Error("connection already exist..");
          }
        } else {
          throw new Error("user doesnt exist...");
        }
      }
    } catch (error) {
      res.status(400).send("something went wrong" + error);
    }
  }
);

connectionRouter.post(
  "/request/review/:status/:userID",
  userLoginAuth,
  async (req, res) => {
    try {
      const loginId = req.authData._id;
      const { status, userID } = req.params;

      const fromRequestID = userID;
      const toRequestID = loginId;
      const validStatus = ["accepted", "rejected"];

      const isStatusValid = validStatus.includes(status);
      if (isStatusValid == false) {
        throw new Error("status is not valid");
      }

      const connectionRequest = await ConnectionModel.findOne({
        fromRequestID,
        toRequestID,
        status: "interested",
      });

      if (connectionRequest !== null) {
        connectionRequest.status = status;
        await connectionRequest.save();
        res.status(200).json({
          message: `connection ${status} successfully`,
          data: connectionRequest,
        });
      } else {
        res.status(400).json({
          message: `Request not found`,
        });
      }

      // console.log(connectionRequest);
      // console.log(connectionRequest, "check connection in user");
    } catch (error) {
      res.status(404).send("something went wrong : " + error.message);
    }
  }
);

module.exports = connectionRouter;
