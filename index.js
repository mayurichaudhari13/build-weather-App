
//https://www.embedgooglemap.net/
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function getData(){
  let city=document.getElementById("city").value;
  
  const api = "b2a0a5f8caff4c81996f9741a965547b";
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;


  fetch(url)
.then(function(res){
    return res.json();
})
.then(function(res){
    appendData(res);
    console.log("res:",res);
})
.catch(function(err){
    console.log("err:",err);
});
}

function getDataLocation(long,lat){
  const api = "b2a0a5f8caff4c81996f9741a965547b";
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`;
  
    fetch(url)
  .then(function(res){
      return res.json();
  })
  .then(function(res){
      appendData(res);
      console.log("res:",res);
  })
  .catch(function(err){
      console.log("err:",err);
  });
  }

  function getForcasteLocation(long,lat){
    const api = "b2a0a5f8caff4c81996f9741a965547b";

    const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,hourly,minutely,alerts&appid=${api}`;
    
    fetch(url)
  .then(function(res){
      return res.json();
  })
  .then(function(res){
    appendToFor(res);
      console.log("res:",res);
  })
  .catch(function(err){
      console.log("err:",err);
  });
  }
function appendData(data){
    let div=document.getElementById("container");
    let h3=document.createElement('h3');
    h3.innerText="CURRENT WETHER";
  
    var today = new Date();
    var time =`  Time : ${today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()}`;
    var date = `Date: ${today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()}`;
    let wether=document.createElement("div");
    wether.setAttribute("class","whether");
    let image=document.createElement("img");
    image.src="cloudy.png";
    image.style.width="70px";
    let current=document.createElement("h1");
    let currentInCel=data.main.temp_min
    currentInCel=Math.ceil(currentInCel-273.15);
    current.innerHTML=`${currentInCel}<sup>°C</sup>`;
    let feel=document.createElement("p");
    feel.innerText=`FEELS LIKE ${Math.ceil(data.main.feels_like-273.15)}°C`
    wether.append(image,current,feel);
   
   
    let map=document.getElementById("gmap_canvas");
    div.innerHTML= null;
    let city=document.createElement("p");
    city.innerText=`City:${data.name}`;
    city.style.fontSize="20px";
   
  let bottom=document.createElement("div");
  bottom.setAttribute("class","bottom");


    let b1=document.createElement("div");
    let h4=document.createElement("h4");
    h4.innerText="MIN TEMP";
    let min=document.createElement("p");
    let minInCel=data.main.temp_min
    minInCel=Math.ceil(minInCel-273.15);
    min.innerHTML=`${minInCel}<sup>°C</sup>`;
    b1.append(h4,min);
    

    let b2=document.createElement("div");
    let h42=document.createElement("h4");
    h42.innerText="MAX TEMP";
    let max=document.createElement("p");
    let maxInCel=data.main.temp_min
    maxInCel=Math.ceil(maxInCel-273.15);
    max.innerHTML=`${maxInCel}<sup>°C</sup>`;
    b2.append(h42,max);


    let b3=document.createElement("div");
    let h43=document.createElement("h4");
    h43.innerText="HUMIDITY";
    let humidity=document.createElement("p");
    humidity.innerText=`${data.main.humidity}%`;
    b3.append(h43,humidity);


    let b4=document.createElement("div");
    let h44=document.createElement("h4");
    h44.innerText="WIND";
    let wind=document.createElement("p");
    wind.innerText=`${Math.ceil(data.wind.speed)} Km/h`;
    b4.append(h44,wind);

    let b5=document.createElement("div");
    let h45=document.createElement("h4");
    h45.innerText="CLOUDS";
    let cloud=document.createElement("p");
    cloud.innerHTML=data.clouds.all;
    b5.append(h45,cloud);

    let b6=document.createElement("div");
    let sunri=document.createElement("img");
    sunri.style.height="50px";
    sunri.src="sunrise.png"
    let h46=document.createElement("h4");
    h46.innerText="SUNRISE";
    let sunr=document.createElement("p");
    sunr.innerText=moment.utc(data.sys.sunrise,'X').add(3600,'seconds').format('HH:mm a');;
    b6.append(sunri,h46,sunr);

    let b7=document.createElement("div");
    let sunseti=document.createElement("img");
    sunseti.style.height="50px";
    sunseti.src="sunset.png"
    let h47=document.createElement("h4");
    h47.innerText="SUNSET";
    let sunset=document.createElement("p");
    sunset.innerText=moment.utc(data.sys.sunset,'X').add(3600,'seconds').format('HH:mm a');;
    b7.append(sunseti,h47,sunset);

    bottom.append(b1,b2,b3,b4,b5,b6,b7);
    div.append(h3,date,time,wether,city,bottom);
    
    map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}

function appendToFor(data){
   let forcaste=document.getElementById("forecast");
     
   data.daily.forEach(function(ele, index){
    if(index>0){
   let div=document.createElement("div");
   let day=document.createElement("p");
   let dayname = new Date(ele.dt * 1000).toLocaleDateString("en", {
    weekday: "long",
});
    day.innerText=dayname;

    let ip=document.createElement("img");
    ip.style.width="50px"
    ip.src="Sun.png";
    
    let tempmax=document.createElement("p");
	let maxt = ele.temp.max;
    tempmax.innerHTML=`${Math.ceil(maxt-273.15)}<sup>°C</sup>`;

    let tempmin=document.createElement("p");
	let mint = ele.temp.min;
    tempmin.innerHTML=`${Math.ceil(mint-273.15)}<sup>°C</sup>`;
    tempmin.style.fontSize="20px";

    div.append(day,ip,tempmax,tempmin);
    forcaste.append(div);
}
});
   

}
function getWhether(){
    navigator.geolocation.getCurrentPosition(success);

    function success(position){
        var crd = position.coords;
    
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getDataLocation(crd.longitude,crd.latitude);
        getForcasteLocation(crd.longitude,crd.latitude);
    }
}


