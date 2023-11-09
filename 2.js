const fetch = require('node-fetch');

document.getElementById('webhook-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const webhookURL = document.getElementById('webhook-url').value;
    sendMessage(webhookURL);
});

function sendMessage(webhookURL) {
    const username = document.getElementById('username').value;
    let message = document.getElementById('message').value;
    const avatarUrl = document.getElementById('avatar-url').value;
    const messageFile = document.getElementById('message-file-upload').files[0];

    message = message.replace(/@/g, '');

    const payload = new FormData();
    payload.append('username', username);
    payload.append('content', message);

    if (avatarUrl) {
        payload.append('avatar_url', avatarUrl);
    }

    if (messageFile) {
        payload.append('file', messageFile);
    }

    fetch(webhookURL, {
        method: 'POST',
        body: payload,
    });
}
