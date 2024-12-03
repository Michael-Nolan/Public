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
// Besides []any, there isn't a good type in golang for this problem.
func flatten_1(input []any) []any {
	var resp []any
	for _, n := range input {
		switch v := n.(type) {
		case []any:
			resp = append(resp, flatten_1(v)...)
		case any:
			resp = append(resp, v)

		default:
			panic("error")
		}
	}

	return resp
}

// Abusing Golang's type system... or at least unidiomatic golang.
func flatten_2[T any](input []Nested[T]) []T {
	var resp []T

	for _, n := range input {
		switch v := n.(type) {
		case List[T]:
			resp = append(resp, flatten_2[T](v.values)...)

		case Single[T]:
			resp = append(resp, v.value)
		}
	}

	return resp
}

// P08
func eliminateConsecutiveDuplicates[T comparable](input []T) []T {
	var resp []T

	for _, item := range input {
		if len(resp) == 0 {
			resp = append(resp, item)
		} else {
			if resp[len(resp)-1] != item {
				resp = append(resp, item)
			}
		}
	}

	return resp
}

// P09
func packConsecutiveDuplicates[T comparable](input []T) [][]T {
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

	resp = append(resp, group)

	return resp
}

// P10
func runLengthEncoding[T comparable](input []T) []Encoded[T] {
	resp := []Encoded[T]{}

	if len(input) == 0 {
		return resp
	}

	group := Encoded[T]{
		value: input[0],
		count: 1,
	}

	for i := 1; i < len(input); i++ {
		if input[i] == input[i-1] {
			group.count++
		} else {
			resp = append(resp, group)
			group = Encoded[T]{value: input[i], count: 1}
		}
	}

	resp = append(resp, group)
	return resp
}

type Encoded[T comparable] struct {
	count int
	value T
}

// P11
func modifiedRunLengthEncoding(input []any) []any {
	resp := []any{}

	if len(input) == 0 {
		return resp
	}

	curValue := input[0]
	curCount := 1

	for idx := 1; idx < len(input); idx++ {
		if input[idx] == curValue {
			curCount++
		} else {
			resp = append(resp, []any{curCount, curValue})
			curCount = 1
			curValue = input[idx]
		}
	}
	resp = append(resp, []any{curCount, curValue})

	return resp
}

// P12
func decode() {}
