pub fn get_kth_element(input: List(a), k: Int) -> Result(a, Nil) {
  case input, k {
    _, k if k < 0 -> Error(Nil)
    [x, ..], 0 -> Ok(x)
    [], _ -> Error(Nil)
    [_, ..rest], _ -> get_kth_element(rest, k - 1)
  }
}
