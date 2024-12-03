package main

type Nested[T any] interface {
	isNested()
}

type Single[T any] struct {
	value T
}

func (_ Single[T]) isNested() {}

type List[T any] struct {
	values []Nested[T]
}

func (_ List[T]) isNested() {}
