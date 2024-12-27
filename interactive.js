

let searchMode = 'tibetan'; // Default search mode
let currentDictionary = dictionary;

const searchInput = document.querySelector('.searchInput');
const searchButton = document.querySelector('.search-btn');
const wordList = document.querySelector('.wordList');
const toggleButtons = document.querySelectorAll('.toggle-btn');

function displayResults(results) {
    wordList.innerHTML = '';
    if (results.length === 0) {
        wordList.innerHTML = '<div class="word-item">No results found</div>';
        return;
    }

    results.forEach(result => {
        const wordElement = document.createElement('div');
        wordElement.className = 'word-item';
        
        // Switch the display order based on search mode
        const isReverse = searchMode.includes('-reverse');
        const termText = isReverse ? result.definition : result.term;
        const definitionText = isReverse ? result.term : result.definition;
        
        wordElement.innerHTML = `
            <div class="term">${termText}</div>
            <div class="definition">${definitionText}</div>
        `;
        wordList.appendChild(wordElement);
    });
}

function searchDictionary() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let results;
    const isReverse = searchMode.includes('-reverse');
    
    if (isReverse) {
        results = currentDictionary.filter(entry => 
            entry.definition.toLowerCase().includes(searchTerm)
        );
    } else {
        results = currentDictionary.filter(entry => 
            entry.term.toLowerCase().includes(searchTerm)
        );
    }
    
    displayResults(results);
}

// Event Listeners
searchButton.addEventListener('click', searchDictionary);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchDictionary();
    }
});

// Toggle search mode
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state of buttons
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update search mode
        searchMode = button.dataset.mode;
        
        // Set current dictionary based on mode
        currentDictionary = searchMode.startsWith('sanskrit') ? sanskrit : dictionary;
        
        // Update placeholder text based on mode
        const placeholders = {
            'tibetan': "Enter Tibetan term...",
            'tibetan-reverse': "Enter Chinese term...",
            'sanskrit': "Enter Sanskrit term...",
            'sanskrit-reverse': "Enter Chinese term..."
        };
        searchInput.placeholder = placeholders[searchMode];
        
        // Clear previous results
        wordList.innerHTML = '';
        searchInput.value = '';
        
        // Display all entries for the current dictionary
        displayResults(currentDictionary);
    });
});

// Initial display of all entries
displayResults(dictionary);