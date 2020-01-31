<h1>Beck Et Al Brazilian Bot</h1>

<h3>Ready</h3>
<ul>
    <li>Send messages in a slack channel as an Bot;</li>
    <li>Generate new janitors date;</li>
    <li>Scheduled functions for specific days and times of day;</li>
    <li>Get the current Weather with a ZIP code;</li>
</ul>

<h3>Todo</h3>
<ul>
    <li>Add interactions</li>
    <li>Add a NLP provier (Assisant, Power Agents, Dialogflow)</li>
    <li>Remove, add and change users of a base</li>
    <li>Separate the Schedule Functions. One for current weather and birthdays and another for the janitors. Or all together</li>
</ul>

<h3>Setting up</h3>
<p>Slack</p>
<ul>
    <li>Go to <a href="https://api.slack.com/apps" target="_blank">https://api.slack.com/apps</a> to create a new app;</li>
    <li>Add name to the and a Development Slack Workspace;</li>
    <li>In Add features and functionality:</li>
    <ul>
        <li>Select Incoming Webhooks and turn on to use webHooks (optional);</li>
        <li>Turn on the Enable Events and add a bot user in Subscribe to bot events, turn on the Always Show My Bot as Online;</li>
        <li>Go back to Subscribe to bot events and select "Add Bot User Event", select "app_mention" and "messages.im";</li>
        <li>Install the App in your workspace;</li>
        <li>Copy the "Bot User OAuth Access Token" and paste in BOT_TOKEN of .env file;</li>
        <li>Add a name in the BOT_NAME in .env file.</li>
    </ul>
</ul>

<p>Airtable</p>
<ul>
    <li>Go to <a href="https://airtable.com/account" target="_blank">https://airtable.com/account</a> to generate a API key, copy and paste in API_KEY_AIRTABLE of .env file;</li>
    <li>Create a new base from scratch;</li>
    <li>See the template of the Airtable <a href="https://airtable.com/invite/l?inviteId=invSBH17Cr8bRJifH&inviteToken=30b3e74bb212cd8c6f4245549c0928167758ca01f32b55769fdc0d275154e45d" target="_blank">here</a>;</li>
    <li>Go to the Airtable API <a href="https://airtable.com/api" target="_blank">https://airtable.com/api</a> to select your base;</li>
    <li>In the section Authentication copy the id of the base and paste in the AIRTABLE_BASE of the .env file</li>
    <li>In thei project we used the Office Duties and Birthday tables (see in Airtable.js file)</li>
    <li>Check the sample of the base <a href="https://airtable.com/invite/l?inviteId=invSBH17Cr8bRJifH&inviteToken=30b3e74bb212cd8c6f4245549c0928167758ca01f32b55769fdc0d275154e45d" target="_blank">here</a>;</li>
</ul>

<h3>Scripts</h3>

<p>Run with nodemon</p>

```
yarn dev
```

<p>Run in production</p>

```
yarn start
```