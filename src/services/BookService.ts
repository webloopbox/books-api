import { IBook } from "@/models/books.dto";
import { Table, db } from "../../db.config";
import { nanoid } from "nanoid";
import { injectable } from "inversify";

@injectable()
export class BookService {
  async getAllBooks() {
    const params = {
      TableName: Table,
    };

    try {
      const { Items = [] } = await db.scan(params).promise();
      return { success: true, data: Items };
    } catch (error) {
      return { success: false, error: "Cannot get all books" };
    }
  }

  async getBookById(bookId: string) {
    const params = {
      TableName: Table,
      Key: {
        ["id"]: bookId,
      },
    };
    try {
      const { Item = {} } = await db.get(params).promise();
      return { success: true, data: Item };
    } catch (error) {
      return { success: false, error: "Cannot get book by id" };
    }
  }

  async addBook(book: IBook) {
    const params = {
      TableName: Table,
      Item: {
        id: nanoid(8),
        title: book.title,
      },
    };

    try {
      const response = await db.put(params).promise();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: "Cannot add new book" };
    }
  }

  async updateBook(book: IBook) {
    const checkParams = {
      TableName: Table,
      Key: { id: book.id },
    };

    try {
      const checkResponse = await db.get(checkParams).promise();
      if (!checkResponse.Item) {
        return { success: false, error: "Book not found" };
      }

      const updateParams = {
        TableName: Table,
        Key: { id: book.id },
        UpdateExpression: "SET #titleAttr = :titleValue",
        ExpressionAttributeNames: {
          "#titleAttr": "title",
        },
        ExpressionAttributeValues: {
          ":titleValue": book.title,
        },
        ReturnValues: "ALL_NEW",
      };

      const updateResponse = await db.update(updateParams).promise();
      return { success: true, data: updateResponse };
    } catch (error) {
      return { success: false, error: "Cannot update book" };
    }
  }

  async deleteBookById(bookId: string) {
    const params = {
      TableName: Table,
      Key: {
        ["id"]: bookId,
      },
    };

    try {
      const response = await db.delete(params).promise();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: "Cannot delete book" };
    }
  }
}
