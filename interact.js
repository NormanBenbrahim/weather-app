$(document).ready(function(){
  //unique api key, use it if you want 
  API_KEY = 'c4700d761091c90ca272b7efbb78a4e3'
  var data = [];

  // get current date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd
  } 

  if(mm<10) {
    mm='0'+mm
  } 
  
  switch(mm) {
    case '01':
      mm = 'January';
      break;
    case '02':
      mm = 'February';
      break;
    case '03':
      mm = 'March';
      break;
    case '04':
      mm = 'April';
      break;
    case '05':
      mm = 'May';
      break;
    case '06':
      mm = 'June';
      break;
    case '07':
      mm = 'July';
      break;
    case '08':
      mm = 'August';
      break;
    case '09':
      mm = 'September';
      break;
    case '10':
      mm = 'October';
      break;
    case '11':
      mm = 'November';
      break;
    case '12':
      mm = 'December';
      break;
  }
  
  // insert date
  var full_date = mm + ' ' + dd + ' ' + yyyy;
  $('#date').html(full_date)
  
  // in order to save the data, you need to set the async setting to false to obey scoping rules
  $.ajax({
  url: 'http://ipinfo.io',
  async: false,
  dataType: 'json',
  success: function (json) {
    data[0] = json.city;
    data[1] = json.country.toLowerCase();
    
    // for obtaining the icons gist
    $.ajax({
      url: 'https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json',
       async: false,
      dataType: 'json',
      success: function(json) {
        data[4] = json;
        }
    });
    
    $('#location').html(data[0] + ', ' + json.country)
    
    //save the url and display it
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + data[0] + ',' + data[1] + '&APPID=' + API_KEY;  
    
    $.ajax({
      url: url,
      async: false,
      dataType: 'json',
      success: function(json) {
        // get the icon code
        var code = json.weather[0].id; 
        
        //use the 4th data element to convert to wi code
        var weatherIcons = data[4];
        var icon = weatherIcons[code].icon;
        var icon_class = 'wi wi-' + icon;
        console.log(icon_class);
        $('.icon-weather').addClass(icon_class);
        
        
        // get the temperature
        var kelvin = json.main.temp;
        var celsius = Math.floor(kelvin - 273.15);
        var fahrenheight =  Math.floor(celsius*1.8 + 32) 
        data[2] = celsius;
        data[3] = fahrenheight;
               
        // get humidity and pressure
        var humidity = json.main.humidity;
        var pressure = json.main.pressure;
        
        // get the weather condition (cloudy, rainy, etc)
        var condition = json.weather.description;
        
        // condition for cels to fahrenheight
        var cels = true;
        // default to celsius
        $('.degree').html(data[2]);
        $('#temp-unit').html('C'); 
        
        $('#temp-unit').on('click', function() {
          cels = !cels;
          // change units to fahrenheight or celsius depending on click
          if (cels) {
            $('.degree').html(data[2]);
            $('#temp-unit').html('C');  
          } else {
            $('.degree').html(data[3]);
            $('#temp-unit').html('F');
        }        
          
        });


      
      }
    });
    
  }
    
  });
  
 // data is now [city, country, celsius, fahrenheight, condition]
});


