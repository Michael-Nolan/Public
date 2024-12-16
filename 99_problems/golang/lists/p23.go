package main

import (
	"math/rand"
	"time"
)

func rndSelect[T any](input []T, count int) []T {
	var resp []T

	r := rand.New(rand.NewSource(time.Now().Unix()))

	for ; count > 0; count-- {
		resp = append(resp, input[r.Intn(count)])
	}

	return resp
}
