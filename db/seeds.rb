5.times do |i|
  Task.create(
    name: "Task #{i + 1}",
    deadline: "2021-12-21"
  )
end
