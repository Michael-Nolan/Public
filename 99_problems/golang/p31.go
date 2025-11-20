package ninetynineproblems

// P31 - determine if an integer is prime
func isPrime(n int) bool {
	if n <= 1 {
		return false
	}

	if n != 2 && n%2 == 0 {
		return false
	}

	for x := 3; x*x <= n; x += 2 {
		if n%x == 0 {
			return false
		}
	}

	return true
}
