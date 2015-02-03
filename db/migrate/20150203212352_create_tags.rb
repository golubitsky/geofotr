class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :label, unique: true, null: false, index: true

      t.timestamps null: false
    end
  end
end
