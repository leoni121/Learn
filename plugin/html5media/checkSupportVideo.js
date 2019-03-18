//检测是否支持HTML5
function checkVideo() {
  if (!!document.createElement('video').canPlayType) {
    var vidTest = document.createElement("video");
    var oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
    if (!oggTest) {
      var h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
      if (!h264Test) {
        return false;
      }
      else {
        if (h264Test === "probably") {
          return true;
        }
        else {
          return false;
        }
      }
    }
    else {
      if (oggTest === "probably") {
        return true;
      }
      else {
        return false;
      }
    }
  }
  else {
    return false;
  }
}
