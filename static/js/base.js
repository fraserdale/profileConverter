(function () {
  config_list = require('../config.json')
  config = config_list[Object.keys(config_list)[0]]


  document.getElementById('fname').value = config.fname
  document.getElementById('sname').value = config.sname
  document.getElementById('addy').value = config.addy
  document.getElementById('apt').value = config.apt
  document.getElementById('city').value = config.city
  document.getElementById('country').value = config.country
  document.getElementById('state').value = config.state
  document.getElementById('zip').value = config.zip
  document.getElementById('email').value = config.email
  document.getElementById('phone').value = config.phone
  if (config.billingequalshipping) {
    document.getElementById('billingequalshipping').checked = true
    toggleBilling()
  }
  document.getElementById('b_fname').value = config.b_fname
  document.getElementById('b_sname').value = config.b_sname
  document.getElementById('b_addy').value = config.b_addy
  document.getElementById('b_apt').value = config.b_apt
  document.getElementById('b_city').value = config.b_city
  document.getElementById('b_country').value = config.b_country
  document.getElementById('b_state').value = config.b_state
  document.getElementById('b_zip').value = config.b_zip
  document.getElementById('cnum').value = config.cnum
  document.getElementById('cvv').value = config.cvv
  document.getElementById('month').value = config.month
  document.getElementById('year').value = config.year
  document.getElementById('type').value = config.type
  document.getElementById('profile_name').value = Object.keys(config_list)[0]
})();

const electron = require('electron');
const {
  ipcRenderer
} = electron


function loadProfileNames() {
  ipcRenderer.send('returnNames');
}


ipcRenderer.on('returnedNames', function (returnedNames, new_config_list) {
  keys = Object.keys(new_config_list)
  var sel = document.getElementById('profiles');
  for (var i = sel.options.length - 1; i >= 0; i--)
    sel.remove(i);
  keys.forEach(element => {
    // get reference to select element
    var sel = document.getElementById('profiles');
    // create new option element
    var opt = document.createElement('option');
    // create text node to add to option element (opt)
    opt.appendChild(document.createTextNode(element));
    // set value property of opt
    opt.value = element;
    // add opt to end of select box (sel)
    sel.appendChild(opt);
  });
  var sel = document.getElementById('profiles_delete');
  for (var i = sel.options.length - 1; i >= 0; i--)
    sel.remove(i);
  keys.forEach(element => {
    // get reference to select element
    var sel = document.getElementById('profiles_delete');
    // create new option element
    var opt = document.createElement('option');
    // create text node to add to option element (opt)
    opt.appendChild(document.createTextNode(element));
    // set value property of opt
    opt.value = element;
    // add opt to end of select box (sel)
    sel.appendChild(opt);
  });
  var sel = document.getElementById('profiles_select');
  for (var i = sel.options.length - 1; i >= 0; i--)
    sel.remove(i);
  keys.forEach(element => {
    // get reference to select element
    var sel = document.getElementById('profiles_select');
    // create new option element
    var opt = document.createElement('option');
    // create text node to add to option element (opt)
    opt.appendChild(document.createTextNode(element));
    // set value property of opt
    opt.value = element;
    // add opt to end of select box (sel)
    sel.appendChild(opt);
  });
  
})

loadProfileNames()

function deleteProfile(){
  ipcRenderer.send('returnConfigDelete')
}

ipcRenderer.on('profilesDelete',function(profilesDelete, config_list){
  pname = document.getElementById('profiles_delete').value
  delete config_list[pname]
  ipcRenderer.send('configOverwrite',config_list)
  loadProfileNames()
})

function loadProfile() {
  ipcRenderer.send('returnConfig');
}

ipcRenderer.on('returnedConfig', function (returnedConfig, config_list) {
  console.log(config_list)
  pname = document.getElementById('profiles').value
  config = config_list[pname]
  document.getElementById('fname').value = config.fname
  document.getElementById('sname').value = config.sname
  document.getElementById('addy').value = config.addy
  document.getElementById('apt').value = config.apt
  document.getElementById('city').value = config.city
  document.getElementById('country').value = config.country
  document.getElementById('state').value = config.state
  document.getElementById('zip').value = config.zip
  document.getElementById('email').value = config.email
  document.getElementById('phone').value = config.phone
  document.getElementById('billingequalshipping').checked = true
  document.getElementById('b_fname').value = config.b_fname
  document.getElementById('b_sname').value = config.b_sname
  document.getElementById('b_addy').value = config.b_addy
  document.getElementById('b_apt').value = config.b_apt
  document.getElementById('b_city').value = config.b_city
  document.getElementById('b_country').value = config.b_country
  document.getElementById('b_state').value = config.b_state
  document.getElementById('b_zip').value = config.b_zip
  document.getElementById('cnum').value = config.cnum
  document.getElementById('cvv').value = config.cvv
  document.getElementById('month').value = config.month
  document.getElementById('year').value = config.year
  document.getElementById('type').value = config.type
  document.getElementById('profile_name').value = pname
})

