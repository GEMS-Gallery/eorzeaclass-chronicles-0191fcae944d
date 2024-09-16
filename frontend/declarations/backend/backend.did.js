export const idlFactory = ({ IDL }) => {
  const Character = IDL.Record({
    'name' : IDL.Text,
    'race' : IDL.Text,
    'role' : IDL.Text,
    'gender' : IDL.Text,
    'className' : IDL.Text,
  });
  const Class = IDL.Record({
    'name' : IDL.Text,
    'role' : IDL.Text,
    'imageUrl' : IDL.Text,
  });
  return IDL.Service({
    'addCharacter' : IDL.Func([Character], [], []),
    'getAllCharacters' : IDL.Func([], [IDL.Vec(Character)], ['query']),
    'getAllClasses' : IDL.Func([], [IDL.Vec(Class)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
