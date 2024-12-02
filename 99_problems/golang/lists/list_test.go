package main

import (
	"errors"
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
