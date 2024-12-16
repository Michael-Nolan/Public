package main

import (
	"errors"
	"fmt"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestP01(t *testing.T) {
	tests := []struct {
		name        string
		input       []string
		expected    string
		expectedErr error
	}{
		{
			name:     "ok",
			input:    []string{"a", "b", "c"},
			expected: "c",
		},
		{
			name:        "empty list",
			input:       []string{},
			expected:    "",
			expectedErr: errors.New("empty list"),
		},
		{
			name:        "nil list",
			input:       nil,
			expected:    "",
			expectedErr: errors.New("empty list"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := last(tt.input)
			assert.Equal(t, tt.expected, resp)
			assert.Equal(t, tt.expectedErr, err)
		})
	}
}

func TestP02(t *testing.T) {
	tests := []struct {
		name        string
		input       []string
		expected    string
		expectedErr error
	}{
		{
			name:     "ok",
			input:    []string{"a", "b", "c"},
			expected: "b",
		},
		{
			name:        "1 element list",
			input:       []string{"a"},
			expected:    "",
			expectedErr: errors.New("list too small"),
		},
		{
			name:        "empty list",
			input:       []string{},
			expected:    "",
			expectedErr: errors.New("list too small"),
		},
		{
			name:        "nil list",
			input:       nil,
			expected:    "",
			expectedErr: errors.New("list too small"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := secondToLast(tt.input)
			assert.Equal(t, tt.expected, resp)
			assert.Equal(t, tt.expectedErr, err)
		})
	}
}

func TestP03(t *testing.T) {
	tests := []struct {
		name        string
		input       []string
		k           int
		expected    string
		expectedErr error
	}{
		{
			name:     "ok",
			input:    []string{"a", "b", "c"},
			k:        2,
			expected: "b",
		},
		{
			name:        "k is zero",
			input:       []string{"a", "b"},
			k:           0,
			expected:    "",
			expectedErr: errors.New("k less than or equal to zero"),
		},
		{
			name:        "k is greater than list length",
			input:       []string{"a", "b"},
			k:           5,
			expected:    "",
			expectedErr: errors.New("list smaller than k"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := getKthElement(tt.input, tt.k)
			assert.Equal(t, tt.expected, resp)
			assert.Equal(t, tt.expectedErr, err)
		})
	}
}

func TestP04(t *testing.T) {
	list1 := []string{"a", "b", "c"}
	var list2 []string

	assert.Equal(t, 3, length(list1))
	assert.Equal(t, 0, length(list2))
}

func TestP05(t *testing.T) {
	assert.Equal(t, []string{"a", "b", "c"}, reverse([]string{"c", "b", "a"}))
}

func TestP06(t *testing.T) {
	assert.True(t, isPalindrome([]string{"a", "b", "a"}))
	assert.True(t, isPalindrome([]string{"a"}))
	assert.False(t, isPalindrome([]string{"a", "b"}))
}

func TestP07_1(t *testing.T) {
	// (a, b, (c, (d)))
	assert.Equal(t, []any{"a", "b", "c", "d"}, flatten_1([]any{"a", "b", []any{"c", []any{"d"}}}))
}
func TestP07_2(t *testing.T) {
	// (a, b, (c, (d)))
	a := Single[string]{value: "a"}
	b := Single[string]{value: "b"}
	c := Single[string]{value: "c"}
	d := Single[string]{value: "d"}

	l1 := List[string]{values: []Nested[string]{d}}
	l2 := List[string]{values: []Nested[string]{c, l1}}
	l3 := List[string]{values: []Nested[string]{a, b, l2}}
	outerList := []Nested[string]{l3}

	fmt.Println(outerList)

	assert.Equal(t, []string{"a", "b", "c", "d"}, flatten_2(outerList))
}

func TestP08(t *testing.T) {
	// (a, b, (c, (d)))
	assert.Equal(t, []string{"a", "b", "c"}, eliminateConsecutiveDuplicates([]string{"a", "a", "b", "b", "b", "c"}))
}

func TestP09(t *testing.T) {
	// (a, b, (c, (d)))
	assert.Equal(t, [][]string{{"a", "a"}, {"b", "b", "b"}, {"c"}}, packConsecutiveDuplicates([]string{"a", "a", "b", "b", "b", "c"}))
}

func TestP10(t *testing.T) {
	// (a, b, (c, (d)))
	assert.Equal(t, []Encoded[string]{
		{value: "a", count: 2},
		{value: "b", count: 3},
		{value: "c", count: 1},
	}, runLengthEncoding([]string{"a", "a", "b", "b", "b", "c"}))
}

func TestP11(t *testing.T) {
	// (a, b, (c, (d)))
	assert.Equal(t, []any{[]any{2, "a"}, []any{3, "b"}, "c"}, modifiedRunLengthEncoding([]any{"a", "a", "b", "b", "b", "c"}))
}

func TestP12(t *testing.T) {
	assert.Equal(t, []string{"a", "a", "b", "b", "b", "c"}, decode[string](modifiedRunLengthEncoding([]any{"a", "a", "b", "b", "b", "c"})))
}

func TestP13(t *testing.T) {
	// (a, b, (c, (d)))
	assert.Equal(t, []any{[]any{2, "a"}, []any{3, "b"}, "c"}, modifiedRunLengthEncodingDirect([]any{"a", "a", "b", "b", "b", "c"}))
}

func TestP14(t *testing.T) {
	assert.Equal(t, []string{"a", "a"}, duplicate([]string{"a"}))
}

func TestP15(t *testing.T) {
	assert.Equal(t, []string{"a", "a", "a"}, replicate([]string{"a"}, 3))
	assert.Equal(t, []string{}, replicate([]string{"a"}, 0))
}

func TestP16(t *testing.T) {
	assert.Equal(t, []string{"a", "c", "e"}, dropNth([]string{"a", "b", "c", "d", "e"}, 2))
}

func TestP17(t *testing.T) {
	a, b := split([]string{"a", "b", "c", "d", "e"}, 3)
	assert.Equal(t, []string{"a", "b", "c"}, a)
	assert.Equal(t, []string{"d", "e"}, b)
}

func TestP18(t *testing.T) {
	assert.Equal(t, []string{"c", "d"}, slice([]string{"a", "b", "c", "d", "e"}, 2, 4))
}

func TestP19(t *testing.T) {
	assert.Equal(t, []string{"b", "c", "d", "e", "a"}, rotate([]string{"a", "b", "c", "d", "e"}, 1))
	assert.Equal(t, []string{"b", "c", "d", "e", "a"}, rotate([]string{"a", "b", "c", "d", "e"}, 6))
	assert.Equal(t, []string{"a", "b", "c", "d", "e"}, rotate([]string{"a", "b", "c", "d", "e"}, 0))
}

func TestP20(t *testing.T) {
	assert.Equal(t, []string{"b", "c", "d", "e"}, removeKth([]string{"a", "b", "c", "d", "e"}, 1))
	assert.Equal(t, []string{"a", "c", "d", "e"}, removeKth([]string{"a", "b", "c", "d", "e"}, 2))
	assert.Equal(t, []string{"a", "b", "d", "e"}, removeKth([]string{"a", "b", "c", "d", "e"}, 3))
}

func Test21(t *testing.T) {
	assert.Equal(t, []string{"a", "b", "haha", "c"}, insertAt("haha", []string{"a", "b", "c"}, 2))
}

func Test22(t *testing.T) {
	assert.Equal(t, []int{1, 2, 3, 4, 5}, rangeGen(1, 5))
	assert.Equal(t, []int{5, 4, 3, 2, 1}, rangeGen(5, 1))
}

func Test23(t *testing.T) {
	m := map[string]bool{
		"a": true,
		"b": true,
		"c": true,
		"d": true,
		"e": true,
		"f": true,
	}

	resp := rndSelect([]string{"a", "b", "c", "d", "e", "f"}, 3)
	assert.Len(t, resp, 3)

	for _, x := range resp {
		assert.True(t, m[x])
	}
}

func Test24(t *testing.T) {
	resp := lottoSelect(15, 5)

	assert.Len(t, resp, 15)
	for _, x := range resp {
		assert.True(t, x >= 0 && x < 5)
	}

}

func Test25(t *testing.T) {
	m := map[string]bool{
		"a": true,
		"b": true,
		"c": true,
		"d": true,
		"e": true,
		"f": true,
	}

	resp := rndPermu([]string{"a", "b", "c", "d", "e", "f"})
	assert.Len(t, resp, 6)
	for _, x := range resp {
		assert.True(t, m[x])
	}
}

func Test26(t *testing.T) {
	resp := combination(3, []string{"a", "b", "c"})
	assert.Len(t, resp, 1*2)

	resp = combination(1, []string{"a", "b", "c"})
	assert.Len(t, resp, 3*2)

	resp = combination(2, []string{"a", "b", "c"})
	assert.Len(t, resp, 3*2)

	resp = combination(3, []string{"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"})
	assert.Len(t, resp, 220*2)
}

func Test27(t *testing.T) {
	rsp := group3([9]string{"a", "b", "c", "d", "e", "f", "g", "h", "i"})

	twoCount := map[string]int{}
	threeCount := map[string]int{}
	fourCount := map[string]int{}

	for _, x := range rsp {
		twoCount[strings.Join(x[0], "")]++
		threeCount[strings.Join(x[1], "")]++
		fourCount[strings.Join(x[2], "")]++
	}

	// Assert correct sizes:
	assert.Len(t, twoCount, 36)   //  C(2, 9) -> 36
	assert.Len(t, threeCount, 84) //  C(3, 9) -> 85
	assert.Len(t, fourCount, 126) //  C(4, 9) -> 126

	abCount := 0
	cdeCount := 0
	fghiCount := 0
	for _, x := range rsp {
		if strings.Join(x[0], "") == "ab" {
			abCount++
		}

		if strings.Join(x[1], "") == "cde" {
			cdeCount++
		}

		if strings.Join(x[2], "") == "fghi" {
			fghiCount++
		}
	}

	// C(3, 7) or C(4, 7)
	assert.Equal(t, 35, abCount)

	// C(2, 6) or C(4, 6)
	assert.Equal(t, 15, cdeCount)

	// C(2, 5) or C(3, 5)
	assert.Equal(t, 10, fghiCount)

	// Test with one single group of 9.
	rsp = group([]string{"a", "b", "c", "d", "e", "f", "g", "h", "i"}, []int{9})
	assert.Len(t, rsp, 1)

	// test with 5 groups of 1.
	rsp = group([]string{"a", "b", "c", "d", "e"}, []int{1, 1, 1, 1, 1})
	assert.Len(t, rsp, 120)
}

func Test28A(t *testing.T) {
	assert.Equal(t,
		[][]string{{"1"}, {"2", "2"}, {"2", "2"}, {"3", "3", "3"}, {"4", "4", "4", "4"}},
		lsort([][]string{{"3", "3", "3"}, {"2", "2"}, {"4", "4", "4", "4"}, {"2", "2"}, {"1"}}),
	)
}

func Test28B(t *testing.T) {
	assert.Equal(t,
		[][]string{{"1"}, {"1", "2"}, {"1", "2"}, {"1", "2", "3"}, {"1", "2", "3"}, {"1", "2", "3"}},
		lfsort([][]string{{"1", "2", "3"}, {"1", "2", "3"}, {"1", "2", "3"}, {"1", "2"}, {"1", "2"}, {"1"}}),
	)
}
