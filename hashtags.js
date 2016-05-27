document.addEventListener("DOMContentLoaded", function(event) {
  function traverseDom(node){
    for (var i = 0; i < node.childNodes.length; i++) {
      var childNode = node.childNodes[i];
      if(childNode.nodeType === Node.TEXT_NODE && node.nodeName != "A" && childNode.textContent.includes("#")){
        replaceHashtagsWithLinks(childNode);
      }
      if(childNode.childNodes.length > 0){
        traverseDom(childNode);
      }
    };
  }

  function replaceHashtagsWithLinks(node){
    //splits words on either a hash or space in case of hashtags without spaces between them
    var words = node.data.split(/(?=#)| /);
    var replacementNode = document.createElement('span');

    for (var i = 0; i < words.length; i++) {
      var word = words[i];

      if(word.includes("#")){
        //store chars before the hashtag
        var charsBeforeHashtag = "";
        if(word.indexOf("#") > 0){
          charsBeforeHashtag = word.slice(0, word.indexOf("#"));
          word = word.slice(word.indexOf("#"));
        }

        //store chars after the hashtag
        var charsAfterHashtag = "";
        var index = word.indexOf(word.match(/[\u2000-\u206F\u2E00-\u2E7F\\'!"$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/));
        if(index > 0){
          charsAfterHashtag = word.slice(index);
          word = word.substring(0, index);
        }

        //reconstruct the word
        var beforeTextNode = document.createTextNode(" " + charsBeforeHashtag);
        replacementNode.appendChild(beforeTextNode);
        var link = wrapHashtagInLink(word);
        replacementNode.appendChild(link);
        var afterTextNode = document.createTextNode(charsAfterHashtag + " ");
        replacementNode.appendChild(afterTextNode);

      }else{
        replacementNode.appendChild(document.createTextNode(word + " "));
      }
    };

    //replace existing text node with node containing hashtag link
    node.parentNode.insertBefore(replacementNode, node);
    node.parentNode.removeChild(node);
  }

  function wrapHashtagInLink(hashtag){
    var link = document.createElement('a');
    var linkText = document.createTextNode(hashtag);
    link.appendChild(linkText);
    link.href = "https://twitter.com/search?q=" + hashtag.slice(1);
    return link;
  }

  traverseDom(document.body);
});