/* function stop() {
  ipcRenderer.send('stop');
  document.getElementById('server').disabled = false;
  document.getElementById('private').disabled = false;
  document.getElementById('public').disabled = false;
  document.getElementById('bot').disabled = false;
  document.getElementById('quantityCart').disabled = false;
  document.getElementById('cooldown').disabled = true;
  document.getElementById('deleteAfterReact').disabled = false;
  document.getElementById('after10').disabled = false
  document.getElementById('botsname').innerHTML = '';
  document.getElementById('name').innerHTML = '';
  document.getElementById("icon").src = 'https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/62/f8/8f/62f88f95-982b-c903-2123-0bbaf4e72482/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/246x0w.jpg'
  document.getElementById('redeemed').innerHTML = '';
  document.getElementById('live').innerHTML = '';
  document.getElementById('total').innerHTML = ''
  document.getElementById('textOut').innerHTML = ''
}
ipcRenderer.on('message', function (start, i) {
  console.log('x')
}); */

ipcRenderer.on('cartsTotal', function (cartsTotal, cartNum) {
  document.getElementById('total').innerHTML = cartNum
});
ipcRenderer.on('liveTotal', function (liveTotal, liveNum) {
  document.getElementById('live').innerHTML = liveNum
});
ipcRenderer.on('redeemedTotal', function (redeemedTotal, redeemedNum) {
  document.getElementById('redeemed').innerHTML = redeemedNum
});
ipcRenderer.on('serverImg', function (serverImg, img) {
  document.getElementById("icon").src = img
});
ipcRenderer.on('serverName', function (serverName, name) {
  document.getElementById('name').innerHTML = name
});
ipcRenderer.on('botName', function (botName, bname) {
  document.getElementById('botsname').innerHTML = bname
});
ipcRenderer.on('redeemedOutput', function (redeemedOutput, redeemedOut) {
  outString = '';
  redeemedOut.forEach(element => {
    outString += element.name + ': ' + element.quantityCart + '\n'
  });
  document.getElementById('textOut').innerHTML = outString
});
ipcRenderer.on('loginError', function (loginError, x) {
  alert('Login details incorrect');
  stop()
});


ipcRenderer.on('output', function (output, output) {
  document.getElementById('output').innerHTML = '<code>' + output + '</code>'
})

