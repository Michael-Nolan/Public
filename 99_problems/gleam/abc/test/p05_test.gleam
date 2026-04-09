import p05

pub fn p05_test() {
  assert [] == p05.reverse([])
  assert [1] == p05.reverse([1])
  assert [3, 2, 1] == p05.reverse([1, 2, 3])
}
