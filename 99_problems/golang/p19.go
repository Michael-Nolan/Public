package ninetynineproblems

// P19 - Rotate the list x places.
func rotate[T any](input []T, x int) []T {
	x = x % len(input)
	resp := []T{}

	for idx := x; idx < len(input); idx++ {
		resp = append(resp, input[idx])
	}

	for idx := 0; idx < x; idx++ {
		resp = append(resp, input[idx])
	}

	return resp
}
