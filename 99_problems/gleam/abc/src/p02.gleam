pub fn second_to_last(input: List(a)) -> Result(a, Nil) {
  case input {
    [] -> Error(Nil)
    [x, _] -> Ok(x)
    [_, ..rest] -> second_to_last(rest)
  }
}
