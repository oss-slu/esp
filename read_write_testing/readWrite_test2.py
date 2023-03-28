readFile = open("readFile2.txt", "r")
writeFile = open("writeFile2.txt", "w")

emptyLine = 0
emptyLineCount = 0

Lines = readFile.readlines()

for line in Lines:
    if line == "":
        emptyLineCount += 1
        writeFile.write(line)
    else:
        emptyLineCount = 0
        writeFile.write(line)

    if emptyLineCount == 2:
        print("found two empty lines in a row")
        readFile.close()
        writeFile.close()

readFile.close()
writeFile.close()
