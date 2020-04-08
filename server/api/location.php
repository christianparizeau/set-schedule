<?php
require_once "_keys.php";
//For development, place your Google Places and Yelp API keys in a _keys.php file in this folder
if($request['method'] ==='GET'){
  $location = $request['query']['location'];
  $term = $request['query']['term'];
  if($request['query']['distance'] > 25) {
    throw new ApiError("Distance must be 25 miles or lower");
  };
  $distance_in_meters = $request['query']['distance'] * 1600;
  $lat_lng = get_lat_lng($maps_API_key, $location);
  $yelp_data = get_places($yelp_API_key, $term,$lat_lng, $distance_in_meters);
  $response['body'] = $yelp_data -> businesses;
  send($response);
}

function get_lat_lng($maps_API_key, $location){
  $ch = curl_init();
  $options = [
    CURLOPT_URL => 'https://maps.googleapis.com/maps/api/geocode/json'
      ."?key=$maps_API_key&"
      ."components=postal_code:$location",
    CURLOPT_HTTPGET => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_RETURNTRANSFER => true
  ];
  curl_setopt_array($ch,$options);
  $data= json_decode(curl_exec($ch));
  $error = curl_error($ch);
  curl_close($ch);
  if (!$data -> results) { throw new ApiError("$location not found", 404); }
  return $error ? $error : $data -> results[0] -> geometry -> location;
}

  function get_places($yelp_API_key, $term,$lat_lng,$distance){
    $ch = curl_init();
    $lat = $lat_lng -> lat;
    $lng = $lat_lng -> lng;
    $options = [
    CURLOPT_URL => "https://api.yelp.com/v3/businesses/search"
    ."?term=".urlencode($term)."&"
    ."latitude=$lat&"
    ."longitude=$lng&"
    ."radius=$distance",
    CURLOPT_HTTPGET => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array(
      "Authorization: Bearer $yelp_API_key"
    )
  ];
  curl_setopt_array($ch,$options);
  $data= json_decode(curl_exec($ch));
  $error = curl_error($ch);
  curl_close($ch);
  if (!$data) { throw new ApiError("No Buisnesses found", 404); }
  return $error ? $error : $data;
  }

  function format_response($yelp_response){

  }
