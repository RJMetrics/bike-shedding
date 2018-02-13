class BikeRide < ActiveRecord::Base
  def self.per_day
    group(:date).count
  end
end
