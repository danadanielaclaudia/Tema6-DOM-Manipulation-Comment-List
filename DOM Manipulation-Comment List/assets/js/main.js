// we simulate getting data from DB/SERVER/API
function getDataFromDB() {
 
  var root = 'https://jsonplaceholder.typicode.com';

  fetch(root + '/comments?_limit=20&fbclid=IwAR1tdwS-mvu4fD2TyegBaR90d79bqv-LjvkYG5CN3UKgDJ04PIbyoKQOTVU', {  
    method: 'GET'
  })
    .then(function(response){
      return response.json();
    })
    .then(function(jsonResp){
      console.log(jsonResp);
      var comment = jsonResp;
      return comment;
    })
    
    .then(function listComments(jsonResp) {
      for (var i = 0; i < jsonResp.length; i++) {
        var comment = jsonResp[i];
       
        var $article = createCommentElement(comment.name, comment.body, comment.email, i);
  
        $comments.appendChild($article);
      }
    })
  }


// We set a convention
// All variables that container a DOM element
// should start with $
var $comments = document.querySelector('.comments');

function createCommentElement(title, comment, author, index) {
  // we create an article element
  var $article = document.createElement('article');
  // console.dir($article);

  // 1. create header element with text
  var $header = document.createElement('header');
  $header.innerText = title;
  // 2. add header element to $article
  $article.appendChild($header);
  // 3. create p elmenet with class commnet and text
  var $p = document.createElement('p');
  $p.innerText = comment;
  $p.classList.add('comment');
  // 4. add p element to $article
  $article.appendChild($p);
  // 5. create footer element with text
  var $footer = document.createElement('footer');
  $footer.innerText = author;
  // 6. add footer element to $article
  $article.appendChild($footer);
  // 7. remove button
  var $deleteBtn = document.createElement('button');
  $deleteBtn.classList.add('delete-btn'); 
  $deleteBtn.innerText = "Delete";
  $article.appendChild($deleteBtn);
  $deleteBtn.setAttribute('id', 'comment-id');
  $deleteBtn.addEventListener('click', deleteComment);
  // 8. like button
  var $likeBtn = document.createElement('button');
  $likeBtn.classList.add('like-btn'); 
  $likeBtn.innerText = "Like";
  $article.appendChild($likeBtn);
  $likeBtn.setAttribute('id', 'like-id');
 
  $likeBtn.addEventListener('click', function(){
    return showCommentIndex(index)
  });

  return $article;
}                                     


function deleteComment(){
  var currentElement = this.parentElement;   
  currentElement.remove();
};      


function showCommentIndex(index){
  console.log(index);
}

var $deleteBtn = document.querySelectorAll('[comment-id]');
var $title = document.querySelector('input[name="title"]');
var $comment = document.querySelector('textarea[name="comment"]');
var $author = document.querySelector('input[name="author"]');

function addComment(event) {
  
  event.preventDefault();
  console.dir(event);
 
  var $article = createCommentElement($title.value, $comment.value, $author.value);

  $comments.appendChild($article);
}

$searchInput = document.querySelector('input[name="search"]');

function onSearch(event) {
  console.log(event);
  console.log($searchInput.value);
}

function onSearchInputChange(event) {
  console.log(event);
  console.log($searchInput.value);
}

// event which triggers when document is loaded
document.addEventListener('DOMContentLoaded', function () {
  getDataFromDB();

  var $form = document.querySelector('form');
  $form.addEventListener('submit', addComment);

  $searchButton = document.querySelector('.search');
  $searchButton.addEventListener('click', onSearch);
  
  // input event triggres when typing in the input field or when it changes
  $searchInput.addEventListener('input', onSearchInputChange)
});