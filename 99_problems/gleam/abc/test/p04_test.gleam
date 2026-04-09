import p04

pub fn p04_test() {
  assert p04.len([]) == 0
  assert p04.len([1]) == 1
  assert p04.len([1, 2, 3, 4, 5]) == 5
}
