import { Document, Model, model, Schema } from "mongoose";

/**
 * interface to model the schema for typescript
 * @param username:string
 * @param password:string
 */
export interface IImage extends Document {
  jobId: string;
  prompt: string;
  isPending: boolean;
  dateCreated?: Date;
  url?: string;
}

const imageSchema: Schema = new Schema({
  jobId: {
    type: String,
    required: true,
    unique: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  isPending: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
  },
});

const Image: Model<IImage> = model(
  "Image",
  imageSchema
) as unknown as Model<IImage>;

export default Image;
