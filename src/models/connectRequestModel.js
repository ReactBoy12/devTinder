const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromRequestID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  toRequestID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  status: {
    type: String,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],
      message: `{VALUE} is not valid status`,
    },
  },
});

connectionRequestSchema.pre("save", function (next) {
  console.log(this, "checking");
  const existingConnectionReq = this;
  if (
    existingConnectionReq.fromRequestID.equals(
      existingConnectionReq.toRequestID
    )
  ) {
    throw new Error("cannot send the request to itself");
  } else {
    next();
  }
});

const ConnectionModel = mongoose.model("connection", connectionRequestSchema);
module.exports = ConnectionModel;
