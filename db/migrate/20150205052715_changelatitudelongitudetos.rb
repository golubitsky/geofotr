class Changelatitudelongitudetos < ActiveRecord::Migration
  def change
    change_column(:photos, :latitude, :string)
    change_column(:photos, :longitude, :string)
  end
end
