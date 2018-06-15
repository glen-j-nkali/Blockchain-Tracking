class CreateProducts < ActiveRecord::Migration[5.1]
  def self.up
    create_table :products do |t|
      t.string :merchant, null: false
      t.string :metadata, null: false
      t.timestamps
    end
  end

  def self.down
    drop_table :products
  end
end
