import Navbar from './Navbar'
import { IoMdAddCircle } from 'react-icons/io'
import Task from './Task'

const TodoList = ({ deletedTask , tasks , addTask , setInput ,input , currentAccount} ) => <div className='w-[70%] bg-[#354ea3] py-6 px-10 rounded-[30px] overflow-y-auto'>
  <Navbar currentAccount={currentAccount} />
  <h1 className='text-2xl bolder text-white pb-8'>
  Welcome
  </h1>
  <div className='py-3 text-[#7d99e9]'>TODAY&apos;S TASKS</div>
  <form className='flex items-center justify-center'>
    <input
      className='rounded-[10px] w-full p-[10px] border-none outline-none bg-[#031956] text-white mb-[10px]'
      placeholder='Add a task for today...'
       // take input from the form here
      value={input}
      onChange={e => setInput(e.target.value)} required
     
    />
    <IoMdAddCircle
      // Add an onClick method
      onClick={addTask}
      className='text-[#ea0aff] text-[50px] cursor-pointer ml-[20px] mb-            [10px]'
    />
  </form>
  <ul>
    {/* Loop through all tasks here using the Task component */}
    {tasks.map(items => (
        <Task 
          key={items.id}
          TaskText={items.TaskText}
          onClick={deletedTask(items.id)}
          />
      ))}
  </ul>
</div>

export default TodoList