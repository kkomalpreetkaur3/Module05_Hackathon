const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const errorMessage = document.getElementById('error-message');

async function fetchQuotes() {
    try {
        const response = await fetch('quotes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch quotes.');
        }
        const quotes = await response.json();
        return quotes;
    } catch (error) {
        errorMessage.textContent = error.message;
        return [];
    }
}

function displayQuote(quotes) {
    if (quotes.length === 0) {
        quoteText.textContent = "No quotes available.";
        authorText.textContent = "";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteText.textContent = `"${quote.quote}"`;
    authorText.textContent = `- ${quote.author}`;
}

newQuoteBtn.addEventListener('click', async () => {
    const quotes = await fetchQuotes();
    displayQuote(quotes);
});

// Initial quote on page load
window.addEventListener('load', async () => {
    const quotes = await fetchQuotes();
    displayQuote(quotes);
});
