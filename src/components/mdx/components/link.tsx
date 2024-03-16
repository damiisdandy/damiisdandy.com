/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import CustomLink from "~/components/link/link";

export default function Link(props: any) {
  return <CustomLink href={props.href}>{props.children}</CustomLink>;
}
