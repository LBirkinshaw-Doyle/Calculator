# Calculator

## Test Cases:
<details>
<summary>Addition & Subtraction</summary>

- test 838 expect 838
- test 1 expect 1
- test -3 expect -3
- test 2+2 expect 4
- test 2-1 expect 1
- test 3-14 expect -11
- test -3+1 expect -2
</details>
<details>
<summary>Multiplication</summary>

- test 5x8 expect 40
- test -3x10 expect -30
- test 3x10+4 expect 34
- test 2+3x5 expect 17
- test -2-3x5 expect -17
- test 2x-2x3+2 expect -10
- test 32x10-16x5 expect 240
</details>
<details>
<summary>Division</summary>

- test 8/4 expect 2
- test 4/8 expect 0.5
- test -4/2 expect -2
- test 4/-2 expect -2
- test -10/-3 expect 3.333
- test 16/4+3 expect 7
- test 7+3/10 expect 7.3
- test 2x3/3 expect 2
- test 2x-3/3  expect -2
- test 5-4/2 expect 3
</details>
<details>
<summary>Error & Operators</summary>

- test x4 expect ERR
- test /3 expect ERR
- test 12/3x expect ERR
- test 21/ expect ERR
- test 6x/3 expect ERR
- test .7 expect 0.7
- test +6 expect 6
- test 6+-2 expect 4
- test 6++2 expect 8
- test 6--2 expect 8
- test 6-+2 expect 4
</details>


