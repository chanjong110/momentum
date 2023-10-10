const quotes = [
    {
        quote : "The unexamined life is not worth living.",
        author : "Socrates",
    },
    {
        quote : "A long life may not be good enough, but a good life is long enough.",
        author : "Benjamin Franklin",
    },
    {
        quote : "Dost thou love life? Then do not squander time, for that is the stuff life is made of.",
        author : "Benjamin Franklin",
    },
    {
        quote : "He who would travel happily must travel light.",
        author : "Antoine de Saint-Exupery",
    },
    {
        quote : "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.",
        author : "Friedrich Nietzsche",
    },
    {
        quote : "Life is something that everyone should try at least once.",
        author : "Henry J. Tillman",
    },
    {
        quote : "It is not always the same thing to be a good man and a good citizen.",
        author : "Aristotle",
    },
    {
        quote : "Hate the sin, love the sinner.",
        author : "Mahatma Gandhi",
    },
    {
        quote : "Love is merely madness.",
        author : "William Shakespeare",
    },
    {
        quote : "Blaze with the fire that is never extinguished.",
        author : "Luisa Sigea",
    },
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;