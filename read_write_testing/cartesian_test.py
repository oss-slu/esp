from docx import Document

document = Document()

readFile = open("orca_sample.txt", "r")
Lines = readFile.readlines()

terms = []

userInput = input("What section would you like to find? (enter exact name) ")
searchTerm = userInput.upper()
terms.append(searchTerm)

proceed = 0

while proceed == 0:
    moreYesNo = input("Is there another section you would like to find? (Y/N) ")
    if moreYesNo == "Y":
        extraTerm = input("Please enter a specific section name: ")
        extraTermUpper = extraTerm.upper()
        terms.append(extraTermUpper)
    elif moreYesNo == "N":
        proceed = 1

lineNo = 0
lineEmpty = 0
termLineNo = 0

for line in Lines:
    if terms[0] in line:
        termLineNo = lineNo     # record the line number where search term is
        lineNo += 15            # add a 15 line buffer for data
        break
    else:
        lineNo += 1

print(lineNo)
print(termLineNo) #debug
print(Lines[309])

while lineEmpty == 0:   # while the line is not empty
    if Lines[termLineNo] != "\n":
        p1 = document.add_paragraph(Lines[termLineNo])
        termLineNo += 1
    else:
        lineEmpty = 1
        
print(terms)
print("Finished writing Word document.")

document.save("cartesian.docx")
readFile.close()
