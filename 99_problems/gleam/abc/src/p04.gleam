pub fn len(input: List(a)) -> Int {
  case input {
    [] -> 0
    [_, ..rest] -> 1 + len(rest)
  }
}
