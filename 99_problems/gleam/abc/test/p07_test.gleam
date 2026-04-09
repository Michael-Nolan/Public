import p07

pub fn flatten_any_test() {
  let input = [
    p07.Many([p07.Elem(1)]),
    p07.Elem(2),
    p07.Elem(3),
    p07.Many([p07.Many([p07.Elem(4)]), p07.Many([p07.Elem(5)]), p07.Elem(6)]),
  ]

  assert [1, 2, 3, 4, 5, 6] == p07.flatten(input)
}
