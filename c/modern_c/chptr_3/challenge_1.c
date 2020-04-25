/**
 * Sequential Sorting Algorithms
 * Can you do:
 *  A mergesort with recursion
 *  A quicksort with recursion
 * on arrays with sort keys such as double or strings to your liking?
 * Can you provide a simple test routine that checks if the resulting array is
 * really sorted?
 * clang -Wall -o main challenge_1.c
 */

#include <stdio.h>

#define TEST

/**
 * Test helpers 
 */
int is_sorted(int arr[], size_t arr_length) {
  for(int i = 1; i < arr_length; ++i) {
    if (arr[i] < arr[i-1]){
      return 0;
    }
  }
  return 1;
}

void print_array(int arr[], size_t arr_len) {
  for(int i = 0; i < arr_len; ++i) {
    printf("%d ", arr[i]);
  }
  printf("\n");
} 

int swap(int arr[], int index1, int index2) {
  int temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
  return 0;
}


int quicksort(int arr[], size_t arr_length) {



  return 0; // success!
}


int main() {
#ifdef TEST
  // Run Tests
  printf("Tests\n");
  printf("-------------------------------\n");
  int ordered_arr[5] = {1,2,3,4,5};
  int unordered_arr[5] = {5,2,3,1,4};

  printf("ordered_arr is sorted: %d\n", is_sorted(ordered_arr, sizeof(ordered_arr)/sizeof(ordered_arr[0])));
  printf("unordered_arr is sorted: %d\n", is_sorted(unordered_arr, sizeof(unordered_arr)/sizeof(unordered_arr[0])));

  printf("\nDid we swap anything?\n");
  printf("-------------------------------\n");
  print_array(ordered_arr, 5);
  swap(ordered_arr, 0, 1);
  print_array(ordered_arr, 5);



#endif

  return 0;
  
}
