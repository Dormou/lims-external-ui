export const valueTypeList = [
  'Integer',
  'Decimal',
  'String',
  'IntegerList',
  'DecimalList',
  'StringList',
  'Constant',
] as const

export type ValueType = (typeof valueTypeList)[number]
