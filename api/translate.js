export const translateWord = async (word) => {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|pl`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error("Error translating word:", error);
      return null;
    }
  };
  