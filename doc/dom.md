In the context of **JavaScript** and interacting with the **DOM (Document Object Model)**, there are a variety of functions and methods available to manipulate and interact with HTML elements on a webpage.

Here's a **comprehensive list** of common **DOM functions and methods** grouped by their functionalities:

---

### 1. **Selecting DOM Elements**:

- **`document.getElementById(id)`**: Selects an element by its unique `id`.

  ```javascript
  const element = document.getElementById('myElement')
  ```

- **`document.getElementsByClassName(className)`**: Selects elements by their class name. Returns an HTMLCollection.

  ```javascript
  const elements = document.getElementsByClassName('myClass')
  ```

- **`document.getElementsByTagName(tagName)`**: Selects elements by their tag name. Returns an HTMLCollection.

  ```javascript
  const paragraphs = document.getElementsByTagName('p')
  ```

- **`document.querySelector(selector)`**: Selects the first element that matches the CSS selector.

  ```javascript
  const element = document.querySelector('.myClass')
  ```

- **`document.querySelectorAll(selector)`**: Selects all elements that match the CSS selector. Returns a NodeList.
  ```javascript
  const elements = document.querySelectorAll('div.myClass')
  ```

---

### 2. **Manipulating DOM Elements**:

- **`element.innerHTML`**: Gets or sets the HTML content of an element.

  ```javascript
  element.innerHTML = '<p>New content</p>'
  ```

- **`element.textContent`**: Gets or sets the text content of an element (ignores HTML tags).

  ```javascript
  element.textContent = 'Hello World!'
  ```

- **`element.setAttribute(attribute, value)`**: Sets the value of an attribute.

  ```javascript
  element.setAttribute('src', 'image.jpg')
  ```

- **`element.getAttribute(attribute)`**: Gets the value of an attribute.

  ```javascript
  const src = element.getAttribute('src')
  ```

- **`element.removeAttribute(attribute)`**: Removes an attribute from an element.

  ```javascript
  element.removeAttribute('src')
  ```

- **`element.classList.add(className)`**: Adds a class to an element.

  ```javascript
  element.classList.add('active')
  ```

- **`element.classList.remove(className)`**: Removes a class from an element.

  ```javascript
  element.classList.remove('active')
  ```

- **`element.classList.toggle(className)`**: Toggles a class on an element (adds if not present, removes if present).

  ```javascript
  element.classList.toggle('active')
  ```

- **`element.style.propertyName`**: Get or set the inline style of an element.
  ```javascript
  element.style.backgroundColor = 'blue'
  ```

---

### 3. **Creating and Removing Elements**:

- **`document.createElement(tagName)`**: Creates a new element node.

  ```javascript
  const newDiv = document.createElement('div')
  ```

- **`element.appendChild(child)`**: Appends a child element to a parent element.

  ```javascript
  parentElement.appendChild(newDiv)
  ```

- **`element.insertBefore(newNode, referenceNode)`**: Inserts a new node before a reference node.

  ```javascript
  parentElement.insertBefore(newDiv, referenceElement)
  ```

- **`element.removeChild(child)`**: Removes a child element from a parent element.

  ```javascript
  parentElement.removeChild(childElement)
  ```

- **`element.replaceChild(newChild, oldChild)`**: Replaces an old child with a new child.
  ```javascript
  parentElement.replaceChild(newDiv, oldDiv)
  ```

---

### 4. **Event Handling**:

- **`element.addEventListener(event, function)`**: Adds an event listener to an element.

  ```javascript
  element.addEventListener('click', function () {
    alert('Element clicked!')
  })
  ```

- **`element.removeEventListener(event, function)`**: Removes an event listener from an element.

  ```javascript
  element.removeEventListener('click', myFunction)
  ```

- **`event.preventDefault()`**: Prevents the default action for an event (e.g., prevents form submission).

  ```javascript
  event.preventDefault()
  ```

