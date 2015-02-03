class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :user_id, null: false, index: true
      t.integer :photo_id, null: false, index: true

      t.timestamps null: false
    end

    add_index "likes", ["user_id", "photo_id"], unique: true
  end
end
