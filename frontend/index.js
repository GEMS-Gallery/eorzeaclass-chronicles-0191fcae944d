import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const jobList = document.getElementById('jobList');
    const jobGrid = document.getElementById('jobGrid');
    const characterForm = document.getElementById('characterForm');
    const characterList = document.getElementById('characterList');
    const charJobNameSelect = document.getElementById('charJobName');

    let jobs = [];

    // Fetch and display jobs
    async function displayJobs() {
        jobs = await backend.getAllJobs();
        
        // Group jobs by category
        const jobsByCategory = jobs.reduce((acc, job) => {
            if (!acc[job.category]) {
                acc[job.category] = [];
            }
            acc[job.category].push(job);
            return acc;
        }, {});

        // Populate job list
        jobList.innerHTML = Object.entries(jobsByCategory).map(([category, categoryJobs]) => `
            <h3>${category}</h3>
            <ul>
                ${categoryJobs.map(job => `
                    <li data-job-name="${job.name}">${job.name}</li>
                `).join('')}
            </ul>
        `).join('');

        // Add click event listeners to job list items
        jobList.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', () => {
                const selectedJob = jobs.find(job => job.name === li.dataset.jobName);
                displayJobDetails(selectedJob);
            });
        });

        // Populate job select
        charJobNameSelect.innerHTML = '<option value="">Select Job</option>' + 
            jobs.map(job => `<option value="${job.name}">${job.name}</option>`).join('');

        // Display all jobs initially
        displayAllJobs();
    }

    // Display all jobs in the grid
    function displayAllJobs() {
        jobGrid.innerHTML = jobs.map(job => `
            <div class="job-card">
                <h3>${job.name}</h3>
                <p>Role: ${job.role}</p>
                <p>Category: ${job.category}</p>
                <img src="${job.imageUrl}" alt="${job.name}">
            </div>
        `).join('');
    }

    // Display details of a single job
    function displayJobDetails(job) {
        jobGrid.innerHTML = `
            <div class="job-card">
                <h3>${job.name}</h3>
                <p>Role: ${job.role}</p>
                <p>Category: ${job.category}</p>
                <img src="${job.imageUrl}" alt="${job.name}">
            </div>
        `;
    }

    // Fetch and display characters
    async function displayCharacters() {
        const characters = await backend.getAllCharacters();
        characterList.innerHTML = characters.map(char => `
            <div>
                <h3>${char.name}</h3>
                <p>Gender: ${char.gender}</p>
                <p>Job: ${char.jobName}</p>
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
            jobName: document.getElementById('charJobName').value,
            race: document.getElementById('charRace').value,
            role: document.getElementById('charRole').value
        };

        await backend.addCharacter(character);
        characterForm.reset();
        displayCharacters();
    });

    // Initial display
    displayJobs();
    displayCharacters();
});