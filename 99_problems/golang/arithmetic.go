package ninetynineproblems

func isPrime(n int) bool {
	if n <= 1 {
		return false
	}

	// Check if n is even.
	if n != 2 && n%2 == 0 {
		return false
	}

	// Iterate using integer arithmetic to avoid float issues.
	for x := 3; x*x <= n; x += 2 {
		if n%x == 0 {
			return false
		}
	}

	return true
}