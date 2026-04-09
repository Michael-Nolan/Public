import gleam/list

pub fn is_palindrome(input: List(a)) -> Bool {
  input == list.reverse(input)
}
