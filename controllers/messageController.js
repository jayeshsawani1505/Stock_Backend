// controllers/messageController.js
const messageService = require('../services/messageService');

exports.sendMessage = async (req, res) => {
    try {
        const { sender_id, recipient_id, message_content } = req.body;
        const result = await messageService.sendMessage(sender_id, recipient_id, message_content);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { user1, user2 } = req.params;
        const messages = await messageService.getMessages(user1, user2);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
