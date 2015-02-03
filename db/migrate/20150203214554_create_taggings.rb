class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null: false, index: true
      t.integer :photo_id, null: false, index: true

      t.timestamps null: false
    end

    add_index "taggings", ["tag_id", "photo_id"], unique: true
  end
end
