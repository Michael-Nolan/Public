package ninetynineproblems

// P05 - Reverse the list.
func reverse[T any](input []T) []T {
	resp := make([]T, len(input))
	loc := len(resp) - 1

	for _, x := range input {
		resp[loc] = x
		loc--
	}

	return resp
}
