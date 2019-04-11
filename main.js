/* 
  ____                _       _  __               _ 
 |  _ \              | |     | |/ _|             (_)
 | |_) |_   _        | | __ _| | |_ _ __ __ _ _____ 
 |  _ <| | | |   _   | |/ _` | |  _| '__/ _` |_  / |
 | |_) | |_| |  | |__| | (_| | | | | | | (_| |/ /| |
 |____/ \__, |   \____/ \__,_|_|_| |_|  \__,_/___|_|
         __/ |                                      
        |___/                                       
 */
const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const {
    app,
    BrowserWindow,
    ipcMain
} = electron;

let mainWindow;


parseString = require("xml2js").parseString,
    xml2js = require("xml2js");


let short2long = {
    "AF": "Afghanistan",
    "AX": "Aland Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia, Plurinational State of",
    "BQ": "Bonaire, Sint Eustatius and Saba",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo",
    "CD": "Congo, The Democratic Republic of the",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Côte d'Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CW": "Curaçao",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FK": "Falkland Islands (Malvinas)",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island and McDonald Islands",
    "VA": "Holy See (Vatican City State)",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran, Islamic Republic of",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KP": "Korea, Democratic People's Republic of",
    "KR": "Korea, Republic of",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People's Democratic Republic",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MK": "Macedonia, Republic of",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia, Federated States of",
    "MD": "Moldova, Republic of",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestinian Territory, Occupied",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Réunion",
    "RO": "Romania",
    "RU": "Russian Federation",
    "RW": "Rwanda",
    "BL": "Saint Barthélemy",
    "SH": "Saint Helena, Ascension and Tristan da Cunha",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin (French part)",
    "PM": "Saint Pierre and Miquelon",
    "VC": "Saint Vincent and the Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SX": "Sint Maarten (Dutch part)",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia and the South Sandwich Islands",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SS": "South Sudan",
    "SJ": "Svalbard and Jan Mayen",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan, Province of China",
    "TJ": "Tajikistan",
    "TZ": "Tanzania, United Republic of",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UM": "United States Minor Outlying Islands",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela, Bolivarian Republic of",
    "VN": "Viet Nam",
    "VG": "Virgin Islands, British",
    "VI": "Virgin Islands, U.S.",
    "WF": "Wallis and Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
}


// Listen for app to be ready
app.on('ready', function () {
    //create new window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 752,
        minWidth: 800,
        minHeight: 752,
    });
    //mainWindow.setMenu(null)
    mainWindow.setTitle('Profile Converter | Discord Utils')
    /* if (process.platform === "win32") {
        mainWindow.setIcon('./kermitsupreme.jpg')
    } */
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'static/index.html'),
        protocol: 'file:',
        slashes: true
    }));
});


function readConfig() {
    const config = require('./config.json');
    return
}

//catch save
ipcMain.on('configSave', function (e, config,profile_name) {
    const old_configs = require('./config.json')   
    old_configs[profile_name] = JSON.parse(config)
    console.log('odonbe')
    fs.writeFile('config.json', JSON.stringify(old_configs), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log('saved config');
    });
    console.log(old_configs)
});

ipcMain.on('configOverwrite', function (e, newConfig) {
    fs.writeFile('config.json', JSON.stringify(newConfig), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
    });
});


ipcMain.on('returnConfigDelete', function (e) {
    old_configs = require('./config.json')   
    mainWindow.webContents.send('profilesDelete', old_configs);
});

ipcMain.on('returnConfig', function (e) {
    old_configs = require('./config.json')   
    mainWindow.webContents.send('returnedConfig', old_configs);
});

ipcMain.on('returnNames',function(e){
    old_configs = require('./config.json')   
    mainWindow.webContents.send('returnedNames', old_configs);
})

