class Route < ApplicationRecord
  include HTTParty
  # validates :dt, :lat1, :long1, :lat2, :long2, presence: true
  validates :dt, :place1, :place2, presence: true

    def directions

    # place1 = "#{self.lat1}, #{self.long1}"
    # puts place1
    # place2 = "#{self.lat2}, #{self.long2}"

    place1 = self.place1
    place2 = self.place2

    url = "http://www.mapquestapi.com/directions/v2/route?key=#{Rails.application.credentials.route[:consumer_key]}&from=#{place1}&to=#{place2}"

    response = HTTParty.get(url)

    array = response.parsed_response["route"]["legs"][0]["maneuvers"]
    time = DateTime.now.to_s(:time)
    routeTime = response.parsed_response["route"]["formattedTime"]

    setOfDirections = array.map {|x| x["narrative"]}

    #OpenWeatherApi example call response = HTTParty.get("https://api.openweathermap.org/data/2.5/onecall?lat=43.6166163&lon=-116.200886&units=imperial&exclude=minutely,daily&appid=#{Rails.application.credentials.weather[:secret_key]}")

    setOfCoordinates = array.map.with_index {|x, i| x["startPoint"]}

    puts setOfCoordinates

    weather = setOfCoordinates.map {|x| HTTParty.get("https://api.openweathermap.org/data/2.5/onecall?lat=#{x["lat"]}&lon=#{x["lng"]}&units=imperial&exclude=minutely,hourly,alerts&appid=#{Rails.application.credentials.weather[:secret_key]}") }

    #response.parsed_response["current"]["temp"]

    weatherDirections = {routeWeather: weather, routeDirections: setOfDirections}

    weatherDirections

    end

end
