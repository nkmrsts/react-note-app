import { List } from '@material-ui/core'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import DivProgress from '../shared/components/DivProgress'
import DrawerDefault from '../shared/components/DrawerDefault'
import ListItemHeader from '../shared/components/ListItemHeader'
import ListItemNote from '../shared/components/ListItemNote'
import ListItemNoteCreate from '../shared/components/ListItemNoteCreate'
import { Note } from '../shared/firestore/types/note'
import { watchNotes } from '../shared/firestore/watchNotes'
import ListItemNoteOwn from './components/ListItemNoteOwn'

type Props = RouteComponentProps<{ noteId: string }>

const RouteNoteSide: FunctionComponent<Props> = ({
  history,
  match: {
    params: { noteId }
  }
}) => {
  const [isMine, setIsMine] = useState(true)

  const [loading, setLoading] = useState(true)

  const [notes, setNotes] = useState<Note[]>([])

  const [search, setSearch] = useState('')

  const onCreateNote = useCallback(
    (_noteId: string) => {
      history.push(`/${_noteId}`)
    },
    [history]
  )

  const onUpdateNote = useCallback(
    (_noteId: string | null) => {
      history.push(`/${_noteId}`)
    },
    [history]
  )

  // watch notes
  useEffect(() => {
    const subscription = watchNotes({ isMine: isMine }).subscribe(_notes => {
      setNotes(_notes)
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [isMine])

  // user's notes
  if (isMine) {
    return (
      <DrawerDefault>
        <List>
          <ListItemHeader
            isMineState={[isMine, setIsMine]}
            searchState={[search, setSearch]}
          />
          <ListItemNoteCreate onCreateNote={onCreateNote} />
          {loading && <DivProgress />}
          {notes
            .filter(note => note.title.includes(search))
            .map(note => (
              <ListItemNoteOwn
                key={note.id}
                note={note}
                onUpdateNote={() => onUpdateNote(note.id)}
                selected={noteId === note.id}
              />
            ))}
        </List>
      </DrawerDefault>
    )
  }

  // all user's notes
  return (
    <DrawerDefault>
      <List>
        <ListItemHeader
          isMineState={[isMine, setIsMine]}
          searchState={[search, setSearch]}
        />
        {loading && <DivProgress />}
        {notes.map(note => (
          <ListItemNote
            key={note.id}
            note={note}
            onUpdateNote={() => onUpdateNote(note.id)}
            selected={noteId === note.id}
          />
        ))}
      </List>
    </DrawerDefault>
  )
}

export default withRouter(RouteNoteSide)
