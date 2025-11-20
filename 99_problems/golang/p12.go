package ninetynineproblems

// P12 - Uncompress output from P11
func decode[T any](input []any) []T {
	resp := []T{}

	if len(input) == 0 {
		return resp
	}

	for idx := 0; idx < len(input); idx++ {
		switch v := input[idx].(type) {
		case []any:
			for cnt := v[0].(int); cnt > 0; cnt-- {
				resp = append(resp, v[1].(T))
			}
		case T:
			resp = append(resp, v)
		}
	}

	return resp
}
