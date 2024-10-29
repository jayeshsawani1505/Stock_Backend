// services/messageService.js
const db = require('../db');

exports.sendMessage = (senderId, recipientId, messageContent) => {
    return new Promise((resolve, reject) => {
        const query = `
      INSERT INTO messages (sender_id, recipient_id, message_content)
      VALUES (?, ?, ?)
    `;
        db.query(query, [senderId, recipientId, messageContent], (error, result) => {
            if (error) return reject(error);
            resolve({ message: 'Message sent successfully' });
        });
    });
};

exports.getMessages = (user1, user2) => {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT * FROM messages 
      WHERE (sender_id = ? AND recipient_id = ?) 
         OR (sender_id = ? AND recipient_id = ?)
      ORDER BY sent_at ASC
    `;
        db.query(query, [user1, user2, user2, user1], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};
