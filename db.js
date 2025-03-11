const dbJS = `
const mongoose = require('mongoose');
const passwordSchema = new mongoose.Schema({
    site: String,
    encryptedPassword: String,
    encryptedKey: String
});
module.exports = mongoose.model('Password', passwordSchema);
`;