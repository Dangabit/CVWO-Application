class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description
      t.date :deadline, null: false
      t.boolean :status, default: "false"
      t.string :tags, array: true

      t.timestamps
    end
  end
end
