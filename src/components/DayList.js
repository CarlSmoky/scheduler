import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const dayListItems = props.days.map(dayElement =>
    <DayListItem
      key={dayElement.id}
      name={dayElement.name}
      spots={dayElement.spots}
      selected={dayElement.name === props.value}
      setDay={props.onChange}
    />
  )
  return (
    <ul>{dayListItems}</ul>
  )
}