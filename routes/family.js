const express = require('express');
const router = express.Router();

// Sample data: in-memory storage of family members
let familyMembers = [];

// Create a new family member
router.post('/', (req, res) => {
    const newMember = req.body;
    familyMembers.push(newMember);
    res.status(201).json(newMember);
});

// Read all family members
router.get('/', (req, res) => {
    res.status(200).json(familyMembers);
});

// Read a single family member
router.get('/:id', (req, res) => {
    const member = familyMembers.find(m => m.id === parseInt(req.params.id));
    if (!member) return res.status(404).send('Member not found');
    res.status(200).json(member);
});

// Update a family member
router.put('/:id', (req, res) => {
    const member = familyMembers.find(m => m.id === parseInt(req.params.id));
    if (!member) return res.status(404).send('Member not found');

    // Update member details
    Object.assign(member, req.body);
    res.status(200).json(member);
});

// Delete a family member
router.delete('/:id', (req, res) => {
    const memberIndex = familyMembers.findIndex(m => m.id === parseInt(req.params.id));
    if (memberIndex === -1) return res.status(404).send('Member not found');

    familyMembers.splice(memberIndex, 1);
    res.status(204).send();
});

module.exports = router;