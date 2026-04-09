import p03

pub fn p03_test() {
  assert p03.get_kth_element([1, 2, 3, 4], -1) == Error(Nil)
  assert p03.get_kth_element([1, 2, 3, 4], 0) == Ok(1)
  assert p03.get_kth_element([1, 2, 3, 4], 1) == Ok(2)
  assert p03.get_kth_element([1, 2, 3, 4], 2) == Ok(3)
  assert p03.get_kth_element([1, 2, 3, 4], 3) == Ok(4)
  assert p03.get_kth_element([1, 2, 3, 4], 4) == Error(Nil)
}
