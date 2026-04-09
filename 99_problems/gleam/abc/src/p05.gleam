pub fn reverse(input: List(a)) -> List(a) {
  inner(input, [])
}

fn inner(input: List(a), acc: List(a)) -> List(a) {
  case input {
    [] -> acc
    [x, ..rest] -> inner(rest, [x, ..acc])
  }
}
