package ninetynineproblems

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestP99(t *testing.T) {
	var inputWords = []string{"happy", "sad", "yank"}
	var inputPuzzle = [][]string{
		{"-", "*", "-", "-", "-"},
		{"*", "*", "*", "*", "*"},
		{"-", "*", "-", "-", "*"},
		{"-", "-", "-", "-", "*"},
		{"-", "-", "-", "-", "*"},
	}
	var expected = [][]string{
		{"-", "s", "-", "-", "-"},
		{"h", "a", "p", "p", "y"},
		{"-", "d", "-", "-", "a"},
		{"-", "-", "-", "-", "n"},
		{"-", "-", "-", "-", "k"},
	}

	out, err := solve(inputWords, inputPuzzle)
	require.NoError(t, err)

	require.Equal(t, expected, out)
}
