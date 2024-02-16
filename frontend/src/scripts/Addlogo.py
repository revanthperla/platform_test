import PyPDF2
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch

# Function to add logo to PDF
def add_logo(input_pdf_path, output_pdf_path, logo_path):
    # Open the PDF file
    with open(input_pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        writer = PyPDF2.PdfWriter()

        # Get the first page of the PDF
        page = reader.pages[0]

        # Create a canvas to draw the logo
        packet = canvas.Canvas("logo.pdf", pagesize=letter)
        width, height = page.mediabox[2], page.mediabox[3]
        # Adjust x and y to move the position more towards the top left
        packet.drawImage(logo_path, inch - 50, page.mediabox[3] - inch - 0, width=80, height=50)
        packet.save()

        # Open the logo PDF file and get the first page
        with open("logo.pdf", 'rb') as logo_file:
            logo_reader = PyPDF2.PdfReader(logo_file)
            logo_page = logo_reader.pages[0]

            # Merge the logo page and the original page
            page.merge_page(logo_page)

            # Add the merged page to the writer
            writer.add_page(page)

        # Write the output PDF file
        with open(output_pdf_path, 'wb') as output_file:
            writer.write(output_file)

# Example usage
input_pdf_path = '/Users/apple/Downloads/test.pdf' # Path to your input PDF
output_pdf_path = '/Users/apple/Downloads/editedtest.pdf' # Path to save the output PDF
logo_path = '/Users/apple/Downloads/HRInputs_logo.png'  # Path to your company's logo image

add_logo(input_pdf_path, output_pdf_path, logo_path)