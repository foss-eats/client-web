import * as React from "react";
import { format, parseISO } from 'date-fns'

export type DateProps = {
  dateString: string,
};
const Date: React.FC<DateProps> = ({ dateString }) => (
  <time dateTime={dateString}>
    {format(parseISO(dateString), 'LLLL d, yyyy')}
  </time>
)
export default Date;
