class CreateWeatherReports < ActiveRecord::Migration
  def change
    create_table :weather_reports do |t|
      t.string :station_identifier
      t.string :date
      t.string :observation_type
      t.string :observation_value
      t.string :observation_time
      t.timestamps null: false
    end
  end
end
