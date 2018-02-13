require 'csv'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
CSV.foreach("indego-2017-q4.csv", {
  encoding: "UTF-8",
  headers: true,
  header_converters: :symbol,
  converters: :all
}) do |row|
  BikeRide.create(row.to_hash)
  print '.'
end
#

CSV.foreach("phl_weather_new.csv", {
  encoding: "UTF-8",
  headers: true,
  header_converters: :symbol,
  converters: :all
}) do |row|
  WeatherReport.create(row.to_hash.slice(:station_identifier, :date, :observation_type, :observation_value))
  print '.'
end
