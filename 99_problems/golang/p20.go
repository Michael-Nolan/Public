package ninetynineproblems

// P20 - remove the kth element
func removeKth[T any](input []T, x int) []T {
	resp := []T{}

	for idx, v := range input {
		if idx+1 != x {
			resp = append(resp, v)
		}
	}

	return resp
}
