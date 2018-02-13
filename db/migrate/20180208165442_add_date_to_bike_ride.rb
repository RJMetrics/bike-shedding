class AddDateToBikeRide < ActiveRecord::Migration
  def change
    add_column :bike_rides, :date, :string

    reversible do |dir|

      dir.up do
        BikeRide.all.each do |bike_ride|
          bike_ride.update(date: bike_ride.start_time.to_date.iso8601)
        end
      end

    end
  end
end
