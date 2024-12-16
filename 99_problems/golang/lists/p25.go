package main

import "math/rand"

func rndPermu[T any](input []T) []T {
	rand.Shuffle(len(input), func(i, j int) {
		tmp := input[i]
		input[i] = input[j]
		input[j] = tmp
	})

	return input
}
