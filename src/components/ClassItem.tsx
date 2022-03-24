import React, { FC } from "react";
import { ClassInfo } from "../Types";
import "./ClassItem.css";

interface ClassItemProps {
  id: string;
  info: ClassInfo;
}

const ClassItem: FC<ClassItemProps> = (props) => {
  const { id, info } = props;
  return (
    <div key={id} className="classItem">
      <h1>Title</h1>
      <div>{info.name}</div>
      <h1>Students</h1>
      <div>{info.students.join(", ")}</div>
    </div>
  );
};

export default ClassItem;
