//auth: Yehonatan Binyamini

import Head from 'next/head'
import 'bulma/css/bulma.css'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import savingsAccountContract from '../Blockchain/savings'
import styles from '../styles/savings-account.module.css'
const savingsAccount = () => {
    const [successMsg,setSuccessMsg] = useState('')
    const [parent,setParent] = useState('')
    const [amount,setAmount] = useState('')
    const [error, setError] = useState('')
    const [kidAddress, setKidAddress] = useState('')
    const [time, setTime] = useState(0)
    const [web3, setWeb] = useState(null)
    const [senderAddress, setSenderAddress] = useState(null)
    const [saContract, setSaContract] = useState(null)
    const [ethereValue, setEthereValue] = useState(0)
    const [val, setVal] = useState('')
    

    const getParent = async () => {
        if (parent !== ''){
            setParent('');    
        } else {
        parent = await saContract.methods.getParent().call()
        setParent(parent)
        }
    }

    const getAmount = async () => {
        console.log("get amount:" + val)
        if (amount !== ''){
            setAmount('');    
        } else {
            console.log(val)
            amount = val
            setAmount(amount)
        }
    }
    const connectWalletHandler = async () => {
        if (window.ethereum){
            try{
                await window.ethereum.request({ method: "eth_requestAccounts" })
                web3 = new Web3(window.ethereum)
                setWeb(web3)
                const accounts = await web3.eth.getAccounts()
                setSenderAddress(accounts[0])
                const sa = savingsAccountContract(web3)
                setSaContract(sa)
                
            } catch(err){
                setError(err.message)
            }

        } else {
           alert("MetaMask not installed!") 
        }
    }

    const addKid = async () => {
        console.log(senderAddress)
        try{
            await saContract.methods.addKid(kidAddress, time).send({
                from: senderAddress,
                value: web3.utils.toWei(ethereValue, 'ether')
            })
            
        } catch(err){
            setError(err.message)
        }
    }

    const withdraw = async () => {
        try{
            await saContract.methods.withdraw().send({from: senderAddress})
            setSuccessMsg("The withdraw was completed successfully!")
        } catch(err){
            setError(err.message)
        } 
    }

    const updateKidAddress = event => {
        setKidAddress(event.target.value);
    }

    const updateTime = event => {
        setTime(event.target.value);
    }

    const updateEtherValue = event => {
        setEthereValue(event.target.value);
        setVal(event.target.value);
        console.log("update etheres:" + val)

    }

    
    return(
        <div className={styles.main}>
         <Head>
            <title>Savings Account App</title>
            <meta name="description" content="A blockchain app" />
        </Head>   
        <nav className="navbar mt-4 mb-4">
            <div className="container">
                <div className="navbar-brand">
                    <h1>Savings Account</h1>
                </div>
                <div className="navbar-end">
                    <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
                </div>
            </div>
        </nav>
        <section>
            <div className="container has-text-danger">
                <p>{error}</p>
            </div>
        </section>
        <section>
            <div className="container">
            <p>Parents Area:</p>
            </div>
        </section>
        <section className="mt-5">
            <div className="container">
                <input onChange={updateEtherValue} className="input" type="type" placeholder="Value (ethers)"/>
                <input onChange={updateKidAddress} className="input" type="type" placeholder="Address"/>
                <input onChange={updateTime} className="input " type="type" placeholder="Time To Withdraw (sec)"/>
                <button onClick={addKid} className="button is-primary mt-2">Create</button> 
            </div>
        </section>
        <section className="mt-5">
            <div className="container">
            <p>Kids Area:</p>
            </div>
        </section>
        <section className="mt-5">
            <div className="container">
                <button onClick={withdraw} className="button is-primary mt-2">Withdraw</button> 
            </div>
        </section>
        <section>
            <div className="container has-text-success">
                <p>{successMsg}</p>
            </div>
        </section>
        <section className="mt-3">
            <div className="container">
                <button onClick={getParent} className="button is-primary mt-2">My Parent Address</button> 
            </div>
        </section>
        <section className="mt-3">
            <div className="container">
            <label>{parent}</label>
            </div>
        </section>
        <section className="mt-3">
            <div className="container">
                <button onClick={getAmount} className="button is-primary mt-2">My Amount</button> 
            </div>
        </section>
        <section className="mt-3">
            <div className="container">
            <label>{amount}</label>
            </div>
        </section>
        </div>
    )
}
export default savingsAccount;