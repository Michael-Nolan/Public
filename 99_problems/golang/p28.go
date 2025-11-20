package ninetynineproblems

import "sort"

// P28a - Sort the arrays by their length
func lsort[T any](input [][]T) [][]T {
	sort.Slice(input, func(i, j int) bool {
		return len(input[i]) < len(input[j])
	})

	return input
}

// P28b - Sort the arrays by the frequency of their lengths
func lfsort[T any](input [][]T) [][]T {
	frequencyOfLengthsMap := map[int]int{}

	// Find out how many times each length occurs.
	for _, x := range input {
		frequencyOfLengthsMap[len(x)] = frequencyOfLengthsMap[len(x)] + 1
	}

	tupleList := []tuple[T]{}

	for _, elem := range input {
		tupleList = append(tupleList, tuple[T]{
			list: elem,
			freq: frequencyOfLengthsMap[len(elem)],
		})
	}

	sort.Slice(tupleList, func(i, j int) bool {
		return tupleList[i].freq < tupleList[j].freq
	})

	for idx, tuple := range tupleList {
		input[idx] = tuple.list
	}

	return input
}

type tuple[T any] struct {
	list []T
	freq int
}
