import pypdf
import os

def extract_text(pdf_path, out_file):
    out_file.write(f"--- Extracting from {os.path.basename(pdf_path)} ---\n")
    try:
        reader = pypdf.PdfReader(pdf_path)
        for i, page in enumerate(reader.pages):
            out_file.write(f"--- Page {i+1} ---\n")
            text = page.extract_text()
            out_file.write(text + "\n")
    except Exception as e:
        out_file.write(f"Error reading {pdf_path}: {e}\n")
    out_file.write("\n")

pdf_files = ["Kova_PRD.pdf", "Kova_Strategic_Intelligence_Package.pdf"]
with open("extracted_text.txt", "w", encoding="utf-8") as out:
    for pdf in pdf_files:
        extract_text(pdf, out)
