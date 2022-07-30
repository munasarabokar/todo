import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import { MunasarContactAddress } from '../config.js'
import TaskAbi from '../backend/build/contracts/Munasar.json'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    connectWallet()
    getAllTasks()
  }, [])
  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log('Metamask not dedacted ')
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' })
      console.log('contected to chain :', chainId)
      const rinkebyChainId = '0x4'
      if (chainId !== rinkebyChainId) {
        alert('you are not contected to rinkeby testnet !!')
        setCorrectNetwork(false)
        return
      } else {
        setCorrectNetwork(true)
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('found account', accounts[0])
      setIsUserLoggedIn(true)
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }
  // log out user 

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const Munasar = new ethers.Contract(
          MunasarContactAddress,
          TaskAbi.abi,
          signer
        )
        let allTasks = await Munasar.getMyTasks()
        setTasks(allTasks)
        console.log(allTasks)
      } else {
        console.log('ethereum object does not exists!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {
    e.preventDefault()
    let task = {
      TaskText: input,
      isDeleted: false
    }
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const Munasar = new ethers.Contract(
          MunasarContactAddress,
          TaskAbi.abi,
          signer
        )
        Munasar.addTask(task.TaskText, task.isDeleted).then(res => {
          setTasks([...tasks, task])
          console.log('added task')
        }).catch(err => {
          console.log(err)
          alert(err)
        })
      } else {
        console.log('ethereum object does not exists!')
        alert('error ayaa jira')
      }

    } catch (error) {
      console.log(error)
      alert(error)
    }
    setInput('')
  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deletedTask = key => async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const Munasar = new ethers.Contract(
          MunasarContactAddress,
          TaskAbi.abi,
          signer
        )
        const deleteTasktx = await Munasar.deletedTask(key, true)
        console.log('deleted ', deleteTasktx)
        let allTasks = await Munasar.getMyTasks()
        setTasks(allTasks)
      } else {
        console.log('ethereum object does not exists!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {!isUserLoggedIn ? <ConnectWalletButton connectWallet={connectWallet} /> :
        currentAccount ? <TodoList tasks={tasks} input={input} setInput=    
         {setInput} addTask={addTask} currentAccount={currentAccount} 
         deletedTask={deletedTask} /> : <WrongNetworkMessage />}
    </div>
  )
}

