import React, { useState } from 'react'
import { TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput() {
  const [open, setOpen] = useState(false)
  const date = new Date();

  const setDate = (event, date) => {
    const {
      type,
      nativeEvent: {timestamp},
    } = event;
  };

  return (
    <>
      <TextInput title="Open" onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}/>
        {open &&<DateTimePicker value={date} onChange={this.setDate}/>}
    </>
  )
}