import React from 'react';

const optional = {};

const useless = optional?.chaining?.blah;

console.log(useless == '');

export const MyComp = (props) => {
  return <div data-b={props.b} />;
};

export const MyOtherComp = <MyComp b="string" />;
