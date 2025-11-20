package ninetynineproblems

// P17 - Split a list at point x
func split[T any](input []T, x int) ([]T, []T) {
	return input[0:x], input[x:]
}
