class CreateGraphs < ActiveRecord::Migration
  def change
    create_table :graphs do |t|
      t.text :text
      t.string :img
      t.string :cls
      t.string :style
      t.references :wall, index: true

      t.timestamps
    end
  end
end
