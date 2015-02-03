class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :user_id, index: true
      t.string :url, null: false
      t.string :caption
      t.string :visibility, default: "public"
      t.decimal :latitude, { precision: 10, scale: 6 }
      t.decimal :longitude, { precision: 10, scale: 6 }
      t.timestamps null: false
    end
  end
end
