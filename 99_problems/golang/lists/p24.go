package main

import (
	"math/rand"
	"time"
)

func lottoSelect(count int, upperBounds int) []int {
	var resp []int

	r := rand.New(rand.NewSource(time.Now().Unix()))

	for ; count > 0; count-- {
		resp = append(resp, r.Intn(upperBounds))
	}

	return resp
}
