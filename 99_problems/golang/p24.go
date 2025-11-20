package ninetynineproblems

import (
	"math/rand"
	"time"
)

// P24 - Select x elements 1 to upperBounds
func lottoSelect(count int, upperBounds int) []int {
	if upperBounds <= 0 || count <= 0 {
		return nil
	}

	resp := make([]int, 0, count)
	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	for ; count > 0; count-- {
		resp = append(resp, r.Intn(upperBounds))
	}

	return resp
}
