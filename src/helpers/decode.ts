function decode(encodedString: string) {
  const combined = atob(encodedString);
  const originalMessage = combined.slice(
    0,
    -(process.env.NEXT_PUBLIC_HASH_KEY as string).length
  );
  return originalMessage;
}

export default decode;
