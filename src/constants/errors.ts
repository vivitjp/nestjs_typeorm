import { HttpStatus } from "@nestjs/common";

export const ERROR_OBJECT = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  error: "Internal server error.",
};
