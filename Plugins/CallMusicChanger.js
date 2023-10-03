//PluginName: CallMusicChanger
//DefaultSettings: https://discord.com/assets/b9411af07f154a6fef543e7e442e4da9.mp3
addPluginToList("CallMusicChanger","https://discord.com/assets/b9411af07f154a6fef543e7e442e4da9.mp3")
var CSCBVCcallmusic = getBVCPluginSettings("CallMusicChanger")
function changeCallMusic(music){
    var play = Audio.prototype.play;
    Audio.prototype.play = function() {
    this.src = this.src.replace('https://discord.com/assets/84a1b4e11d634dbfa1e5dd97a96de3ad.mp3', music)
    return play.apply(this, arguments)
}
}
changeCallMusic(CSCBVCcallmusic)
setInterval(()=>{
    if(CSCBVCcallmusic!=getBVCPluginSettings("CallMusicChanger")){
        CSCBVCcallmusic = getBVCPluginSettings("CallMusicChanger")
        changeCallMusic(CSCBVCcallmusic)
    }
}, 1000)
