package ninetynineproblems

type LinkedList[T any] struct {
	value T
	next  *LinkedList[T]
}
