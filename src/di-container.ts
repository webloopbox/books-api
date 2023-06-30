import { Container } from "inversify";
import { BookService } from "./services/BookService";
import { BooksController } from "./controllers/BooksController";

export const container = new Container({
  defaultScope: "Request",
  autoBindInjectable: true,
});

container.bind<BookService>(BookService).toSelf();
container.bind<BooksController>(BooksController).toSelf();
