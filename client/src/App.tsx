import './App.css'
import { Box, Text, List, ListItem } from '@mantine/core'
import useSWR from 'swr'
import AddTodo from '../components/AddTodo'

export const ENDPOINT = 'http://localhost:4000'

export interface Todo {
  id: string;
  title: string;
  body: string;
  done: boolean;
}

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((res) => res.json())

function App() {

  const {data, mutate} = useSWR<Todo[]>('/api/todos', fetcher)

  return (
    <Box>
      <List>
        {data?.map((todo)=>{
          return (<List.Item key={`todot__${todo.id}`}>{todo.title}</List.Item>
          );
        })}
      </List>
     <AddTodo mutate={mutate}/>
    </Box>
  )
}

export default App
