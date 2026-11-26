import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("mentor-lagbe");

export const auth = betterAuth({
  plugins: [
    jwt({
      jwt: {
        issuer: "mentor-lagbe",
        audience: "mentor-lagbe-api",
      },
    }),
  ],

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
      phone: { type: "string", required: false },
      bio: { type: "string", required: false },
    },
  },

  //              MongoDB
  database: mongodbAdapter(db, {
    client,
  }),
});
