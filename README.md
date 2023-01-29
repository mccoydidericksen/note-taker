# Note Taker

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| <img src="assets/images/js-logo.svg" alt="javascript" width="20"/> JavaScript | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)     |  
| <img src="assets/images/nodejs-icon.svg" alt="html" width="20"/> Node.js    | [https://developer.mozilla.org/en-US/docs/Glossary/Node.js](https://developer.mozilla.org/en-US/docs/Glossary/Node.js) | 
| <img src="assets/images/expressjs-logo.svg" alt="html" width="20"/> Express.js    | [https://developer.mozilla.org/en-US/docs/Glossary/Express.js](https://developer.mozilla.org/en-US/docs/Glossary/Express.js) |

## Description 

This application helps you take notes to keep track of important information or reminders. This app gives you control to delete, add, or modify any given note.

## Functionality
Vist the deployed app [here](https://arcane-refuge-00316.herokuapp.com/)

## Code Snippets
The below api route allows users to delete any given note by passing the note id in the body of the api DELETE request.

```javascript
// DELETE Route for a note
app.delete('/api/notes/', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    const id = req.body.id;
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    if (id) {
        const newNotes = notes.filter(note => note.id !== parseInt(id));
        fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
    } else {
        res.error('Error in deleting note');
    }
    res.send('Note deleted successfully!');
});
```