export const idlFactory = ({ IDL }) => {
  const Character = IDL.Record({
    'jobName' : IDL.Text,
    'name' : IDL.Text,
    'race' : IDL.Text,
    'role' : IDL.Text,
    'gender' : IDL.Text,
  });
  const Job = IDL.Record({
    'name' : IDL.Text,
    'role' : IDL.Text,
    'imageUrl' : IDL.Text,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addCharacter' : IDL.Func([Character], [], []),
    'getAllCharacters' : IDL.Func([], [IDL.Vec(Character)], ['query']),
    'getAllJobs' : IDL.Func([], [IDL.Vec(Job)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
