class CreateWalls < ActiveRecord::Migration
  def change
    create_table :walls do |t|
      t.string :name
      t.text :description
      t.string :background

      t.timestamps
    end
  end
end
