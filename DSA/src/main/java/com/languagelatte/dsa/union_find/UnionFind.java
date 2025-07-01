package com.languagelatte.dsa.union_find;

public sealed interface UnionFind permits QuickFind, QuickUnion {
  public void union(int a, int b);

  public int find(int a);

  public int count();

  default boolean isConnected(int a, int b) {
    return find(a) == find(b);
  }
}
