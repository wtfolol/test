var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 311fc6b0-685b-4fd0-b49e-c77e46008777,
    appPassword: 215tbbjeUvDHK0cP1FFs9px
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.beginDialog('greetings');
});

bot.dialog('greetings', [
    // Step 1
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    // Step 2
    function (session, results) {
        session.endDialog('Hello %s!', results.response);
    }
]);

bot.dialog('help', function (session, args, next) {
    //Send a help message
    session.endDialog("Global help menu.<br> Type /help for any help <br> Type /order for order");
})

// Once triggered, will start a new dialog as specified by
// the 'onSelectAction' option.
.triggerAction({
    matches: /^/help$/i,
    onSelectAction: (session, args, next) => {
        // Add the help dialog to the top of the dialog stack 
        // (override the default behavior of replacing the stack)
        session.beginDialog(args.action, args);
    }
});

bot.dialog('order', function (session, args, next) {
    //Send a help message
    session.endDialog("Global help menu.<br> Type /help for any help <br> Type /order for order");
})

// Once triggered, will start a new dialog as specified by
// the 'onSelectAction' option.
.triggerAction({
    matches: /^/order$/i,
    onSelectAction: (session, args, next) => {
        // Add the help dialog to the top of the dialog stack 
        // (override the default behavior of replacing the stack)
        session.beginDialog(args.action, args);
    }
});