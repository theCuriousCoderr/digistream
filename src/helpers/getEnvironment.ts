let BE_URL = "";

if (process.env.NODE_ENV === "development") {
    BE_URL = process.env.NEXT_PUBLIC_BE_URL as string;
} else if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
}

export default BE_URL;