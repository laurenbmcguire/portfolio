CREATE TABLE IF NOT EXISTS "theaters" (
  "theatre_id" SERIAL PRIMARY KEY,
  "seats" int
);

CREATE TABLE IF NOT EXISTS "customers" (
  "customer_id" SERIAL PRIMARY KEY,
  "customer_name" varchar,
  "ticket_id" int,
  "concession_sale_id" int
);

CREATE TABLE IF NOT EXISTS "showtimes" (
  "showtime_id" int PRIMARY KEY,
  "movie_id" int,
  "theatre_id" int,
  "showtime" int
);

CREATE TABLE IF NOT EXISTS "movies" (
  "movie_id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE IF NOT EXISTS "ticket_sales" (
  "date" datetime,
  "ticket_id" SERIAL PRIMARY KEY,
  "movie_id" int,
  "showtime_id" int,
  "qty" SERIAL,
  "price" float
);

CREATE TABLE IF NOT EXISTS "concession_sales" (
  "concession_sale_id" SERIAL PRIMARY KEY,
  "product_id" int,
  "product_type" varchar,
  "product_price" float,
  "qty" int,
  "date" datetime
);

ALTER TABLE "theaters" ADD FOREIGN KEY ("theatre_id") REFERENCES "showtimes" ("theatre_id");

ALTER TABLE "movies" ADD FOREIGN KEY ("movie_id") REFERENCES "showtimes" ("movie_id");

ALTER TABLE "movies" ADD FOREIGN KEY ("movie_id") REFERENCES "ticket_sales" ("movie_id");

ALTER TABLE "concession_sales" ADD FOREIGN KEY ("concession_sale_id") REFERENCES "customers" ("concession_sale_id");

ALTER TABLE "showtimes" ADD FOREIGN KEY ("showtime_id") REFERENCES "ticket_sales" ("ticket_id");

ALTER TABLE "ticket_sales" ADD FOREIGN KEY ("ticket_id") REFERENCES "customers" ("ticket_id");


INSERT INTO "theaters"("theater_id", "seats")
VALUES
    (01, 300;
    02, 250;
    03, 350);

INSERT INTO "customers"("customer_id","customer_name", "ticket_id","concession_sale_id")
VALUES
("06","John_Doe","03","09";
"07","Jane_Doe","04","10";)

INSERT INTO "showtimes" ("showtime_id","movie_id","theatre_id","concession_sale_id")
VALUES
("4","123",01,"09";
"5","124",02,"10";)

INSERT INTO "movies" ("movie_id", "name")
VALUES
("123","Escape from the Temple";
"124","Up Up and Away";
)

INSERT INTO "ticket_sales" ("date","ticket_id", "movie_id","showtime_id","qty","price")
VALUES
("02-05-2014","03","123","4","1","$9.00";
"02-05-2014", "04", "124","5","1","$9.00")

INSERT INTO "concession_sales" ("product_id", "product_type", "product_price", "qty", "date")
VALUES
("09", "07","Beverage","$4.50","1","02-05-2014";
"10","11","Candy","$3.50","2","02-05-2014")



