package ninetynineproblems

// P18 - Return a sublist.
func slice[T any](input []T, start int, end int) []T {
	return input[start:end]
}
