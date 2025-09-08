const express = require("express");
const { userLoginAuth } = require("../middlewares/auth");
const ConnectionModel = require("../models/connectRequestModel");
const User = require("../models/user");
const userRouter = express.Router();

const CONNECTION_DISPLAY_DATA =
  "firstName lastName age gender skills about profileImage";

userRouter.get("/user/request/received", userLoginAuth, async (req, res) => {
  try {
    const loginId = req.authData._id;

    const connections = await ConnectionModel.find({
      toRequestID: loginId,
      status: "interested",
    }).populate(
      "fromRequestID",
      "firstName lastName age gender skills about profileImage"
    );

    // async function processData() {
    //   const incommingConnectionRequests = connections?.map(
    //     async (ele, ind, con) => {
    //       const data = await User.findOne({ _id: ele.fromRequestID });
    //       console.log(con);
    //       const { firstName, _id } = data;

    //       // return { _id, firstName, status: con[ind].status };
    //       return data;
    //     }
    //   );
    //   const results = await Promise.all(incommingConnectionRequests);

    //   return results;
    // }
    // let d = await processData();

    if (connections !== null) {
      res.status(200).json({ message: "connections : ", data: connections });
    } else {
      res.status(200).json({
        message: "no connections : ",
        data: { fromRequestID, status },
      });
    }
  } catch (error) {
    res.status(400).send("something went wrong" + error);
  }
});

userRouter.get("/user/request/connections", userLoginAuth, async (req, res) => {
  try {
    const loggedInUserID = req.authData._id;
    const connectionRequest = await ConnectionModel.find({
      $or: [
        {
          toRequestID: loggedInUserID,
        },
        { fromRequestID: loggedInUserID },
      ],

      status: "accepted",
    })
      .populate("fromRequestID", CONNECTION_DISPLAY_DATA)
      .populate("toRequestID", CONNECTION_DISPLAY_DATA);

    const connectionReqData = connectionRequest.map((row) => {
      if (row.fromRequestID._id.toString() === loggedInUserID.toString()) {
        return row.toRequestID._id;
      }
      return row.fromRequestID;
    });

    res
      .status(200)
      .json({ message: "accepted connections", data: connectionReqData });
  } catch (error) {
    res.status(400).send("something went wrong" + error);
  }
});

userRouter.get("/user/feeds", userLoginAuth, async (req, res) => {
  try {
    const loggedInUserID = req.authData._id;
    const loggedInSkills =
      req.authData.skills != [] ? req.authData.skills : false;
    console.log(loggedInSkills, "skills");
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;
    page = page < 0 ? 1 : page;
    limit = limit > 50 ? 50 : limit;
    let skip = (page - 1) * limit;

    const connectionsReqID = await ConnectionModel.find({
      $or: [{ fromRequestID: loggedInUserID }, { toRequestID: loggedInUserID }],
    }).select("fromRequestID toRequestID");

    const blockedUserData = new Set();
    connectionsReqID.forEach((connection) => {
      blockedUserData.add(connection.fromRequestID.toString());
      blockedUserData.add(connection.toRequestID.toString());
    });

    const conditions = [
      {
        _id: { $nin: Array.from(blockedUserData) },
      },
      { _id: { $ne: loggedInUserID } },

      // { skills: { $in: loggedInSkills} },
    ];
    if (loggedInSkills.length != 0) {
      conditions.push({ skills: { $in: loggedInSkills } });
    }
    const userFeedData = await User.find({
      $and: conditions,
    })
      .select(CONNECTION_DISPLAY_DATA)
      .skip(skip)
      .limit(limit);

    console.log(userFeedData, "connections");

    res.status(200).json({ message: "feed data", data: userFeedData });
  } catch (error) {
    res.status(400).send("something went wrong" + error.message);
  }
});

module.exports = userRouter;
