package ninetynineproblems

// P13 - Collapse duplicates without creating intermediate sub lists.
func modifiedRunLengthEncodingDirect(input []any) []any {
	resp := []any{}

	if len(input) == 0 {
		return resp
	}

	curValue := input[0]
	curCount := 1

	for idx := 1; idx < len(input); idx++ {
		if input[idx] == curValue {
			curCount++
		} else {
			if curCount > 1 {
				resp = append(resp, []any{curCount, curValue})
			} else {
				resp = append(resp, curValue)
			}

			curCount = 1
			curValue = input[idx]
		}
	}
	if curCount > 1 {
		resp = append(resp, []any{curCount, curValue})
	} else {
		resp = append(resp, curValue)
	}

	return resp
}
