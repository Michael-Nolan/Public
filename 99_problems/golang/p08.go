package ninetynineproblems

// P08 - Remove consecutive duplicates.
func eliminateConsecutiveDuplicates[T comparable](input []T) []T {
	var resp []T

	for _, item := range input {
		if len(resp) == 0 {
			resp = append(resp, item)
		} else {
			if resp[len(resp)-1] != item {
				resp = append(resp, item)
			}
		}
	}

	return resp
}
