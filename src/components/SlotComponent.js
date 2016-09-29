import React from 'react';
import moment from 'moment';
import {dateTimeFormat} from '../utils';


let SlotComponent = ({slot, children}) => {
  let slot_from = moment(slot.from),
    slot_to = moment(slot.to)
  return (
    <div className="slot">
    <span>from: {slot_from.format(dateTimeFormat)} </span>
    <span>to: {slot_to.format(dateTimeFormat)}</span>
    {children && React.cloneElement(children, {
      slot: {
        from: slot_from.format(dateTimeFormat),
        to: slot_to.format(dateTimeFormat)
      }
    })}
    </div>
  )
}

export default SlotComponent