- **`event.stopPropagation()`**: Stops the event from bubbling up or down the DOM tree.
  ```javascript
  event.stopPropagation()
  ```

---

### 5. **Traversing DOM Elements**:

- **`parentNode`**: Gets the parent node of the element.

  ```javascript
  const parent = element.parentNode
  ```

- **`childNodes`**: Gets a collection of an element's child nodes.

  ```javascript
  const children = element.childNodes
  ```

- **`firstChild`**: Gets the first child of the element.

  ```javascript
  const firstChild = element.firstChild
  ```

- **`lastChild`**: Gets the last child of the element.

  ```javascript
  const lastChild = element.lastChild
  ```

- **`nextSibling`**: Gets the next sibling of the element.

  ```javascript
  const next = element.nextSibling
  ```

- **`previousSibling`**: Gets the previous sibling of the element.
  ```javascript
  const prev = element.previousSibling
  ```

---

### 6. **Working with Forms**:

- **`element.submit()`**: Submits a form.

  ```javascript
  formElement.submit()
  ```

- **`element.reset()`**: Resets a form to its initial state.

  ```javascript
  formElement.reset()
  ```

- **`element.value`**: Gets or sets the value of an input field.

  ```javascript
  const inputValue = inputElement.value
  inputElement.value = 'New value'
  ```

- **`element.checked`**: Gets or sets the checked state of checkboxes or radio buttons.
  ```javascript
  const isChecked = checkboxElement.checked
  checkboxElement.checked = true
  ```

---

### 7. **Manipulating the Document**:

- **`document.createTextNode(text)`**: Creates a text node.

  ```javascript
  const textNode = document.createTextNode('Hello World')
  ```

- **`document.title`**: Gets or sets the document's title.

  ```javascript
  document.title = 'New Title'
  ```

- **`document.body`**: Accesses the body of the document.
  ```javascript
  const body = document.body
  ```

---

### 8. **Scroll and Positioning**:

- **`window.scrollTo(x, y)`**: Scrolls the window to a specific position.

  ```javascript
  window.scrollTo(0, 100) // Scroll to 100px from the top
  ```

- **`element.scrollTop`**: Gets or sets the vertical scroll position of an element.

  ```javascript
  const scrollPosition = element.scrollTop
  ```

- **`window.scrollY`**: Gets the vertical scroll position of the window.
  ```javascript
  const scrollY = window.scrollY
  ```

---

### 9. **DOM Manipulation with Classes**:

- **`element.classList`**: Provides methods to manipulate the class list of an element.
  - `element.classList.add('newClass')`: Adds a class.
  - `element.classList.remove('oldClass')`: Removes a class.
  - `element.classList.contains('someClass')`: Checks if the element has a class.
  - `element.classList.toggle('className')`: Toggles a class on/off.

---

### 10. **Handling Cookies**:

- **`document.cookie`**: Gets or sets the document’s cookies.
  ```javascript
  document.cookie = 'username=JohnDoe; path=/'
  ```

---

### 11. **Working with Local Storage and Session Storage**:

- **`localStorage.setItem(key, value)`**: Stores data in local storage.

  ```javascript
  localStorage.setItem('user', 'John')
  ```

- **`localStorage.getItem(key)`**: Retrieves data from local storage.

  ```javascript
  const user = localStorage.getItem('user')
  ```

- **`sessionStorage.setItem(key, value)`**: Stores data in session storage.

  ```javascript
  sessionStorage.setItem('sessionData', 'dataValue')
  ```

- **`sessionStorage.getItem(key)`**: Retrieves data from session storage.
  ```javascript
  const sessionData = sessionStorage.getItem('sessionData')
  ```

---

### Conclusion:

These are some of the most commonly used **DOM functions and methods** to interact with the HTML structure, handle user events, manipulate styles, and much more. Mastering these will allow you to dynamically change the content and behavior of web pages.

Let me know if you need further explanations or examples!
