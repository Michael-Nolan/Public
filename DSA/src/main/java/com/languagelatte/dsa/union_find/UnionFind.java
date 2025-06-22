package com.languagelatte.dsa.union_find;

public sealed interface UnionFind permits QuickFindV1 {
  public void union(int a, int b);

  public boolean isConnected(int a, int b);

  public int find(int a);

  public int count();
}
