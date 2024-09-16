import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const classGrid = document.getElementById('classGrid');
    const characterForm = document.getElementById('characterForm');
    const characterList = document.getElementById('characterList');
    const charClassNameSelect = document.getElementById('charClassName');

    // Fetch and display classes
    async function displayClasses() {
        const classes = await backend.getAllClasses();
        classGrid.innerHTML = classes.map(c => `
            <div class="class-card">
                <h3>${c.name}</h3>
                <p>Role: ${c.role}</p>
                <img src="${c.imageUrl}" alt="${c.name}">
            </div>
        `).join('');

        // Populate class select
        charClassNameSelect.innerHTML = '<option value="">Select Class</option>' + 
            classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    }

    // Fetch and display characters
    async function displayCharacters() {
        const characters = await backend.getAllCharacters();
        characterList.innerHTML = characters.map(char => `
            <div>
                <h3>${char.name}</h3>
                <p>Gender: ${char.gender}</p>
                <p>Class: ${char.className}</p>
                <p>Race: ${char.race}</p>
                <p>Role: ${char.role}</p>
            </div>
        `).join('');
    }

    // Add character form submission
    characterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const character = {
            name: document.getElementById('charName').value,
            gender: document.getElementById('charGender').value,
            className: document.getElementById('charClassName').value,
            race: document.getElementById('charRace').value,
            role: document.getElementById('charRole').value
        };

        await backend.addCharacter(character);
        characterForm.reset();
        displayCharacters();
    });

    // Initial display
    displayClasses();
    displayCharacters();
});