package ninetynineproblems

import "errors"

var (
    ErrEmptyList = errors.New("empty list")
    ErrListTooSmall = errors.New("list too small")
    ErrKNonPositive = errors.New("k less than or equal to zero")
    ErrListSmallerThanK = errors.New("list smaller than k")
    ErrInvalidIndex = errors.New("invalid index")
    ErrInvalidCount = errors.New("invalid count")
)
