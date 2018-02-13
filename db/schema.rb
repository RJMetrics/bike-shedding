# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180208165442) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bike_rides", force: :cascade do |t|
    t.string   "trip_id"
    t.string   "duration"
    t.string   "start_time"
    t.string   "end_time"
    t.string   "start_station"
    t.string   "start_lat"
    t.string   "start_lon"
    t.string   "end_station"
    t.string   "end_lat"
    t.string   "end_lon"
    t.string   "bike_id"
    t.string   "plan_duration"
    t.string   "trip_route_category"
    t.string   "passholder_type"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "date"
  end

  create_table "weather_reports", force: :cascade do |t|
    t.string   "station_identifier"
    t.string   "date"
    t.string   "observation_type"
    t.string   "observation_value"
    t.string   "observation_time"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

end
