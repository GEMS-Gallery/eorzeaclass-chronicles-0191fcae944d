import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Character {
  'name' : string,
  'race' : string,
  'role' : string,
  'gender' : string,
  'className' : string,
}
export interface Class { 'name' : string, 'role' : string, 'imageUrl' : string }
export interface _SERVICE {
  'addCharacter' : ActorMethod<[Character], undefined>,
  'getAllCharacters' : ActorMethod<[], Array<Character>>,
  'getAllClasses' : ActorMethod<[], Array<Class>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
