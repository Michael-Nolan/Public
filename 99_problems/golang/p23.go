package ninetynineproblems

import (
	"math/rand"
	"time"
)

// P23 - Select x elements at random.
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
