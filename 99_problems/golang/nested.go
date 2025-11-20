package ninetynineproblems

/* 
	This is very ugly / non idiomatic golang code.
	I would almost certainly reject this in any production context.
	This attempts to represent a "sum type" which go does not have.
	This could easily panic or have unexpected behavior on bad input (someone else "implementing" the interface).
*/


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
