const Discord = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser')
const logger = require('winston');
const config = require('./config.json');
const client = new Discord.Client();
const app = express();

var channel;

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '...' : this;
      };

app.use(bodyParser.json());

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

client.on('ready', () => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(client.user.tag);

  channel = client.channels.find('id',config.channel);

});

client.on('message', (message) => {
  if(message.author.bot) return;
  if(!message.author.id == config.owner) return;
  if(message.content.startsWith('!ping')){
      message.channel.send('pong!');
  }
});

client.login(config.token);

//Setup webhook server
app.post('/', (req, res)=>{
  if(req.headers['x-event-key'] != 'repo:push') return;

  var json = req.body;
  var repo = json.repository.name;
  var repoLink = json.repository.links.html.href;
  var actor = json.actor.username;
  var actorLink = json.actor.links.html.href;
  var avatar = json.actor.links.avatar.href;
  var changes = json.push.changes;

  for(change of changes){
    if(change.created && change.new.type == 'branch'){
      var embed = new Discord.RichEmbed();
      embed.setAuthor(actor, avatar, actorLink);
      embed.setColor('#f4d641');
      var branch = change.new;
      var title = `[${repo}] New branch created: ${branch.name}`;
      embed.setTitle(title);
      channel.send({embed});
    }

    if(!change.created && !change.closed){
      var embed = new Discord.RichEmbed();
      embed.setAuthor(actor, avatar, actorLink);
      embed.setColor('#42c5f4');
      var commits = change.commits;
      var changeLink = change.links.html.href;
      var branch = change.new;
      var title =  `[${repo}/${branch.name}] ${commits.length} new commit(s)`;
      embed.setTitle(title);
      embed.setURL(changeLink);
      var description = "";
      for(commit of commits){
        var commitHash = commit.hash;
        var commitLink = commit.links.html.href;
        var shortHash = commitHash.substring(0, 7);
        var fieldName = `[\`${shortHash}\`](${commitLink})`;
        description += `\n${fieldName} ${commit.message.split('\n')[0].trunc(100)}`;
      }
      embed.setDescription(description);
      channel.send({embed});
    }
  }
  res.sendStatus(200);
});

app.listen(config.port, ()=> logger.info(`App is listening on port ${config.port}`));
