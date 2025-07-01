package com.languagelatte.dsa.union_find;

public final class QuickFind implements UnionFind {

  private int count;
  private final int[] data;

  public QuickFind(int size) {
    this.count = size;

    this.data = new int[size];
    for (int x = 0; x < size; x++) {
      this.data[x] = x;
    }
  }

  @Override
  public void union(int a, int b) {
    if (!isConnected(a, b)) {
      this.count--;
    }

    final var tmp = this.data[a];

    for (int x = 0; x < data.length; x++) {
      if (this.data[x] == tmp) {
        this.data[x] = this.data[b];
      }
    }
  }

  @Override
  public int find(int a) {
    return this.data[a];
  }

  @Override
  public int count() {
    return this.count;
  }
}
