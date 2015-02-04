class Removeurlfromphotos < ActiveRecord::Migration
  def change
    remove_column :photos, :url
  end
end
