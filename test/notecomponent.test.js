import React from 'react';
import {shallow,mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Note from '../components/Note';

configure({adapter : new Adapter()});

const noteData = {
    file : new Blob(['blobber'], { type: 'gif' }),
    title : 'Note Title', 
    desc: 'This is the description',
    id: '12345678912345678901234'
};

it('should render a note with title, user, media and description', () => {

    const wrapper = mount(<Note mID={noteData.id} file={noteData.file} title={noteData.title}  desc={noteData.desc}/>);

    expect(wrapper).toMatchSnapshot();
});

it('should have the same props that were passed in', () => {

    const wrapper = mount(<Note mID={noteData.id} file={noteData.file} title={noteData.title}  desc={noteData.desc}/>);

    expect(wrapper.prop('desc')).toEqual(noteData.desc);
    expect(wrapper.prop('mID')).toEqual(noteData.id);
    expect(wrapper.prop('title')).toEqual(noteData.title);
    expect(wrapper.prop('file')).toEqual(noteData.file);
});

