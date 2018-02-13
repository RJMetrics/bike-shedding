class WeatherReportsController < ApplicationController
  def index
    @weather_reports = WeatherReport.per_day
    # This is a little nonstandard, but we're only interested in Q4 data here.
    dates = BikeRide.pluck(:date).uniq
    render json: @weather_reports.where(date: dates).to_json
  end
end
