const aboutMe = require("./_aboutme");
const botNotInVc = require("./_botnotinvc");
const botNotInVc2 = require("./_botnotinvc2");
const connectionSuccess = require("./_connectionsuccess");
const currentQueue = require("./_currentqueue");
const emptyQueue = require("./_emptyqueue");
const emptyQueueFail = require("./_emptyqueuefail");
const general = require("./_general");
const help = require("./_help");
const leaveSuccess = require("./_leavesuccess");
const lyricsFailFetch = require("./_lyricsfailfetch");
const lyricsFailNoLyrics = require("./_lyricsfailnolyrics");
const lyricsFailNoSongs = require("./_lyricsfailnosongs");
const lyricsSuccess = require("./_lyricssuccess");
const noLastSong = require("./_nolastsong");
const noSongFound = require("./_nosongfound");
const noSongProvided = require("./_nosongprovided");
const notSameVc = require("./_notsamevc");
const noVc = require("./_novc");
const nowPlaying = require("./_nowplaying");
const nowPlayingFail = require("./_nowplaying");
const pauseFail = require("./_pausefail");
const pauseFailNoSongs = require("./_pausefailnosongs");
const pauseSuccess = require("./_pausesuccess");
const repeatFailInvalid = require("./_repeatfailinvalid");
const repeatFailNoSongs = require("./_repeatfailnosongs");
const repeatMode = require("./_repeatmode");
const resumeFail = require("./_resumefail");
const resumeFailNoSongs = require("./_resumefailnosongs");
const resumeSuccess = require("./_resumesuccess");
const sameVc = require("./_samevc");
const seekFail = require("./_seekfail");
const seekFailInvalidFormat = require("./_seekfailinvalidformat");
const seekFailNoSongs = require("./_seekfailnosongs");
const seekSuccess = require("./_seeksuccess");
const shuffleFail = require("./_shufflefail");
const shuffleFailEmptyQueue = require("./_shufflefailemptyqueue");
const shuffleSuccess = require("./_shufflesuccess");
const skipFail = require("./_skipfail");
const skipSuccess = require("./_skipsuccess");
const skipToFail = require("./_skiptofail");

function emitMessage(code, vc, param1, param2, param3) {
  switch (code) {
    case "AboutMe": {
      aboutMe(vc);
      break;
    }
    case "BotNotInVc": {
      botNotInVc(vc);
      break;
    }
    case "BotNotInVc2": {
      botNotInVc2(vc);
      break;
    }
    case "ConnectionSuccess": {
      connectionSuccess(vc, param1);
      break;
    }
    case "CurrentQueue": {
      currentQueue(vc, param1, param2);
      break;
    }
    case "EmptyQueue": {
      emptyQueue(vc);
      break;
    }
    case "EmptyQueueFail": {
      emptyQueueFail(vc);
      break;
    }
    case "FilterFail": {
      filterFail(vc);
      break;
    }
    case "FilterFailNoSongs": {
      filterFailNoSongs(vc);
      break;
    }
    case "FilterSuccess": {
      filterSuccess(vc, param1);
      break;
    }
    case "General": {
      general(vc, param1);
      break;
    }
    case "Help": {
      help(vc);
      break;
    }
    case "LeaveSuccess": {
      leaveSuccess(vc, param1);
      break;
    }
    case "LyricsFailFetch": {
      lyricsFailFetch(vc);
      break;
    }
    case "LyricsFailNoLyrics": {
      lyricsFailNoLyrics(vc);
      break;
    }
    case "LyricsFailNoSongs": {
      lyricsFailNoSongs(vc);
      break;
    }
    case "LyricsSuccess": {
      lyricsSuccess(vc, param1, param2);
      break;
    }
    case "NoLastSong": {
      noLastSong(vc);
      break;
    }
    case "NoSongFound": {
      noSongFound(vc);
      break;
    }
    case "NoSongProvided": {
      noSongProvided(vc);
      break;
    }
    case "NotSameVc": {
      notSameVc(vc, param1);
      break;
    }
    case "NoVc": {
      noVc(vc, param1);
      break;
    }
    case "NowPlaying": {
      nowPlaying(vc, param1);
      break;
    }
    case "NowPlayingFail": {
      nowPlayingFail(vc);
      break;
    }
    case "PauseFail": {
      pauseFail(vc);
      break;
    }
    case "PauseFailNoSongs": {
      pauseFailNoSongs(vc);
      break;
    }
    case "PauseSuccess": {
      pauseSuccess(vc);
      break;
    }
    case "RepeatFailInvalid": {
      repeatFailInvalid(vc);
      break;
    }
    case "RepeatFailNoSongs": {
      repeatFailNoSongs(vc);
      break;
    }
    case "RepeatMode": {
      repeatMode(vc, param1);
      break;
    }
    case "ResumeFail": {
      resumeFail(vc);
      break;
    }
    case "ResumeFailNoSongs": {
      resumeFailNoSongs(vc);
      break;
    }
    case "ResumeSuccess": {
      resumeSuccess(vc);
      break;
    }
    case "SameVc": {
      sameVc(vc);
      break;
    }
    case "SeekFail": {
      seekFail(vc);
      break;
    }
    case "SeekFailInvalidFormat": {
      seekFailInvalidFormat(vc);
      break;
    }
    case "SeekFailNoSongs": {
      seekFailNoSongs(vc);
      break;
    }
    case "SeekSuccess": {
      seekSuccess(vc, param1);
      break;
    }
    case "ShuffleFail": {
      shuffleFail(vc);
      break;
    }
    case "ShuffleFailEmptyQueue": {
      shuffleFailEmptyQueue(vc);
      break;
    }
    case "ShuffleSuccess": {
      shuffleSuccess(vc);
      break;
    }
    case "SkipFail": {
      skipFail(vc);
      break;
    }
    case "SkipSuccess": {
      skipSuccess(vc);
      break;
    }
    case "SkipToFail": {
      skipToFail(vc);
      break;
    }
  }
}

module.exports = emitMessage;
