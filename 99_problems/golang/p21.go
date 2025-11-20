package ninetynineproblems

// P21 - Insert element into list
func insertAt[T any](e T, input []T, loc int) []T {
	resp := []T{}

	for idx, x := range input {
		if idx == loc {
			resp = append(resp, e)
		}

		resp = append(resp, x)
	}

	return resp
}
