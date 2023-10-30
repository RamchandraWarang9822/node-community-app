import express from 'express';
import Community from '../models/community.js';
import Member from '../models/member.js'; // Assuming you have a Member model

const router = express.Router();

// Create a new community
router.post('/v1/community', async (req, res) => {
  try {
    const { name, slug, owner } = req.body;
    const community = new Community({ name, slug, owner });
    await community.save();
    res.status(201).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all communities
router.get('/v1/community', async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all members of a specific community
router.get('/v1/community/:id/members', async (req, res) => {
  try {
    const communityId = req.params.id;
    const members = await Member.find({ community: communityId }).populate('user');
    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get communities owned by the authenticated user
router.get('/v1/community/me/owner', async (req, res) => {
  try {
    const owner = req.user.id; // Assuming you have an authentication middleware setting req.user
    const ownedCommunities = await Community.find({ owner });
    res.status(200).json(ownedCommunities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get communities joined by the authenticated user
router.get('/v1/community/me/member', async (req, res) => {
  try {
    const memberId = req.user.id; // Assuming you have an authentication middleware setting req.user
    const memberCommunities = await Member.find({ user: memberId }).populate('community');
    res.status(200).json(memberCommunities.map(member => member.community));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
