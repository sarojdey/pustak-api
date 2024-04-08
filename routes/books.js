const express = require("express");
const path = require("path");
const { Op } = require("sequelize");
const { Books } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../api.html"));
});
router.get("/book", async (req, res) => {
  try {
    const books = await Books.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/book/:id", async (req, res) => {
  try {
    const book = await Books.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/book/genre/:genre", async (req, res) => {
  try {
    const genre = req.params.genre.replace(/-/g, " ");
    const books = await Books.findAll({
      where: { genre: { [Op.iLike]: `%${genre}%` } },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/book/author/:author", async (req, res) => {
  try {
    const author = req.params.author.replace(/-/g, " ");
    const books = await Books.findAll({
      where: { author: { [Op.iLike]: `%${author}%` } },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/book/search/:query", async (req, res) => {
  try {
    const query = req.params.query.replace(/-/g, " ");
    const books = await Books.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { author: { [Op.iLike]: `%${query}%` } },
          { genre: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
