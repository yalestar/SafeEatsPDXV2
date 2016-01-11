var key = 'yalestar.i3904h2l';

var positionopts = {
  enableHighAccuracy: true,
  timeout: 10000
};

var ourPositionLat;
var ourPositionLong;
var map;
$(document).ready(function() {
  map = L.map('map', key);
  map.setView([45.505, -122.09], 9);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'yalestar.i3904h2l',
    accessToken: 'pk.eyJ1IjoieWFsZXN0YXIiLCJhIjoiZDNlMjJkN2RjYTliNDM3ZjlhYzgzN2RmNThjMGMxMjYifQ.T7R0wlqz6Zd_8WksyktL6g'
  }).addTo(map);

  map.locate();


  $("#getLocation").click(function() {
    if (typeof group !== 'undefined') {
      group.clearLayers();
    }
    map.locate();
  });

  $("#clear").click(function() {
    if (typeof group !== 'undefined') {
      $("#results_block").text("");
      group.clearLayers();
    }
      // map.locate(12);
  });
  map.on('locationerror', function(e) {
    alert(e.message);
  });

  map.on('locationfound', function(e) {
    ourPositionLat = e.latitude;
    ourPositionLong = e.longitude;
    map.setView(e.latlng, 14);
    console.log("lat: " + ourPositionLat);
    console.log("long: " + ourPositionLong);
    var marker = new L.Marker(new L.LatLng(ourPositionLat, ourPositionLong));
    map.addLayer(marker);
  });

  map.on("dragend", function() {
    var newLocation = map.getCenter();
    ourPositionLong = newLocation.lng;
    ourPositionLat = newLocation.lat;
    console.log("lat: " + ourPositionLat);
    console.log("long: " + ourPositionLong);
    // map.clearLayers();
    getItems();
  });
  $("#find").click(function() {
    getItems();
  });
});

function getItems() {
  if (typeof group !== 'undefined') {
      group.clearLayers();
  }

  var group = new L.LayerGroup();
  $.ajax({
    type: "GET",
    url: "/find_nearest",
    // data: "lat=" + ourPositionLat + "&long=" + ourPositionLong,
    success: function(data) {
      debugger;
      var json = $.parseJSON(data);
      var items = $.each(json, function(i, v) {
        var ll = v.loc.reverse();
        var name = v.name;
        var street = v.street;
        var latest = "";
      // console.log(v.inspections.length);
        if (v.inspections.length > 0) {
          latest = v.inspections[0].score
        }
        var pc = name + "<br/>" + street + "<br/>Most Recent Inspection: ";
        pc += "<b><a href='#'>" + latest + "</a></b>";
        var marker = new L.Marker(new L.LatLng(ll[0], ll[1]));
        marker.bindPopup(pc);
        group.addLayer(marker);
        var cls;
        var results_txt = "";

        results_txt += v.name + "<br/>";
        results_txt += v.street + "&nbsp;<a href='#' class='zoomTo'>z</a><br/>";
        results_txt += v.city + "<br/>";
        results_txt += "<span class=" + cls + ">";
        results_txt += "<b>Most Recent Score: " + latest + "</b><br/></span>";
        results_txt += "<hr/>";
        $("#results_block").append(results_txt);
        // TODO: put this in the mongo query
        // return (i != 15);
      });
    map.addLayer(group);
    }
  });
}
