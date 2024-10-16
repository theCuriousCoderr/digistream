function encode(message: string) {
  const combined = message + (process.env.NEXT_PUBLIC_HASH_KEY as string);
  return btoa(combined); // Base64 encoding
}

export default encode;
