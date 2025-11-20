package ninetynineproblems

// P06 - Check if the lits is a palindrome
func isPalindrome[T comparable](input []T) bool {
	left := 0
	right := len(input) - 1

	for left <= right {
		if input[left] != input[right] {
			return false
		}
		left++
		right--
	}

	return true
}
