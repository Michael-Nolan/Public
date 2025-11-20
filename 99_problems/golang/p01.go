package ninetynineproblems

// P01 - return the last element of a list.
func last[T any](input []T) (T, error) {
	if len(input) == 0 {
		var resp T
		return resp, ErrFailedPrecondition
	}
	return input[len(input)-1], nil
}
