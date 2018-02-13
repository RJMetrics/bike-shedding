class WeatherReport < ActiveRecord::Base
  def self.per_day
    where(observation_type: 'TMAX')
  end
end
