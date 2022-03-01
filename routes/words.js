const express = require("express");
const router = express.Router();
const Word = require("../models/word");

//gettting all
router.get("/", async (req, res) => {
    try {
        const words = await Word.find();
        res.json(words);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//getting one
router.get("/:id", getWord, (req, res) => {

    res.json(res.word)
})
//creating one
router.post("/", async (req, res) => {
    const { word, word_type, plural, definition, example, synonyms } = req.body;
    const wordobj = new Word({
        word,
        word_type,
        plural,
        definition,
        example,
        synonyms
    })
    try {
        Word.findOne({ word: word }, async (err, worddoc) => {
            if (worddoc) {
               return res.json({ message: "Word already exists" })
            }
            const newWord = await wordobj.save()
            res.status(201).json(newWord)
        })
        
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})
//updating one
router.put("/:id", getWord, async (req, res) => {
    if (req.body.word != null) {
        res.word.word = req.body.word
    }
    if (req.body.approved != null) {
        res.word.approved = req.body.approved
    }
    if (req.body.word_type != null) {
        res.word.word_type = req.body.word_type
    }
    if (req.body.plural != null) {
        res.word.plural = req.body.plural
    }
    if (req.body.definition != null) {
        res.word.definition = req.body.definition
    }
    if (req.body.example != null) {
        res.word.example = req.body.example
    }
    if (req.body.synonyms != null) {
        res.word.synonyms = req.body.synonyms
    }
    try {
        const updateWord = await res.word.save()
        res.json(updateWord)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})
//adding a new meaning
// router.put("/newmeaning/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const meanWord = {
//             "definition": "weak beer",
//             "example": "a pickle of heavy"
//         }


//         Word.findOneAndUpdate(id, { $push: { "meaning": meanWord } }, { upsert: true, new: true }, (err, doc) => {
//             if (err) throw err;
//             console.log(doc)
//             res.json(doc);
//         })

//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// })
// })
//deleting one
router.delete("/:id", getWord, async (req, res) => {
    try {
        await res.word.remove()
        res.json({ message: "Deleted Word" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getWord(req, res, next) {
    let word
    try {
        word = await Word.findById(req.params.id)
        if (word == null) {
            return res.status(404).json({ message: "Cannot find word" })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.word = word
    next()
}

module.exports = router
//There needs upsert handling for more than one meaning and more than one word type.