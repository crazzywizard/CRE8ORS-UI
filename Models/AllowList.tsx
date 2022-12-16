import { Schema, model, models, Model } from "mongoose"

interface AllowList {
  walletAddress: string
  twitterHandle: string
  reason: string
  creatorType: string
}
const AllowListSchema = new Schema<AllowList>({
  walletAddress: {
    type: String,
    required: [true, "Please add a wallet address"],
  },
  twitterHandle: {
    type: String,
    required: [true, "Please add a twitter handle"],
  },
  reason: {
    type: String,
    required: [true, "Please add a reason"],
  },
  creatorType: {
    type: String,
    required: [true, "Please add a creator type"],
  },
})
export default (models.AllowList as Model<AllowList>) || model("AllowList", AllowListSchema)
