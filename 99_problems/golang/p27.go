package ninetynineproblems

// P27a - Find all ways to Group 9 items into 3 groups of 2, 3, and 4
func group3[T comparable](input [9]T) [][][]T {
	return group(input[:], []int{2, 3, 4})
}

// P27b - Find all ways to Group the elements of a list in to groupSizes
func group[T comparable](input []T, groupSizes []int) [][][]T {
	return groupInner(input, groupSizes, 0, [][]T{})
}

// Lots of array copying going on here. We would ideally want to do something like:
// 1. append (before loop). 2. backtrack. 3. removeLast(after loop).
func groupInner[T comparable](input []T, groupSizes []int, sizeLoc int, row [][]T) [][][]T {
	resp := [][][]T{}

	if sizeLoc == len(groupSizes) {
		resp = append(resp, row)
		return resp
	}

	combos := combination(groupSizes[sizeLoc], input)
	for _, combo := range combos {
		m := updateMap(map[T]bool{}, combo)

		remaining := calc(input, m)

		newRow := [][]T{}
		newRow = append(newRow, row...)
		newRow = append(newRow, combo)

		resp = append(resp, groupInner(remaining, groupSizes, sizeLoc+1, newRow)...)
	}

	return resp
}

func updateMap[T comparable](isUsed map[T]bool, used []T) map[T]bool {
	for _, k := range used {
		isUsed[k] = true
	}

	return isUsed
}

func calc[T comparable](input []T, isUsed map[T]bool) []T {
	resp := []T{}

	for _, k := range input {
		if !isUsed[k] {
			resp = append(resp, k)
		}
	}

	return resp
}
