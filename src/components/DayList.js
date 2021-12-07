import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // let dayListItems = [];
  // for (let day of props.days) {
  //   dayListItems.push(<DayListItem
  //     key={day.id}
  //     name={day.name}
  //     spots={day.spots}
  //     selected={day.name === props.day}
  //     setDay={props.setDay}
  //   />)
  // }

  const dayListItems = props.days.map(day =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  )
  return (
    <ul>{dayListItems}</ul>
  )
}