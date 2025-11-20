package ninetynineproblems

// P15 - Duplicate each element x times.
func replicate[T any](input []T, count int) []T {
	resp := []T{}

	for _, i := range input {
		for cnt := 0; cnt < count; cnt++ {
			resp = append(resp, i)
		}

	}

	return resp
}
