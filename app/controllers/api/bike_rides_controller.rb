module Api
  class BikeRidesController < ApplicationController
    def index
      @bike_rides = BikeRide.all
      if params[:count]
        render json: @bike_rides.per_day
      elsif params[:date]
        render json: @bike_rides.where(date: params[:date]).limit(params[:limit])
      end
    end
  end
end
