export type EnumValue = number;

type Enum<T extends string> = {
  [P in T] : EnumValue;
}

let nextEnumValue = 0;

export function createEnum<T extends string>(
  keys  : T[]
) : Enum<typeof keys[number]>
{
  const enumObject  = {} as Enum<typeof keys[number]>;

  for (const key of keys)
  {
    enumObject[key] = nextEnumValue++;
  }

  return enumObject;
}
