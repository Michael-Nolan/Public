package main

import (
	"errors"
	"fmt"
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
	d := Single[string]{value: "e"}

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
	assert.Equal(t, []any{
		[]any{2, "a"},
		[]any{3, "b"},
		[]any{1, "c"},
	}, modifiedRunLengthEncoding([]any{"a", "a", "b", "b", "b", "c"}))
}
