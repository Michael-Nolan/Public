package ninetynineproblems

// P02 - return the second to last element.
func secondToLast[T any](input []T) (T, error) {
	if len(input) <= 1 {
		var resp T
		return resp, ErrFailedPrecondition
	}
	return input[len(input)-2], nil
}
