export default function ScheduleItem (props) {
    let scheduleItem = props.scheduleItem;
    return (
      <li>{scheduleItem.details}</li>
    );
}