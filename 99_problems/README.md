# 99+ Problems

There is a somewhat famous [99 Prolog](https://www.ic.unicamp.br/~meidanis/courses/mc336/2009s2/prolog/problemas/) problems list, and a [99 Lisp](https://www.ic.unicamp.br/~meidanis/courses/mc336/problemas-lisp/L-99_Ninety-Nine_Lisp_Problems.html) problems list. 

The goal of the problem set is to get someone familiar with the basics of a language. 
The goal is **not** to come up with the most optimal solutions, but to come up with the most **idiomatic** solutions.

## Normal Languages

My professional life mostly involves using "normal" languages like Java, GoLang and Python. 
Normal in this case is synonymous with [imperative](https://en.wikipedia.org/wiki/Imperative_programming), [procedural](https://en.wikipedia.org/wiki/Procedural_programming), [mutable](https://en.wikipedia.org/wiki/Side_effect_(computer_science)), and having a "C style" syntax. 
Though the industry is clearly moving towards adopting some functional ideas. (Which is a good thing!)

With the above definition of normal, then a language like C or Go would be contenders for the most normal language 


## Out of the norm languages
But there are lots of "different" languages out there. Languages that require different ways of thinking.

* Lisp
* Haskell
* Smalltalk
* Forth
* APL
* Prolog

## Problems

Despite the name, there are actually only 88 problems.

**Problem Categories:**
- **P01-P28**: Lists
- **P31-P41**: Arithmetic
- **P46-P50**: Logic and Codes
- **P54-P69**: Binary Trees
- **P70-P73**: Multiway Trees
- **P80-P90**: Graphs
- **P91-P99**: Miscellaneous Problems

| Problem Name |Input/Output | Go | Lisp | Haskell | Smalltalk | Forth | APL | Prolog |
|--------------|-|----|----|---------|-----------|-------|-----|--------|
| P99 - Crossword puzzle | | | | | | | | |
| P98 - Nonograms | | | | | | | | |
| P97 - Sudoku | | | | | | | | |
| P96 - Syntax checker | | | | | | | | |
| P95 - English number words | | | | | | | | |
| P94 - An arithmetic puzzle | | | | | | | | |
| P93 - Von Koch's conjecture | | | | | | | | |
| P92 - Knight's tour | | | | | | | | |
| P91 - Eight queens problem | | | | | | | | |
| P90 - Generate K-regular simple graphs with N nodes | | | | | | | | |
| P89 - Bipartite graphs | | | | | | | | |
| P88 - Connected components | | | | | | | | |
| P87 - Depth-first order graph traversal | | | | | | | | |
| P86 - Node degree and graph coloration | | | | | | | | |
| P85 - Graph isomorphism | | | | | | | | |
| P84 - Construct the minimal spanning tree | | | | | | | | |
| P83 - Construct all spanning trees | | | | | | | | |
| P82 - Cycle from a given node | | | | | | | | |
| P81 - Path from one node to another one | | | | | | | | |
| P80 - Conversions | | | | | | | | |
| P73 - Lisp-like tree representation | | | | | | | | |
| P72 - Construct the bottom-up order sequence of the tree nodes | | | | | | | | |
| P71 - Determine the internal path length of a tree | | | | | | | | |
| P70C - Count the nodes of a multiway tree | | | | | | | | |
| P70B - Check whether a given term represents a multiway tree | | | | | | | | |
| P70 - Tree construction from a node string | | | | | | | | |
| P69 - Dotstring representation of binary trees | | | | | | | | |
| P68 - Preorder and inorder sequences of binary trees | | | | | | | | |
| P67 - A string representation of binary trees | | | | | | | | |
| P66 - Layout a binary tree (3) | | | | | | | | |
| P65 - Layout a binary tree (2) | | | | | | | | |
| P64 - Layout a binary tree (1) | | | | | | | | |
| P63 - Construct a complete binary tree | | | | | | | | |
| P62B - Collect the nodes at a given level in a list | | | | | | | | |
| P62 - Collect the internal nodes of a binary tree in a list | | | | | | | | |
| P61A - Collect the leaves of a binary tree in a list | | | | | | | | |
| P61 - Count the leaves of a binary tree | | | | | | | | |
| P60 - Construct height-balanced binary trees with a given number of nodes | | | | | | | | |
| P59 - Construct height-balanced binary trees | | | | | | | | |
| P58 - Generate-and-test paradigm | | | | | | | | |
| P57 - Binary search trees (dictionaries) | | | | | | | | |
| P56 - Symmetric binary trees | | | | | | | | |
| P55 - Construct completely balanced binary trees | | | | | | | | |
| P54 - Check whether a given term represents a binary tree | | | | | | | | |
| P50 - Huffman code | | | | | | | | |
| P49 - Gray code | | | | | | | | |
| P48 - Truth tables for logical expressions (3) | | | | | | | | |
| P47 - Truth tables for logical expressions (2) | | | | | | | | |
| P46 - Truth tables for logical expressions | | | | | | | | |
| P41 - A list of Goldbach compositions | | | | | | | | |
| P40 - Goldbach's conjecture | | | | | | | | |
| P39 - A list of prime numbers | | | | | | | | |
| P38 - Compare the two methods of calculating Euler's totient function | | | | | | | | |
| P37 - Calculate Euler's totient function phi(m) (improved) | | | | | | | | |
| P36 - Determine the prime factors of a given positive integer (2) | | | | | | | | |
| P35 - Determine the prime factors of a given positive integer | | | | | | | | |
| P34 - Calculate Euler's totient function phi(m) | | | | | | | | |
| P33 - Determine whether two positive integer numbers are coprime | | | | | | | | |
| P32 - Determine the greatest common divisor of two positive integer numbers | | | | | | | | |
| P31 - Determine whether a given integer number is prime | `7 -> true` | [here](/99_problems/golang/p31.go)| | | | | | |
| P28b - Sorting a list of lists according to length frequency of sublists | `((a b c) (d e) (f g h) (d e) (i j k l) (m n) (o))) -> ((I J K L) (O) (A B C) (F G H) (D E) (D E) (M N)) `| [here](/99_problems/golang/p28.go) | | | | | | |
| P28a - Sorting a list of lists according to length of sublists | `((a b c) (d e) (f g h) (d e) (i j k l) (m n) (o))) -> ((O) (D E) (D E) (M N) (A B C) (F G H) (I J K L))` | [here](/99_problems/golang/p28.go) | | | | | | |
| P27(a,b) - Group the elements of a set into disjoint subsets | `(a,b,c,d),1,1,2 -> ((a),(b),(c,d)),((a),(c),(a,d)) ...` | [here](/99_problems/golang/p27.go) | | | | | | |
| P26 - Generate the combinations of K distinct objects chosen from the N elements of a list | `(a,b,c),2 -> ((a,b),(a,c),(b,c))` | [here](/99_problems/golang/p26.go) | | | | | | |
| P25 - Generate a random permutation of the elements of a list (shuffle) | `(a,b,c,d) -> (b,a,d,c)` | [here](/99_problems/golang/p25.go) | | | | | | |
| P24 - Lotto: Draw N different random numbers from the set 1..M | `5,20 -> (19,33,2,5,3` | [here](/99_problems/golang/p24.go) | | | | | | |
| P23 - Extract a given number of randomly selected elements from a list | `(a,b,c,d),2 -> (d,a)`| [here](/99_problems/golang/p23.go) | | | | | | |
| P22 - Create a list containing all integers within a given range | `4,9 -> (4,5,6,7,8,9)` | [here](/99_problems/golang/p22.go) | | | | | | |
| P21 - Insert an element at a given position into a list | `(a,b), xx,2 -> (a,xx,b)` | [here](/99_problems/golang/p21.go) | | | | | | |
| P20 - Remove the K'th element from a list | `(a,b,c),2 -> (a,c)` | [here](/99_problems/golang/p20.go) | | | | | | |
| P19 - Rotate a list N places to the left | `(a,b,c,d),2 -> (c,d,a,b)` | [here](/99_problems/golang/p19.go) | | | | | | |
| P18 - Extract a slice from a list | `(a,b,c,d,e),2,4 -> (b,c,d)` | [here](/99_problems/golang/p18.go) | | | | | | |
| P17 - Split a list into two parts | `(a,b,c,d,e),3 -> (a,b,c),(d,e)` | [here](/99_problems/golang/p17.go) | | | | | | |
| P16 - Drop every N'th element from a list | `(a,b,c,d,e,f),2 -> (a,c,e)` | [here](/99_problems/golang/p16.go) | | | | | | |
| P15 - Duplicate the elements of a list a given number of times | `(a,b,c),3 -> (a,a,a,b,b,b,c,c,c)` | [here](/99_problems/golang/p15.go) | | | | | | |
| P14 - Duplicate the elements of a list |`(a,b,c) -> (a,a,b,b,c,c)` | [here](/99_problems/golang/p14.go) | | | | | | |
| P13 - Run-length encoding of a list (direct solution) | `(a,a,a,b,b,c,c) -> ((3,a),b,(2,c))` | [here](/99_problems/golang/p13.go) | | | | | | |
| P12 - Decode a run-length encoded list | `((3,a),b,(2,c)) -> (a,a,a,b,b,c,c)` | [here](/99_problems/golang/p12.go) | | | | | | |
| P11 - Modified run-length encoding | `(a,a,a,b,b,c,c) -> ((3,a),b,(2,c))` | [here](/99_problems/golang/p11.go) | | | | | | |
| P10 - Run-length encoding of a list | `(a,a,a,b,c,c) -> ((3,a),(1,b),(2,c))` | [here](/99_problems/golang/p10.go) | | | | | | |
| P09 - Pack consecutive duplicates of list elements into sublists | `(a,a,a,b,b,c,c) -> ((a,a,a),(b,b),(c,c))` | [here](/99_problems/golang/p09.go) | | | | | | |
| P08 - Eliminate consecutive duplicates of list elements | `(a,a,b,b,c,c) -> (a,b,c)` | [here](/99_problems/golang/p08.go) | | | | | | |
| P07 - Flatten a nested list structure |`(a,(b,(c,d),e)) -> (a,b,c,d,e)` | [here](/99_problems/golang/p07.go) | | | | | | |
| P06 - Find out whether a list is a palindrome | `(a,b,a) -> true` | [here](/99_problems/golang/p06.go) | | | | | | |
| P05 - Reverse a list | `(a,b,c,d) -> (d,c,b,a)` | [here](/99_problems/golang/p05.go) | | | | | | |
| P04 - Find the number of elements of a list | `(a,b,c,d) -> 4` | [here](/99_problems/golang/p04.go) | | | | | | |
| P03 - Find the K'th element of a list | `(a,b,c,d),2  -> b`| [here](/99_problems/golang/p03.go) | | | | | | |
| P02 - Find the last but one element of a list | `(a,b,c,d) -> c` | [here](/99_problems/golang/p02.go) | | | | | | |
| P01 - Find the last element of a list | `(a,b,c,d) -> d` | [here](/99_problems/golang/p01.go) | | | | | | |