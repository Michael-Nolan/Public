package main

import "errors"

// P01
func last[T any](input []T) (T, error) {
	if len(input) == 0 {
		var resp T
		return resp, errors.New("empty list")
	}
	return input[len(input)-1], nil
}

// P02
func secondToLast[T any](input []T) (T, error) {
	if len(input) <= 1 {
		var resp T
		return resp, errors.New("list too small")
	}
	return input[len(input)-2], nil
}

// P03
func getKthElement[T any](input []T, k int) (T, error) {
	if k <= 0 {
		var resp T
		return resp, errors.New("k less than or equal to zero")
	}

	if len(input) <= k {
		var resp T
		return resp, errors.New("list smaller than k")
	}
	return input[k-1], nil
}

// P04
func length[T any](input []T) int {
	return len(input)
	// I suppose you could iterate over the list, and then keep track of the count.
}

// P05
func reverse[T any](input []T) []T {

	resp := make([]T, len(input))
	loc := len(resp) - 1

	for _, x := range input {
		resp[loc] = x
		loc--
	}

	return resp
}

// P06
func isPalindrome[T comparable](input []T) bool {
	left := 0
	right := len(input) - 1

	for left <= right {
		if input[left] != input[right] {
			return false
		}
		left++
		right--
	}

	return true
}

// P07
func flatten() {}

// P08
func eliminateConsecutiveDuplicates() {}

// P09
func packConsecutiveDuplicates() {}

// P10
func runLengthEncoding() {}

// P11
func modifiedRunLengthEncoding() {}

// P12
func decode() {}
