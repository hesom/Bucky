
exports.buildCommitDescriptionString = function(change){
  var commits = change.commits;
  var changeLink = change.links.html.href;
  var branch = change.new;
  var description = "";
  for(commit of commits){
    var commitHash = commit.hash;
    var commitLink = commit.links.html.href;
    var shortHash = commitHash.substring(0, 7);
    var fieldName = `[\`${shortHash}\`](${commitLink})`;
    description += `\n${fieldName} ${commit.message.split('\n')[0].trunc(100)}`;
  }
  return description;
}
