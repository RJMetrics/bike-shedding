class CreateBikeRides < ActiveRecord::Migration
  def change
    create_table :bike_rides do |t|
      t.string :trip_id
      t.string :duration
      t.string :start_time
      t.string :end_time
      t.string :start_station
      t.string :start_lat
      t.string :start_lon
      t.string :end_station
      t.string :end_lat
      t.string :end_lon
      t.string :bike_id
      t.string :plan_duration
      t.string :trip_route_category
      t.string :passholder_type
      t.timestamps null: false
    end
  end
end
