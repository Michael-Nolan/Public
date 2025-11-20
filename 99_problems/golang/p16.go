package ninetynineproblems

// P16 - Drop every nth element
func dropNth[T any](input []T, x int) []T {
	resp := []T{}

	for idx, v := range input {
		if ((idx + 1) % x) != 0 {
			resp = append(resp, v)
		}
	}

	return resp
}
