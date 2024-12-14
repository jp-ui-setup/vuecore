To generate a **Table of Contents (TOC)** or outline from an HTML page (similar to how Google Docs auto-generates an outline), we can use **JavaScript** to extract all the headings (`<h1>`, `<h2>`, `<h3>`, etc.) from the HTML and build a hierarchical structure.

Here's a step-by-step explanation and a simple implementation to create a dynamic table of contents based on the headings in the HTML.

### Steps:

1. **Extract all headings**: We need to find all heading elements (`<h1>`, `<h2>`, `<h3>`, etc.) from the HTML document.
2. **Determine the hierarchy**: Each heading level (`h1`, `h2`, `h3`, etc.) will represent a different level in the table of contents.
3. **Generate TOC**: Create a nested list structure (`<ul>` and `<li>`) to represent the hierarchy.
4. **Link the TOC**: Optionally, make the TOC clickable so that when you click a TOC item, the page scrolls to the corresponding heading.

### JavaScript Implementation

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table of Contents Example</title>
    <style>
      /* Basic styling for the TOC */
      #toc {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 250px;
        background: #f0f0f0;
        padding: 10px;
        border: 1px solid #ddd;
        font-family: Arial, sans-serif;
      }
      #toc ul {
        list-style-type: none;
        padding-left: 0;
      }
      #toc li {
        margin: 5px 0;
      }
      #toc a {
        text-decoration: none;
        color: #007bff;
      }
      #toc a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>Introduction</h1>
    <p>This is an introduction section.</p>

    <h2>Subsection 1</h2>
    <p>This is some text under Subsection 1.</p>

    <h2>Subsection 2</h2>
    <p>This is some text under Subsection 2.</p>

    <h3>Subsubsection 2.1</h3>
    <p>This is some text under Subsubsection 2.1.</p>

    <h1>Another Main Section</h1>
    <p>This is another main section.</p>

    <!-- Table of Contents will be injected here -->
    <div id="toc"></div>

    <script>
      // Function to generate Table of Contents
      function generateTOC() {
        const toc = document.getElementById('toc')
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')

        // Create a container for the TOC
        let tocList = document.createElement('ul')

        // Iterate over each heading and create TOC items
        let lastLevel = 1 // Tracks the last heading level (e.g., 1 for h1, 2 for h2, etc.)
        let stack = [tocList] // Stack to manage nested lists (e.g., for h2 inside h1)

        headings.forEach((heading) => {
          // Get the heading level (e.g., 1 for <h1>, 2 for <h2>, etc.)
          const level = parseInt(heading.tagName[1], 10)

          // Create a list item for each heading
          let tocItem = document.createElement('li')
          let tocLink = document.createElement('a')
          tocLink.href = `#${heading.id}` // Create an anchor link to the heading
          tocLink.innerText = heading.innerText

          tocItem.appendChild(tocLink)

          // Adjust the nesting level based on heading level
          if (level > lastLevel) {
            let subList = document.createElement('ul')
            stack[stack.length - 1].lastChild.appendChild(subList)
            stack.push(subList)
          } else if (level < lastLevel) {
            // Close the previous nested lists if we go to a higher level
            stack.pop()
          }

          stack[stack.length - 1].appendChild(tocItem)

          lastLevel = level
        })

        toc.appendChild(tocList)
      }

      // Function to ensure headings have unique ids for anchor links
      function addIdsToHeadings() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        headings.forEach((heading, index) => {
          if (!heading.id) {
            heading.id = `heading-${index + 1}`
          }
        })
      }

      // Run the functions
      addIdsToHeadings()
      generateTOC()
    </script>
  </body>
</html>
```

### Explanation of the Code:

1. **HTML Structure**:

   - This example has a simple HTML structure with headings (`<h1>`, `<h2>`, `<h3>`, etc.) and paragraphs.
   - The Table of Contents (TOC) will be inserted into a `<div>` with `id="toc"`.

2. **Styling**:

   - The TOC is styled to be **fixed** on the right side of the page with a background, some padding, and basic styling for the links.
   - The `#toc a:hover` rule adds a hover effect to the links.

3. **JavaScript**:
   - **`generateTOC()`**: This function extracts all the heading elements (`<h1>`, `<h2>`, etc.) and creates a nested unordered list (`<ul>` and `<li>`) based on the hierarchy of the headings.
   - **`addIdsToHeadings()`**: Before generating the TOC, it ensures each heading has a unique `id`. If the heading doesn't already have one, an ID is dynamically assigned based on its position.
   - The **nested list structure** allows for an automatic hierarchy of the TOC based on the heading level (`h1`, `h2`, `h3`, etc.). For example, `<h1>` creates the main TOC items, and `<h2>` creates sub-items under the closest preceding `<h1>`.
4. **Anchor Links**:
   - Each TOC item links to the corresponding heading via `href="#id"`, where the `id` is dynamically added to the headings in the `addIdsToHeadings()` function. This enables the TOC to be clickable, and clicking a TOC link will scroll the page to the relevant heading.

### Example Output:

If you run this code with the provided HTML content, the table of contents will look like this:

```
Table of Contents
  - Introduction
  - Subsection 1
  - Subsection 2
      - Subsubsection 2.1
  - Another Main Section
```

- Each item is clickable, and when clicked, it scrolls the page to the corresponding heading.
- The TOC will dynamically adjust to the heading levels and can handle nested sections.

### Notes:

- **IDs on Headings**: It's important to ensure every heading has a unique `id` attribute, otherwise, the anchor links won’t work correctly. This is handled in the `addIdsToHeadings()` function.
- **Accessibility**: You can further improve accessibility by adding `aria` attributes or by customizing the link behavior (e.g., smooth scrolling).
- **Performance**: If the page contains a lot of headings, consider using more efficient methods of managing TOC generation, such as lazy-loading or limiting the number of levels.

This basic implementation provides a good starting point for generating a table of contents for your web pages. You can expand it with additional features like smooth scrolling, custom styling, or advanced heading filtering.
