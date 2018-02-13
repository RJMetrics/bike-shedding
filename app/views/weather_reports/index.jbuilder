json.weather_reports
  json.array! @weather_reports do |weather_report|
    json.partial! 'weather_report', weather_report: weather_report
  end
