const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event('app_home_opened', async ({ event, client, context }) => {
    try {
        const result = await client.views.publish({
            user_id: event.user,
            view: {
                type: 'home',
                callback_id: 'home_view',
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: "*Welcome to your _App's Home_* :tada:",
                        },
                    },
                    {
                        type: 'divider',
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text:
                                "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See the example in the `examples` folder within your Bolt app.",
                        },
                    },
                    {
                        type: 'actions',
                        elements: [
                            {
                                type: 'button',
                                text: {
                                    type: 'plain_text',
                                    text: 'Click me!',
                                },
                            },
                        ],
                    },
                ],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

app.message('hello', async ({ message, say }) => {
    await say(`Hey there, <@${message.user}>! Welcome to Alchemy Crypto!`);
});

app.command('/tip', async ({ ack, payload, context }) => {
    ack();

    try {
        const result = await app.client.views.open({
            token: context.botToken,
            trigger_id: payload.trigger_id,
            view: {
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
            },
        });
    } catch (err) {}
});

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log('Bolt app is running!');
})();
