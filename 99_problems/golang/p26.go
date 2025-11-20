package ninetynineproblems

// P26 - Generate all combinations k chosen from n elements.
func combination[T any](size int, input []T) [][]T {
	resp := [][]T{}
	cur := []T{}

	for start := 0; start < len(input); start++ {
		backtrack(input, cur, &resp, start, size)
	}

	return resp
}

// TODO - Investigate how Go handles Slice/Array copying.
// Ideally we would want to do something like:
// 1. append (before loop). 2. backtrack. 3. removeLast(after loop).
func backtrack[T any](input []T, cur []T, ans *[][]T, start int, size int) {
	cur = append(cur, input[start])

	if len(cur) == size {
		*ans = append(*ans, append([]T(nil), cur...))
		return
	}

	for next := start + 1; next < len(input); next++ {
		backtrack(input, cur, ans, next, size)
	}
}
