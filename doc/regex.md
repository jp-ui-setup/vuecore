### Regular Expression (Regex) Properties

Regular expressions (regex) are powerful tools for pattern matching and text manipulation. They are used to find, match, and replace patterns within strings, often in programming languages or tools that support regex (e.g., JavaScript, Python, or text editors).

Below are the **key properties** and **fundamental components** of regular expressions:

---

### 1. **Literals**:

- **Definition**: Characters that directly match themselves in the text.
- **Example**: The regex `abc` will match the string "abc" exactly.
- **Property**: Matches the exact sequence of characters.

---

### 2. **Meta-characters**:

Meta-characters are characters that have special meaning in regular expressions, enabling powerful pattern matching capabilities.

- **Dot (`.`)**:

  - Matches **any character** except for newlines.
  - Example: `a.b` will match `acb`, `a1b`, `a_b`, etc., but not `ab`.

- **Caret (`^`)**:

  - Matches the **start of a string**.
  - Example: `^abc` matches "abc" only if it appears at the beginning of the string.

- **Dollar Sign (`$`)**:

  - Matches the **end of a string**.
  - Example: `abc$` matches "abc" only if it appears at the end of the string.

- **Question Mark (`?`)**:

  - Makes the preceding character or group **optional** (0 or 1 occurrence).
  - Example: `a?b` matches "b" or "ab".

- **Asterisk (`*`)**:

  - Matches the preceding character or group **0 or more times**.
  - Example: `a*b` matches "b", "ab", "aab", "aaab", etc.

- **Plus (`+`)**:

  - Matches the preceding character or group **1 or more times**.
  - Example: `a+b` matches "ab", "aab", "aaab", etc., but not "b".

- **Pipe (`|`)**:

  - Acts as an **OR** operator between expressions.
  - Example: `a|b` matches either "a" or "b".

- **Parentheses (`()`)**:

  - Groups expressions into **capturing groups**. Captures the matched content.
  - Example: `(ab)+` matches one or more occurrences of "ab".

- **Square Brackets (`[]`)**:
  - Defines a **character class**, matching any one of the characters inside the brackets.
  - Example: `[aeiou]` matches any vowel.

---

### 3. **Character Classes**:

Character classes allow you to define sets of characters that you want to match.

- **Predefined Character Classes**:

  - `\d`: Matches any **digit** (0–9).
  - `\D`: Matches any **non-digit**.
  - `\w`: Matches any **word character** (alphanumeric plus underscore: `[A-Za-z0-9_]`).
  - `\W`: Matches any **non-word character**.
  - `\s`: Matches any **whitespace character** (spaces, tabs, newlines).
  - `\S`: Matches any **non-whitespace character**.

- **Ranges**: You can specify a range of characters.
  - `[a-z]`: Matches any lowercase letter.
  - `[A-Z]`: Matches any uppercase letter.
  - `[0-9]`: Matches any digit.
  - `[a-zA-Z0-9]`: Matches any alphanumeric character.

---

### 4. **Quantifiers**:

Quantifiers specify **how many** times the preceding element should be matched.

- `{n}`: Matches exactly **n** occurrences.

  - Example: `a{3}` matches "aaa".

- `{n,}`: Matches **n or more** occurrences.

  - Example: `a{2,}` matches "aa", "aaa", "aaaa", etc.

- `{n,m}`: Matches between **n and m** occurrences.
  - Example: `a{2,4}` matches "aa", "aaa", or "aaaa".

---

### 5. **Anchors**:

Anchors are used to match positions in the string.

- **`^`**: Matches the **start** of the string.

  - Example: `^Hello` matches "Hello" only if it appears at the start of the string.

- **`$`**: Matches the **end** of the string.

  - Example: `end$` matches "end" only if it appears at the end of the string.

- **`\b`**: Matches a **word boundary** (position between a word character and a non-word character).

  - Example: `\bword\b` matches "word" but not "sword" or "word123".

- **`\B`**: Matches **non-word boundaries** (position where there is no word boundary).
  - Example: `\Bend` matches "bend" but not "end".

---

### 6. **Lookahead and Lookbehind**:

Lookahead and lookbehind assertions are used for **non-capturing** checks in a string.

- **Positive Lookahead (`(?=...)`)**:

  - Asserts that what follows is a specific pattern.
  - Example: `\d(?=\D)` matches a digit only if it's followed by a non-digit.

- **Negative Lookahead (`(?!...)`)**:

  - Asserts that what follows is **not** a specific pattern.
  - Example: `\d(?!\D)` matches a digit only if it’s not followed by a non-digit.

- **Positive Lookbehind (`(?<=...)`)**:

  - Asserts that what precedes is a specific pattern.
  - Example: `(?<=@)\w+` matches a word that follows "@".

- **Negative Lookbehind (`(?<!...)`)**:
  - Asserts that what precedes is **not** a specific pattern.
  - Example: `(?<!@)\w+` matches a word that does not follow "@".

---

### 7. **Escaping Special Characters**:

Some characters have special meaning in regex (like `.`, `*`, `+`, etc.). To match these characters literally, you need to escape them with a backslash (`\`).

- Example: `\.` matches the literal dot (`.`).
- Example: `\\` matches a literal backslash (`\`).

---

### 8. **Flags**:

Flags (also called **modifiers**) change the behavior of the regex matching.

- **`g`** (Global): Matches all occurrences in the string, not just the first.
- **`i`** (Case-insensitive): Matches characters regardless of case.
- **`m`** (Multiline): Changes the behavior of `^` and `$` to match the start and end of each line, not just the start and end of the string.
- **`s`** (Dotall): Makes the dot (`.`) match newline characters as well.
- **`u`** (Unicode): Allows matching of Unicode characters beyond the basic multilingual plane (BMP).
- **`y`** (Sticky): Matches only at the current position in the string.

Example:

```javascript
const regex = /hello/gi // matches "hello" regardless of case, globally
```

---

### 9. **Non-Capturing Groups**:

Sometimes you want to group part of your pattern but **don't** want to capture it for later use. You can use non-capturing groups with `(?:...)`.

- Example: `(?:abc)+` matches "abc" one or more times but does not capture it as a group.

---

### 10. **Greedy vs Lazy Matching**:

- **Greedy**: By default, quantifiers (`*`, `+`, `{n,m}`) are greedy, meaning they will try to match as much text as possible.
- **Lazy**: You can make quantifiers lazy by adding a `?` after them (`*?`, `+?`, `{n,m}?`), meaning they will try to match as little text as possible.

- Example (Greedy): `a.*b` matches from the first `a` to the last `b`.
- Example (Lazy): `a.*?b` matches from the first `a` to the first `b`.

---

### 11. **Backreferences**:

Backreferences allow you to refer to previously captured groups within the same regular expression.

- Example: `(abc)\1` matches "abcabc" (where `\1` refers to the first captured group, which is "abc").

---

### Conclusion

Regular expressions are incredibly versatile, allowing you to match, find, and manipulate text in complex ways. Understanding the properties and components of regex will help you write more efficient and effective patterns for your text-processing tasks.

Let me know if you'd like to dive deeper into any of these concepts!
