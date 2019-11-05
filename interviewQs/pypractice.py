#!/usr/bin/python3


class Solution():
    def addToDigit(self, digits, index):
        if digits[index] != 9:
            digits[index] += 1
            return digits
        else:
            digits[index] = 0
            return self.addToDigit(digits, index+1)

    def plusOne(self, digits: list)->list:
        digits.reverse()
        print(digits)
        ret = self.addToDigit(digits, 0)
        ret.reverse()
        return ret


s = Solution()

print(s.plusOne([2,9,9]))
