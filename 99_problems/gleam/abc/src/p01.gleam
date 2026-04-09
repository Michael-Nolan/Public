// P01 - return the last element of a list.
pub fn last(input: List(a)) -> Result(a, Nil) {
  case input {
    [] -> Error(Nil)
    [x] -> Ok(x)
    [_, ..rest] -> last(rest)
  }
}
