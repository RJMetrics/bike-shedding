require 'csv'

CSV.foreach("indego-2017-q4.csv", {
  encoding: "UTF-8",
  headers: true,
  header_converters: :symbol,
  converters: :all
}) do |row|
  BikeRide.create(row.to_hash)
end
#

CSV.foreach("phl_weather_new.csv", {
  encoding: "UTF-8",
  headers: true,
  header_converters: :symbol,
  converters: :all
}) do |row|
  WeatherReport.create(row.to_hash.slice(:station_identifier, :date, :observation_type, :observation_value))
end
