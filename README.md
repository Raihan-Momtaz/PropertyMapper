
# Property Mapper

A full-stack application to normalize and manage property details.  
The project contains a **.NET 9 API** backend and a **React + TypeScript** frontend.


to Run API and UI

# Backend (API):

Navigate to the API folder.

Run:

dotnet run


API runs on https://localhost:5070. Swagger UI available at https://localhost:5070/swagger.

# Frontend (UI):

Navigate to the React project folder.

Install dependencies:

npm install


# Run dev server:

npm start


Frontend runs on http://localhost:5173 and communicates with API.

# Assumptions Made

In-memory store (PropertyStore) is sufficient for the scope; no persistent DB.

React frontend runs on dev server (localhost:5173) and CORS allows this origin.

Volume/Folio fields are numeric


# Backend test cases:

NormalizeProperty_ShouldReturnKnownVolFol_WhenVolumeAndFolioExist – Verifies that Volume and Folio are preserved and status is KnownVolFol when both exist.

NormalizeProperty_ShouldReturnUnknownVolFol_WhenVolumeAndFolioMissing – Checks that status is UnknownVolFol and Volume/Folio are null when missing.

NormalizeProperty_ShouldComposeAddress_WhenFormattedAddressIsNull – Ensures the address is correctly composed from AddressParts if FormattedAddress is null.

NormalizeProperty_ShouldPreserveSourceTrace – Confirms that the SourceTrace fields are copied correctly from external to internal property.


# Frontend test cases:

   renders property info                                                                                                        
    opens and closes modal                                                                                                         
    shows validation errors                                                                                                         
    calls onUpdate on valid confirm   


 AI Tools Used and How Verified:

 Tool: ChatGPT (GPT-4 / GPT-5)

# Use Cases:

Writing React components and TypeScript types

Suggesting CSS layout and styling improvements

Generating detailed commit messages

Manual testing in Postman and React dev server

Compilation success for backend 

TypeScript type checks
