class AddUserRefToWalls < ActiveRecord::Migration
  def change
    add_reference :walls, :user, index: true
  end
end
