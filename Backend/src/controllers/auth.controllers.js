import { generateJWTToken_email, generateJWTToken_username } from "../utils/generateJWTToken.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import { UnRegisteredUser } from "../models/unRegisteredUser.model.js";
import dotenv from "dotenv";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:8000/auth/google/callback";

let googleAuthHandler;
let googleAuthCallback;

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        done(null, profile);
      }
    )
  );

  googleAuthHandler = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

  googleAuthCallback = passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/login`,
    session: false,
  });
} else {
  console.warn("Google OAuth not configured (GOOGLE_CLIENT_* env vars missing). Skipping GoogleStrategy registration.");

  googleAuthHandler = (req, res) => {
    return res.status(501).json({ message: "Google OAuth not configured" });
  };

  googleAuthCallback = (req, res) => {
    return res.status(501).json({ message: "Google OAuth not configured" });
  };
}

export { googleAuthHandler, googleAuthCallback };

export const handleGoogleLoginCallback = asyncHandler(async (req, res) => {
  console.log("\n******** Inside handleGoogleLoginCallback function ********");
  // console.log("User Google Info", req.user);

  const existingUser = await User.findOne({ email: req.user._json.email });

  if (existingUser) {
    const jwtToken = generateJWTToken_username(existingUser);
    const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000);
    res.cookie("accessToken", jwtToken, { httpOnly: true, expires: expiryDate, secure: false });
    return res.redirect(`${FRONTEND_URL}/discover`);
  }

  let unregisteredUser = await UnRegisteredUser.findOne({ email: req.user._json.email });
  if (!unregisteredUser) {
    console.log("Creating new Unregistered User");
    unregisteredUser = await UnRegisteredUser.create({
      name: req.user._json.name,
      email: req.user._json.email,
      picture: req.user._json.picture,
    });
  }
  const jwtToken = generateJWTToken_email(unregisteredUser);
  const expiryDate = new Date(Date.now() + 0.5 * 60 * 60 * 1000);
  res.cookie("accessTokenRegistration", jwtToken, { httpOnly: true, expires: expiryDate, secure: false });
  return res.redirect(`${FRONTEND_URL}/register`);
});

export const handleLogout = (req, res) => {
  console.log("\n******** Inside handleLogout function ********");
  res.clearCookie("accessToken");
  return res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
};
