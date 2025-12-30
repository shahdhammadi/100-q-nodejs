const url = new URL("https://example.com/api?x=10&y=test");
console.log(url.searchParams.get("x"), url.searchParams.get("y"));