package ninetynineproblems

// P11 - Collapse duplicates into compressed structure. Omit length if it is 1.
func modifiedRunLengthEncoding(input []any) []any {
	resp := []any{}

	dupList := packConsecutiveDuplicates(input)

	for _, x := range dupList {
		if len(x) > 1 {
			resp = append(resp, []any{len(x), x[0]})
		} else {
			resp = append(resp, x[0])
		}
	}

	return resp
}
