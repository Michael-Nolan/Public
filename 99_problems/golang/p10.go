package ninetynineproblems

type RunLengthEncoding[T comparable] struct {
	count int
	value T
}

// P10 - Collapse duplicates into compressed structure
// Differs slightly from the actual problem which calls for [][]any instead of []Encoded
func runLengthEncoding[T comparable](input []T) []RunLengthEncoding[T] {
	resp := []RunLengthEncoding[T]{}

	if len(input) == 0 {
		return resp
	}

	group := RunLengthEncoding[T]{
		value: input[0],
		count: 1,
	}

	for i := 1; i < len(input); i++ {
		if input[i] == input[i-1] {
			group.count++
		} else {
			resp = append(resp, group)
			group = RunLengthEncoding[T]{value: input[i], count: 1}
		}
	}

	resp = append(resp, group)
	return resp
}
