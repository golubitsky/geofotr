class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :follower_id, null: false, index: true
      t.integer :followee_id, null: false, index: true
      t.timestamps null: false
    end

    add_index "subscriptions", ["follower_id", "followee_id"], unique: true
  end
end