ipcMain.on('pd', function (e,config,pname) {
    console.log('Converting profile for Project Destroyer')
    fileName = 'pd_' + pname.replace(' ','') + '-' + Math.random().toString(36).substring(2, 6)
    console.log(fileName)
    returnConfig = [{
        "billing": {
            "address1": config['b_addy'],
            "address2": config['b_apt'],
            "city": config['b_city'],
            "country": config['b_country'],
            "firstName": config['fname'],
            "lastName": config['sname'],
            "phone": config['phone'],
            "state": config['b_state'],
            "zipcode": config['b_zip']
        },
        "card": {
            "code": config['csv'],
            "expire": config['month'] + ' / ' + config['year'],
            "name": config['fname'] + ' ' + config['sname'],
            "number": config['cnum']
        },
        "email": config['email'],
        "id": Math.random().toString(36).substring(2, 10),
        "limit": true,
        "match": config['billingequalshipping'],
        "shipping": {
            "address1": config['addy'],
            "address2": config['apt'],
            "city": config['city'],
            "country": config['country'],
            "firstName": config['fname'],
            "lastName": config['sname'],
            "phone": config['phone'],
            "state": config['state'],
            "zipcode": config['zip']
        },
        "title": fileName
    }]
    console.log('converted to correct format')
    fs.writeFile('profiles/' + fileName + '.json', JSON.stringify(returnConfig), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        };
        successMessage = 'Successfully created: <br>' + path.join(__dirname, 'profiles/' + fileName + '.json')
        console.log(successMessage)
        mainWindow.webContents.send('output', successMessage);
    });
});



ipcMain.on('hastey', function (e,config,pname) {
    console.log('Converting profile for Hastey Supreme')
    const config = require('./config.json');
    fileName = 'hastey_' + pname.replace(' ','') + '-' + Math.random().toString(36).substring(2, 6)
    console.log(fileName)
    if (config['b_country'] == 'US'){
        country = 'USA'
        state = ['b_state']
    }else if(config['b_country'] == 'CA'){
        country = 'CANADA'
        state = ['b_state']
    }else if(config['b_country'] == 'JP'){
        country = 'JAPAN'
        state = ['b_state']
    }else{
        country = 'EUROPE'
        state = config['b_country']
    }
    returnConfig = [{
        "__profile__name":fileName,
        "address": config['b_addy'],
        "address_2": config['b_apt'],
        "cardType":config['type'],
        "cc_cvv": config['cvv'],
        "cc_month": config['month'],
        "cc_number": config['cnum'],
        "cc_year": "20"+ config['year'],
        "city": config['b_city'],
        "country":country,
        "email":config['email'],
        "id": Math.random().toString(36).substring(2, 10) + '-' + Math.random().toString(36).substring(2, 6) + '-'+Math.random().toString(36).substring(2, 6)+'-'+Math.random().toString(36).substring(2, 6)+'-'+Math.random().toString(36).substring(2, 14),
        "name": config['b_fname'] + ' ' + config['b_sname'],
        "state": state,
        "tel": config['phone'],
        "zip":config['b_zip']
    }]
    console.log('converted to correct format')
    fs.writeFile('profiles/' + fileName + '.json', JSON.stringify(returnConfig), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        };
        successMessage = 'Successfully created: <br>' + path.join(__dirname, 'profiles/' + fileName + '.json')
        console.log(successMessage)
        mainWindow.webContents.send('output', successMessage);
    });
});




ipcMain.on('cyber', function (e,config,pname) {
    console.log('Converting profile for CyberAIO')
    const config = require('./config.json');
    fileName = 'cyber_' + pname.replace(' ','') + '-' + Math.random().toString(36).substring(2, 6)
    console.log(fileName)
    config['country'] = short2long[config['country']]
    config['b_country'] = short2long[config['b_country']]

    if (config['state'] == "") {
        config['state'] = 'None'
    }
    if (config['b_state'] == "") {
        config['b_state'] = 'None'
    }
    returnConfig = {
        [fileName]: {
            "name": fileName,
            "payment": {
                "email": config['email'],
                "phone": config['phone'],
                "card": {
                    "name": config['fname'] + ' ' + config['sname'],
                    "number": config['cnum'],
                    "exp_month": config['month'],
                    "exp_year": '20' + config['year'],
                    "cvv": config['cvv']
                }
            },
            "delivery": {
                "first_name": config['fname'],
                "last_name": config['sname'],
                "addr1": config['addy'],
                "addr2": config['apt'],
                "zip": config['zip'],
                "city": config['city'],
                "country": config['country'],
                "state": config['state'],
                "same_as_del": config['billingequalshipping']
            },
            "billing": {
                "first_name": config['b_fname'],
                "last_name": config['b_sname'],
                "addr1": config['b_addy'],
                "addr2": config['b_apt'],
                "zip": config['b_zip'],
                "city": config['b_city'],
                "country": config['b_country'],
                "state": config['b_state'],
                "same_as_del": config['billingequalshipping']
            },
            "one_checkout": true,
            "favourite": false
        }
    }
    console.log('converted to correct format')
    fs.writeFile('profiles/' + fileName + '.json', JSON.stringify(returnConfig), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        };
        successMessage = 'Successfully created: <br>' + path.join(__dirname, 'profiles/' + fileName + '.json')
        console.log(successMessage)
        mainWindow.webContents.send('output', successMessage);
    });
});

