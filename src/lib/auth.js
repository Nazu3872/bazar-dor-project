import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// MongoDB Atlas SRV DNS রেজোলিউশন ফিক্স (ISP/Windows ECONNREFUSED সমাধান)
try {
  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  // Ignore in environments where setting DNS is restricted
}

let client;
const mongoUri = process.env.BETTER_AUTH_MONGO_URI || process.env.BETTER_AUTH_MONGO_URI;

if (!mongoUri) {
  throw new Error("Missing MongoDB connection string. Set BETTER_AUTH_MONGO_URI or BETTER_AUTH_MONGO_URI in your environment.");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(mongoUri);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(mongoUri);
}

const db = client.db("bazar-dor");




const productionBaseUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null);

const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  onAPIError: {
    onError: (error, ctx) => {
      console.error("[Better-Auth Server Error]:", error);
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL:
    productionBaseUrl ||
    (process.env.NODE_ENV === "production"
      ? "https://bazar-dor-project-omega.vercel.app"
      : "http://localhost:3000"),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders,
  database: mongodbAdapter(db, { client }),
});
