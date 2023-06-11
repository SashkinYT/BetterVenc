from customtkinter import *
from os import getenv

renderer_path = getenv("appdata") + "\\Vencord\\dist\\renderer.js"

bettervenc_code = """function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

var cookie = getCookie("Plugins")
if (cookie == undefined){
	document.cookie = "PluginsCount=1"
}

document.cookie = "Plugin1 = https://raw.githubusercontent.com/SashkinYT/BetterVenc/main/enabledmsg.js"


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

function importLib(link) {
  fetch(link).then(response => response.text()).then((response) => {
	  eval(response)
   })
   .catch(err => console.log(err))
}

document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name === 'Insert') {
      if (enabled === false){
		  div.style = "z-index: 999; position: absolute; left: 1%; bottom: 1%; grid-template-rows: 1fr 1fr 1fr; grid-template-columns: 5% 60% 20% 5%; display: grid; background-color: rgb(44, 44, 67); border-radius: 10px; column-gap: 10px"
		  enabled = true
	  } 
	  else {
		  enabled = false
		  div.style = "z-index: -1; position: absolute; left: 1%; bottom: 1%; grid-template-rows: 1fr 1fr 1fr; grid-template-columns: 5% 60% 20% 5%; display: grid; background-color: rgb(44, 44, 67); border-radius: 10px; column-gap: 10px"
	  }
    }
}, false);

document.addEventListener("DOMContentLoaded", function(event) {
    document.body.appendChild(div)
    document.getElementById('ok_button_vc').addEventListener("click", function(){
	importLib(inp.value)
	pluginsC = Number(getCookie("PluginsCount")) + 1
	document.cookie = "PluginsCount="+pluginsC.toString()
	document.cookie = "Plugin"+pluginsC.toString() + "=" + inp.value
});
	pluginsC = Number(getCookie("PluginsCount"))
	for (let i = 1; i < pluginsC+1; i++) {
		importLib(getCookie("Plugin"+ i.toString()));
	}
});"""

tk = CTk()
tk.title("BetterVenc Installer")
tk.geometry("500x500")
tk.resizable(0,0)

def install_bvc():
    file = open(renderer_path, 'r', encoding='utf-8').read()
    open(renderer_path, 'w', encoding='utf-8').write(bettervenc_code + "\n" + file)

CTkLabel(tk, text="BetterVenc Installer", font=CTkFont("Arial", 50, "bold")).pack()

CTkButton(tk, text="Install", width=390, height=100, font=CTkFont("Arial", 50, "bold"), command=install_bvc).pack()
CTkLabel(tk, text="\nAfter installation,\npress INSERT to open/close menu", font=CTkFont("Arial", 29, "bold")).pack()

tk.mainloop()
