### From the book, "Modern C" written by Jens Gustedt
###### If I need to take this down, just let me know and it shall be done
#### Takeaways
---
A) C and C++ are different: don't mix them, and don't mix them up.  
B) Don't panic.  

1.1) C is an imperitive programming language.  
1.2) C is a compiled programming language.  
1.3) A correct C program is portable between different platforms.  
1.4) A C program should compile cleanly without warnings.  

2.1) Punctuation characters can be used with several different meanings.  
2.2) All identifiers in a program have to be declared.  
2.3) Identifiers may have several consistent declarations.  
2.4) Declarations are bound to the scope in which they appear.  
2.5) Declarations specify identifiers, whereas definitions specify objects.  
2.6) An object is defined at the same time it is initialized.  
2.7) Missing elements in initializers default to 0.  
2.8) For an array with ```n``` elements, the first element has index 0, and the last
has index ```n-1```.  
2.9) Each object or function must have exactly one definition.  
2.10) Domain iterations should be coded with a for statement.  
2.11) The loop variable should be defined in the initial part of a ```for```.  

3.1) The value 0 represents logical false.  
3.2) Any value different from 0 represents logical true.  
3.4) All scalars have a truth value.  
3.5) ```case``` values must be integer constant expressions.  
3.6) ```case``` labels must not jump beyond a variable definition.  
  
4.1) The type ```size_t``` represents the values in the range [0, SIZE_MAX].  
4.2) ```unsigned``` arthimetic is always well-defined.  
4.3) The operations +, -, and * on ```size_t``` provide the mathematically
correct result if it is representable as a ```size_t```.  
4.4) For unsigned values, ```a == (a/b) * b + (a % b)```.  
4.5) Unsigned / and % are well defined only if the second operand is not 0.  
4.6) Arithmetic on size_t implicitly does the computation % ```(SIZE_MAX + 1)```.  
4.7) In the case of overflow, unsigned arithmetic wraps around.  
4.8) The result of unsigned / and % is always smaller than the operands.  
4.9) Unsigned / and % can't overflow.  
4.10) Operators must have all their characters directly attached to each other.  
4.11) Side effects in value expressions are evil.  
4.12) Never modify more than one object in a statement.  
4.13) Comparison operator return the value ```false``` or ```true```.  
 
