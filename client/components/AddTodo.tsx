import { useState } from 'react'
import { useForm } from '@mantine/form'
import {Modal, Group, Button, TextInput, Textarea} from '@mantine/core'
import type { KeyedMutator } from 'swr';
import { ENDPOINT, type Todo } from '../src/App';

function AddTodo({mutate}: {mutate: KeyedMutator<Todo[]>}){

    const [open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {
            title: '',
            body: '',
        },
    });

    async function createTodo(values: { title: string; body: string }) {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(res => res.json());

        mutate(updated);
        form.reset();
        setOpen(false);
    }

    return <>
        <Modal opened={open} onClose={() => setOpen(false)} title="Add Todo">
            <form onSubmit={form.onSubmit(createTodo)}>
                <TextInput
                    required
                    mb={12}
                    label="TODo"
                    placeholder='Enter todo title'
                    {...form.getInputProps('title')}
                />
                <Textarea
                    required
                    mb={12}
                    label="Body"
                    placeholder='Enter todo description'
                    {...form.getInputProps('body')}
                />
                <Button type='submit'>Add Todo</Button>
            </form>
        </Modal>
        <Group>
            <Button mb={12} onClick={() => setOpen(true)}>Add Todo</Button>
        </Group>
    </>

}
export default AddTodo
