import express from "express";
import Member from "../models/member.js";

const router = express.Router();

// Add a new member to a community
router.post("/v1/member", async (req, res) => {
  try {
    const { community, user, role } = req.body;
    const member = new Member({ community, user, role });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove a member from a community by ID
router.delete("/v1/member/:id", async (req, res) => {
  try {
    const memberId = req.params.id;
    const deletedMember = await Member.findByIdAndDelete(memberId);
    if (!deletedMember) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.status(200).json(deletedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
