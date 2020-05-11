### From the book, "Modern C" written by Jens Gustedt
###### If I need to take this down, just let me know and it shall be done
#### Takeaways
---
A) C and C++ are different: don't mix them, and don't mix them up.  
B) Don't panic.  

---

1.1) C is an imperative programming language.  
1.2) C is a compiled programming language.  
1.3) A correct C program is portable between different platforms.  
1.4) A C program should compile cleanly without warnings.  

---

2.1) Punctuation characters can be used with several different meanings.  
2.2) All identifiers in a program have to be declared.  
2.3) Identifiers may have several consistent declarations.  
2.4) Declarations are bound to the scope in which they appear.  
2.5) Declarations specify identifiers, whereas definitions specify objects.  
2.6) An object is defined at the same time it is initialized.  
2.7) Missing elements in initializers default to 0.  
2.8) For an array with ```n``` elements, the first element has index 0, and the last has index ```n-1```.  
2.9) Each object or function must have exactly one definition.  
2.10) Domain iterations should be coded with a for statement.  
2.11) The loop variable should be defined in the initial part of a ```for```.  

---

3.1) The value 0 represents logical false.  
3.2) Any value different from 0 represents logical true.  
3.4) All scalars have a truth value.  
3.5) ```case``` values must be integer constant expressions.  
3.6) ```case``` labels must not jump beyond a variable definition.  
  
---

4.1) The type ```size_t``` represents the values in the range [0, SIZE_MAX].  
4.2) ```unsigned``` arthimetic is always well-defined.  
4.3) The operations +, -, and * on ```size_t``` provide the mathematically correct result if it is representable as a ```size_t```.  
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
4.14) Logic operators return the value ```false``` or ```true```.  
4.15) &&, ||, ?:, and , evaluate their first operand first.  
4.16) Don't use the , operator.  
4.17) Most operators don't sequence their operands.  
4.18) Function calls don't sequence their argument expressions.  
4.19) Functions that are called inside expressions should not have side effects.

---

5.1) C programs primarily reason about values and not about their representation.  
5.2) All values are numbers or translate to numbers.  
5.3) All values have a type that is statically determined.  
5.4) Possible operations on a value are determined by its type.  
5.5) A value's type determines the results of all operations.  
5.6) A type's binary representation determines the results of all operations.  
5.7) A type's binary representation is observable.  
5.8) Programs execute **as if** following the abstract state machine.  
5.9) Type determines optimization opportunities.  
5.10) Before arithmetic, narrow integer types are promoted to ```signed int```.  
5.11) Each of the four classes of base types has three distinct unpromoted types.  
5.12) Use ```size_t``` for sizes, cardinalities, or ordinal numbers.  
5.13) Use ```unsigned``` for small quantities that can't be negative. 
5.14) Use ```signed``` for small quantities that bear a sign.  
5.15) Use ```ptrdiff_t``` for large differences that bear a sign.  
5.16) Use ```double``` for floating-point calculations.  
5.17) Use ```double complex``` for complex calculations. _whatever that means_  
5.18) Consecutive string literals are concatenated.  
5.19) Numerical literals are never negative.  
5.20) Decimal integer constants are signed.    
5.21) A decimal integer constant has the first of the three signed types that fits it.  
5.22) The same value can have different types.  
5.23) Don't use octal or hexadecimal constants to express negative values.  
5.24) Use decimal constants to express negative values.  
5.25) Different literals can have the same value.  
5.26) The effective value of a decimal floting-point constant may be different from its literal value.  
5.27) Literals have value, type, and binary expressions.  
5.28) __I__ is reserved for the imaginary unit.  
5.29) Unary - and + have the type of their promoted argument.  
5.30) Avoid narrowing converstions.  
5.31) Don't use narrow types in arithmetic.  
5.32) Avoid operations with operands of different signedness.  
5.33) Use unsigned types whenever you can.  
5.34) Choose your arithmetic types such that implicit conversions are harmless.  
5.35) All variables should be initialized.  
5.36) Use designated initializers for all aggregate data types.  
5.37) ```{0}``` is a valid initializer for all object types that are not variable length arrays (VLA).  
5.38) All constants with a particular meaning must be named.  
5.39) All constants with different meanings must be distinguished.  
5.40) An object of ```const``` qualified type is read-only.  
5.41) String literals are read only.  
5.42) Enumeration constants have either an explicit or positional value.  
5.43) Enumeration constants are of type ```signed int```.  
5.44) An integer constant expression doesn't evaluate any object.  
5.45) Macro names are in all caps.  
5.46) A compound literal defines an object.  
5.47) Don't hide a terminating semi-colon inside a macro.  
5.48) Right-indent continuation markers for macros to the same column.  
~ Skipping the rest of chapter 5 for now because it's MEGA boring

---

