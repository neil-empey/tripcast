class CreateRoutes < ActiveRecord::Migration[6.1]
  def change
    create_table :routes do |t|
      t.string :place1
      t.string :place2

      t.timestamps
    end
  end
end
