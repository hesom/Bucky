# Bucky

Bucky is a bot for Discord that posts updates after pushes to your Bitbucket repository.

## Requirements

You will need a recent version of [nodejs](nodejs.org) to run Bucky.

## Getting Started

Create a new Discord application and get your bot's authentication token as explained [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token). Make sure you have [developer mode](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) activated inside Discord. Right click on your username and the channel you want the bot to post messages in to retreive their IDs.

Clone the repository to your server and rename `config.example.json` to `config.json`. Paste the token and the two IDs you got in the first step at the right places.
Install dependencies with

```npm install```

and start the server with

```npm start```

You can test your configuration by writing `!ping` inside a channel your bot is present.

Inside your Bitbucket repository, go to `Settings` > `Webhooks` and add a new webhook pointing to the URL (or IP adress) of the server on which you installed Bucky.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
