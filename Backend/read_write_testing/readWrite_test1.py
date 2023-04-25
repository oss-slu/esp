readFile = open("readFile.txt", "r")
writeFile = open("writeFile.txt", "w")

emptyLine = 0

while emptyLine == 0:
    line = readFile.readline()
    if line == "":
        emptyLine = 1
        print("Finished writing new text document.")
    writeFile.write(line)

readFile.close()
writeFile.close()
