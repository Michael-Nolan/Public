package ninetynineproblems

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestP31(t *testing.T) {
	// https://en.wikipedia.org/wiki/2,147,483,647 - Largest 32 bit prime.
	assert.Equal(t, true, isPrime(2147483647))
	assert.Equal(t, true, isPrime(524287))
	assert.Equal(t, true, isPrime(131071))
	assert.Equal(t, true, isPrime(8191))
	assert.Equal(t, true, isPrime(127))
	assert.Equal(t, true, isPrime(31))
	assert.Equal(t, true, isPrime(7))
	assert.Equal(t, true, isPrime(3))
	assert.Equal(t, true, isPrime(2))

	// not prime
	assert.Equal(t, false, isPrime(333))
	assert.Equal(t, false, isPrime(1))
}