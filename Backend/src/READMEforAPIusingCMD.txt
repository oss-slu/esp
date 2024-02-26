In regards to the arguments, reference the sample line below:

python APIusingCMD.py "C:\Users\seala\csci4961\ORCAdata\Styrene-bd2.txt" "CARTESIAN COORDINATES (ANGSTROEM)" 123 "FIRST 6" True 2000

To start, you must call python APIusingCMD.py. The remaining arguments represent each component one needs to generate
the output file.

Arguments:

0 - name of python file (APIusingCMD.py)
1 - The dir of the input file location 
2 - The key terms one desires **note: key terms must be in all caps and within quotes (""), this argument is sensitive  to caps and spaces. 
3 - The list of sections, pass this as a string with no spaces (i.e. 123 will turn into a list [1,2,3] of ints
4 - represents the specify lines element, This must be a string, such as "WHOLE", "FIRST", "LAST" or "SPECIFIC", where for first and last, you must specify a number. for instance, "FIRST 6" (**note the space and the use of all caps) stands for the first six lines of that section. 
5 - A bool value to use the total lines passed in the last argument or not. Pass this as a string either True or False.
6 - total number of lines for the output doc. pass this as a string such as 2000
