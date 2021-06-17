export interface NoteItem {
    id : string,
    title : string,
    desc : string,
    file : Blob
}

export interface RemoveNoteItem {
    id : string,
    name : string
}