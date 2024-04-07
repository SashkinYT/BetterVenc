function importLib(link) {
    fetch(link).then(response => response.text()).then((response) => {
        eval(response)
     })
     .catch(err => console.log(err))
  }

var AllBVCSettings = {}

function getAllBVCSettings(){
    const request = indexedDB.open("BetterVenc", 1);
request.onupgradeneeded = function () {
  //1
  const db = request.result;

  //2
  const PLstore = db.createObjectStore("Plugins", { keyPath: "key" });

  //3
  PLstore.createIndex("url", ["url"], { unique: false });
};


request.onsuccess = function () {

  const db = request.result;

  // 1
  const transaction = db.transaction("Plugins", "readwrite");

  //2
  const store = transaction.objectStore("Plugins");
  const urlIndex = store.index("url");

  //3
  const settings = store.getAll()
  settings.onsuccess = ()=>{
  for (let i = 0; i < settings.result.length; i++) {
      AllBVCSettings[settings.result[i].key] = settings.result[i].settings
  }
  }
  // 6
  transaction.oncomplete = function () {
    db.close();
  };
}}

setInterval(()=>{getAllBVCSettings()},100)

function BVCEnabledMSG(){
    const request = indexedDB.open("BetterVenc", 1);
request.onupgradeneeded = function () {
  //1
  const db = request.result;

  //2
  const PLstore = db.createObjectStore("Plugins", { keyPath: "key" });

  //3
  PLstore.createIndex("url", ["url"], { unique: false });
    PLstore.createIndex("settings", ["settings"], { unique: false });
};

request.onsuccess = function () {

  const db = request.result;

  // 1
  const transaction = db.transaction("Plugins", "readwrite");

  //2
  const store = transaction.objectStore("Plugins");

  //3
  store.put({ key:"BVCEnabledMessage", url:"https://raw.githubusercontent.com/SashkinYT/BetterVenc/main/enabledmsg.js"});
    
  // 6
  transaction.oncomplete = function () {
    db.close();
  };
};
}
BVCEnabledMSG()

function pluginsListGUIBase(){
    var div =  document.createElement("div")
    
    div.style = "z-index: -1; position: absolute; left: 25%; bottom: 25%; width: 50%; height: 50%; background-color: rgb(44, 44, 67); overflow: scroll;border: 0px solid; border-radius: 20px;"
    div.className = "bvcplmenuscrollbar"
    div.id = "bvcplmenudiv"
    var scrollbar = document.createElement("style")
    scrollbar.innerHTML = `.bvcplmenuscrollbar::-webkit-scrollbar {
    display: none;
}`
    document.body.appendChild(scrollbar)
    document.body.appendChild(div)
}

var BVCpluginsCount = 0

function getBVCPluginSettings(pluginName){
    return AllBVCSettings[pluginName]
}

function setBVCPluginSettings(pluginName, settings){
    const request = indexedDB.open("BetterVenc", 1);
request.onupgradeneeded = function () {
  //1
  const db = request.result;

  //2
  const PLstore = db.createObjectStore("Plugins", { keyPath: "key" });

  //3
  PLstore.createIndex("url", ["url"], { unique: false });
};


request.onsuccess = function () {

  const db = request.result;

  // 1
  const transaction = db.transaction("Plugins", "readwrite");

  //2
  const store = transaction.objectStore("Plugins");
  const urlIndex = store.index("url");

  //3
  const plSettings = store.get(pluginName)
  plSettings.onsuccess = ()=>{
      store.put({key: pluginName,url: plSettings.result.url,settings: settings})
  }
  
  // 6
  transaction.oncomplete = function () {
    db.close();
  };
}}

function addPluginToList(pluginName, defaultSettings){
    var div = document.createElement("div")
    div.id = pluginName
    div.style = "position: absolute; top: "+((BVCpluginsCount*47)+2).toString()+"%; background-color: rgba(60,60,60); height: 45%; border: 0px solid; border-radius: 20px; width: 90%; left: 5%"
    var h1 = document.createElement("div")
    h1.innerHTML = pluginName
    h1.style = "color: springgreen; font-size: 3.5vw; position: relative; left: 5%; top: 5%;"
    div.appendChild(h1)
    var inp =  document.createElement("input")
    inp.style = "border: 1px solid; color: springgreen; background-color: rgb(44, 44, 67); position: absolute; left: 5%; top: 35%; height: 30%; width: 60%;"
    inp.placeholder = "Settings"
    var btn =  document.createElement("button")
    btn.style = "border: 1px solid; color: rgb(44, 44, 67); background-color: springgreen; right: 5%; width: 28%; position: absolute; height: 28%; top: 36%;"
    btn.innerHTML = "Save Settings"
    btn.onclick = function(){
	    setBVCPluginSettings(pluginName, inp.value)
    }
    div.appendChild(btn)
    div.appendChild(inp)
    var settingsCookie = getBVCPluginSettings(pluginName)
    if(settingsCookie == undefined){
	    setBVCPluginSettings(pluginName,defaultSettings)
        inp.value = defaultSettings
    } else {
        inp.value = settingsCookie
    }
    document.getElementById("bvcplmenudiv").appendChild(div)
    BVCpluginsCount += 1
    
    return settingsCookie
}

