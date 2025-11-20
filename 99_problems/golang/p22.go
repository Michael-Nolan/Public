package ninetynineproblems

// P22 - Generate range. either ascending or descending
func rangeGen(start, end int) []int {
	resp := []int{}

	if start <= end {
		for start <= end {
			resp = append(resp, start)
			start++
		}
	} else {
		for end <= start {
			resp = append(resp, start)
			start--
		}
	}

	return resp
}
