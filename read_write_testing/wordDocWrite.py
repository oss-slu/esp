from docx import Document

document = Document()

readFile = open("readFile.txt", "r")

Lines = readFile.readlines()

for line in Lines:
    p = document.add_paragraph(line);

print("finished writing Word document")
    


document.save("writeDoc.docx")

readFile.close()
