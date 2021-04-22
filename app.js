const { App } = require('@slack/bolt');
require('dotenv').config();

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message('hello', async ({ message, say }) => {
    await say({
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Hey there <@${message.user}>!`,
                },
                accessory: {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: 'Click Me',
                    },
                    action_id: 'button_click',
                },
            },
        ],
        text: `Hey there <@${message.user}>!`,
    });
});

app.command('/acl', async ({ command, ack, say }) => {
    await ack();

    await say({
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Welcome to Alchemy Coin!',
                    emoji: true,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'plain_text',
                    text: 'What would you like to do?',
                    emoji: true,
                },
            },
            {
                type: 'actions',
                elements: [
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: 'Check Balance',
                            emoji: true,
                        },
                        value: 'click_me_123',
                        action_id: 'actionId-0',
                    },
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: 'Send Tip',
                            emoji: true,
                        },
                        value: 'click_me_123',
                        action_id: 'actionId-1',
                    },
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: 'View Past Transactions',
                            emoji: true,
                        },
                        value: 'click_me_123',
                        action_id: 'actionId-3',
                    },
                ],
            },
        ],
    });
});

app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();
