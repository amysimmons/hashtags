document.addEventListener("DOMContentLoaded", function(event) {
  function traverseDom(node){

    for (var i = 0; i < node.childNodes.length; i++) {
      var childNode = node.childNodes[i];
      if(childNode.nodeType === Node.TEXT_NODE && childNode.textContent.includes("#")){
        replaceHashtagsWithLinks(childNode);
      }
      if(childNode.childNodes.length > 0){
        traverseDom(childNode);
      }
    };
  }

  function replaceHashtagsWithLinks(node){
      var words = node.data.split(' ');

      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if(word[0] == "#"){

          var beforeHashtag = words.slice(0, i);
          var beforeTextNode = document.createTextNode(" " + beforeHashtag.join(' '));
          var replacementNode = document.createElement('span');
          var link;
          var afterHashtag;
          var afterTextNode;

          //check for hashtag breaking chars
          var index = word.indexOf(word.match(/[^A-Za-z0-9#+]/));

          if(index > 0){
            var hashtag = word.substring(0, index);
            link = wrapHashtagInLink(hashtag);
            var remainder = word.slice(index);
            afterHashtag = words.slice(i + 1);
            afterTextNode = document.createTextNode(remainder + " " + afterHashtag.join(' '));
          }else {
            var hashtag = word;
            link = wrapHashtagInLink(hashtag);
            afterHashtag = words.slice(i + 1);
            afterTextNode = document.createTextNode(" " + afterHashtag.join(' '));
          }

          replacementNode.appendChild(beforeTextNode);
          replacementNode.appendChild(link);
          replacementNode.appendChild(afterTextNode);

          node.parentNode.insertBefore(replacementNode, node);
          node.parentNode.removeChild(node);
        }
      };
  }

  function wrapHashtagInLink(hashtag){
    var link = document.createElement('a');
    var linkText = document.createTextNode(" " + hashtag);
    link.appendChild(linkText);
    link.href = "https://twitter.com/search?q=" + hashtag;
    return link;
  }

  traverseDom(document.body);
});



