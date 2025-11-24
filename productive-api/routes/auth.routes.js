// import express from "express";
// import dotenv from "dotenv";
const express = require("express");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const { User } = require("../db/models/user.model.js");
const router = express.Router();

// dotenv.config();

/**Initialize Supabase with admin privileges */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

router.route("/signup").post(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  /**Validate input */
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let supabaseUserId = null;

  try {
    /**Create User in Supabase */
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      // options:{
      //     data:{}
      // }
    });

    if (authError) throw authError;
    if (!authData.user)
      throw new Error("Supabase user creation returned no data");

    supabaseUserId = authData.user.id;

    /**Create User in MongoDB */
    const newUser = new User({
      supabaseId: supabaseUserId,
      email,
      firstName,
      lastName,
    });

    /**Save user to db */
    await newUser.save();

    /**Success Response */
    res.status(201).json({
      message:
        "User registered successfully. Please check email for verification.",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);

    /**ROLLBACK STRATEGY */
    /**If we created a Supabase user but failed at MongoDB step, delete the Supabase user */
    if (supabaseUserId) {
      console.log("Rolling back Supabase user...");
      await supabase.auth.admin.deleteUser(supabaseUserId);
    }

    /**Handle duplicate key errors (MongoDB code 11000) */
    if (error.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }

    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
