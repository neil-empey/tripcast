class RoutesController < ApplicationController
  include HTTParty
  before_action :set_route, only: [:show, :update, :destroy]


  def index
    @routes = Route.all

    render json: @routes
  end


  def show
    render json: @route
  end


  def update
    if @route.update(route_params)
      render json: @route
    else
      render json: @route.errors, status: :unprocessable_entity
    end
  end


  def destroy
    @route.destroy
  end

  def create

    # url1 = "https://app.geocodeapi.io/api/v1/search?apikey=#{Rails.application.credentials.geo[:key]}&text=#{params["destinations"]["origin"]}"
    #
    # url2 = "https://app.geocodeapi.io/api/v1/search?apikey=#{Rails.application.credentials.geo[:key]}&text=#{params["destinations"]["dest"]}"
    #
    # response1 = HTTParty.get(url1)
    # response2 = HTTParty.get(url2)
    # coorArray1 = response1.parsed_response["features"][0]["geometry"]["coordinates"]
    # coorArray2 = response2.parsed_response["features"][0]["geometry"]["coordinates"]
    # lat2 = coorArray2[1]
    # long2 = coorArray2[0]
    # lat1 = coorArray1[1]
    # long1 = coorArray1[0]
    place1 = params["destinations"]["origin"]
    place2 = params["destinations"]["dest"]
    dt = Time.now.to_i

    # route_params = {dt: dt, lat1: lat1, long1: long1, lat2: lat2, long2: long2}

    route_params = {dt: dt, place1: place1, place2: place2}

    @route = Route.new(route_params)


    if @route.save
      directionList = @route.directions
      render json: directionList
    else
      render json: "didn't process"
    end
  end

  private

  def route_params
    params.require(:routes).permit()
  end
end
