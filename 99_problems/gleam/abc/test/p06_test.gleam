import p06

pub fn is_palindrome_test() {
  assert True == p06.is_palindrome([])
  assert True == p06.is_palindrome([1])
  assert True == p06.is_palindrome([1, 1])
  assert True == p06.is_palindrome([1, 2, 1])
  assert False == p06.is_palindrome([1, 2])
  assert False == p06.is_palindrome([1, 2, 3])
}
