package ninetynineproblems

import (
	"math/rand"
	"time"
	"sort"
)

// P01
func last[T any](input []T) (T, error) {
	if len(input) == 0 {
		var resp T
		return resp, ErrEmptyList
	}
	return input[len(input)-1], nil
}

// P02
func secondToLast[T any](input []T) (T, error) {
	if len(input) <= 1 {
		var resp T
		return resp, ErrListTooSmall
	}
	return input[len(input)-2], nil
}

// P03
func getKthElement[T any](input []T, k int) (T, error) {
	if k <= 0 {
		var resp T
		return resp, ErrKNonPositive
	}

	if k > len(input) {
		var resp T
		return resp, ErrListSmallerThanK
	}
	return input[k-1], nil
}

// P04
func sliceLen[T any](input []T) int {
	return len(input)
}

func linkedListLen[T any](input *LinkedList[T]) int {
	length := 0

	for input != nil {
		length++
		input = input.next
	}

	return length
}

type LinkedList[T any] struct {
	value T
	next *LinkedList[T]
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
	if len(input) == 0 {
		return nil
	}

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

	if len(group) > 0 {
		resp = append(resp, group)
	}

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

// P12
func decode[T any](input []any) []T {
	resp := []T{}

	if len(input) == 0 {
		return resp
	}

	for idx := 0; idx < len(input); idx++ {
		switch v := input[idx].(type) {
		case []any:
			for cnt := v[0].(int); cnt > 0; cnt-- {
				resp = append(resp, v[1].(T))
			}
		case T:
			resp = append(resp, v)
		}
	}

	return resp
}

// P13
func modifiedRunLengthEncodingDirect(input []any) []any {
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
			if curCount > 1 {
				resp = append(resp, []any{curCount, curValue})
			} else {
				resp = append(resp, curValue)
			}

			curCount = 1
			curValue = input[idx]
		}
	}
	if curCount > 1 {
		resp = append(resp, []any{curCount, curValue})
	} else {
		resp = append(resp, curValue)
	}

	return resp
}

// P14
func duplicate[T any](input []T) []T {
	resp := []T{}

	for _, i := range input {
		resp = append(resp, i, i)
	}

	return resp
}

// P15
func replicate[T any](input []T, count int) []T {
	resp := []T{}

	for _, i := range input {
		for cnt := 0; cnt < count; cnt++ {
			resp = append(resp, i)
		}

	}

	return resp
}

// P16
func dropNth[T any](input []T, x int) []T {
	resp := []T{}

	for idx, v := range input {
		if ((idx + 1) % x) != 0 {
			resp = append(resp, v)
		}
	}

	return resp
}

// P17
func split[T any](input []T, x int) ([]T, []T) {
	return input[0:x], input[x:]
}

// P18
func slice[T any](input []T, start int, end int) []T {
	return input[start:end]
}

// P19
func rotate[T any](input []T, x int) []T {
	x = x % len(input)
	resp := []T{}

	for idx := x; idx < len(input); idx++ {
		resp = append(resp, input[idx])
	}

	for idx := 0; idx < x; idx++ {
		resp = append(resp, input[idx])
	}

	return resp
}

// P20
func removeKth[T any](input []T, x int) []T {
	resp := []T{}

	for idx, v := range input {
		if idx+1 != x {
			resp = append(resp, v)
		}
	}

	return resp
}

// P21
func insertAt[T any](e T, input []T, loc int) []T {
	resp := []T{}

	for idx, x := range input {
		if idx == loc {
			resp = append(resp, e)
		}

		resp = append(resp, x)
	}

	return resp
}

// P22
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


func rndSelect[T any](input []T, count int) []T {
	if count <= 0 || len(input) == 0 {
		return nil
	}

	if count >= len(input) {
		out := append([]T(nil), input...)
		r := rand.New(rand.NewSource(time.Now().UnixNano()))
		r.Shuffle(len(out), func(i, j int) { out[i], out[j] = out[j], out[i] })
		return out
	}

	out := append([]T(nil), input...)
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	r.Shuffle(len(out), func(i, j int) { out[i], out[j] = out[j], out[i] })
	return out[:count]
}

func lottoSelect(count int, upperBounds int) []int {
	if upperBounds <= 0 || count <= 0 {
		return nil
	}

	resp := make([]int, 0, count)
	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	for ; count > 0; count-- {
		resp = append(resp, r.Intn(upperBounds))
	}

	return resp
}

func rndPermu[T any](input []T) []T {
	out := append([]T(nil), input...)
	rand.Shuffle(len(out), func(i, j int) {
		out[i], out[j] = out[j], out[i]
	})

	return out
}

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

func group3[T comparable](input [9]T) [][][]T {
	return group(input[:], []int{2, 3, 4})
}

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

// Sort the arrays by their length
func lsort[T any](input [][]T) [][]T {
	sort.Slice(input, func(i, j int) bool {
		return len(input[i]) < len(input[j])
	})

	return input
}

// Sort the arrays by the frequency of their lengths
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
