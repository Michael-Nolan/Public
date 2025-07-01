package com.languagelatte.side_effect;

import com.google.auto.service.AutoService;
import com.google.errorprone.BugPattern;
import static com.google.errorprone.BugPattern.SeverityLevel.ERROR;
import com.google.errorprone.VisitorState;
import com.google.errorprone.bugpatterns.BugChecker;
import com.google.errorprone.bugpatterns.BugChecker.MethodInvocationTreeMatcher;
import com.google.errorprone.matchers.Description;
import com.sun.source.tree.MethodInvocationTree;

@AutoService(BugChecker.class)
@BugPattern(
    summary = "",
    explanation = "",
    severity = ERROR)
public class SideEffect extends BugChecker implements MethodInvocationTreeMatcher {
  private static final long serialVersionUID = 1L;

  @Override
  public Description matchMethodInvocation(MethodInvocationTree mit, VisitorState vs) {
    return Description.NO_MATCH;
  }
}
