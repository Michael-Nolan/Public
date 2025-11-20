package ninetynineproblems

// P09 - Collect consecutive duplicates into a sub list.
func packConsecutiveDuplicates[T comparable](input []T) [][]T {
	if len(input) == 0 {
		return nil
	}

	var resp [][]T
	var group []T

	for idx, item := range input {
		if idx == 0 || input[idx] == input[idx-1] {
			group = append(group, item)
		} else {
			resp = append(resp, group)
			group = []T{item}
		}
	}

	if len(group) > 0 {
		resp = append(resp, group)
	}

	return resp
}