ipcMain.on('eve', function (e,config,pname) {
    console.log('Converting profile for EVEAIO')
    const config = require('./config.json');
    fileName = 'EVE_' + pname.replace(' ','') + '-' + Math.random().toString(36).substring(2, 6)
    console.log(fileName)

    if (config['state'] == "") {
        config['state'] = 'None'
    }
    if (config['b_state'] == "") {
        config['b_state'] = 'None'
    }

    returnConfig = 
        [{
                "ProfileName": fileName,
                "BillingFirstName": config['b_fname'],
                "BillingLastName": config['b_sname'],
                "BillingAddressLine1": config['b_addy'],
                "BillingAddressLine2": config['b_apt'],
                "BillingCity": config['b_city'],
                "BillingState": config['b_state'],
                "BillingCountryCode": config['b_country'],
                "BillingZip": config['b_zip'],
                "BillingPhone": config['phone'],
                "BillingEmail": config['email'],
                "ShippingFirstName": config['fname'],
                "ShippingLastName": config['sname'],
                "ShippingAddressLine1": config['addy'],
                "ShippingAddressLine2": config['apt'],
                "ShippingCity": config['city'],
                "ShippingState": config['state'],
                "ShippingCountryCode": config['country'],
                "ShippingZip": config['zip'],
                "ShippingPhone": config['phone'],
                "ShippingEmail": config['email'],
                "NameOnCard": config['b_fname'] + ' ' + config['b_sname'],
                "CreditCardNumber": "20"+config['cnum'],
                "ExpirationMonth": config['month'],
                "ExpirationYear": config['year'],
                "Cvv": config['cvv'],
                "CardType": config['type'],
                "OneCheckoutPerWebsite": true,
                "SameBillingShipping": config['billingequalshipping'],
                "BirthDay": "10",
                "BirthMonth": "1",
                "BirthYear": "1990",       
        }]
    

    /* 
    FOR XML
    
    returnConfig = {
        "ArrayOfProfile": {
            "Profile": {
                "ProfileName": fileName,
                "BillingFirstName": config['b_fname'],
                "BillingLastName": config['b_sname'],
                "BillingAddressLine1": config['b_addy'],
                "BillingAddressLine2": config['b_apt'],
                "BillingCity": config['b_city'],
                "BillingState": config['b_state'],
                "BillingCountryCode": config['b_country'],
                "BillingZip": config['b_zip'],
                "BillingPhone": config['phone'],
                "BillingEmail": config['email'],
                "ShippingFirstName": config['fname'],
                "ShippingLastName": config['sname'],
                "ShippingAddressLine1": config['addy'],
                "ShippingAddressLine2": config['apt'],
                "ShippingCity": config['city'],
                "ShippingState": config['state'],
                "ShippingCountryCode": config['country'],
                "ShippingZip": config['zip'],
                "ShippingPhone": config['phone'],
                "ShippingEmail": config['email'],
                "NameOnCard": config['b_fname'] + ' ' + config['b_sname'],
                "CreditCardNumber": config['cnum'],
                "ExpirationMonth": config['month'],
                "ExpirationYear": config['year'],
                "Cvv": config['cvv'],
                "CardType": config['type'],
                "OneCheckoutPerWebsite": true,
                "SameBillingShipping": config['billingequalshipping'],
                "BirthDay": 10,
                "BirthMonth": 1,
                "BirthYearOne": 1990,
                "ShippingVarious": {},
                "BillingVarious": {}
            }
        }
    } 


    var builder = new xml2js.Builder();
    var xml = builder.buildObject(returnConfig);

    fs.writeFile("profiles/" + profileName + ".xml", xml, function (err, data) {
        if (err) {
            console.error(err);
            return;
        };
        successMessage = 'Successfully created: <br>' + path.join(__dirname, 'profiles/' + fileName + '.xml')
        console.log(successMessage)
        mainWindow.webContents.send('output', successMessage);
    });*/


    console.log('converted to correct format')
    fs.writeFile('profiles/' + fileName + '.json', JSON.stringify(returnConfig), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        };
        successMessage = 'Successfully created: <br>' + path.join(__dirname, 'profiles/' + fileName + '.json')
        console.log(successMessage)
        mainWindow.webContents.send('output', successMessage);
    });


});