function pluginLoadMenu(){
var div =  document.createElement("div")

div.style = "z-index: -1; position: absolute; left: 1%; bottom: 1%; grid-template-rows: 1fr 1fr 1fr; grid-template-columns: 5% 60% 20% 5%; display: grid; background-color: rgb(44, 44, 67); border-radius: 10px; column-gap: 10px; row-gap: 10px"

var inp =  document.createElement("input")
inp.placeholder = "Enter plugin link"
inp.style = "grid-column: 2; grid-row: 2; color: rgb(44, 44, 67); background-color: springgreen; border: 1px solid; border-radius: 10px; height: 120%;"

var btn =  document.createElement("button")
btn.innerHTML = "OK"
btn.style = "grid-column: 3; grid-row: 2; color: rgb(44, 44, 67); background-color: springgreen; border: 1px solid; border-radius: 10px; height: 120%;"
btn.id = "ok_button_vc"

var enabled = false

div.appendChild(inp)
div.appendChild(btn)

document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name === 'Insert') {
      if (enabled === false){
	          document.getElementById("bvcplmenudiv").style = "z-index: 2147483647; position: absolute; left: 25%; bottom: 25%; width: 50%; height: 50%; background-color: rgb(44, 44, 67); overflow: scroll;border: 0px solid; border-radius: 20px;"
		  div.style = "z-index: 2147483647; position: absolute; left: 1%; bottom: 1%; grid-template-rows: 1fr 1fr 1fr; grid-template-columns: 5% 60% 20% 5%; display: grid; background-color: rgb(44, 44, 67); border-radius: 10px; column-gap: 10px"
		  enabled = true
	  } 
	  else {
		  enabled = false
		  document.getElementById("bvcplmenudiv").style = "z-index: -1; position: absolute; left: 25%; bottom: 25%; width: 50%; height: 50%; background-color: rgb(44, 44, 67); overflow: scroll;border: 0px solid; border-radius: 20px;"
		  div.style = "z-index: -1; position: absolute; left: 1%; bottom: 1%; grid-template-rows: 1fr 1fr 1fr; grid-template-columns: 5% 60% 20% 5%; display: grid; background-color: rgb(44, 44, 67); border-radius: 10px; column-gap: 10px"
	  }
    }
}, false);

function BVCAddPluginToAutoLoad(url){
    fetch(url).then(response => response.text()).then((response) => {
        var strings = response.split("\n")
        var pluginN = strings[0].split("//PluginName: ")[1]
        var defaultSettings = strings[1].split("//DefaultSettings: ")[1]
        const request = indexedDB.open("BetterVenc", 1);
request.onupgradeneeded = function () {
  //1
  const db = request.result;

  //2
  const PLstore = db.createObjectStore("Plugins", { keyPath: "key" });

  //3
  PLstore.createIndex("url", ["url"], { unique: false });
};


    request.onsuccess = function () {

    const db = request.result;

    // 1
    const transaction = db.transaction("Plugins", "readwrite");

    //2
    const store = transaction.objectStore("Plugins");

    //3
    store.put({key: pluginN, url:url, settings:defaultSettings})
    
    // 6
    transaction.oncomplete = function () {
        db.close();
    };
    }
     })
     .catch(err => console.log(err))
}

document.addEventListener("DOMContentLoaded", function(event) {
    pluginsListGUIBase()
    document.body.appendChild(div)
    document.getElementById('ok_button_vc').addEventListener("click", function(){
	importLib(inp.value)
	BVCAddPluginToAutoLoad(inp.value)
});
const request = indexedDB.open("BetterVenc", 1);
request.onupgradeneeded = function () {
  //1
  const db = request.result;

  //2
  const PLstore = db.createObjectStore("Plugins", { keyPath: "key" });

  //3
  PLstore.createIndex("url", ["url"], { unique: false });
};


    request.onsuccess = function () {

    const db = request.result;

    // 1
    const transaction = db.transaction("Plugins", "readwrite");

    //2
    const store = transaction.objectStore("Plugins");

    //3
    var pluginsListGet = store.getAll()
    pluginsListGet.onsuccess = ()=>{
        var pluginsList = pluginsListGet.result
        pluginsC = pluginsList.length
        for (let i = 0; i < pluginsC; i++) {
            importLib(pluginsList[i].url);
        }
    }
    
    // 6
    transaction.oncomplete = function () {
        db.close();
    };
    }
});
}

pluginLoadMenu()
