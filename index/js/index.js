var map;
var marker = []
var infowindow =[]
var alldata=[]
var somedata=[]
var uluru = {
    lat: 48.853,
    lng: 2.333
};


var price=[100,200];

var reviews_per_month=[1,2];

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: uluru
  });

  d3.csv("./listings_s.csv").then((data) => {
    alldata=data;
    // console.log(Array.from( new Set(alldata.map(d=>{d.neighbourhood} )) )) ;
    showsomedata();
    
  });

}

function showsomedata(){

marker.forEach(element => {
    element.setMap(null);
    delete element;
});
infowindow.forEach(element => {
    delete element;
});
marker=[]
infowindow=[]
somedata= []


alldata
.slice(1, 10000)
.forEach(e=>{
    
    if(Number(e.price)>=Number(price[0])&&Number(e.price)<=Number(price[1])&&
    Number(e.reviews_per_month)>=Number(reviews_per_month[0])&&Number(e.reviews_per_month)<=Number(price[1])
    ){
        // console.log(e.price)
        somedata.push(e);
        uluru.lat = Number(e.latitude);
        uluru.lng = Number(e.longitude);
        let one_marker = new google.maps.Marker({
          position: uluru,
          map: map,
          title: `${e.name}`
        })
        marker.push(one_marker)
  
        let one_infowindow = new google.maps.InfoWindow({
          content: `<div>${e.price}</div>`
        })

        infowindow.push(one_infowindow)
  
  
        one_marker.addListener('click', function () {
          one_infowindow.open(map, one_marker);
          console.log("click_one")
        });
       
        
        
        ////

    }

});
drawd3(somedata);
}







$('.range1').jRange({
    from: 0,
    to: 3000,
    step: 1,
    scale: [0,1500,3000],
    format: '%s',
    width: document.documentElement.clientWidth*0.5,
    showLabels: true,
    isRange : true,
    ondragend:(d)=>{
        nums=d.split(",");
        price[0]=nums[0];
        price[1]=nums[1];
        showsomedata()
    },
});

$('.range1').jRange('setValue', '0,200');



$('.range2').jRange({
    from: 0,
    to: 10,
    step: 0.1,
    scale: [0,10],
    format: '%s',
    width: document.documentElement.clientWidth*0.5,
    showLabels: true,
    isRange : true,
    ondragend:(d)=>{
        nums=d.split(",")
        reviews_per_month[0]=nums[0];
        reviews_per_month[1]=nums[1];
        showsomedata()
    },
});

$('.range2').jRange('setValue', '0,2');

