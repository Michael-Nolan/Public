package ninetynineproblems

// P03 - return the kth element of he list.
func getKthElement[T any](input []T, k int) (T, error) {
	if k <= 0 {
		var resp T
		return resp, ErrFailedPrecondition
	}

	if k > len(input) {
		var resp T
		return resp, ErrFailedPrecondition
	}
	return input[k-1], nil
}
