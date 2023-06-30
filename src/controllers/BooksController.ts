import { IBook } from "@/models/books.dto";
import { BookService } from "../services/BookService";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  requestBody,
  requestParam,
} from "inversify-express-utils";

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *       example:
 *         id: f1cH_dzc
 *         title: Forrest Gump
 */

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: API endpoints for managing books
 */
@controller("/books")
export class BooksController extends BaseHttpController {
  constructor(private bookService: BookService) {
    super();
  }

  /**
   * @swagger
   * /books:
   *   get:
   *     summary: Get all books
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Book'
   */
  @httpGet("/")
  async index() {
    const response = await this.bookService.getAllBooks();
    if (response.success) {
      return this.ok(response.data);
    } else {
      return this.badRequest(response.error || "");
    }
  }

  /**
   * @swagger
   * /books/{id}:
   *   get:
   *     summary: Get a book by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the book
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       404:
   *         description: Book not found
   */
  @httpGet("/:id")
  async getBookById(@requestParam("id") bookId: string) {
    const response = await this.bookService.getBookById(bookId);
    if (response.success) {
      return this.ok(response.data);
    } else {
      return this.badRequest(response.error || "");
    }
  }

  /**
   * @swagger
   * /books:
   *   post:
   *     summary: Add a new book
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Book'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       400:
   *         description: Bad request
   */
  @httpPost("/")
  async addBook(@requestBody() body: IBook) {
    const response = await this.bookService.addBook(body);
    if (response.success) {
      return this.ok(response.data);
    } else {
      return this.badRequest(response.error || "");
    }
  }

  /**
   * @swagger
   * /books:
   *   put:
   *     summary: Update a book
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Book'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       400:
   *         description: Bad request
   */
  @httpPut("/")
  async updateBook(@requestBody() body: IBook) {
    const response = await this.bookService.updateBook(body);
    if (response.success) {
      return this.ok(response.data);
    } else {
      return this.badRequest(response.error || "");
    }
  }

  /**
   * @swagger
   * /books/{id}:
   *   delete:
   *     summary: Delete a book by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the book
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */
  @httpDelete("/:id")
  async deleteBookById(@requestParam("id") bookId: string) {
    const response = await this.bookService.deleteBookById(bookId);
    if (response.success) {
      return this.ok(response.data);
    } else {
      return this.badRequest(response.error || "");
    }
  }
}
