package com.languagelatte.dsa.union_find;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class UnionFindTest {

  @Test
  public void test() {

    UnionFind[] unionFindImpls = new UnionFind[] {new QuickFind(10), new QuickUnion(10)};

    for (UnionFind unionFind : unionFindImpls) {
      assertEquals(10, unionFind.count());

      unionFind.union(0, 9);
      assertEquals(9, unionFind.count());

      unionFind.union(0, 8);
      unionFind.union(0, 7);
      unionFind.union(1, 2);
      unionFind.union(1, 3);
      unionFind.union(1, 4);
      unionFind.union(1, 5);
      unionFind.union(1, 6);

      assertTrue(unionFind.isConnected(0, 9));
      assertTrue(unionFind.isConnected(7, 8));
      assertTrue(unionFind.isConnected(1, 6));
      assertTrue(unionFind.isConnected(2, 5));

      assertFalse(unionFind.isConnected(0, 1));
      assertFalse(unionFind.isConnected(6, 9));
    }
  }
}
