package main

import "math"

func isPrime(n int) bool {
	if n == 1 {
		return false
	}

	// Check if n is even.
	if n != 2 && n%2 == 0 {
		return false
	}

	for x := 3; x < int(math.Ceil(math.Sqrt(float64(n)))); x += 2 {
		if n%x == 0 {
			return false
		}
	}

	return true
}
