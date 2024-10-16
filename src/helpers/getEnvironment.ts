let BE_URL = "";

if (process.env.NODE_ENV === "development") {
  BE_URL = process.env.NEXT_PUBLIC_BE_URL as string;
} else if (process.env.NODE_ENV === "production") {
  BE_URL = process.env.NEXT_PUBLIC_PROD_BE_URL as string;
}

export default BE_URL;
