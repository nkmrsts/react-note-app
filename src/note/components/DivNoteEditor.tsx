import React, { FunctionComponent, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { Note } from '../../shared/firestore/types/note'
import InputBaseNoteText from './InputBaseNoteText'
import TextFieldTitle from './TextFieldTitle'

type Props = {
  inProgress: boolean
  note: Note
}

const DivNoteEditor: FunctionComponent<Props> = ({ inProgress, note }) => {
  const classes = useStyles()

  const [title, setTitle] = useState(note.title)

  const [text, setText] = useState(note.text)

  return (
    <div className={classes.root}>
      <TextFieldTitle
        inProgress={inProgress}
        setTitle={setTitle}
        title={title}
      />
      <InputBaseNoteText
        inProgress={inProgress}
        setText={setText}
        text={text}
      />
    </div>
  )
}

const useStyles = makeStyles<Theme>(({ spacing }) => {
  return {
    root: {
      display: 'grid',
      gridAutoRows: 'min-content auto',
      gridGap: spacing(2)
    }
  }
})
export default DivNoteEditor
