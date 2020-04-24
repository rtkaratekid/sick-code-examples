// $ clang -Wall -o main exs_3.c

#include <stdio.h>

int main() {

  double A[5] = { 9.0, 2.9, 3.E+25, 0.00007, };

  for(int i = 0; i < 5; ++i) {
    printf("element %d is %g, \tits square is %g\n",
        i,
        A[i],
        A[i]*A[i]);
  }

  return 0;
}
