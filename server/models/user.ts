import { Document, Model, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * interface to model the schema for typescript
 * @param username:string
 * @param password:string
 */
export interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<IUser>("save", function save(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: any
) {
  bcrypt.compare(
    candidatePassword,
    // @ts-ignore: Property does not exist on type
    this.password,
    (err: Error | null, isMatch: boolean) => {
      callback(err, isMatch);
    }
  );
};

const User: Model<IUser> = model("User", userSchema) as unknown as Model<IUser>;

export default User;
