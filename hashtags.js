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
          words[i] = wrapHashtagInLink(word);
          console.log('hash tag: link', words[i]);
        }
      };
  }

  function wrapHashtagInLink(word){

    //check for hashtag breaking chars
    var index = word.indexOf(word.match(/[^A-Za-z0-9#+]/));

    if(index > 0){
      var hashtag = word.substring(0, index);
      var link = "<a href='https://twitter.com/search?q=" + hashtag + "'>" + hashtag + "</a>";
      return word.replace(hashtag, link);
    }else{
      return "<a href='https://twitter.com/search?q=" + word + "'>" + word + "</a>";
    }

    // var link = document.createElement('a');

    // if(index > 0){

    //   var hashtag = word.substring(0, index);
    //   var linkText = document.createTextNode(hashtag);
    //   link.appendChild(linkText);
    //   link.href = "https://twitter.com/search?q=" + hashtag;
    //   return word.replace(hashtag, link);

    // }else{
    //   var linkText = document.createTextNode(word);
    //   link.appendChild(linkText);
    //   link.href = "https://twitter.com/search?q=" + word;
    //   return link;
    // }

  }

  traverseDom(document.body);
});



