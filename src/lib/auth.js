import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("mentor-lagbe");

export const auth = betterAuth({
  //              Email & Password
  emailAndPassword: {
    enabled: true,
  },

  //              User fields
  user: {
    additionalFields: {
      role: { type: "string", required: true, defaultValue: "student" },
      plan: {
        type: "string",
        required: true,
        defaultValue: "free",
      },
    },
  },

  //              MongoDB
  database: mongodbAdapter(db, {
    client,
  }),
});
