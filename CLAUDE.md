# Portfolio Development Guide

## Commands
- **LaTeX Build**: `cd resume && latexmk -pdf resume.tex`
- **Clean LaTeX**: `cd resume && latexmk -c`
- **View PDF**: `cd resume && open resume.pdf` (macOS) or `cd resume && start resume.pdf` (Windows)

## Code Style Guidelines

### LaTeX
- Use consistent indentation (2 spaces)
- Group related packages together
- Define colors at the top of documents
- Keep document structure clean with appropriate section formatting
- Use semantic markup rather than manual formatting
- Maintain clean separation between content and styling

### General
- Keep file and directory names lowercase with hyphens for spaces
- Document complex code sections with clear comments
- Use consistent formatting within each file type
- Follow language-specific best practices for each technology
- Prioritize maintainability and readability over brevity