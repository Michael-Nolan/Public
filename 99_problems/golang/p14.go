package ninetynineproblems

// P14 - Duplicate each element.
func duplicate[T any](input []T) []T {
	resp := []T{}

	for _, i := range input {
		resp = append(resp, i, i)
	}

	return resp
}
