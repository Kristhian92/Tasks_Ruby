class AddTitleToFeatures < ActiveRecord::Migration[7.1]
  def change
    add_column :features, :title, :string
  end
end
