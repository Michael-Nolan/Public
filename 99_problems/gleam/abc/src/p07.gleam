import gleam/list

pub type Nested(a) {
  Elem(a)
  Many(List(Nested(a)))
}

pub fn flatten(input: List(Nested(a))) -> List(a) {
  list.flat_map(input, fn(item) {
    case item {
      Elem(a) -> [a]
      Many(xs) -> flatten(xs)
    }
  })
}
