import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // if (!isValidObjectId(channelId)) {
  //   throw new ApiError(401, "Channel id is inValid");
  // }
  // TODO: toggle subscription
  if (!req.user?._id) {
    throw new ApiError(401, "User object is Not Present in Request");
  }
  const userId = req.user._id;
  const existingSubscription = await Subscription.findOne({
    subscriber: userId,
    channel: channelId, // this is also an user id but of that user which has channel
  });
  if (existingSubscription) {
    await Subscription.findByIdAndDelete(existingSubscription._id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Unsubscribed the Channel Successfully"));
  } else {
    const subscription = await Subscription.create({
      subscriber: userId,
      channel: channelId,
    });
    if (!subscription) {
      throw new ApiError(401, "Subcription is Unsuccessfull");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, subscription, "Subcribed the Channel Successfully")
      );
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params; // given userId
  // if (!isValidObjectId(channelId)) {
  //   throw new ApiError(401, "Channel id is inValid");
  // }
  const result = await Subscription.aggregate([
    // {
    //     $match : {
    //         channel : channelId
    //     }
    // },
    // {
    //     $count : "SubscriberCount"
    // }
    // You can do like this but let's do it in some difficult way with more production level code
    {
      $match: {channel : new mongoose.Types.ObjectId(channelId)},
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "SubscriberDetails",
      },
    },
    {
      $project: {
        subscriberId: "SubscriberDetails._id",
        name: "SubscriberDetails.name",
        email: "SubscriberDetails.email",
        createdAt: 1,
      },
    },
  ]);

  if (!result) {
    throw new ApiError(401, "Subscriber Data is Not fetched");
  }
  const subscriberCount = result.length; // as the above will return an array with each element a document related to particular users
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { subscriberCount, subscribers: result },
        "Subscribers are Fetched Successfully"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  // if (!isValidObjectId(subscriberId)) {
  //   throw new ApiError(401, "Subscriber id is inValid");
  // }
  // basically what we gonna do is we get all those channels document where subscriber is == to given subscriber ID
  const result = await Subscription.aggregate([
    {
      $match: {subscriber : new mongoose.Types.ObjectId(subscriberId)}, // retrieve all the documents
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "SubscribedChannels",
      },
    },
    {
      $project: {
        name: "SubscribedChannels.name",
        email: "SubscribedChannels.email",
        createdAt: 1,
      },
    },
  ]); // this pipeline give us the array containing all the details each channel to which we have subscribed in object format
  // For Counting Purpose
  if (!result) {
    throw new ApiError(
      401,
      "Subscribed Channels are Not Retrieved from the Data Base"
    );
  }
  const SubscribedChannelsCount = result.length;
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { SubscribedChannelsCount, result },
        "Subscribed Channels is retrieved Successfully"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
