import Char "mo:base/Char";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
    // Types
    type Class = {
        name: Text;
        role: Text;
        imageUrl: Text;
    };

    type Character = {
        name: Text;
        gender: Text;
        className: Text;
        race: Text;
        role: Text;
    };

    // Stable variables for persistence
    stable var classesEntries : [(Text, Class)] = [];
    stable var charactersEntries : [(Text, Character)] = [];

    // Create HashMaps from stable variables
    let classes = HashMap.fromIter<Text, Class>(classesEntries.vals(), 10, Text.equal, Text.hash);
    let characters = HashMap.fromIter<Text, Character>(charactersEntries.vals(), 10, Text.equal, Text.hash);

    // Initialize classes
    private func initClasses() {
        let initialClasses : [Class] = [
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

        for (cls in initialClasses.vals()) {
            classes.put(cls.name, cls);
        };
    };

    // Initialize classes on canister creation
    initClasses();

    // Query to get all classes
    public query func getAllClasses() : async [Class] {
        Iter.toArray(classes.vals())
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
        classesEntries := Iter.toArray(classes.entries());
        charactersEntries := Iter.toArray(characters.entries());
    };

    // Post-upgrade hook
    system func postupgrade() {
        classesEntries := [];
        charactersEntries := [];
    };
}