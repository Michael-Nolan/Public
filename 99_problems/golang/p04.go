package ninetynineproblems

// P04 - Return the length of the list.
func sliceLen[T any](input []T) int {
	return len(input)
}

// P04 - Return the length of the list.
func linkedListLen[T any](input *LinkedList[T]) int {
	length := 0

	for input != nil {
		length++
		input = input.next
	}

	return length
}
