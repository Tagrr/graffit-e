function getCurrentWallName () {
  var path = location.pathname;
  return path.replace('/walls/','');

}

function wallEdit () {
  var name = getCurrentWallName();
  document.querySelector('.creategraph').classList.toggle('show');


}

function createGraph () {
  var name = getCurrentWallName();
  document.querySelector('.creategraph').classList.toggle('show');


}

function createSticker () {
  var name = getCurrentWallName();
  document.querySelector('.creategraph').classList.toggle('show');

}

function insertStickerCallback () {
  console.log('insertStickerCallback', this, arguments);
}

function insertSticker (img) {
  console.log(location, 'url', location.pathname + '/createGraph');
  $.post(
    location.pathname + '/createGraph', 
    {"graph":{"img": img.getAttribute('src')}},
     function () {console.log('ajax callback', arguments);},
    'json'
  );
}
