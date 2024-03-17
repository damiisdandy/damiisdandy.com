/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export const UnorderedList = (props: any) => {
  return <ul className="list-disc pl-8">{props.children}</ul>;
};

export const ListItem = (props: any) => {
  return <li className="mb-2 marker:text-neutral-600">{props.children}</li>;
};