function save() {
  const fname = document.getElementById('fname').value;
  const sname = document.getElementById('sname').value;
  const addy = document.getElementById('addy').value;
  const apt = document.getElementById('apt').value;
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value
  const state = document.getElementById('state').value
  const zip = document.getElementById('zip').value
  const email = document.getElementById('email').value
  const phone = document.getElementById('phone').value
  const billingequalshipping = document.getElementById('billingequalshipping').checked
  //().match(/.{1,4}/g)).join(' ')
  const cnum = document.getElementById('cnum').value
  const month = document.getElementById('month').value
  const year = document.getElementById('year').value
  const cvv = document.getElementById('cvv').value
  const type = document.getElementById('type').value
  //config = `{"fname":"${fname}","sname":"${sname}","addy":"${addy}","apt":"${apt}","city":"${city}","country":"${country}","state":"${state}","zip":"${zip}","email":"${email}","phone":"${phone}","billingequalshipping":${billingequalshipping},
  //"cnum":"${cnum}","month":"${month}","year":"${year}","cvv":"${cvv}","type":"${type}"}`
  //if (!billingequalshipping){
  const b_addy = document.getElementById('b_addy').value;
  const b_apt = document.getElementById('b_apt').value;
  const b_city = document.getElementById('b_city').value;
  const b_country = document.getElementById('b_country').value;
  const b_state = document.getElementById('b_state').value;
  const b_zip = document.getElementById('b_zip').value;
  const profile_name = document.getElementById('profile_name').value
  config = `{"fname":"${fname}","sname":"${sname}","addy":"${addy}","apt":"${apt}","city":"${city}","country":"${country}","state":"${state}","zip":"${zip}","email":"${email}","phone":"${phone}","billingequalshipping":${billingequalshipping},
    "cnum":"${cnum}","month":"${month}","year":"${year}","cvv":"${cvv}","type":"${type}",
    "b_fname":"${b_fname}","b_sname":"${b_sname}","b_addy":"${b_addy}","b_apt":"${b_apt}","b_city":"${b_city}","b_country":"${b_country}","b_state":"${b_state}","b_zip":"${b_zip}"
  }`
  if (billingequalshipping) {
    config = `{"fname":"${fname}","sname":"${sname}","addy":"${addy}","apt":"${apt}","city":"${city}","country":"${country}","state":"${state}","zip":"${zip}","email":"${email}","phone":"${phone}","billingequalshipping":${billingequalshipping},
    "cnum":"${cnum}","month":"${month}","year":"${year}","cvv":"${cvv}","type":"${type}",
    "b_fname":"${fname}","b_sname":"${sname}","b_addy":"${addy}","b_apt":"${apt}","b_city":"${city}","b_country":"${country}","b_state":"${state}","b_zip":"${zip}"}`
  }
  //}
  console.log(config)
  ipcRenderer.send('configSave', config, profile_name);
  loadProfileNames()
}

function backToProfiles() {
  document.getElementById("settings").style.display = "block"
  document.getElementById("main").style.display = "block"
  document.getElementById('converter').style.display = 'none'
}


function toggleBilling() {
  var x = document.getElementById("billing");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function next_page() {
  document.getElementById("settings").style.display = "none"
  document.getElementById("main").style.display = "none"
  document.getElementById('converter').style.display = 'block'
}

function pd() {
  config_list = require('../config.json')
  pname = document.getElementById('profiles_select').value
  profile = config_list[pname]
  ipcRenderer.send('pd',profile,pname);
}

function dashe() {
  config_list = require('../config.json')
  pname = document.getElementById('profiles_select').value
  profile = config_list[pname]
  ipcRenderer.send('dashe',profile,pname);
}

function phantom() {
  config_list = require('../config.json')
  pname = document.getElementById('profiles_select').value
  profile = config_list[pname]
  ipcRenderer.send('phantom',profile,pname);
}

function ghost() {
  config_list = require('../config.json')
  pname = document.getElementById('profiles_select').value
  profile = config_list[pname]
  ipcRenderer.send('ghost',profile,pname);
}

function cyber() {
  config_list = require('../config.json')
  pname = document.getElementById('profiles_select').value
  profile = config_list[pname]
  ipcRenderer.send('cyber',profile,pname);
}

function eve() {
  config_list = require('../config.json')
  pname = document.getElementById('profiles_select').value
  profile = config_list[pname]
  ipcRenderer.send('eve',profile,pname);
}

function hastey() {
  config_list = require('../config.json')
  pname = document.getElementById('profiles_select').value
  profile = config_list[pname]
  ipcRenderer.send('hastey',profile,pname);
}

function showConverter() {
  console.log('showConverter')
  document.getElementById('converter').style.display = 'block'
  document.getElementById("accountGen_frame").style.display = "none"
  document.getElementById("ghostGen_frame").style.display = "none"
  document.getElementById("setting_container").style.display = "none"
}

function showGhostGen() {
  console.log('showGhostGen')
  document.getElementById('converter').style.display = 'none'
  document.getElementById("accountGen_frame").style.display = "none"
  document.getElementById("ghostGen_frame").style.display = "block"
  document.getElementById("setting_container").style.display = "none"
}

function showProfiles() {
  console.log('showProfiles')
  document.getElementById('converter').style.display = 'none'
  document.getElementById("accountGen_frame").style.display = "none"
  document.getElementById("ghostGen_frame").style.display = "none"
  document.getElementById("setting_container").style.display = "block"
}

function showAccountGen() {
  console.log('showAccountGen')
  document.getElementById('converter').style.display = 'none'
  document.getElementById("accountGen_frame").style.display = "block"
  document.getElementById("ghostGen_frame").style.display = "none"
  document.getElementById("setting_container").style.display = "none"
}

showProfiles()