package com.languagelatte.dsa.union_find;

// The name "QuickUnion" is a little misleading.
// For this naive approach, the word "Quick" is not referring to runtime complexity.
// The word "Quick" is referring to the simplicity of the code.
// Once the roots are found, the union is just `data[a] = b;`
final class QuickUnion implements UnionFind {

  final int[] data;
  int count;

  public QuickUnion(int size) {
    this.data = new int[size];
    this.count = size;
    for (int x = 0; x < size; x++) {
      this.data[x] = x;
    }
  }

  @Override
  public void union(int a, int b) {
    if (!isConnected(a, b)) {
      count--;
    }
    a = find(a);
    b = find(b);
    data[a] = b;
  }

  @Override
  public int find(int a) {
    while (a != data[a]) {
      a = data[a];
    }
    return a;
  }

  @Override
  public int count() {
    return count;
  }
}
