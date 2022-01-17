class Route < ApplicationRecord
  include HTTParty
  include Cloudinary
  require 'json'
  require 'net/http'
  require 'uri'
  # validates :dt, :lat1, :long1, :lat2, :long2, presence: true
  validates :place1, :place2, presence: true

    def directions

    # place1 = "#{self.lat1}, #{self.long1}"
    # puts place1
    # place2 = "#{self.lat2}, #{self.long2}"

    place1 = self.place1
    place2 = self.place2

    url = "http://www.mapquestapi.com/directions/v2/route?key=#{ENV.fetch("consumer_key")}&from=#{place1}&to=#{place2}"

    mapUrl = "https://www.mapquestapi.com/staticmap/v5/map?start=#{place1}|flag-start&end=#{place2}|flag-end&size=@2x&key=#{ENV.fetch("consumer_key")}"

    puts mapUrl

    response = HTTParty.get(url)
    response3 = HTTParty.get(mapUrl)

    puts response3

    # options = {
    #   body: mapUrl,
    #   headers: {
    #     'content-type': 'application/json'
    #   },
    #   method: 'POST'
    # }

    response2 = HTTParty.post("https://api.cloudinary.com/v1_1/#{ENV.fetch('cloud_name')}/#{mapUrl}/tripcast")

# uri = URI.parse("https://api.cloudinary.com/v1_1/")
# request = Net::HTTP::Post.new(uri)
# request.set_form_data(
#   "cloud name" => "#{ENV.fetch("cloud_name")}",
#   "resource_type" => "auto",
#   "file" => "https://www.mapquestapi.com/staticmap/v5/map?start=#{place1}|flag-start&end=#{place2}|flag-end&size=@2x&key=#{ENV.fetch("consumer_key")}",
#   "upload_preset" => "tripcast"
# )
#
# req_options = {
#   use_ssl: uri.scheme == "https",
# }
#
# response2 = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end
    puts response2

    array = response.parsed_response["route"]["legs"][0]["maneuvers"]
    time = DateTime.now.to_s(:time)
    routeTime = response.parsed_response["route"]["formattedTime"]

    setOfDirections = array.map {|x| x["narrative"]}

    #OpenWeatherApi example call response = HTTParty.get("https://api.openweathermap.org/data/2.5/onecall?lat=43.6166163&lon=-116.200886&units=imperial&exclude=minutely,daily&appid=#{Rails.application.credentials.weather[:secret_key]}")

    setOfCoordinates = array.map.with_index {|x, i| x["startPoint"]}

    puts setOfCoordinates

    weather = setOfCoordinates.map {|x| HTTParty.get("https://api.openweathermap.org/data/2.5/onecall?lat=#{x["lat"]}&lon=#{x["lng"]}&units=imperial&exclude=minutely,hourly&appid=#{ENV.fetch("secret_key")}") }

    #response.parsed_response["current"]["temp"]

    weatherDirections = {routeWeather: weather, routeDirections: setOfDirections, map: response3}

    weatherDirections

    end

end


# class Route < ApplicationRecord
#   include HTTParty
#   # validates :dt, :lat1, :long1, :lat2, :long2, presence: true
#   validates :place1, :place2, presence: true
#
#     def directions
#
#     # place1 = "#{self.lat1}, #{self.long1}"
#     # puts place1
#     # place2 = "#{self.lat2}, #{self.long2}"
#
#     place1 = self.place1
#     place2 = self.place2
#
#     url = "http://www.mapquestapi.com/directions/v2/route?key=#{ENV.fetch("consumer_key")}&from=#{place1}&to=#{place2}"
#
#     response = HTTParty.get(url)
#
#     array = response.parsed_response["route"]["legs"][0]["maneuvers"]
#     time = DateTime.now.to_s(:time)
#     routeTime = response.parsed_response["route"]["formattedTime"]
#
#     setOfDirections = array.map {|x| x["narrative"]}
#
#     #OpenWeatherApi example call response = HTTParty.get("https://api.openweathermap.org/data/2.5/onecall?lat=43.6166163&lon=-116.200886&units=imperial&exclude=minutely,daily&appid=#{Rails.application.credentials.weather[:secret_key]}")
#
#     setOfCoordinates = array.map.with_index {|x, i| x["startPoint"]}
#
#     puts setOfCoordinates
#
#     weather = setOfCoordinates.map {|x| HTTParty.get("https://api.openweathermap.org/data/2.5/onecall?lat=#{x["lat"]}&lon=#{x["lng"]}&units=imperial&exclude=minutely,hourly,alerts&appid=#{ENV.fetch("secret_key")}") }
#
#     #response.parsed_response["current"]["temp"]
#
#     weatherDirections = {routeWeather: weather, routeDirections: setOfDirections}
#
#     weatherDirections
#
#     end
#
# end
