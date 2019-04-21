import React from 'react';

type SomeProps = {
  a: string;
};

type MoreProps = {
  b: number;
  c?: string;
};

type Props = SomeProps & MoreProps;

const ShouldBeNumber: number = 'string';

export const MyComp = (props: Props) => {
  return <div data-b={props.b} />;
};

export const MyOtherComp = <MyComp b="string" />;

interface Foo {
  x: string;
  y?: string;
  z?: string;
}

type Bar = Pick<Foo, 'x'>;

export const FooComp = (props: Bar) => {
  return <div className={props.x} />;
};

const optional = {};

// This line breaks tsc completely but still works (more or less) fine in VSCode
// const useless: string = optional?.chaining?.blah;

console.log(useless == null);
console.log(ShouldBeNumber);
