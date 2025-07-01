# SideEffect

Making Function Purity apart of the Java Type System.


# Installation
Follow the ErrorProne and/or NullAway instructions.

Add SideEffect to your annotationProcessorPaths section in your maven-compiler-plugin

```
<annotationProcessorPaths>
    <path>
        <groupId>com.google.errorprone</groupId>
        <artifactId>error_prone_core</artifactId>
        <version>...</version>
    </path>
    <path>
        <groupId>com.uber.nullaway</groupId>
        <artifactId>nullaway</artifactId>
        <version>...</version>
    </path>
    <path>
        <groupId>com.languagelatte</groupId>
        <artifactId>side-effect</artifactId>
        <version>0.0.1</version>
    </path>
</annotationProcessorPaths>
```

# Config
```
-XepOpt:SideEffect:AnnotatedPackages=your.package.here
-XepOpt:SideEffect:NonAnnotatedPackages=your.package.here


# @Open defaults to 'off' for all checks.
-XepOpt:SideEffect:OpenClass=false
-XepOpt:SideEffect:OpenInterface=false
-XepOpt:SideEffect:OpenMethod=false
-XepOpt:SideEffect:OpenClassVariable=false
-XepOpt:SideEffect:OpenLocalVariable=false
```

# Annotations

* @SideEffect
  * @Random
  * @IO
  * @Time
  * @Mutation
* @Open


## @SideEffect
This Annotation can be applied at the `METHOD`, `LOCAL_VARIABLE`, `PARAMETER`, or `FIELD` level.

* Any method that calls a method annotated by @SideEffect, must itself be annotated by @SideEffect.
* Any field, parameter, or local variable that is populated by an expression that has a component annotated by @SideEffect must itself be annotated by @SideEffect

### Example - non annotated Method calls method annotated by @SideEffect
```
MyClass {

    // Error - MyMethod1 calls a Method annotated by @SideEffect. 
    MyMethod1(){
        MyMethod2()
    }

    @SideEffect MyMethod2(){
        
    }
}
```




## @Open
```
// error here - Class should be final, sealed or @Open
public MyClass {
    ...
}
```