ipcMain.on('dashe', function (e,config,pname) {
    console.log('Converting profile for Project Destroyer')
    const config = require('./config.json');
    fileName = 'dashe_' + pname.replace(' ','') + '-' + Math.random().toString(36).substring(2, 6)
    console.log(fileName)
    returnConfig = {
        [fileName]: {
            "billing": {
                "address1": config['b_addy'],
                "address2": config['b_apt'],
                "city": config['b_city'],
                "country": config['b_country'],
                "firstName": config['b_fname'],
                "lastName": config['b_sname'],
                "phone": config['b_phone'],
                "state": config['b_state'],
                "zipcode": config['b_zip']
            },
            "billingMatch": config['billingequalshipping'],
            "card": {
                "cvv": config['csv'],
                "holder": config['fname'] + ' ' + config['sname'],
                "month": config['month'],
                "number": config['cnum'],
                "year": '20' + config['year']
            },
            "email": config['email'],
            "profileName": fileName,
            "shipping": {
                "address": config['addy'],
                "apt": config['apt'],
                "city": config['city'],
                "country": config['country'],
                "firstName": config['fname'],
                "lastName": config['sname'],
                "phoneNumber": config['phone'],
                "state": config['state'],
                "zipCode": config['zip']
            }
        }
    }
    console.log('converted to correct format')
    fs.writeFile('profiles/' + fileName + '.json', JSON.stringify(returnConfig), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        };
        successMessage = 'Successfully created: <br>' + path.join(__dirname, 'profiles/' + fileName + '.json')
        console.log(successMessage)
        mainWindow.webContents.send('output', successMessage);
    });

})

ipcMain.on('phantom', function (e,config,pname) {
    console.log('Converting profile for Phantom')
    const config = require('./config.json');
    fileName = 'phantom_' + pname.replace(' ','') + '-' + Math.random().toString(36).substring(2, 6)
    console.log(fileName)
    returnConfig = [{
        "Billing": {
            "Address": config['b_addy'],
            "Apt": config['b_apt'],
            "City": config['b_city'],
            "FirstName": config['b_fname'],
            "LastName": config['b_sname'],
            "State": config['b_state'],
            "Zipcode": config['b_zip']
        },
        "CCNumber": config['cnum'],
        "CVV": config['csv'],
        "CardType": config['ctype'],
        "Country": config['country'],
        "Email": config['email'],
        "ExpMonth": config['month'],
        "ExpYear": "20" + config['year'],
        "Name": config['fname'] + ' ' + config['sname'],
        "Phone": config['phone'],
        "Same": config['billingequalshipping'],
        "Shipping": {
            "Address": config['addy'],
            "Apt": config['apt'],
            "City": config['city'],
            "FirstName": config['fname'],
            "LastName": config['sname'],
            "State": config['state'],
            "Zipcode": config['zip']
        }

    }]
    console.log('converted to correct format')
    fs.writeFile('profiles/' + fileName + '.json', JSON.stringify(returnConfig), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        };
        successMessage = 'Successfully created: <br>' + path.join(__dirname, 'profiles/' + fileName + '.json')
        console.log(successMessage)
        mainWindow.webContents.send('output', successMessage);
    });
});


ipcMain.on('ghost', function (e,config,pname) {
    console.log('Converting profile for Ghost')
    const config = require('./config.json');
    fileName = 'ghost_' + pname.replace(' ','') + '-' + Math.random().toString(36).substring(2, 6)
    console.log(fileName)
    returnConfig = {
        "CCNumber": config['cnum'],
        "CVV": config['csv'],
        "ExpMonth": config['month'],
        "ExpYear": "20" + config['year'],
        "CardType": config['type'],
        "Same": config['billingequalshipping'],
        "Shipping": {
            "FirstName": config['fname'],
            "LastName": config['sname'],
            "Address": config['addy'],
            "Apt": config['apt'],
            "City": config['city'],
            "State": config['state'],
            "Zip": config['zip']
        },
        "Billing": {
            "FirstName": config['b_fname'],
            "LastName": config['b_sname'],
            "Address": config['b_addy'],
            "Apt": config['b_apt'],
            "City": config['b_city'],
            "State": config['b_state'],
            "Zip": config['b_zip']
        },
        "Phone": config['phone'],
        "Name": config['fname'] + ' ' + config['sname'],
        "Country": config['country']
    }
    console.log('converted to correct format')
    fs.writeFile('profiles/' + fileName + '.json', JSON.stringify(returnConfig), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        };
        successMessage = 'Successfully created: <br>' + path.join(__dirname, 'profiles/' + fileName + '.json')
        console.log(successMessage)
        mainWindow.webContents.send('output', successMessage);
    });
});