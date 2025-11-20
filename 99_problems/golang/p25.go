package ninetynineproblems

import "math/rand"

// P25 - Create a random permutation of the list. i.e, shuffle
func rndPermu[T any](input []T) []T {
	out := append([]T(nil), input...)
	rand.Shuffle(len(out), func(i, j int) {
		out[i], out[j] = out[j], out[i]
	})

	return out
}
