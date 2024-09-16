import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const jobList = document.getElementById('jobList');
    const jobGrid = document.getElementById('jobGrid');
    const characterForm = document.getElementById('characterForm');
    const characterList = document.getElementById('characterList');
    const charJobNameSelect = document.getElementById('charJobName');

    const jobs = [
        // Tanks
        { name: "Paladin", role: "Tank", category: "Tank", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/V/u76URon_sCA-Qk12_VEcgDMbxY.png" },
        { name: "Warrior", role: "Tank", category: "Tank", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/P/ZlzEpOmdGXFDLcASz3GZvVBjB8.png" },
        { name: "Dark Knight", role: "Tank", category: "Tank", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/1/saMvd8Wxx5wILZjHtdGrp9d4M4.png" },
        { name: "Gunbreaker", role: "Tank", category: "Tank", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/8/4Xjd2MN8b-9U7WkZLZAs1Ddq9k.png" },
        // Healers
        { name: "White Mage", role: "Healer", category: "Healer", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/X/c9k2nYw6jgp4JGX0FGxhLBGhLk.png" },
        { name: "Scholar", role: "Healer", category: "Healer", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/s/2KtQzfKVJxRBgk8dYTIE8TOCKM.png" },
        { name: "Astrologian", role: "Healer", category: "Healer", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/7/WerdZ1zQUYXoXVg-OyZj0_XJYE.png" },
        { name: "Sage", role: "Healer", category: "Healer", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/3/aQzX014sj6LCGkJyR5OUEf1nmc.png" },
        // Melee DPS
        { name: "Monk", role: "DPS", category: "Melee DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/K/HrWvnCNsUJjBJJR12eL18a4T0U.png" },
        { name: "Dragoon", role: "DPS", category: "Melee DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/t/Gp6FwIZTWHGN7KVAkfLelbBBNM.png" },
        { name: "Ninja", role: "DPS", category: "Melee DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/0/Fso5hanZVEEAaZ9tLNxGg8jnXE.png" },
        { name: "Samurai", role: "DPS", category: "Melee DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/E/d6Qr_Hw3b4_uc5rCZPNbfokoWM.png" },
        { name: "Reaper", role: "DPS", category: "Melee DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/9/LbEQTE8Jcl1is_JFBv0w0ZXNLM.png" },
        // Physical Ranged DPS
        { name: "Bard", role: "DPS", category: "Physical Ranged DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/1/gT1XHZtFhfGBzMBTzUveDgKYYA.png" },
        { name: "Machinist", role: "DPS", category: "Physical Ranged DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/l/5CZEvDOMYMyVn2td9LZigsgw9s.png" },
        { name: "Dancer", role: "DPS", category: "Physical Ranged DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/v/2mxh5iqH3xWLMijJ-vj5M9Itwk.png" },
        // Magical Ranged DPS
        { name: "Black Mage", role: "DPS", category: "Magical Ranged DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/m/gWO1KNKngEEGiPwfFyaa9b4OYE.png" },
        { name: "Summoner", role: "DPS", category: "Magical Ranged DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/4/IM3PoP6p06GdJaEwd2YAZi5zYk.png" },
        { name: "Red Mage", role: "DPS", category: "Magical Ranged DPS", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/2/wqNgq7nPWUhEveujuIE44BTCYI.png" },
        { name: "Blue Mage", role: "DPS", category: "Limited Job", imageUrl: "https://img.finalfantasyxiv.com/lds/promo/h/6/M7Q0tqU8AB1PC5VHqbZx9bMjk8.png" }
    ];

    // Display jobs
    function displayJobs() {
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
                charJobNameSelect.value = selectedJob.name;
            });
        });

        // Populate job select
        charJobNameSelect.innerHTML = '<option value="">Select Job</option>' + 
            jobs.map(job => `<option value="${job.name}">${job.name}</option>`).join('');

        // Add change event listener to job select
        charJobNameSelect.addEventListener('change', (e) => {
            const selectedJob = jobs.find(job => job.name === e.target.value);
            if (selectedJob) {
                displayJobDetails(selectedJob);
            }
        });

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
            role: jobs.find(job => job.name === document.getElementById('charJobName').value).role
        };

        await backend.addCharacter(character);
        characterForm.reset();
        displayCharacters();
    });

    // Initial display
    displayJobs();
    displayCharacters();
});