import Char "mo:base/Char";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
    // Types
    type Job = {
        name: Text;
        role: Text;
        imageUrl: Text;
    };

    type Character = {
        name: Text;
        gender: Text;
        jobName: Text;
        race: Text;
        role: Text;
    };

    // Stable variables for persistence
    stable var jobsEntries : [(Text, Job)] = [];
    stable var charactersEntries : [(Text, Character)] = [];

    // Create HashMaps from stable variables
    let jobs = HashMap.fromIter<Text, Job>(jobsEntries.vals(), 10, Text.equal, Text.hash);
    let characters = HashMap.fromIter<Text, Character>(charactersEntries.vals(), 10, Text.equal, Text.hash);

    // Initialize jobs
    private func initJobs() {
        let initialJobs : [Job] = [
            { name = "Paladin"; role = "Tank"; imageUrl = "https://example.com/paladin.jpg" },
            { name = "Warrior"; role = "Tank"; imageUrl = "https://example.com/warrior.jpg" },
            { name = "Dark Knight"; role = "Tank"; imageUrl = "https://example.com/dark_knight.jpg" },
            { name = "Gunbreaker"; role = "Tank"; imageUrl = "https://example.com/gunbreaker.jpg" },
            { name = "White Mage"; role = "Healer"; imageUrl = "https://example.com/white_mage.jpg" },
            { name = "Scholar"; role = "Healer"; imageUrl = "https://example.com/scholar.jpg" },
            { name = "Astrologian"; role = "Healer"; imageUrl = "https://example.com/astrologian.jpg" },
            { name = "Sage"; role = "Healer"; imageUrl = "https://example.com/sage.jpg" },
            { name = "Monk"; role = "DPS"; imageUrl = "https://example.com/monk.jpg" },
            { name = "Dragoon"; role = "DPS"; imageUrl = "https://example.com/dragoon.jpg" },
            { name = "Ninja"; role = "DPS"; imageUrl = "https://example.com/ninja.jpg" },
            { name = "Samurai"; role = "DPS"; imageUrl = "https://example.com/samurai.jpg" },
            { name = "Reaper"; role = "DPS"; imageUrl = "https://example.com/reaper.jpg" },
            { name = "Bard"; role = "DPS"; imageUrl = "https://example.com/bard.jpg" },
            { name = "Machinist"; role = "DPS"; imageUrl = "https://example.com/machinist.jpg" },
            { name = "Dancer"; role = "DPS"; imageUrl = "https://example.com/dancer.jpg" },
            { name = "Black Mage"; role = "DPS"; imageUrl = "https://example.com/black_mage.jpg" },
            { name = "Summoner"; role = "DPS"; imageUrl = "https://example.com/summoner.jpg" },
            { name = "Red Mage"; role = "DPS"; imageUrl = "https://example.com/red_mage.jpg" },
            { name = "Blue Mage"; role = "DPS"; imageUrl = "https://example.com/blue_mage.jpg" }
        ];

        for (job in initialJobs.vals()) {
            jobs.put(job.name, job);
        };
    };

    // Initialize jobs on canister creation
    initJobs();

    // Query to get all jobs
    public query func getAllJobs() : async [Job] {
        Iter.toArray(jobs.vals())
    };

    // Update call to add a new character
    public func addCharacter(character: Character) : async () {
        characters.put(character.name, character);
    };

    // Query to get all characters
    public query func getAllCharacters() : async [Character] {
        Iter.toArray(characters.vals())
    };

    // Pre-upgrade hook
    system func preupgrade() {
        jobsEntries := Iter.toArray(jobs.entries());
        charactersEntries := Iter.toArray(characters.entries());
    };

    // Post-upgrade hook
    system func postupgrade() {
        jobsEntries := [];
        charactersEntries := [];
    };
}