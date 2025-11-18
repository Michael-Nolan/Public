package ninetynineproblems

type Nested[T any] interface {
	isNested() // Private marker method
}

type Single[T any] struct {
	value T
}

func (_ Single[T]) isNested() {}

type List[T any] struct {
	values []Nested[T]
}

func (_ List[T]) isNested() {}
