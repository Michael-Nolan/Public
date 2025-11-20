package ninetynineproblems

// P07 - Flatten a nested list.
// Besides []any, there isn't a good type in golang for this problem.
func flattenAny(input []any) []any {
	var resp []any
	for _, n := range input {
		switch v := n.(type) {
		case []any:
			resp = append(resp, flattenAny(v)...)
		case any:
			resp = append(resp, v)
		}
	}

	return resp
}

// P07 - Flatten a nested list.
// Abusing Golang's type system... or at least unidiomatic golang.
func flattenNested[T any](input []Nested[T]) []T {
	var resp []T

	for _, n := range input {
		switch v := n.(type) {
		case List[T]:
			resp = append(resp, flattenNested[T](v.values)...)

		case Single[T]:
			resp = append(resp, v.value)
		}
	}

	return resp
}
