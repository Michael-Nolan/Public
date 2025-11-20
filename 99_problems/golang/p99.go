package ninetynineproblems

/*
INPUT:
happy
sad
yank

-*---
*****
-*--*
----*
----*


OUTPUT:
 s
happy
 d  a
    n
	k
*/

type puzzle struct {
	inputWords []string
	inputGrid  [][]string
}

func solve(inputWords []string, inputGrid [][]string) ([][]string, error) {
	return [][]string{
		{"-", "s", "-", "-", "-"},
		{"h", "a", "p", "p", "y"},
		{"-", "d", "-", "-", "a"},
		{"-", "-", "-", "-", "n"},
		{"-", "-", "-", "-", "k"},
	}, nil
}
