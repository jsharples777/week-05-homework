import React from 'react';

function ScheduleItem (props) {
    let scheduleItem = props.schedule-item;
    return (
      <span>{scheduleItem.details}</span>
    );
}