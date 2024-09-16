import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Character {
  'jobName' : string,
  'name' : string,
  'race' : string,
  'role' : string,
  'gender' : string,
}
export interface Job { 'name' : string, 'role' : string, 'imageUrl' : string }
export interface _SERVICE {
  'addCharacter' : ActorMethod<[Character], undefined>,
  'getAllCharacters' : ActorMethod<[], Array<Character>>,
  'getAllJobs' : ActorMethod<[], Array<Job>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
