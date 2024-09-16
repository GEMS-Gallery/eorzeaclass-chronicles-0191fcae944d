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
        category: Text;
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