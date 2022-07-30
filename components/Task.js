import { BsFillTrashFill } from 'react-icons/bs'

const Task = ({ onClick ,TaskText }) => {
  return (
    <div className='flex items-center text-white'>
      <div className=' bg-[#031956] text-[#b6c7db] flex w-[50%] rounded-[15px] mb-[10px] flex-1'>
        <div className='flex items-center justify-between w-full p-[20px] text-xl'>
          {TaskText}
        </div>
      </div>
      <BsFillTrashFill
        className='text-2xl cursor-pointer ml-10'
        onClick={onClick}
      />
    </div>
  )
}

export default Task
